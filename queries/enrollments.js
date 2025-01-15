import { Enrollment } from "@/model/enrollment-model";

import { replaceMongoIdInArray } from "@/lib/convertData";
import dbConnect from "@/service/dbConnect";

export async function getEnrollmentsForCourse(courseId) {
   // db connection call
   await dbConnect();

   const enrollments = await Enrollment.find({ course: courseId }).lean();
   return replaceMongoIdInArray(enrollments);
}

export async function enrollForCourse(courseId, userId, paymentMethod) {
   await dbConnect();

   const newEnrollment = {
      course: courseId,
      student: userId,
      method: paymentMethod,
      enrollment_date: Date.now(),
      status: "not-started",
   };

   try {
      const response = await Enrollment.create(newEnrollment);

      return response;
   } catch (error) {
      throw new Error(error);
   }
}
