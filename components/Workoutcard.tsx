import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
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
import { deleteWorkout } from "@/app/actions";
import Link from "next/link";

type WorkoutCardProps = {
    wid: string;
    cardTitle: string;
    cardDescription?: string;
    exercises: Object;
};

const Workoutcard = ({
    wid,
    cardTitle,
    cardDescription,
    exercises,
}: WorkoutCardProps) => {
    const exercisesArray = Object.entries(exercises);

    return (
        <Card className="h-min">
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="grid grid-cols-2">
                            <TableHead className="cols-span-1">
                                Exercise
                            </TableHead>
                            <TableHead className="cols-span-1 text-right">
                                Sets
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exercisesArray.map((exercise, index) => (
                            <TableRow key={index} className="grid grid-cols-2">
                                <TableCell className="cols-span-1">
                                    {exercise[0]}
                                </TableCell>
                                <TableCell className="cols-span-1 text-right">
                                    {exercise[1]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <Dialog>
                <CardFooter className="flex flex-row justify-between">
                    <DialogTrigger asChild>
                        <Button variant="secondary">
                            <Trash2 size={20} color="red" />
                        </Button>
                    </DialogTrigger>
                    <Button asChild>
                        <Link href="/edit">
                            <SquarePen size={20} />
                        </Link>
                    </Button>
                </CardFooter>
                <DialogContent>
                    <DialogHeader>
                        <DialogHeader>
                            <DialogTitle>
                                Are you sure you want to delete this workout
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
                            <form action={deleteWorkout}>
                                <input type="hidden" name="wid" value={wid} />
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

export default Workoutcard;
