import React from "react";
import { Input } from "./ui/input";
import { range } from "@/lib/utils";

const InputBox = ({ exercise }: { exercise: any[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <h4 className="text-xl font-semibold col-span-1 md:col-span-2 lg:col-span-3">
                {exercise[0]}
            </h4>
            {range(1, Number(exercise[1]) + 1).map((value) => (
                <div key={value} className="flex flex-col gap-4">
                    <p className="text-lg">Set {value}</p>
                    <Input
                        type="number"
                        placeholder="weight"
                        name={`${exercise[0]}-${value}-weight`}
                        min={0}
                        step={0.1}
                    />
                    <Input
                        type="number"
                        placeholder="reps"
                        name={`${exercise[0]}-${value}-reps`}
                        min={0}
                        step={1}
                    />
                </div>
            ))}
        </div>
    );
};

export default InputBox;
