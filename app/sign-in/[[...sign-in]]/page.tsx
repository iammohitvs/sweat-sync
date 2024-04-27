import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignINPage = () => {
    return (
        <div className="mx-auto mt-10 w-fit">
            <SignIn path="/sign-in" />;
        </div>
    );
};

export default SignINPage;
