import { useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FacilityCard } from "@/components/molecule/facility-card";
import type { Facility, Game } from "@/lib/data";
import { CreateFacilityModal } from "@/components/molecule/create-facility-modal";

interface FacilitySectionProps {
	title: string;
	facilities: (Facility | Game)[];
	basePath?: string;
	columns?: number;
	cardVariant?: "vertical" | "horizontal";
	action?: React.ReactNode;
	facilityTypeId?: string;
	spaceType?: string;
	getLink?: (facility: Facility | Game) => string;
	admin?: boolean;
}

export function FacilitySection({
	title,
	facilities,
	basePath = "/facility",
	columns,
	cardVariant = "vertical",
	action,
	facilityTypeId,
	spaceType,
	getLink,
	admin,
}: FacilitySectionProps) {
	// ... (existing code: scrollContainerRef, scroll function, getItemStyle)

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

	const getItemStyle = () => {
		if (!columns) return {};
		return {
			width: `calc((100% - ${(columns - 1) * 1.5}rem) / ${columns})`,
		};
	};

	return (
		<section className="">
			<div className="flex items-center justify-between mb-2 md:mb-4">
				<div className="flex gap-1 items-center hover:gap-3 transition-all duration-300 cursor-pointer">
					<h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight">
						{title}
					</h2>
					<ChevronRight className="h-5 w-5 font-semibold" />
				</div>
				<div className="hidden md:flex gap-1 md:gap-2 items-center">
					<Button
						variant="outline"
						size="icon"
						className="size-6 md:size-8 rounded-full"
						onClick={() => scroll("left")}
						aria-label="Scroll left">
						<ChevronLeft className="size-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="size-6 md:size-8 rounded-full"
						onClick={() => scroll("right")}
						aria-label="Scroll right">
						<ChevronRight className="size-4" />
					</Button>
					{action && <div className="ml-2">{action}</div>}
				</div>
			</div>

			{facilities.length > 0 ? (
				<div
					ref={scrollContainerRef}
					className="flex gap-6 overflow-x-auto md:overflow-hidden pb-4 scroll-smooth snap-x">
					{facilities.map((facility) => (
						<div
							key={facility.id}
							className={
								columns
									? "flex-none"
									: `w-[75%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] ${admin ? "xl:w-[calc((100%-6rem)/5)]" : "xl:w-[calc((100%-4.5rem)/4)]"} flex-none snap-center`
							}
							style={getItemStyle()}>
							<Link to={getLink ? getLink(facility) : `${basePath}/${facility.id}`}>
								<FacilityCard facility={facility} variant={cardVariant} admin />
							</Link>
						</div>
					))}
					{/* Always show "Create Facility" card at the end if facilityTypeId is present */}
					{facilityTypeId && (
						<div
							className={
								columns
									? "flex-none"
									: `w-[75%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] ${admin ? "xl:w-[calc((100%-6rem)/5)]" : "xl:w-[calc((100%-4.5rem)/4)]"} flex-none snap-center`
							}
							style={getItemStyle()}>
							<CreateFacilityModal
								facilityTypeId={facilityTypeId}
								spaceType={spaceType}
								trigger={
									<div className="group block cursor-pointer">
										<div
											className={
												cardVariant === "horizontal"
													? "w-80 shrink-0 rounded-xl aspect-[4/3] relative overflow-hidden bg-muted/30 border-2 border-dashed border-muted-foreground/25 flex items-center justify-center hover:bg-muted/50 transition-colors"
													: "aspect-[4/3] rounded-2xl w-full relative overflow-hidden bg-muted/30 border-2 border-dashed border-muted-foreground/25 flex items-center justify-center hover:bg-muted/50 transition-colors"
											}>
											<Plus className="h-12 w-12 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
										</div>
										<div
											className={
												cardVariant === "horizontal" ? "mt-0" : "mt-3"
											}>
											<h3 className="font-medium text-foreground text-center">
												Create Facility
											</h3>
											<p className="text-sm text-muted-foreground text-center">
												Add a new facility to this category
											</p>
										</div>
									</div>
								}
							/>
						</div>
					)}
				</div>
			) : (
				<div className="flex gap-6 overflow-hidden pb-4">
					{facilityTypeId && (
						<div
							className={
								columns
									? "flex-none"
									: `w-[75%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] ${admin ? "xl:w-[calc((100%-6rem)/5)]" : "xl:w-[calc((100%-4.5rem)/4)]"} flex-none snap-center`
							}
							style={getItemStyle()}>
							<CreateFacilityModal
								facilityTypeId={facilityTypeId}
								spaceType={spaceType}
								trigger={
									<div className="group block cursor-pointer">
										<div
											className={
												cardVariant === "horizontal"
													? "w-80 shrink-0 rounded-xl aspect-[4/3] relative overflow-hidden bg-muted/30 border-2 border-dashed border-muted-foreground/25 flex items-center justify-center hover:bg-muted/50 transition-colors"
													: "aspect-[4/3] rounded-2xl w-full relative overflow-hidden bg-muted/30 border-2 border-dashed border-muted-foreground/25 flex items-center justify-center hover:bg-muted/50 transition-colors"
											}>
											<Plus className="h-12 w-12 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
										</div>
										<div
											className={
												cardVariant === "horizontal" ? "mt-0" : "mt-3"
											}>
											<h3 className="font-medium text-foreground text-center">
												Create Facility
											</h3>
											<p className="text-sm text-muted-foreground text-center">
												Add a new facility to this category
											</p>
										</div>
									</div>
								}
							/>
						</div>
					)}
				</div>
			)}
		</section>
	);
}
