import { supabase } from "@/lib/supabase";
import React from "react";

const getSpeceficWorkout = async (wid: string) => {
    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("id", wid);

    if (error)
        throw new Error("Somethuing went wrong fetching a specefic workout");
    return data;
};

const RecordSession = async ({ wid }: { wid: string }) => {
    if (wid === "") {
        return <div>No data here</div>;
    }

    const data = await getSpeceficWorkout(wid);

    return <div>{data[0].description}</div>;
};

export default RecordSession;
