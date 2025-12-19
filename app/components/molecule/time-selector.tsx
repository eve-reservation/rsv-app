import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { format, setHours, setMinutes, getHours, getMinutes } from "date-fns";
import { Label } from "@/components/ui/label";

interface TimeSelectorProps {
	initialStart?: Date;
	initialEnd?: Date;
	onChange?: (start: Date, end: Date) => void;
	minuteInterval?: 1 | 5 | 10 | 15 | 30; // Added support for common intervals
	className?: string;
}

interface TimeState {
	hour: number;
	minute: number;
	period: "AM" | "PM";
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const PERIODS = ["AM", "PM"];

export default function TimeSelector({
	initialStart,
	initialEnd,
	onChange,
	minuteInterval = 15,
	className,
}: TimeSelectorProps) {
	// Generate minutes based on interval
	const MINUTES = Array.from({ length: 60 / minuteInterval }, (_, i) => i * minuteInterval);

	const parseTime = (date?: Date): TimeState => {
		if (!date) return { hour: 9, minute: 0, period: "AM" };
		let h = getHours(date);
		const m = getMinutes(date);
		const p = h >= 12 ? "PM" : "AM";
		if (h > 12) h -= 12;
		if (h === 0) h = 12;
		return { hour: h, minute: m, period: p };
	};

	const [startTime, setStartTime] = useState<TimeState>(parseTime(initialStart));
	const [endTime, setEndTime] = useState<TimeState>(parseTime(initialEnd));

	// Update internal state when props change
	useEffect(() => {
		if (initialStart) setStartTime(parseTime(initialStart));
		if (initialEnd) setEndTime(parseTime(initialEnd));
	}, [initialStart, initialEnd]);

	const updateParent = (start: TimeState, end: TimeState) => {
		if (!onChange) return;

		const now = new Date();
		let startH = start.hour;
		if (start.period === "PM" && startH !== 12) startH += 12;
		if (start.period === "AM" && startH === 12) startH = 0;

		const startDate = setMinutes(setHours(now, startH), start.minute);

		let endH = end.hour;
		if (end.period === "PM" && endH !== 12) endH += 12;
		if (end.period === "AM" && endH === 12) endH = 0;

		const endDate = setMinutes(setHours(now, endH), end.minute);

		onChange(startDate, endDate);
	};

	const handleStartChange = (updated: Partial<TimeState>) => {
		const newStart = { ...startTime, ...updated };
		setStartTime(newStart);
		updateParent(newStart, endTime);
	};

	const handleEndChange = (updated: Partial<TimeState>) => {
		const newEnd = { ...endTime, ...updated };
		setEndTime(newEnd);
		updateParent(startTime, newEnd);
	};

	return (
		<div className={cn("grid grid-cols-2 gap-6 p-4", className)}>
			<div className="flex flex-col gap-4">
				<Label className="text-center font-medium text-muted-foreground uppercase text-xs tracking-wider">
					Start Time
				</Label>
				<TimePicker value={startTime} onChange={handleStartChange} minutes={MINUTES} />
			</div>

			<div className="flex flex-col gap-4">
				<Label className="text-center font-medium text-muted-foreground uppercase text-xs tracking-wider">
					End Time
				</Label>
				<TimePicker value={endTime} onChange={handleEndChange} minutes={MINUTES} />
			</div>
		</div>
	);
}

interface TimePickerProps {
	value: TimeState;
	onChange: (value: Partial<TimeState>) => void;
	minutes: number[];
}

function TimePicker({ value, onChange, minutes }: TimePickerProps) {
	return (
		<div className="flex h-40 overflow-hidden relative rounded-md bg-muted/20 border border-border/50">
			{/* Selection Highlight - Positioned absolutely to create the 'selected' bar */}
			<div className="absolute top-1/2 left-2 right-2 -translate-y-1/2 h-10 rounded-md bg-background border border-border shadow-xs pointer-events-none z-0" />

			<ScrollColumn
				items={HOURS}
				selectedValue={value.hour}
				onSelect={(v) => onChange({ hour: v as number })}
				label="Hour"
			/>
			<ScrollColumn
				items={minutes}
				selectedValue={value.minute}
				onSelect={(v) => onChange({ minute: v as number })}
				format={(v) => v.toString().padStart(2, "0")}
				label="Min"
			/>
			<ScrollColumn
				items={PERIODS}
				selectedValue={value.period}
				onSelect={(v) => onChange({ period: v as "AM" | "PM" })}
				label="Check"
			/>
		</div>
	);
}

interface ScrollColumnProps {
	items: (number | string)[];
	selectedValue: number | string;
	onSelect: (value: number | string) => void;
	format?: (value: number | string) => string;
	label?: string;
}

function ScrollColumn({ items, selectedValue, onSelect, format, label }: ScrollColumnProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isScrolling, setIsScrolling] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Scroll to selected value on mount or when value changes externally (not by scrolling)
	useEffect(() => {
		if (isScrolling || !containerRef.current) return;

		const index = items.indexOf(selectedValue as any);
		if (index !== -1) {
			containerRef.current.scrollTop = index * 40; // 40px is h-10
		}
	}, [selectedValue, items, isScrolling]);

	const handleScroll = () => {
		if (!containerRef.current) return;
		setIsScrolling(true);

		// Clear existing timeout
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		// Set a timeout to detect scroll end
		timeoutRef.current = setTimeout(() => {
			if (!containerRef.current) return;

			const scrollTop = containerRef.current.scrollTop;
			const index = Math.round(scrollTop / 40);
			const clampedIndex = Math.max(0, Math.min(index, items.length - 1));

			const newValue = items[clampedIndex];
			if (newValue !== selectedValue) {
				onSelect(newValue as any);
			}
			setIsScrolling(false);
		}, 100); // 100ms debounce
	};

	return (
		<div
			ref={containerRef}
			className="flex-1 overflow-y-auto snap-y snap-mandatory no-scrollbar text-center z-10 py-[60px]"
			onScroll={handleScroll}>
			<style>{`
				.no-scrollbar::-webkit-scrollbar { display: none; }
				.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
			`}</style>
			{items.map((item) => (
				<div
					key={item}
					onClick={() => {
						onSelect(item);
						setIsScrolling(false); // Immediate update, not scrolling
					}}
					className={cn(
						"h-10 flex items-center justify-center snap-center cursor-pointer transition-colors text-sm",
						item === selectedValue
							? "font-bold text-foreground scale-110"
							: "text-muted-foreground/50 hover:text-muted-foreground",
					)}>
					{format ? format(item) : item}
				</div>
			))}
		</div>
	);
}
