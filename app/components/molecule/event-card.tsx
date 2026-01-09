import type React from "react";
import { Users, Image as ImageIcon, CalendarClock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatEnum } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface EventCardProps {
	event: any;
	className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
	const facility = event.reservation?.facility;
	const bookingPeriod = event.reservation?.bookingPeriod;

	const images = facility?.images?.map((img: any) => img.url) || [];
	// Use spotsLeft from API or calculate it
	const spotsLeft = event.spotsLeft ?? event.maxParticipants - (event._count?.participants || 0);

	const title = event.title;
	const type = facility?.subtype || "Event";
	// Fallback logic for location/subtype text similar to previous map function
	const locationOrSubtype =
		facility?.images?.[0]?.name || facility?.metadata?.location || "Sports";

	const price = facility?.metadata?.price ? Number(facility.metadata.price) : 0;

	const dateDisplay = bookingPeriod?.startDateTime
		? format(new Date(bookingPeriod.startDateTime), "MMM d, h:mm a")
		: "TBD";

	const hostName =
		`${event.createdBy?.firstName || ""} ${event.createdBy?.lastName || ""}`.trim() ||
		event.createdBy?.email ||
		"Unknown Host";
	const hostAvatar: string = event.createdBy?.avatar || "";

	return (
		<div
			className={cn(
				"group flex flex-col sm:flex-row gap-0 sm:gap-3 bg-card rounded-lg border border-border/50 overflow-hidden hover:border-border transition-colors",
				className,
			)}>
			{/* Image Section - Compact & Fixed */}
			<div className="relative w-full h-32 sm:w-36 sm:h-auto shrink-0 bg-muted">
				{images.length > 0 ? (
					<img
						src={images[0]}
						alt={title}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-secondary/50">
						<ImageIcon className="text-muted-foreground/40 h-8 w-8" />
					</div>
				)}

				{/* Minimal Type Badge */}
				<div className="absolute top-2 left-2">
					<span className="px-1.5 py-0.5 rounded-sm bg-background/90 backdrop-blur-sm text-[9px] font-semibold uppercase tracking-wider border border-border/50">
						{formatEnum(type)}
					</span>
				</div>
			</div>

			{/* Content Section */}
			<div className="flex-1 p-3 flex flex-col justify-between min-w-0">
				<div>
					{/* Meta Row */}
					<div className="flex items-center gap-2 mb-1.5 text-xs text-muted-foreground">
						<div className="flex items-center gap-1">
							<CalendarClock className="h-3 w-3" />
							<span>{dateDisplay}</span>
						</div>
						<span className="text-border/60">|</span>
						<div className="flex items-center gap-1">
							<MapPin className="h-3 w-3" />
							<span className="truncate max-w-[120px]">
								{formatEnum(locationOrSubtype)}
							</span>
						</div>
					</div>

					<h3 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
						{title}
					</h3>

					{/* Host info - Minimal */}
					{event.createdBy && (
						<div className="flex items-center gap-1.5 mt-1.5">
							<Avatar className="h-4 w-4 border border-border">
								{hostAvatar && hostAvatar.length > 2 ? (
									<AvatarImage src={hostAvatar} />
								) : null}
								<AvatarFallback className="text-[8px]">
									{hostName.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<span className="text-[10px] text-muted-foreground">
								by <span className="text-foreground/80">{hostName}</span>
							</span>
						</div>
					)}
				</div>

				{/* Footer Section - Compact */}
				<div className="flex items-end justify-between mt-3 pt-2 border-t border-border/30">
					<div>
						<div className="flex items-center gap-1.5 text-[10px] mb-0.5">
							<Users className="h-3 w-3 text-muted-foreground" />
							<span
								className={cn(
									"font-medium",
									spotsLeft <= 2 ? "text-destructive" : "text-muted-foreground",
								)}>
								{spotsLeft === 0 ? "Full" : `${spotsLeft} spots left`}
							</span>
						</div>
						<div className="flex items-baseline gap-1">
							<span className="text-sm font-bold">₱{price.toLocaleString()}</span>
						</div>
					</div>
					<Button
						size="sm"
						variant={spotsLeft === 0 ? "outline" : "default"}
						className="h-7 px-3 text-xs">
						{spotsLeft === 0 ? "Waitlist" : "Join"}
					</Button>
				</div>
			</div>
		</div>
	);
}
