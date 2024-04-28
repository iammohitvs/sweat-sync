"use server";

import { supabase } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

export async function addData(formData: FormData) {
    const user = await currentUser();

    const { data, error } = await supabase
        .from("workouts")
        .insert([
            {
                name: "crazy workout workout",
                description: "some random description",
                created_at: new Date().toISOString().toLocaleString(),
                exercises: {
                    dogPress: 33,
                    catCurl: 99,
                    ejjkx2: 78,
                    "fejnkwnfkjew": 4,
                    "rhi32h": 3490,
                },
                user_id: user?.id,
            },
        ])
        .select();

   /*  const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user?.id);

    if (error) {
        console.log(error);
        throw new Error("something went wrong");
    } */

    console.log(data);
    return;
}
