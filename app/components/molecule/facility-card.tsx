import type React from "react";

import type { Facility, Game } from "@/lib/data";
import { Star, Heart, ChevronLeft, ChevronRight, Users, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FacilityCardProps {
	facility: Facility | Game;
	variant?: "vertical" | "horizontal";
	className?: string;
}

export function FacilityCard({ facility, variant = "vertical", className }: FacilityCardProps) {
	const [currentImage, setCurrentImage] = useState(0);
	const [isLiked, setIsLiked] = useState(false);

	const isGame = "pricePerHead" in facility;
	const images = facility.images || [];

	console.log(JSON.stringify(facility, null, 2));

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
						alt={facility.name}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-secondary/50">
						<ImageIcon className="h-12 w-12 text-muted-foreground/40" />
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
					<h3 className="font-medium text-foreground line-clamp-1">{facility.name}</h3>
					{!isGame && "rating" in facility && (
						<div className="flex items-center gap-1 shrink-0">
							<Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
							<span className="text-sm font-medium">{facility.rating}</span>
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
				<p className="text-sm text-muted-foreground line-clamp-1">{facility.subType}</p>
				<p className="text-sm text-muted-foreground line-clamp-1">{facility.type}</p>
				<div className="mt-1 flex items-center justify-between">
					<div>
						{isGame ? (
							<>
								<span className="font-semibold">
									₱{((facility as Game).pricePerHead || 0).toLocaleString()}
								</span>
								<span className="text-muted-foreground"> / head</span>
							</>
						) : (
							<>
								<span className="font-semibold">
									₱{((facility as Facility).price || 0).toLocaleString()}
								</span>
								<span className="text-muted-foreground">
									{" "}
									/ {(facility as Facility).priceUnit || "unit"}
								</span>
							</>
						)}
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
