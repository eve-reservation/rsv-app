import type React from "react";
import type { Game } from "@/lib/data";
import { ChevronLeft, ChevronRight, Users, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn, formatEnum } from "@/lib/utils";

interface EventCardProps {
	game: Game;
	className?: string;
}

export function EventCard({ game, className }: EventCardProps) {
	const [currentImage, setCurrentImage] = useState(0);

	const images = game.images || [];

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
		<div className={cn("group flex gap-4", className)}>
			<div className="relative overflow-hidden bg-muted w-80 shrink-0 rounded-xl aspect-[4/3]">
				{images.length > 0 ? (
					<img
						src={images[currentImage]}
						alt={game.name}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-secondary/50">
						<ImageIcon className="text-muted-foreground/40 h-12 w-12" />
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

			<div className="flex-1 min-w-0 flex flex-col justify-center space-y-2">
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-medium text-foreground line-clamp-1">{game.name}</h3>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Users className="h-3.5 w-3.5" />
						<span>
							{game.playersJoined}/{game.maxPlayers}
						</span>
					</div>
				</div>
				<p className="text-sm text-muted-foreground line-clamp-1">
					{formatEnum(game.subType || "")}
				</p>
				<p className="text-sm text-muted-foreground line-clamp-1">
					{formatEnum(game.type || "")}
				</p>
				<div className="mt-1 flex items-center justify-between">
					<div>
						<span className="font-semibold">
							₱{(game.pricePerHead || 0).toLocaleString()}
						</span>
						<span className="text-muted-foreground"> / head</span>
					</div>
					<div className="flex items-center gap-1 shrink-0">
						<span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
							{game.date}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
