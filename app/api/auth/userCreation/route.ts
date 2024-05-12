import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { PushWorkout, PullWorkout, LegsWorkout } from "@/lib/constants";

export async function GET(request: Request) {
    const user = await currentUser();

    if (!user || user === null || !user.id) {
        throw new Error("Something went wrong");
    }

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id);

    if (error) {
        throw new Error("Couldn't verify users existence in database");
    }

    if (!data?.length) {
        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    id: user?.id,
                    created_at: new Date().toISOString().toLocaleString(),
                    first_name: user?.firstName,
                    last_name: user?.lastName,
                    username: user?.username,
                },
            ])
            .select();

        if (error) {
            throw new Error("Couldn't add user to database");
        }
    }

    if (!data?.length) {
        const { data, error } = await supabase
            .from("workouts")
            .insert([
                {
                    ...PushWorkout,
                    user_id: user?.id,
                },
                {
                    ...PullWorkout,
                    user_id: user?.id,
                },
                {
                    ...LegsWorkout,
                    user_id: user?.id,
                },
            ])
            .select();

        if (error)
            throw new Error(
                "Something went wrong trying to add the 3 default workouts"
            );
    }

    return NextResponse.redirect(new URL("/docs", request.url));
}
