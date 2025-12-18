import { useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FacilityCard } from "@/components/molecule/facility-card";
import type { Facility, Game } from "@/lib/data";

interface FacilitySectionProps {
	title: string;
	facilities: (Facility | Game)[];
	basePath?: string;
	columns?: number;
	cardVariant?: "vertical" | "horizontal";
}

export function FacilitySection({
	title,
	facilities,
	basePath = "/facility",
	columns,
	cardVariant = "vertical",
}: FacilitySectionProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const scrollAmount = container.clientWidth + 24; // Scroll by viewport width + gap
			const newScrollLeft =
				direction === "left"
					? container.scrollLeft - scrollAmount
					: container.scrollLeft + scrollAmount;

			container.scrollTo({
				left: newScrollLeft,
				behavior: "smooth",
			});
		}
	};

	if (facilities.length === 0) return null;

	const getItemStyle = () => {
		if (!columns) return {};
		return {
			width: `calc((100% - ${(columns - 1) * 1.5}rem) / ${columns})`,
		};
	};

	return (
		<section className="py-8">
			<div className="flex items-center justify-between mb-6">
				<div className="flex gap-1 items-center hover:gap-3 transition-all duration-300 cursor-pointer">
					<h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
					<ChevronRight className="h-5 w-5 font-semibold" />
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8 rounded-full"
						onClick={() => scroll("left")}
						aria-label="Scroll left">
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8 rounded-full"
						onClick={() => scroll("right")}
						aria-label="Scroll right">
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div ref={scrollContainerRef} className="flex gap-6 overflow-hidden pb-4 scroll-smooth">
				{facilities.map((facility) => (
					<div
						key={facility.id}
						className={
							columns
								? "flex-none"
								: "w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)] flex-none"
						}
						style={getItemStyle()}>
						<Link to={`${basePath}/${facility.id}`}>
							<FacilityCard facility={facility} variant={cardVariant} />
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}
