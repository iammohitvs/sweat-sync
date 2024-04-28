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

type WorkoutCardProps = {
    cardTitle: string;
    cardDescription?: string;
    exercises: Object;
};

const Workoutcard = ({
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
            <CardFooter className="flex flex-row justify-between">
                <Button variant="secondary">
                    <Trash2 size={20} color="red" />
                </Button>
                <Button>
                    <SquarePen size={20} />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Workoutcard;
