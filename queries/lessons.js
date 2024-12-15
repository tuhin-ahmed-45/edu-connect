import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson-model";
import dbConnect from "@/service/dbConnect";

export async function getLesson(lessonId) {
   // DB call
   await dbConnect();

   const lesson = await Lesson.findById(lessonId).lean();
   return replaceMongoIdInObject(lesson);
}
