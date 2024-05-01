import Workoutcard from "@/components/Workoutcard";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { supabase } from "@/lib/supabase";

const getAllWorkouts = async () => {
    const user = await currentUser();
    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user?.id);

    if (error)
        throw new Error(
            "Something went wrong. Couldnt retreive your workouts."
        );

    return data;
};

const WorkoutsPage = async () => {
    const data = await getAllWorkouts();

    if (!data.length) return (
        <h1 className="my-10 mx-auto text-2xl text-primary">
            No Workouts Found. Go ahead and{" "}
            <Link href="/create" className="underline">create one</Link>.
        </h1>
    );

    return (
        <section id="workouts-section">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-semibold">Your Workouts</h1>
                <Button asChild className="hover:cursor-pointer">
                    <Link href="/create">
                        <PlusCircle size={24} className="mr-2" />
                        Create Workout
                    </Link>
                </Button>
            </div>
            <div className="mt-10 grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {data.map((workout) => (
                    <Workoutcard
                        key={workout.id}
                        cardTitle={workout.name}
                        exercises={workout.exercises}
                        cardDescription={workout.description || null}
                    />
                ))}
            </div>
        </section>
    );
};

export default WorkoutsPage;
