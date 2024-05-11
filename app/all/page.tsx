import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import SessionCard from "@/components/SessionCard";
import { unstable_noStore as noStore } from "next/cache";

const getAllSessions = async () => {
    noStore();
    
    const user = await currentUser();

    const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("user_id", user?.id);

    if (error)
        throw new Error(
            "Something went wrond trying to retreive all the users sessions"
        );

    return data;
};

const SessionsPage = async () => {
    const sessionsData = await getAllSessions();

    return (
        <section id="workout-sessions">
            <h1 className="text-3xl font-semibold">All your sessions</h1>
            <div className="mt-10 grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {sessionsData.map((session) => (
                    <SessionCard session={session} key={session.id} />
                ))}
            </div>
        </section>
    );
};

export default SessionsPage;
