"use server";

import { supabase } from "@/lib/supabase";
import { range } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addSession(formData: FormData) {
    const wid = formData.get("wid");

    const { data: retreivalData, error: RetreivalError } = await supabase
        .from("workouts")
        .select("exercises")
        .eq("id", wid);

    if (RetreivalError)
        throw new Error("Something went wrong gettin the exercise data");

    const exercises = Object.entries(retreivalData[0].exercises);

    let sessionDetails: any[] = [];

    exercises.map(([exercise, totalSets], _) => {
        range(1, Number(totalSets) + 1).map((value) => {
            sessionDetails = [
                ...sessionDetails,
                [
                    exercise,
                    [
                        Number(formData.get(`${exercise}-${value}-weight`)),
                        Number(formData.get(`${exercise}-${value}-reps`)),
                    ],
                ],
            ];
        });
    });

    const { data: insertionData, error: insertionError } = await supabase
        .from("sessions")
        .insert({
            exercises: sessionDetails,
            workout_id: wid,
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

    console.log(data);

    return revalidatePath("/workouts");
}

/* export async function addData(formData: FormData) {
    const user = await currentUser();

    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("id", "23b3101e-8e7a-4121-aaed-f4ad81e961d8");

    if (error) {
        console.log(error);
        throw new Error("something went wrong");
    }

    const finalData = Object.entries(data[0].exercises).map(
        ([weight, reps]) => {
            console.log(weight, reps);
        }
    );

    console.log(data);
    return;
} */
