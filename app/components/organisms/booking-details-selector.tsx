import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TimeSelector from "@/components/molecule/time-selector";
import { format } from "date-fns";

interface BookingDetailsSelectorProps {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	startTime: Date | undefined;
	endTime: Date | undefined;
	onTimeChange: (start: Date, end: Date) => void;
	guests: number;
	setGuests: (guests: number) => void;
	maxGuests: number;
	guestLabel?: string;
	minuteInterval?: 1 | 5 | 10 | 15 | 30;
	className?: string; // Allow custom styling wrapper/overrides if needed
	readOnly?: boolean;
}

export function BookingDetailsSelector({
	date,
	setDate,
	startTime,
	endTime,
	onTimeChange,
	guests,
	setGuests,
	maxGuests,
	guestLabel = "Guests",
	minuteInterval = 15,
	className,
	readOnly = false,
}: BookingDetailsSelectorProps) {
	return (
		<div className={`border border-border rounded-xl overflow-hidden ${className || ""}`}>
			<div className="grid grid-cols-2 divide-x divide-border">
				{readOnly ? (
					<div className="p-3">
						<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
							Date
						</label>
						<span className="text-sm text-foreground">
							{date ? format(date, "MM/dd/yyyy") : "Select Date"}
						</span>
					</div>
				) : (
					<Popover>
						<PopoverTrigger asChild>
							<div className="p-3 hover:bg-gray-100 cursor-pointer">
								<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
									Date
								</label>
								<span className="text-sm text-foreground">
									{date ? format(date, "MM/dd/yyyy") : "Select Date"}
								</span>
							</div>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				)}
				{readOnly ? (
					<div className="p-3">
						<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
							Time
						</label>
						<span className="text-sm text-foreground">
							{startTime && endTime
								? `${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}`
								: "Select Time"}
						</span>
					</div>
				) : (
					<Popover>
						<PopoverTrigger asChild>
							<div className="p-3 hover:bg-gray-100 cursor-pointer">
								<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
									Time
								</label>
								<span className="text-sm text-foreground">
									{startTime && endTime
										? `${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}`
										: "Select Time"}
								</span>
							</div>
						</PopoverTrigger>
						<PopoverContent className="w-[360px] p-0" align="end">
							<TimeSelector
								initialStart={startTime}
								initialEnd={endTime}
								onChange={onTimeChange}
								minuteInterval={minuteInterval}
							/>
						</PopoverContent>
					</Popover>
				)}
			</div>
			<div className="border-t border-border p-3">
				<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
					{guestLabel}
				</label>
				<div className="flex items-center justify-between">
					<span className="text-sm text-foreground">
						{guests}{" "}
						{guests === 1
							? guestLabel.toLowerCase().slice(0, -1)
							: guestLabel.toLowerCase()}
					</span>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-7 w-7 rounded-full bg-transparent"
							onClick={() => setGuests(Math.max(1, guests - 1))}>
							-
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-7 w-7 rounded-full bg-transparent"
							onClick={() => setGuests(Math.min(maxGuests, guests + 1))}>
							+
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
