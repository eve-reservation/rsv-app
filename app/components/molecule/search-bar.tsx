import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useNavigate } from "react-router";

export function SearchBar() {
	const navigate = useNavigate();
	const [location, setLocation] = useState("");
	const [checkIn, setCheckIn] = useState<Date>();
	const [checkOut, setCheckOut] = useState<Date>();
	const [guests, setGuests] = useState(1);
	const [activeField, setActiveField] = useState<string | null>(null);

	const handleSearch = () => {
		const params = new URLSearchParams();
		if (location) params.set("location", location);
		if (checkIn) params.set("checkIn", checkIn.toISOString());
		if (checkOut) params.set("checkOut", checkOut.toISOString());
		if (guests) params.set("guests", guests.toString());
		navigate(`/?${params.toString()}`);
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="bg-card rounded-full border border-border shadow-lg hover:shadow-xl transition-shadow">
				<div className="flex flex-col md:flex-row items-stretch md:items-center">
					{/* Location */}
					<div
						className={`flex-1 px-6 py-5 cursor-pointer rounded-full transition-colors ${activeField === "location" ? "bg-secondary" : "hover:bg-secondary/50"}`}
						onClick={() => setActiveField("location")}>
						<label className="block text-xs font-semibold text-foreground">Where</label>
						<input
							type="text"
							placeholder="Search destinations"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							className="w-full bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground/60 focus:outline-none"
						/>
					</div>

					<div className="hidden md:block w-px h-8 bg-border" />

					{/* Check In */}
					<Popover>
						<PopoverTrigger asChild>
							<div
								className={`flex-1 px-6 py-4 cursor-pointer rounded-full transition-colors ${activeField === "checkin" ? "bg-secondary" : "hover:bg-secondary/50"}`}
								onClick={() => setActiveField("checkin")}>
								<label className="block text-xs font-semibold text-foreground">
									Check in
								</label>
								<span className="text-sm text-muted-foreground">
									{checkIn ? format(checkIn, "MMM d") : "Add dates"}
								</span>
							</div>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<CalendarComponent
								mode="single"
								selected={checkIn}
								onSelect={setCheckIn}
								disabled={(date) => date < new Date()}
							/>
						</PopoverContent>
					</Popover>

					<div className="hidden md:block w-px h-8 bg-border" />

					{/* Check Out */}
					<Popover>
						<PopoverTrigger asChild>
							<div
								className={`flex-1 px-6 py-4 cursor-pointer rounded-full transition-colors ${activeField === "checkout" ? "bg-secondary" : "hover:bg-secondary/50"}`}
								onClick={() => setActiveField("checkout")}>
								<label className="block text-xs font-semibold text-foreground">
									Check out
								</label>
								<span className="text-sm text-muted-foreground">
									{checkOut ? format(checkOut, "MMM d") : "Add dates"}
								</span>
							</div>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<CalendarComponent
								mode="single"
								selected={checkOut}
								onSelect={setCheckOut}
								disabled={(date) => date < (checkIn || new Date())}
							/>
						</PopoverContent>
					</Popover>

					<div className="hidden md:block w-px h-8 bg-border" />

					{/* Guests */}
					<Popover>
						<PopoverTrigger asChild>
							<div
								className={`flex-1 px-6 py-4 cursor-pointer rounded-full transition-colors flex items-center justify-between ${activeField === "guests" ? "bg-secondary" : "hover:bg-secondary/50"}`}
								onClick={() => setActiveField("guests")}>
								<div>
									<label className="block text-xs font-semibold text-foreground">
										Who
									</label>
									<span className="text-sm text-muted-foreground">
										{guests === 1 ? "1 guest" : `${guests} guests`}
									</span>
								</div>
								<Button
									onClick={(e) => {
										e.stopPropagation();
										handleSearch();
									}}
									className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 w-12 p-0">
									<Search className="h-4 w-4" />
								</Button>
							</div>
						</PopoverTrigger>
						<PopoverContent className="w-64" align="end">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Guests</p>
									<p className="text-sm text-muted-foreground">
										How many people?
									</p>
								</div>
								<div className="flex items-center gap-3">
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8 rounded-full bg-transparent"
										onClick={() => setGuests(Math.max(1, guests - 1))}>
										-
									</Button>
									<span className="w-6 text-center font-medium">{guests}</span>
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8 rounded-full bg-transparent"
										onClick={() => setGuests(guests + 1)}>
										+
									</Button>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
}
