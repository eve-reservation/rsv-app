import { useRef, Children, cloneElement, type ReactElement } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatEnum } from "~/lib/utils";

interface FacilitySectionProps {
	title: string;
	children: React.ReactNode;
	columns?: number;
	action?: React.ReactNode;
}

export function FacilitySection({ title, children, columns, action }: FacilitySectionProps) {
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

	const hasChildren = Children.count(children) > 0;

	return (
		<section className="">
			<div className="flex items-center justify-between mb-2 md:mb-4">
				<div className="flex gap-1 items-center hover:gap-3 transition-all duration-300 cursor-pointer">
					<h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight">
						{formatEnum(title)}
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

			{hasChildren ? (
				<div
					ref={scrollContainerRef}
					className="flex gap-4 overflow-x-auto md:overflow-hidden pb-4 scroll-smooth snap-x">
					{Children.map(children, (child, index) => {
						if (!child) return null;
						return (
							<div
								key={index}
								className={
									columns
										? "flex-none"
										: "w-[75%] sm:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-3rem)/4)] xl:w-[calc((100%-4.5rem)/5)] flex-none snap-center"
								}
								style={getItemStyle()}>
								{child}
							</div>
						);
					})}
				</div>
			) : (
				<div className="flex gap-6 overflow-hidden pb-4">
					<div className="w-full text-center text-muted-foreground py-8">
						No items available
					</div>
				</div>
			)}
		</section>
	);
}
