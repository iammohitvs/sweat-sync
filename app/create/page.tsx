"use client";

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { createWorkout } from "../actions";

const CreateWorkoutPage = () => {
    const [exercises, setExercises] = useState<string[]>([crypto.randomUUID()]);

    return (
        <section id="create-workout-section">
            <h1 className="text-3xl font-semibold">Start building a workout</h1>
            <h4 className="text-xl font-light mt-3">
                Write down some exercise names with the number of sets per
                exercise.
            </h4>

            <Separator className="mt-5" />
 
            <form action={createWorkout} className="max-w-[800px] mt-7 flex flex-col gap-5">
                <Label htmlFor="workout-name" className="text-xl">
                    Name your workout *
                </Label>
                <Input
                    type="text"
                    name="name"
                    id="workout-name"
                    required
                />

                <Label htmlFor="workout-description" className="text-xl">
                    Give your workout a description
                </Label>
                <Textarea name="description" id="workout-name" />

                <h4 className="text-xl font-semibold">Go ahead and start adding exercises</h4>
                <input type="hidden" name="numberOfExercises" value={exercises.length} />

                {exercises.map((exercise, index) => (
                    <div
                        key={exercise}
                        className="flex flex-col md:flex-row gap-3"
                    >
                        <Input
                            type="text"
                            name={`exercise-${index}`}
                            placeholder="Exercise Name *"
                            required
                        />
                        <Input
                            type="number"
                            name={`sets-${index}`}
                            placeholder="No. of sets *"
                            required
                        />
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setExercises((exercises) =>
                                    exercises.filter(
                                        (exerciseName) =>
                                            exerciseName !== exercise
                                    )
                                );
                            }}
                            disabled={exercises.length === 1}
                        >
                            <Trash2 color="red" size={15} />
                        </Button>
                    </div>
                ))}
                <div className="flex flex-col md:flex-row justify-between gap-3">
                    <Button
                    type="button"
                        variant="secondary"
                        onClick={() => {
                            setExercises((exercises) => [
                                ...exercises,
                                crypto.randomUUID(),
                            ]);
                        }}
                    >
                        <Plus size={15} />
                    </Button>
                    <SubmitButton
                        toastDetails={{
                            title: "Workout Added",
                            description:
                                "View all your workouts in the workouts page",
                        }}
                    >
                        Submit
                    </SubmitButton>
                </div>
            </form>
        </section>
    );
};

export default CreateWorkoutPage;
