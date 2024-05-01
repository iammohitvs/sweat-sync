import ComboBox from "@/components/ComboBox";
import RecordSession from "@/components/RecordSession";
import { supabase } from "@/lib/supabase";
import React from "react";

const getWorkouts = async () => {
    const { data, error } = await supabase.from("workouts").select("id, name");

    if (error) throw new Error("Problems while getting workout names");
    return data;
};

const NewSessionLayout = async ({
    searchParams,
}: {
    searchParams: { wid: string };
}) => {
    const workouts = await getWorkouts();

    if (!workouts.length) return <p>No workouts found to record session</p>;

    return (
        <section id="record-a-session">
            <h1 className="text-3xl font-semibold">
                Go ahead and start recording your workout
            </h1>
            <h4 className="text-xl font-light mt-3 mb-6">
                Choose a model workout from the ones you`ve built and record
                your reps per set.
            </h4>
            <div>
                <ComboBox workoutNames={workouts} />
                <RecordSession wid={searchParams.wid || ""} />
            </div>
        </section>
    );
};

export default NewSessionLayout;
