import { Testimonial } from "@/model/testimonial-model";

import { replaceMongoIdInArray } from "@/lib/convertData";
import { dbConnect } from "@/service/dbConnect";

export async function getTestimonialsForCourse(courseId) {
   // DB connection call
   await dbConnect();
   
   const testimonials = await Testimonial.find({ courseId: courseId }).lean();
   return replaceMongoIdInArray(testimonials);
}
