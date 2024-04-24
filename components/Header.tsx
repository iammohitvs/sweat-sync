import React from "react";
import { Button } from "./ui/button";
import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import SideNav from "./SideNav";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
    const user = await currentUser();
    return (
        <nav className="w-full flex flex-row justify-between items-center py-5 shadow-sm px-5 md:px-10">
            <Link href="/homepage">
                <Image
                    src="/logo cropped.png"
                    alt="App Logo"
                    height={50}
                    width={80}
                />
            </Link>
            <div className="flex flex-row fle-end justify-center items-center gap-5">
                <SignedOut>
                    <SignInButton>
                        <Button variant="secondary">Log In</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button>Sign Up</Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <p>Hi there {user?.firstName}</p>
                    <UserButton />
                    <SideNav />
                </SignedIn>
            </div>
        </nav>
    );
};

export default Header;
