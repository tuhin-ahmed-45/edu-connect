import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { User } from "./model/user-model";
import dbConnect from "./service/dbConnect";

async function refreshAccessToken(token) {
   console.log("Refreshing Token for Google:", token);

   try {
      const url =
         "https://oauth2.googleapis.com/token?" +
         new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken, // Verify this exists
         });

      const response = await fetch(url, {
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         method: "POST",
      });

      const refreshedTokens = await response.json();
      console.log("Google Refreshed Token:", refreshedTokens);

      if (!response.ok) {
         throw refreshedTokens;
      }

      return {
         ...token,
         accessToken: refreshedTokens?.access_token,
         accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
         refreshToken: refreshedTokens?.refresh_token || token.refreshToken, // Fallback
      };
   } catch (error) {
      console.error("Error Refreshing Token:", error);
      return {
         ...token,
         error: "RefreshAccessTokenError",
      };
   }
}

export const {
   handlers: { GET, POST },
   auth,
   signIn,
   signOut,
} = NextAuth({
   ...authConfig,
   providers: [
      // For credential login
      CredentialsProvider({
         async authorize(credentials) {
            if (!credentials) {
               throw new Error("No credentials provided!");
            }

            try {
               // Ensure DB connection
               await dbConnect();

               // Fetch user from the database
               const user = await User.findOne({ email: credentials.email });
               if (!user) {
                  console.error("User not found!");
                  throw new Error("User not found!");
               }

               // Compare the provided password with the hashed password in the DB
               const isMatch = await bcrypt.compare(
                  credentials.password,
                  user.password
               );

               if (!isMatch) {
                  console.error("Invalid password!");
                  throw new Error("Invalid password!");
               }

               // User authenticated successfully
               return {
                  id: user._id.toString(),
                  email: user.email,
                  name: `${user.firstName} ${user.lastName}`,
               };
            } catch (error) {
               console.error("Authorization error:", error.message);
               throw new Error(error.message);
            }
         },
      }),

      // For login with google
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         authorization: {
            params: {
               prompt: "consent",
               access_type: "offline",
            },
         },
      }),

      // For github with github
      GitHubProvider({
         clientId: process.env.GITHUB_CLIENT_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET,
         authorization: {
            params: {
               prompt: "consent", // Always ask for user consent
               access_type: "offline", // Get refresh token
               response_type: "code",
            },
         },
      }),
   ],
   pages: {
      signIn: "/auth/signin", // Optional: Custom sign-in page
   },
   // JWT token
   callbacks: {
      async jwt({ token, user, account }) {
         console.log("Inside JWT callback:", { token, user, account });

         if (account && user) {
            console.log("New Token from Account:", account);
            return {
               accessToken: account.access_token,
               accessTokenExpires: Date.now() + account.expires_in * 1000,
               refreshToken: account.refresh_token, // For Google
               user,
            };
         }

         if (Date.now() < token.accessTokenExpires) {
            console.log("Using Existing Token:", token);
            return token;
         }

         console.log("Access Token Expired. Refreshing...");
         return refreshAccessToken(token);
      },

      async session({ session, token }) {
         session.user = token?.user;
         session.accessToken = token?.access_token;
         session.error = token?.error;
         console.log(`Returning Session ${JSON.stringify(session)}`);
         return session;
      },
   },
});
