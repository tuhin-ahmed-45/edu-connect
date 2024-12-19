"use server";
import { signIn } from "@/auth";

export const credentialsLogin = async (formData) => {
   try {
      const res = await signIn("credentials", {
         email: formData?.get("email"),
         password: formData?.get("password"),
         redirect: false,
      });
      console.log("response :", res);
      
      return res;
   } catch (error) {
      console.log(error?.message);

      throw new Error(error?.message);
   }
};

// For social login

export const doSocialLogin = async (formData) => {
   const action = formData.get("action");
   await signIn(action, { redirectTo: "/courses" });
};
