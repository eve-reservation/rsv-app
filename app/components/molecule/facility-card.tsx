import type React from "react";

import type { Facility } from "@/lib/data";
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FacilityCardProps {
	facility: Facility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
	const [currentImage, setCurrentImage] = useState(0);
	const [isLiked, setIsLiked] = useState(false);

	const nextImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImage((prev) => (prev + 1) % facility.images.length);
	};

	const prevImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImage((prev) => (prev - 1 + facility.images.length) % facility.images.length);
	};

	return (
		<div className="group block">
			<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
				<img
					src={facility.images[currentImage] || "/placeholder.svg"}
					alt={facility.name}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>

				{/* Navigation arrows */}
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
				<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
					{facility.images.map((_, index) => (
						<div
							key={index}
							className={cn(
								"h-1.5 w-1.5 rounded-full transition-colors",
								index === currentImage ? "bg-card" : "bg-card/50",
							)}
						/>
					))}
				</div>
			</div>

			<div className="mt-3 space-y-1">
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-medium text-foreground line-clamp-1">{facility.name}</h3>
					<div className="flex items-center gap-1 shrink-0">
						<Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
						<span className="text-sm font-medium">{facility.rating}</span>
					</div>
				</div>
				<p className="text-sm text-muted-foreground">{facility.location}</p>
				<p className="text-sm text-muted-foreground">{facility.type}</p>
				<p className="mt-1">
					<span className="font-semibold">₱{facility.price.toLocaleString()}</span>
					<span className="text-muted-foreground"> / {facility.priceUnit}</span>
				</p>
			</div>
		</div>
	);
}
