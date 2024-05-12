"use client";

import React from "react";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { SIDENAVPATHS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

const SideNav = () => {
    const pathname = usePathname();

    return (
        <section id="sideNavBar">
            <Sheet>
                <SheetTrigger className="flex justify-center items-center">
                    <Menu size={32} />
                </SheetTrigger>
                <SheetContent className="py-14">
                    <SheetHeader className="mb-4">
                        <SheetTitle className="text-2xl font-bold mx-2">
                            Navigate Sweat Sync
                        </SheetTitle>
                        <Separator className="bg-primary" />
                    </SheetHeader>
                    <nav>
                        <ul className="text-lg flex flex-col gap-2">
                            {SIDENAVPATHS.map((path, index) => {
                                if (path.name === "Divider") {
                                    return (
                                        <Separator
                                            key={index}
                                            className="bg-primary"
                                        />
                                    );
                                }

                                return (
                                    <Link href={path.path} key={index}>
                                        <SheetClose asChild>
                                            <li
                                                className={cn(
                                                    "px-4 py-2 flex flex-row gap-4 justify-start items-center",
                                                    {
                                                        "bg-primary text-white rounded-lg hover:bg-primary":
                                                            pathname.includes(
                                                                path.path
                                                            ),
                                                    }
                                                )}
                                            >
                                                <Icon iconName={path.icon} />
                                                {path.name}
                                            </li>
                                        </SheetClose>
                                    </Link>
                                );
                            })}
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default SideNav;
