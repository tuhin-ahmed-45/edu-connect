'use client'

import { credentialsLogin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
      const res = await credentialsLogin(formData)

      if (!!res?.error) {
        setError(res?.error);
      } else {
        router.push("/courses");
      }
    } catch (error) {
      setError(error?.message)
    }
  }
  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="tuhin@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <Input id="password" name="password" type="password" placeholder="Your password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        {/* <SocialLogins /> */}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <p>
            Register as a {" "}
            <Link href="/register/instructor" className="underline">
              Instructor
            </Link>
            {" "}
            or
            {" "}
            <Link href="/register/student" className="underline">
              Student
            </Link>
          </p>

        </div>
      </CardContent>
    </Card>
  );
}
