import React from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { updateWorkout } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

const getworkoutInfo = async (wid: string) => {
    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("id", wid);

    if (error)
        throw new Error(
            "There was an error fetching your workout information."
        );

    return data[0];
};

const EditWorkoutPage = async ({
    params: { wid },
}: {
    params: { wid: string };
}) => {
    const exerciseData = await getworkoutInfo(wid);
    const numberOfExercises = Object.entries(exerciseData.exercises).length;

    return (
        <section id="edit-workout-section" className="max-w-[1000px]">
            <h1 className="text-3xl font-semibold">Update your wokrout here.</h1>
            <h4 className="text-xl font-light">Update only the fields you want, the rest will remain same if not updated.</h4>
            <form action={updateWorkout} className="flex flex-col gap-5 justify-center max-w-[700px]">
                <Input type="hidden" name="wid" value={wid} />
                <div>
                    <h4 className="text-xl">{exerciseData.name}</h4>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Updated name of workout"
                    />
                    <Input
                        type="hidden"
                        name={`name-default`}
                        value={exerciseData.name}
                    />
                </div>

                <div>
                    <h5 className="text-xl">{exerciseData.description}</h5>
                    <Input
                        type="text"
                        name="description"
                        placeholder="Updated workout description"
                    />
                    <Input
                        type="hidden"
                        name={`description-default`}
                        value={exerciseData.description}
                    />
                </div>

                <Input
                    type="hidden"
                    name="numberOfExercises"
                    value={numberOfExercises}
                />

                {Object.entries(exerciseData.exercises).map(
                    ([exercise, numberOfSets], index) => (
                        <div key={exercise}>
                            <p>
                                {index + 1}. {exercise}
                            </p>
                            <Input
                                type="string"
                                name={`name-${index}`}
                                placeholder="Updated name"
                            />
                            <Input
                                type="hidden"
                                name={`name-default-${index}`}
                                value={exercise}
                            />
                            <Input
                                type="hidden"
                                name={`set-${index}`}
                                value={Number(numberOfSets)}
                            />
                        </div>
                    )
                )}

                <SubmitButton
                    toastDetails={{
                        title: "Workout Updated",
                        description:
                            "You can view your updated workout in the workouts tab",
                    }}
                >
                    Update
                </SubmitButton>
            </form>
        </section>
    );
};

export default EditWorkoutPage;
