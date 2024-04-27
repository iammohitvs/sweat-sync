import React from "react";
import { Button } from "./ui/button";
import {
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import SideNav from "./SideNav";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
    return (
        <nav className="w-full flex flex-row justify-between items-center py-5 shadow-sm px-5 md:px-10">
            <Link href="/">
                <Image
                    src="/logo cropped.png"
                    alt="App Logo"
                    height={50}
                    width={80}
                />
            </Link>
            <div className="flex flex-row fle-end justify-center items-center gap-5">
                <SignedOut>
                    <Button variant="secondary">
                        <Link href="/sign-in">Log In</Link>
                    </Button>
                    <Button>
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                    <SideNav />
                </SignedIn>
            </div>
        </nav>
    );
};

export default Header;
