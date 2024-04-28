"use client";

import React from "react";
import { Menu, Calendar, Dumbbell } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SIDENAVPATHS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SideNav = () => {
    const pathname = usePathname();

    return (
        <section id="sideNavBar">
            <Sheet>
                <SheetTrigger className="flex justify-center items-center">
                    <Menu size={32} />
                </SheetTrigger>
                <SheetContent className="py-14">
                    <SheetHeader className="mb-8">
                        <SheetTitle className="text-2xl font-bold mx-2">
                            Navigate Sweat Sync
                        </SheetTitle>
                    </SheetHeader>
                    <nav>
                        <ul className="text-lg flex flex-col gap-2">
                            {SIDENAVPATHS.map((path) => (
                                <Link href={path.path} key={path.path}>
                                    <SheetClose asChild>
                                        <li
                                            className={cn(
                                                "px-4 py-2 hover:bg-secondary flex flex-row gap-4 justify-start items-center",
                                                {
                                                    "text-primary":
                                                        pathname.includes(
                                                            path.path
                                                        ),
                                                }
                                            )}
                                        >
                                            {path.icon === "Calendar" ? (
                                                <Calendar />
                                            ) : (
                                                <Dumbbell />
                                            )}
                                            {path.name}
                                        </li>
                                    </SheetClose>
                                </Link>
                            ))}
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default SideNav;
