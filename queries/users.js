import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model"; // Adjust import as necessary
import dbConnect from "@/service/dbConnect";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email) {
  await dbConnect();

  const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } }).lean();

  if (!user) {
    return null; // Return null if no user is found
  }

  return replaceMongoIdInObject(user);
}

export async function validatePassword(email, password) {
  await dbConnect();

  const user = await getUserByEmail(email);
  if (!user) {
      console.error("User not found.");
      return false;
  }

  console.log("Stored password:", user?.password); // Log the stored hash
  const isMatch = await bcrypt.compare(password, user?.password);
  console.log("Password comparison result:", isMatch); // Log the comparison result

  return isMatch;
}
