import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { cn } from "~/lib/utils";

export function SearchBar() {
	const navigate = useNavigate();
	const [location, setLocation] = useState("");
	const [when, setWhen] = useState<Date | undefined>(undefined);
	const [guests, setGuests] = useState(1);
	const [activeField, setActiveField] = useState<string | null>(null);

	const handleSearch = () => {
		const params = new URLSearchParams();
		if (location.trim()) params.set("location", location.trim());
		if (when) params.set("date", when.toISOString());
		if (guests > 1) params.set("guests", guests.toString());
		navigate(`/?${params.toString()}`);
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="bg-card rounded-lg border border-border shadow-lg hover:shadow-xl transition-shadow">
				<div className="flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-border">
					{/* Where */}
					<div
						className={`flex-1 px-6 py-5 cursor-pointer transition-colors ${
							activeField === "location" ? "bg-secondary" : "hover:bg-secondary/50"
						}`}
						onClick={() => setActiveField("location")}>
						<label className="block text-xs font-semibold text-foreground">Where</label>
						<input
							type="text"
							placeholder="City, area, or court name"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none mt-1"
						/>
					</div>

					{/* When */}
					<Popover>
						<PopoverTrigger asChild>
							<div
								className={`flex-1 px-6 py-5 cursor-pointer transition-colors ${
									activeField === "when"
										? "bg-secondary"
										: "hover:bg-secondary/50"
								}`}
								onClick={() => setActiveField("when")}>
								<label className="block text-xs font-semibold text-foreground">
									When
								</label>
								<span
									className={cn(
										"block mt-1",
										when
											? "text-foreground font-medium"
											: "text-muted-foreground",
									)}>
									{when ? format(when, "EEE, MMM d") : "Pick a date"}
								</span>
							</div>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="center">
							<CalendarComponent
								mode="single"
								selected={when}
								onSelect={setWhen}
								disabled={(date) => date < new Date()}
								initialFocus
							/>
						</PopoverContent>
					</Popover>

					{/* Who + Search Button */}
					<Popover>
						<PopoverTrigger asChild>
							<div
								className={`flex-1 px-6 py-5 cursor-pointer transition-colors flex items-center justify-between ${
									activeField === "guests"
										? "bg-secondary"
										: "hover:bg-secondary/50"
								}`}
								onClick={() => setActiveField("guests")}>
								<div>
									<label className="block text-xs font-semibold text-foreground">
										Who
									</label>
									<span
										className={cn(
											"block mt-1",
											guests > 0
												? "text-foreground font-medium"
												: "text-muted-foreground",
										)}>
										{guests === 1 ? "1 player" : `${guests} players`}
									</span>
								</div>

								<Button
									onClick={(e) => {
										e.stopPropagation();
										handleSearch();
									}}
									className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 w-12 p-0 shadow-lg">
									<Search className="h-5 w-5" />
								</Button>
							</div>
						</PopoverTrigger>

						<PopoverContent className="w-80" align="end">
							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Players</p>
										<p className="text-sm text-muted-foreground">
											How many are playing?
										</p>
									</div>
									<div className="flex items-center gap-4">
										<Button
											variant="outline"
											size="icon"
											className="h-10 w-10 rounded-full"
											onClick={() => setGuests(Math.max(1, guests - 1))}>
											−
										</Button>
										<span className="w-12 text-center text-lg font-semibold">
											{guests}
										</span>
										<Button
											variant="outline"
											size="icon"
											className="h-10 w-10 rounded-full"
											onClick={() => setGuests(guests + 1)}>
											+
										</Button>
									</div>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
}
