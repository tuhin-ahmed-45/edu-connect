import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourses from "./_components/RelatedCourses";
import Testimonials from "./_components/Testimonials";

import { replaceMongoIdInArray } from "@/lib/convertData";
import { getCourseDetails } from "@/queries/courses";

const SingleCoursePage = async ({ params }) => {
   const { id } = await params;

   const course = await getCourseDetails(id);
   return (
      <>
         <CourseDetailsIntro course={course}
         />

         <CourseDetails course={course} />

         {course?.testimonials && (
            <Testimonials
               testimonials={replaceMongoIdInArray(course?.testimonials)}
            />
         )}

         <RelatedCourses />
      </>
   );
};
export default SingleCoursePage;
