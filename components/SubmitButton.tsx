"use client";

import React from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

const SubmitButton = ({
    children,
    toastDetails,
    ...delegated
}: {
    children: React.ReactNode;
    toastDetails: { title: string; description: string };
}) => {
    const { toast } = useToast();
    return (
        <Button
            onClick={() => {
                toast(toastDetails);
            }}
            {...delegated}
        >
            {children}
        </Button>
    );
};

export default SubmitButton;
