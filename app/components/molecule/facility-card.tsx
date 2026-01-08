import type React from "react";
import type { Facility } from "@/lib/data";
import { Star, Heart, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn, formatEnum } from "@/lib/utils";

interface FacilityCardProps {
	facility: Facility;
	variant?: "vertical" | "horizontal";
	className?: string;
	admin?: boolean;
}

export function FacilityCard({
	facility,
	variant = "vertical",
	className,
	admin,
}: FacilityCardProps) {
	const [currentImage, setCurrentImage] = useState(0);
	const [isLiked, setIsLiked] = useState(false);

	// Facility images are objects
	const images = facility.images ? facility.images.map((img) => img.url) : [];

	const nextImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (images.length > 0) {
			setCurrentImage((prev) => (prev + 1) % images.length);
		}
	};

	const prevImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (images.length > 0) {
			setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
		}
	};

	return (
		<div className={cn("group", variant === "horizontal" ? "flex gap-4" : "block", className)}>
			<div
				className={cn(
					"relative overflow-hidden bg-muted",
					variant === "horizontal"
						? "w-80 shrink-0 rounded-xl aspect-[4/3]"
						: "aspect-[4/3] rounded-2xl w-full",
				)}>
				{images.length > 0 ? (
					<img
						src={images[currentImage]}
						alt={facility.displayName}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-secondary/50">
						<ImageIcon
							className={cn(
								"text-muted-foreground/40",
								admin ? "h-8 w-8" : "h-12 w-12",
							)}
						/>
					</div>
				)}

				{/* Navigation arrows */}
				{images.length > 1 && (
					<div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
						<Button
							variant="secondary"
							size="icon"
							className="h-7 w-7 rounded-full bg-card/90 hover:bg-card shadow-md cursor-pointer"
							onClick={prevImage}>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="secondary"
							size="icon"
							className="h-7 w-7 rounded-full bg-card/90 hover:bg-card shadow-md cursor-pointer"
							onClick={nextImage}>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				)}

				{/* Like button */}
				{!admin && (
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-3 right-3 h-8 w-8 rounded-full hover:bg-transparent"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setIsLiked(!isLiked);
						}}>
						<Heart
							className={cn(
								"h-5 w-5 transition-colors",
								isLiked
									? "fill-accent text-accent"
									: "text-card fill-card/30 stroke-[2.5]",
							)}
						/>
					</Button>
				)}

				{/* Image indicators */}
				{images.length > 1 && (
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
						{images.map((_, index) => (
							<div
								key={index}
								className={cn(
									"h-1.5 w-1.5 rounded-full transition-colors",
									index === currentImage ? "bg-card" : "bg-card/50",
								)}
							/>
						))}
					</div>
				)}
			</div>

			<div
				className={cn(
					"space-y-",
					variant === "horizontal"
						? "flex-1 min-w-0 flex flex-col justify-center space-y-2"
						: "mt-3",
				)}>
				<div className="flex items-start justify-between gap-2">
					<h3 className={cn("font-medium text-foreground line-clamp-1", "text-sm")}>
						{facility.displayName}
					</h3>
					{facility.rating && !admin && (
						<div className="flex items-center gap-1 shrink-0 text-xs">
							<Star className="h-2.5 w-2.5 fill-foreground text-foreground" />
							<span className="text-xs font-medium pt-0.25">{facility.rating}</span>
						</div>
					)}
				</div>
				<p className={cn("text-muted-foreground line-clamp-1", "text-xs")}>
					{formatEnum(facility.subtype || "")}
				</p>
				<p className={cn("text-muted-foreground line-clamp-1", "text-xs")}>
					{formatEnum(facility.facilityType?.spaceType || "")}
				</p>
				{facility.rateType?.baseRate || facility.metadata?.price ? (
					<div className="mt-1 flex items-center justify-between">
						<div>
							<span className={cn("font-semibold", "text-sm")}>
								₱
								{(
									facility.rateType?.baseRate ||
									facility.metadata?.price ||
									0
								).toLocaleString()}
							</span>
							<span className={cn("text-muted-foreground", "text-xs")}>
								{" "}
								/ {facility.metadata?.priceUnit || "unit"}
							</span>
						</div>
					</div>
				) : (
					<p className={cn("text-muted-foreground", "text-xs")}>No price available</p>
				)}
			</div>
		</div>
	);
}
