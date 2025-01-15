import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model"; // Adjust import as necessary
import dbConnect from "@/service/dbConnect";

export async function getUserByEmail(email) {
  await dbConnect();

  const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } }).lean();

  if (!user) {
    return null; // Return null if no user is found
  }

  return replaceMongoIdInObject(user);
}
