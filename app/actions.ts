"use server";

import { supabase } from "@/lib/supabase";
import { range } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addSession(formData: FormData) {
    const user = await currentUser();

    const wid = formData.get("wid");
    const workoutName = formData.get("workoutName");

    const { data: retreivalData, error: RetreivalError } = await supabase
        .from("workouts")
        .select("exercises")
        .eq("id", wid);

    if (RetreivalError)
        throw new Error("Something went wrong getting the exercise data");

    const exercises = Object.entries(retreivalData[0].exercises);

    let sessionDetails: [string, any[]][] = [];

    /* 
        [
            [exerName, [[1, 12], [2, 12], [3, 12],]],
        ]

        Object.fromEntries the above array.
    */

    exercises.map(([exercise, totalSets], _) => {
        let sessionValues: [number, number][] = [];

        range(1, Number(totalSets) + 1).map((value) => {
            sessionValues.push([
                Number(formData.get(`${exercise}-${value}-weight`)),
                Number(formData.get(`${exercise}-${value}-reps`)),
            ]);
        });

        sessionDetails.push([exercise, sessionValues]);
    });

    const { data: insertionData, error: insertionError } = await supabase
        .from("sessions")
        .insert({
            workout_name: workoutName,
            exercises: Object.fromEntries(sessionDetails),
            workout_id: wid,
            user_id: user?.id || null,
        })
        .select();

    if (insertionError)
        throw new Error("Something went wrong while adding a session");

    return redirect("/all");
}

export async function createWorkout(formData: FormData) {
    const user = await currentUser();

    const len = Number(formData.get("numberOfExercises"));

    const workoutName = formData.get("name") as string;
    const workoutDescription = formData.get("description") as string;

    const exerciseArray: any[][] = [];

    for (let i = 0; i < len; i = i + 1) {
        exerciseArray.push([
            formData.get(`exercise-${i}`),
            formData.get(`sets-${i}`),
        ]);
    }

    const { data, error } = await supabase
        .from("workouts")
        .insert([
            {
                name: workoutName,
                description: workoutDescription || null,
                exercises: Object.fromEntries(exerciseArray),
                user_id: user?.id,
            },
        ])
        .select();

    if (error)
        throw new Error("Something went wrong trying to add your workout");

    return redirect("/workouts");
}

export async function deleteWorkout(formData: FormData) {
    const wid = formData.get("wid");

    const { data, error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", wid)
        .select();

    if (error)
        throw new Error("A problem occured trying to delete your workout");

    return revalidatePath("/workouts");
}

export async function deleteSession(formData: FormData) {
    const sessionId = formData.get("session-id");

    const { data, error } = await supabase
        .from("sessions")
        .delete()
        .eq("id", sessionId)
        .select();

    if (error)
        throw new Error("A problem occured trying to delete your session");

    return revalidatePath("/all");
}
