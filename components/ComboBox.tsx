"use client";

import React, { useCallback } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ComboBox = ({
    workoutNames,
}: {
    workoutNames: {
        id: string;
        name: string;
    }[];
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const workouts = workoutNames;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between"
                >
                    {value
                        ? workouts.find((workout) => workout.name === value)
                              ?.name
                        : "Select workout..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Select workout..." />
                    <CommandList>
                        <CommandEmpty>No workout with this name.</CommandEmpty>
                        <CommandGroup>
                            {workouts.map((workout) => (
                                <CommandItem
                                    key={workout.name}
                                    value={workout.name}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue);
                                        router.push(
                                            `${pathname}?${createQueryString(
                                                "wid",
                                                workout.id
                                            )}`
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === workout.name
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {workout.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default ComboBox;
