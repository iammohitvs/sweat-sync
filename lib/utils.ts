import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function range(
    start: number,
    end?: number | undefined,
    step: number = 1
) {
    let arr = [];

    if (!end) {
        end = start;
        start = 0;
    }

    for (let i = start; i < end; i = i + step) {
        arr.push(i);
    }

    return arr;
}
