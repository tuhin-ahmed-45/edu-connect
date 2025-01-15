import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { sendEmails } from "@/lib/emails";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { enrollForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams }) => {
  const { session_id, courseId } = await Promise.resolve(searchParams); // Await `searchParams`
  console.log({ session_id, courseId });

  if (!session_id) throw new Error("Invalid Session ID");

  const userSession = await auth();
  console.log("User session:", userSession);

  if (!userSession?.user?.email) {
    console.error("No email found in user session. Redirecting to login...");
    redirect("/login");
  }

  const courses = await getCourseDetails(courseId);
  console.log("Course details:", courses);

  const loggedInUser = await getUserByEmail(userSession.user.email);
  console.log("Logged-in user:", loggedInUser);

  if (!loggedInUser) {
    console.error("No user found with email:", userSession.user.email);
    throw new Error("User not found.");
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent = checkoutSession.payment_intent;
  const paymentStatus = paymentIntent?.status;

  // customer info
  const customerName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  const customerEmail = loggedInUser?.email;
  const productName = courses?.title;

  console.log({ paymentStatus, customerName, customerEmail, productName });

  if (paymentStatus === "succeeded") {
    // update DB Enrollment collection
    const enrolled = await enrollForCourse(courseId, loggedInUser?.id, "stripe")

    // send email to the instructor, student, and the person who paid
    const instructorName = `${courses?.instructor?.firstName} ${courses?.instructor?.lastName}`;
    const instructorEmail = courses?.instructor?.email;

    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New enrollment for ${productName}`,
        message: `Hello ${instructorName}, a new student has enrolled in your course ${productName}.`
      },
      {
        to: customerEmail,
        subject: `Enrollment successful for ${productName}`,
        message: `Hello ${customerName}, you have successfully enrolled in the course ${productName}.`
      },
    ];

    const emailSentResponse = await sendEmails(emailsToSend);

    console.log("Email sent response:", emailSentResponse);

  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus === "succeeded" && (
          <>
            <CircleCheck className="w-32 h-32 bg-teal-400 rounded-full p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations, <strong>{customerName}</strong>! Your enrollment was successful for <strong>
                {productName}
              </strong>!
            </h1>
          </>
        )}
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/courses/${courseId}`}>Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
