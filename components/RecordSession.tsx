import { supabase } from "@/lib/supabase";
import React from "react";

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
    return <div></div>;
};

const RecordSession = async ({ wid }: { wid: string }) => {
    if (wid === "") {
        return <div>No data here</div>;
    }

    const workoutData = await getSpeceficWorkout(wid);
    const exercises = Object.entries(workoutData.exercises);

    return (
        <div className="mt-8 px-7">
            <h2 className="text-2xl font-semibold">{workoutData.name}</h2>
            <h4 className="text-xl font-light">{workoutData.description || null}</h4>
            {exercises.map((exer: any[]) => (
                <p key={exer[0]}>
                    {exer[0]} {exer[1]}
                </p>
            ))}
        </div>
    );
};

export default RecordSession;
