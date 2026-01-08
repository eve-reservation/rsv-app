import type React from "react";
import type { Game } from "@/lib/data";
import {
	ChevronLeft,
	ChevronRight,
	Users,
	Image as ImageIcon,
	CalendarClock,
	MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn, formatEnum } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

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

	const spotsLeft = game.maxPlayers - game.playersJoined;
	const percentFull = (game.playersJoined / game.maxPlayers) * 100;

	return (
		<div
			className={cn(
				"group flex flex-col sm:flex-row gap-0 sm:gap-4 bg-card rounded-xl border border-border/50 overflow-hidden hover:border-border transition-colors",
				className,
			)}>
			{/* Image Section - Smaller width */}
			<div className="relative w-full h-48 sm:w-48 sm:h-auto shrink-0 bg-muted">
				<div className="absolute inset-0">
					{images.length > 0 ? (
						<img
							src={images[currentImage]}
							alt={game.name}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-secondary/50">
							<ImageIcon className="text-muted-foreground/40 h-10 w-10" />
						</div>
					)}
				</div>

				{/* Navigation arrows */}
				{images.length > 1 && (
					<div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
						<Button
							variant="secondary"
							size="icon"
							className="h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70 border-none"
							onClick={prevImage}>
							<ChevronLeft className="h-3 w-3" />
						</Button>
						<Button
							variant="secondary"
							size="icon"
							className="h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70 border-none"
							onClick={nextImage}>
							<ChevronRight className="h-3 w-3" />
						</Button>
					</div>
				)}

				{/* Type Badge Overlay */}
				<div className="absolute top-2 left-2">
					<span className="px-2 py-0.5 rounded-md bg-background/90 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider border border-border/50">
						{game.type}
					</span>
				</div>
			</div>

			{/* Content Section */}
			<div className="flex-1 p-4 md:p-0 md:py-3 md:pr-4 flex flex-col justify-between min-w-0">
				<div>
					<div className="flex items-start justify-between gap-2 mb-1">
						<div className="flex items-center gap-1.5 text-xs font-medium text-primary">
							<CalendarClock className="h-3.5 w-3.5" />
							<span>{game.date}</span>
						</div>
						<div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
							<MapPin className="h-3 w-3" />
							<span className="truncate max-w-[100px]">
								{formatEnum(game.subType)}
							</span>
						</div>
					</div>

					<h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
						{game.name}
					</h3>

					{/* Host info */}
					{game.host && (
						<div className="flex items-center gap-2 mt-2">
							<Avatar className="h-5 w-5 border border-border">
								{game.host.avatar && game.host.avatar.length > 2 ? (
									<AvatarImage src={game.host.avatar} />
								) : null}
								<AvatarFallback className="text-[9px]">
									{game.host.avatar || "H"}
								</AvatarFallback>
							</Avatar>
							<span className="text-xs text-muted-foreground">
								Hosted by <span className="text-foreground">{game.host.name}</span>
							</span>
						</div>
					)}
				</div>

				<div className="space-y-3 mt-3">
					{/* Progress Section */}
					<div className="space-y-1.5">
						<div className="flex items-center justify-between text-xs">
							<div className="flex items-center gap-1.5 font-medium">
								<Users className="h-3.5 w-3.5 text-muted-foreground" />
								<span>
									{game.playersJoined} / {game.maxPlayers} joined
								</span>
							</div>
							<span
								className={cn(
									"px-1.5 py-0.5 rounded text-[10px] font-medium",
									spotsLeft <= 2
										? "bg-destructive/10 text-destructive"
										: "bg-green-500/10 text-green-600",
								)}>
								{spotsLeft === 0 ? "FULL" : `${spotsLeft} spots left`}
							</span>
						</div>
						<Progress value={percentFull} className="h-1.5" />
					</div>

					{/* Footer Price & Action */}
					<div className="flex items-center justify-between pt-2 border-t border-border/50">
						<div>
							<span className="text-lg font-bold">
								₱{(game.pricePerHead || 0).toLocaleString()}
							</span>
							<span className="text-xs text-muted-foreground"> / head</span>
						</div>
						<Button
							size="sm"
							variant={spotsLeft === 0 ? "outline" : "default"}
							className="h-8 px-4">
							{spotsLeft === 0 ? "Waitlist" : "Join Game"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
