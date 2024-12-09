import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module-model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { dbConnect } from "@/service/dbConnect";

export async function getCourseList() {
   // DB connection call
   await dbConnect();

   const courses = await Course.find({})
      .select([
         "title",
         "subtitle",
         "thumbnail",
         "modules",
         "price",
         "category",
         "instructor",
      ])
      .populate({
         path: "category",
         model: Category,
      })
      .populate({
         path: "instructor",
         model: User,
      })
      .populate({
         path: "testimonials",
         model: Testimonial,
      })
      .populate({
         path: "modules",
         model: Module,
      })
      .lean();

   return replaceMongoIdInArray(courses);
}
