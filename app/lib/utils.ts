import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatEnum(value: string | null | undefined): string {
	if (!value) return "";
	return value
		.toLowerCase()
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export const RATE_UNIT_MAP: Record<string, string> = {
	HOURLY: "hour",
	DAILY: "day",
	WEEKLY: "week",
	MONTHLY: "month",
};
