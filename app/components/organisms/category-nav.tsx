import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

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

// Fallback for missing icons
import { Building2 } from "lucide-react";

interface CategoryNavProps {
	// selectedCategory: string | null; // Deprecated for now
	// onSelectCategory: (category: string | null) => void; // Deprecated for now
}

// eslint-disable-next-line
export function CategoryNav({}: CategoryNavProps) {
	return (
		<div className="w-full">
			<div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 justify-items-center">
				{categories.map((category) => {
					const iconSrc = iconMap[category.icon];

					return (
						<div
							key={category.id}
							className="group flex flex-col items-center gap-2 cursor-pointer w-20 sm:w-28">
							<div
								className={cn(
									"w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-[20px] transition-all duration-300",
									"bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
									"shadow-sm group-hover:shadow-md group-hover:-translate-y-1 group-hover:scale-105",
								)}>
								{iconSrc ? (
									<img
										src={iconSrc}
										alt={category.name}
										className="h-8 w-8 sm:h-14 sm:w-14 opacity-80 group-hover:opacity-100 transition-opacity"
									/>
								) : (
									<Building2 className="h-8 w-8 sm:h-14 sm:w-14" />
								)}
							</div>
							<span
								className={cn(
									"text-xs sm:text-sm font-medium text-center line-clamp-1",
									"text-muted-foreground group-hover:text-foreground transition-colors",
								)}>
								{category.name}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
