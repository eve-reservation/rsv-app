import { useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FacilityCard } from "@/components/molecule/facility-card";
import type { Facility } from "@/lib/data";

interface FacilitySectionProps {
	title: string;
	facilities: Facility[];
}

export function FacilitySection({ title, facilities }: FacilitySectionProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const scrollAmount = 300; // Approximate card width + gap
			const newScrollLeft =
				direction === "left"
					? scrollContainerRef.current.scrollLeft - scrollAmount
					: scrollContainerRef.current.scrollLeft + scrollAmount;

			scrollContainerRef.current.scrollTo({
				left: newScrollLeft,
				behavior: "smooth",
			});
		}
	};

	if (facilities.length === 0) return null;

	return (
		<section className="py-8">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
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

			<div
				ref={scrollContainerRef}
				className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
				{facilities.map((facility) => (
					<div key={facility.id} className="w-[280px] sm:w-[320px] flex-none snap-start">
						<Link to={`/facility/${facility.id}`}>
							<FacilityCard facility={facility} />
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}
