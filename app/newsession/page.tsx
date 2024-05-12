import ComboBox from "@/components/ComboBox";
import RecordSession from "@/components/RecordSession";
import { supabase } from "@/lib/supabase";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import SessionCard from "@/components/SessionCard";
import { currentUser } from "@clerk/nextjs/server";

const getWorkouts = async () => {
    const user = await currentUser();
    
    noStore();

    const { data, error } = await supabase.from("workouts").select("id, name").eq("user_id", user?.id);

    if (error) throw new Error("Problems while getting workout names");
    return data;
};

const getLatestWorkoutSession = async (wid: string) => {
    noStore();

    if (wid === "") return null;

    const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("workout_id", wid);

    if (error)
        throw new Error(
            "Promlem while fetching you latest session with the same workout"
        );

    if (!data.length || data === null) return null;

    return data.reverse()[0];
};

const NewSessionLayout = async ({
    searchParams,
}: {
    searchParams: { wid: string };
}) => {
    const workouts = await getWorkouts();
    const lastSessionData = await getLatestWorkoutSession(searchParams.wid || "");

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
                {lastSessionData !== null && (
                    <div className="md:px-7 mt-5">
                        <h4 className="font-light text-xl my-2">
                            Your latest session of the same workout plan for
                            reference:
                        </h4>
                        <SessionCard session={lastSessionData} withDelete={false}/>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewSessionLayout;
