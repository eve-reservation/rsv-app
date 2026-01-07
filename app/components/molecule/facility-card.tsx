import type React from "react";

import type { Facility, Game } from "@/lib/data";
import { Star, Heart, ChevronLeft, ChevronRight, Users, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn, formatEnum } from "@/lib/utils";

interface FacilityCardProps {
	facility: Facility | Game;
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

	const isGame = "pricePerHead" in facility;

	// Helper to normalize images
	const getImages = () => {
		if (!facility.images) return [];
		if (isGame) return (facility as Game).images;
		// Facility images are objects
		return (facility as Facility).images.map((img) => img.url);
	};

	const images = getImages();

	// Helpers for properties that differ
	const getName = () => (isGame ? (facility as Game).name : (facility as Facility).displayName);
	const getRating = () => (isGame ? 0 : (facility as Facility).rating); // Game doesn't have rating in interface
	const getPrice = () =>
		isGame ? (facility as Game).pricePerHead : (facility as Facility).metadata?.price;
	const getPriceUnit = () =>
		isGame ? "head" : (facility as Facility).metadata?.priceUnit || "unit";
	const getType = () =>
		isGame ? (facility as Game).type : (facility as Facility).facilityType?.spaceType;
	const getSubType = () => (isGame ? (facility as Game).subType : (facility as Facility).subtype);

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
						alt={getName()}
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
					"space-y-1",
					variant === "horizontal"
						? "flex-1 min-w-0 flex flex-col justify-center space-y-2"
						: "mt-3",
				)}>
				<div className="flex items-start justify-between gap-2">
					<h3
						className={cn(
							"font-medium text-foreground line-clamp-1",
							admin ? "text-sm" : "",
						)}>
						{getName()}
					</h3>
					{!isGame && (facility as Facility).rating && !admin && (
						<div className="flex items-center gap-1 shrink-0">
							<Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
							<span className="text-sm font-medium">{getRating()}</span>
						</div>
					)}
					{isGame && (
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<Users className="h-3.5 w-3.5" />
							<span>
								{(facility as Game).playersJoined}/{(facility as Game).maxPlayers}
							</span>
						</div>
					)}
				</div>
				<p
					className={cn(
						"text-muted-foreground line-clamp-1",
						admin ? "text-xs" : "text-sm",
					)}>
					{formatEnum(getSubType() || "")}
				</p>
				<p
					className={cn(
						"text-muted-foreground line-clamp-1",
						admin ? "text-xs" : "text-sm",
					)}>
					{formatEnum(getType() || "")}
				</p>
				<div className="mt-1 flex items-center justify-between">
					<div>
						<span className={cn("font-semibold", admin ? "text-sm" : "")}>
							₱{(getPrice() || 0).toLocaleString()}
						</span>
						<span className={cn("text-muted-foreground", admin ? "text-xs" : "")}>
							{" "}
							/ {getPriceUnit()}
						</span>
					</div>
					{isGame && "date" in facility && (
						<div className="flex items-center gap-1 shrink-0">
							<span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
								{(facility as Game).date}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
