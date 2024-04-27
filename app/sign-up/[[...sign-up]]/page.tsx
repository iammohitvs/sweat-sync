import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return (
        <div className="mx-auto mt-10 w-fit">
            <SignUp path="/sign-up" />
        </div>
    );
};

export default SignUpPage;
