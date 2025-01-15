'use client'

import { createCheckoutSession } from "@/actions/stripe"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"

const EnrollCourse = ({ asLink, course }) => {
    
    const formAction = async (data) => {
        const { url } = await createCheckoutSession(data);
        window.location.assign(url);
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="courseId" value={course?.id} />
            <input type="hidden" name="courseName" value={course?.title} />
            <input type="hidden" name="coursePrice" value={course?.price} />
            {asLink ? (
                <Button
                    type="submit"
                    variant="ghost"
                    className="text-xs text-sky-700 h-7 gap-1"
                >
                    Enroll
                    <ArrowRight className="w-3" />
                </Button>
            ) : (
                <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
                    Enroll Now
                </Button>
            )}
        </form>
    )
}

export default EnrollCourse