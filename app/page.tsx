import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <section
            id="Hero-section"
            className="flex flex-col gap-14 mt-20 items-center"
        >
            <h1 className="text-6xl text-center max-w-[1000px] font-semibold">
                Transform your workouts, track your progress, and conquer your
                fitness goals with our all-in-one workout companion!
            </h1>
            <div className="flex flex-col-reverse lg:flex-row-reverse justify-between gap-10 md:gap-20 items-center">
                <h3 className="text-3xl w-[500px] text-slate-600">
                    Elevate your strength journey with SweatSync. Record sets,
                    reps, and crush muscle goals effortlessly. Stay focused,
                    track gains, and sculpt your dream physique with precision
                    and ease.
                </h3>
                <Image
                    src="/Hero-section-image.svg"
                    alt="image of perso using their phone to track their workouts"
                    width={700}
                    height={700}
                    className="w-[500px] h-[500px]"
                />
            </div>
            <SignedIn>
                <Button
                    variant="link"
                    asChild
                    className="text-xl hover:font-semibold"
                >
                    <Link href="/homepage">
                        Visit the HomePage <ArrowRight />
                    </Link>
                </Button>
            </SignedIn>
        </section>
    );
}
