"use client";

import lwsLogo from "@/assets/lws_logo.svg";
import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function MainNav({ items, children }) {
	const { data: session } = useSession()
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [loginSession, setLoginSession] = useState(null)

	// if (session?.error === 'RefreshAccessTokenError') {
	// 	redirect('/login')
	// }
	console.log("User: ", session?.user)
	useEffect(() => {
		setLoginSession(session)
	}, [session])


	return (
		<>
			<div className="flex gap-6 lg:gap-10">
				<Link href="/">
					<Image className="max-w-[100px]" src={lwsLogo} alt="Logo" />
				</Link>
				{items?.length ? (
					<nav className="hidden gap-6 lg:flex">
						{items?.map((item, index) => (
							<Link
								key={index}
								href={item.disabled ? "#" : item.href}
								className={cn(
									"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
								)}>
								{item.title}
							</Link>
						))}
					</nav>
				) : null}

				{showMobileMenu && items && (
					<MobileNav items={items}>{children}</MobileNav>
				)}
			</div>
			<nav className="flex items-center gap-3">
				{!loginSession && (
					<div className="items-center gap-3 hidden lg:flex">
						<Link
							href="/login"
							className={cn(buttonVariants({ size: "sm" }), "px-4")}>
							Login
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm">
									Register
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56 mt-4">
								<DropdownMenuItem className="cursor-pointer">
									<Link href="/register/student">Student</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer">
									<Link href="/register/instructor">Instructor</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="cursor-pointer flex items-center gap-2">
							<div>
								<h2 className="">{session?.user?.name}</h2>
							</div>
							<Avatar>
								<AvatarImage
									src={session?.user?.image || "https://github.com/shadcn.png"}
									alt={session?.user?.name || "User"}
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56 mt-4">
						<DropdownMenuItem className="cursor-pointer" asChild>
							<Link href="/account">Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer" asChild>
							<Link href="/account/enrolled-courses">My Courses</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer" asChild>
							<Link href="">Testimonials & Certificates</Link>
						</DropdownMenuItem>
						{loginSession && (
							<DropdownMenuItem className="cursor-pointer" asChild>
								<Link href="#" onClick={() => { signOut() }}>Logout</Link>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
				<button
					className="flex items-center space-x-2 lg:hidden"
					onClick={() => setShowMobileMenu(!showMobileMenu)}>
					{showMobileMenu ? <X /> : <Menu />}
				</button>
			</nav>
		</>
	);
}
