import { supabase } from "@/lib/supabase";
import React, { Suspense } from "react";
import InputBox from "./InputBox";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { range } from "@/lib/utils";
import { addSession } from "@/app/actions";
import SubmitButton from "./SubmitButton";

const getSpeceficWorkout = async (wid: string) => {
    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("id", wid);

    if (error)
        throw new Error("Something went wrong fetching a specefic workout");
    return data[0];
};

const RecordSessionSkeleton = () => {
    return (
        <div>
            <Skeleton className="w-[300px] h-[40px]" />
            <div>
                <Skeleton className="w-[200px] h-[40px]" />
                {range(3).map((value) => (
                    <Skeleton key={value} className="w-[500px] h-[500px]" />
                ))}
            </div>
        </div>
    );
};

const RecordSessionMain = async ({ wid }: { wid: string }) => {
    if (wid === "") {
        return (
            <div className="mt-8 md:px-7 text-2xl">
                Choose a workout to start recording your session
            </div>
        );
    }

    const workoutData = await getSpeceficWorkout(wid);
    const exercises = Object.entries(workoutData.exercises);

    return (
        <div className="mt-8 md:px-7">
            <h2 className="text-2xl font-semibold underline">
                {workoutData.name}
            </h2>
            <h4 className="text-xl font-light mb-5">
                {workoutData.description || null}
            </h4>
            <form action={addSession}>
                <input type="hidden" value={wid} name="wid" />
                {exercises.map((exer: any[], index: number) => (
                    <>
                        <InputBox key={index} exercise={exer} />
                        {index !== exercises.length - 1 && (
                            <Separator className="mb-5" />
                        )}
                    </>
                ))}
                {/* TODO: clear button */}
                <Button variant="secondary">Clear</Button>
                <SubmitButton
                    toastDetails={{
                        title: "Session Deatils added",
                        description:
                            "Vivit the all sessions page to view you submitted workout session",
                    }}
                >
                    Submit
                </SubmitButton>
            </form>
        </div>
    );
};

const RecordSession = ({ wid }: { wid: string }) => {
    return (
        <Suspense fallback={<RecordSessionSkeleton />}>
            <RecordSessionMain wid={wid} />
        </Suspense>
    );
};

export default RecordSession;
