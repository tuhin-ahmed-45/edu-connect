import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/user-model";
import dbConnect from "./service/dbConnect";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
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
          const isMatch = await bcrypt.compare(credentials.password, user.password);

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
  ],
});
