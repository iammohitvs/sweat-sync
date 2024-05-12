// @ts-nocheck

import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { deleteSession } from "@/app/actions";

type sessionCardProps = {
    session:
        | {
              id: number;
              created_at: string;
              exercises: any;
              workout_id: string;
              workout_name: string;
              user_id: string;
          }
        | any[];

    withDelete: boolean;
};

const SessionCard = ({ session, withDelete }: sessionCardProps) => {
    const sessionDetailsArray = Object.entries(session.exercises);

    return (
        <Card className="h-min max-w-[600px]">
            <CardHeader>
                <CardTitle>{session.workout_name}</CardTitle>
            </CardHeader>
            <CardContent>
                {sessionDetailsArray.map(([exerciseName, values], index) => (
                    <div key={index} className="mt-2 mb-4">
                        <p className="font-semibold underline">
                            {exerciseName}
                        </p>
                        {values.map(([weight, reps], index) => (
                            <div
                                key={index}
                                className="grid grid-cols-2 gap-3 mb-3"
                            >
                                <p className="col-span-1">Set {index + 1}</p>
                                <div className="col-span-1">
                                    <p>Weight: {weight}</p>
                                    <p>Reps: {reps}</p>
                                </div>
                            </div>
                        ))}
                        {index === sessionDetailsArray.length - 1 ? null : (
                            <Separator />
                        )}
                    </div>
                ))}
            </CardContent>
            <Dialog>
                <CardFooter className="flex flex-col justify-between items-start gap-5">
                    <p className="text-primary">
                        {session.created_at.slice(0, 10)}
                    </p>
                    {withDelete && (
                        <DialogTrigger asChild>
                            <Button variant="secondary">
                                <Trash2 size={20} color="red" />
                            </Button>
                        </DialogTrigger>
                    )}
                </CardFooter>
                <DialogContent>
                    <DialogHeader>
                        <DialogHeader>
                            <DialogTitle>
                                Are you sure you want to delete this session
                            </DialogTitle>
                            <DialogDescription>
                                You cannot reverse this decision
                            </DialogDescription>
                        </DialogHeader>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose>
                            <form action={deleteSession}>
                                <input
                                    type="hidden"
                                    name="session-id"
                                    value={session.id}
                                />
                                <Button type="submit" variant="destructive">
                                    Confirm
                                </Button>
                            </form>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default SessionCard;
