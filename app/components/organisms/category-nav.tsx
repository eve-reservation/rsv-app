import type React from "react";

import { useState } from "react";
import { categories } from "@/lib/data";
import { Building2, Presentation, CircleDot, PartyPopper, Camera, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
	hotel: Building2,
	presentation: Presentation,
	basketball: CircleDot,
	party: PartyPopper,
	camera: Camera,
	laptop: Laptop,
};

interface CategoryNavProps {
	selectedCategory: string | null;
	onSelectCategory: (category: string | null) => void;
}

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
	const [scrollPosition, setScrollPosition] = useState(0);

	return (
		<div className="relative">
			<div className="flex items-center gap-8 overflow-x-auto pb-4 scrollbar-hide">
				{categories.map((category) => {
					const Icon = iconMap[category.icon] || Building2;
					const isSelected = selectedCategory === category.id;

					return (
						<button
							key={category.id}
							onClick={() => onSelectCategory(isSelected ? null : category.id)}
							className={cn(
								"flex flex-col items-center gap-2 min-w-fit group transition-all",
								isSelected ? "opacity-100" : "opacity-70 hover:opacity-100",
							)}>
							<div
								className={cn(
									"p-3 rounded-xl transition-colors",
									isSelected
										? "bg-foreground text-background"
										: "bg-secondary text-foreground group-hover:bg-secondary/80",
								)}>
								<Icon className="h-5 w-5" />
							</div>
							<span
								className={cn(
									"text-xs font-medium whitespace-nowrap transition-colors",
									isSelected
										? "text-foreground"
										: "text-muted-foreground group-hover:text-foreground",
								)}>
								{category.name}
							</span>
							{isSelected && (
								<div className="h-0.5 w-full bg-foreground rounded-full" />
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
