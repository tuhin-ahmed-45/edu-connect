"use server";

import { User } from "@/model/user-model";
import { validatePassword } from "@/queries/users";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// Update user info
export async function updateUserInfo(email, updatedData) {
   try {
      const filter = { email: email };
      const updated = await User.findOneAndUpdate(filter, updatedData);
   } catch (error) {
      throw Error(error);
   }
}
// Update user password
export async function updateUserPassword(email, oldPassword, newPassword) {
   console.log("Email:", email);
   console.log("Old Password:", oldPassword);
   console.log("New Password:", newPassword);

   const isMatch = await validatePassword(email, oldPassword);
   if (!isMatch) {
       console.error("Old password validation failed.");
       throw Error("Old password is incorrect.");
   }

   const hashedPassword = await bcrypt.hash(newPassword, 10);
   console.log("Hashed new password:", hashedPassword);

   try {
       const updated = await User.findOneAndUpdate(
           { email },
           { password: hashedPassword }
       );

       revalidatePath('/account')
       console.log("User updated successfully:", updated);
   } catch (error) {
       console.error("Error updating password:", error);
       throw Error(error.message);
   }
}

