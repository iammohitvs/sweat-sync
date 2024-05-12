/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { randomAction } from "../actions";

const DocsPage = () => {
    return (
        <div className="flex flex-col gap-5 items-start justify-center max-w-[1000px]">
            <h1 className="text-3xl font-semibold">
                Welcome to the docs page. If you have any questions on how the
                app works, I hope this will be of help.
            </h1>

            <h3 className="text-2xl font-semibold">Your Account</h3>
            <p className="text-xl">
                You obviously start by making an account, or you wouldn't be
                here 😅 .
            </p>
            <p className="text-xl">
                Your account is registered with us via a third party auth
                service -{" "}
                <Link
                    href="https://clerk.com/"
                    className="text-primary hover:font-semibold transition-all underline"
                >
                    clerk
                </Link>
                . Clerk is extrmeley reliable and safe, so none of your data is
                at any risk. If you feel this app doesn't satisfy what your
                lookig for, feel at ease to delete your account. There is no
                single exact solution to a problem.
            </p>

            <h4 className="text-xl font-bold text-primary">
                The navigatioon menu is your map. Use it to explore all the
                features we have to offer. It can be accessed using the
                hamburger on the top right of your screen.
            </h4>

            <h3 className="text-2xl font-semibold">Workouts</h3>
            <p className="text-xl">
                We provide all new users with three workouts out of the box. The
                famous Push-Pull-Legs split. Feel free to use them, or delete
                them to add other workouts that are better fit for you.
            </p>
            <p className="text-xl">
                You can also click on the big green "Create Workout" button and
                start building your own custon workouts. Name it something
                technical like "Chest Day", or something funny like "Why do I
                train legs 😭". The main goal of our app is to provide
                flexibility in building and managing your workouts, to get
                stronger and build the muscle that your working hard for.
            </p>
            <p className="text-xl">
                Give it a name. A description as well, maybe something that motivates you to hit your pr!
            </p>
            <p className="text-xl">
                All your workouts can be viewed inside the{" "}
                <Link
                    href="/workouts"
                    className="text-primary hover:font-semibold transition-all underline"
                >
                    Workouts page
                </Link>{" "}
                from our navigation menu.
            </p>

            <h3 className="text-2xl font-semibold">Sessions</h3>
            <p className="text-xl">
                A session refers to your the workout sessions youve recorded
                each day in the gym. It has the weights, as well as the number
                of reps cranked out each set. All your sessions can be viewed in
                the{" "}
                <Link
                    href="all"
                    className="text-primary hover:font-semibold transition-all underline"
                >
                    All Sessions
                </Link>{" "}
                page.
            </p>
            <p className="text-xl">
                Recording session has never been easier. Just go to the Record a
                session page from our navigation menu adn chose one of your
                workouts. Wait a second for it to load and start filling in the
                data.
            </p>
            <p className="text-xl">
                Below all the inputs, your last session - if recorded before -
                will be visible so that you can know how many reps to go to push
                you futher.
            </p>

            <h3 className="text-2xl font-semibold">Contact</h3>
            <p className="text-xl">
                To contact me, you can do any one of the following:
            </p>
            <ul className="list-disc text-xl">
                <li>Send me a mail @vsmohit94@gmail.com</li>
                <li>
                    Raise an issue on{" "}
                    <Link
                        href=""
                        className="text-primary hover:font-semibold transition-all underline"
                    >
                        github
                    </Link>
                    , where the source code for this project will be available.
                </li>
            </ul>

            <p className="text-xl">
                And that's it! Have fun with the app, and gain tons of muscle 💪
                .
            </p>

            <form action={randomAction}>
                <Button>
                    click
                </Button>
            </form>
        </div>
    );
};

export default DocsPage;
