import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Building2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import { categories } from "~/lib/data";
import {
	basketballIcon,
	badmintonIcon,
	volleyballIcon,
	soccerIcon,
	tableTennisIcon,
	baseballIcon,
	billiardIcon,
	bowlingIcon,
	fitnessIcon,
	golfIcon,
	rugbyIcon,
	pickleballIcon,
} from "@/assets/images/SVG";

const iconMap: Record<string, string> = {
	basketball: basketballIcon,
	tennis: tableTennisIcon,
	football: soccerIcon,
	volleyball: volleyballIcon,
	badminton: badmintonIcon,
	baseball: baseballIcon,
	billiard: billiardIcon,
	bowling: bowlingIcon,
	fitness: fitnessIcon,
	golf: golfIcon,
	rugby: rugbyIcon,
	pickleball: pickleballIcon,
};

export function SearchBar() {
	const navigate = useNavigate();
	const [category, setCategory] = useState("");
	const [when, setWhen] = useState<Date | undefined>(undefined);
	const [guests, setGuests] = useState(1);
	const [activeField, setActiveField] = useState<string | null>(null);
	const [openCategory, setOpenCategory] = useState(false);

	const handleSearch = () => {
		const params = new URLSearchParams();
		if (category) params.set("category", category);
		if (when) params.set("date", when.toISOString());
		if (guests > 1) params.set("guests", guests.toString());
		navigate(`/?${params.toString()}`);
	};

	const selectedCategory = categories.find((c) => c.name === category);

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="bg-card rounded-lg border border-border shadow-lg hover:shadow-xl transition-shadow">
				<div className="flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-border">
					{/* What */}
					<Popover open={openCategory} onOpenChange={setOpenCategory}>
						<PopoverTrigger asChild>
							<div
								className={`flex-1 px-6 py-5 cursor-pointer transition-colors ${
									activeField === "category" || openCategory
										? "bg-secondary"
										: "hover:bg-secondary/50"
								}`}
								onClick={() => setActiveField("category")}>
								<label className="block text-xs font-semibold text-foreground">
									What
								</label>
								<div className="flex items-center gap-2 mt-1">
									{selectedCategory && iconMap[selectedCategory.icon] && (
										<img
											src={iconMap[selectedCategory.icon]}
											alt={selectedCategory.name}
											className="w-5 h-5 opacity-70"
										/>
									)}
									<span
										className={cn(
											"block truncate",
											category
												? "text-foreground font-medium"
												: "text-muted-foreground/60",
										)}>
										{category || "What are you playing?"}
									</span>
								</div>
							</div>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0" align="start">
							<Command>
								<CommandInput placeholder="Search category..." />
								<CommandList>
									<CommandEmpty>No category found.</CommandEmpty>
									<CommandGroup>
										{categories.map((cat) => (
											<CommandItem
												key={cat.id}
												value={cat.name}
												onSelect={(currentValue) => {
													setCategory(
														currentValue === category
															? ""
															: currentValue,
													);
													setOpenCategory(false);
												}}>
												<div className="flex items-center gap-2">
													{iconMap[cat.icon] ? (
														<img
															src={iconMap[cat.icon]}
															alt={cat.name}
															className="w-4 h-4"
														/>
													) : (
														<Building2 className="w-4 h-4" />
													)}
													<span>{cat.name}</span>
												</div>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>

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
