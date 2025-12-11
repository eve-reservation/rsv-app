import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
	format,
	addMinutes,
	startOfDay,
	setHours,
	setMinutes,
	isSameMinute,
	isBefore,
	isAfter,
} from "date-fns";
import { Check } from "lucide-react";

interface TimeSelectorProps {
	initialStart?: Date;
	initialEnd?: Date;
	onChange?: (start: Date, end: Date) => void;
	className?: string;
}

export default function TimeSelector({
	initialStart,
	initialEnd,
	onChange,
	className,
}: TimeSelectorProps) {
	const [selectedStart, setSelectedStart] = useState<Date | undefined>(initialStart);
	const [selectedEnd, setSelectedEnd] = useState<Date | undefined>(initialEnd);

	// Generate time slots from 8:00 AM to 10:00 PM
	const timeSlots = [];
	const baseDate = new Date(); // Use today as base for time generation
	let currentTime = setMinutes(setHours(baseDate, 8), 0); // 8:00 AM
	const endTime = setMinutes(setHours(baseDate, 22), 0); // 10:00 PM

	while (currentTime <= endTime) {
		timeSlots.push(currentTime);
		currentTime = addMinutes(currentTime, 15);
	}

	const handleTimeClick = (time: Date) => {
		let newStart = selectedStart;
		let newEnd = selectedEnd;

		if (!newStart || (newStart && newEnd)) {
			// Start new selection
			newStart = time;
			newEnd = undefined;
		} else if (newStart && !newEnd) {
			// Completing selection
			if (isBefore(time, newStart)) {
				// Clicked before start, make it new start
				newStart = time;
			} else {
				// Valid end time
				newEnd = time;
			}
		}

		setSelectedStart(newStart);
		setSelectedEnd(newEnd);

		if (newStart && newEnd && onChange) {
			// Sort just in case, though logic handles it
			const finalStart = isBefore(newStart, newEnd) ? newStart : newEnd;
			const finalEnd = isAfter(newEnd, newStart) ? newEnd : newStart;
			onChange(finalStart, finalEnd);
		}
	};

	const isSelected = (time: Date) => {
		if (selectedStart && isSameMinute(time, selectedStart)) return true;
		if (selectedEnd && isSameMinute(time, selectedEnd)) return true;
		if (
			selectedStart &&
			selectedEnd &&
			isAfter(time, selectedStart) &&
			isBefore(time, selectedEnd)
		)
			return true;
		return false;
	};

	const isStart = (time: Date) => selectedStart && isSameMinute(time, selectedStart);
	const isEnd = (time: Date) => selectedEnd && isSameMinute(time, selectedEnd);
	const isInRange = (time: Date) =>
		selectedStart && selectedEnd && isAfter(time, selectedStart) && isBefore(time, selectedEnd);

	return (
		<div className={cn("grid grid-cols-4 gap-2 pr-2", className)}>
			{timeSlots.map((time, index) => {
				const selected = isSelected(time);
				const start = isStart(time);
				const end = isEnd(time);
				const inRange = isInRange(time);

				return (
					<button
						key={index}
						onClick={() => handleTimeClick(time)}
						className={cn(
							"rounded-md border p-2 text-xs font-medium transition-all hover:bg-muted focus:outline-hidden",
							inRange && "bg-primary/10 border-primary/20",
							selected && "border-primary bg-primary/5 text-primary",
							(start || end) &&
								"bg-primary text-primary-foreground hover:bg-primary/90",
						)}>
						{format(time, "h:mm a")}
					</button>
				);
			})}
		</div>
	);
}
