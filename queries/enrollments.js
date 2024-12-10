import { Enrollment } from "@/model/enrollment-model";

import { replaceMongoIdInArray } from "@/lib/convertData";
import { dbConnect } from "@/service/dbConnect";

export async function getEnrollmentsForCourse(courseId) {
   // db connection call
   await dbConnect();
   
   const enrollments = await Enrollment.find({ course: courseId }).lean();
   return replaceMongoIdInArray(enrollments);
}
