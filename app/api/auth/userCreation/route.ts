import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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
        throw new Error("Failed at stage 1");
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
            throw new Error("Failed at stage 2");
        }
    }

    return NextResponse.redirect(new URL("/", request.url));
}
