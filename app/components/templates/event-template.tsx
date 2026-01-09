import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FacilityCard } from "~/components/molecule/facility-card";
import {
	Share,
	Heart,
	MapPin,
	Calendar as CalendarIcon,
	Users,
	ArrowLeft,
	Star,
	User,
} from "lucide-react";
import { cn, formatEnum } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../molecule/back-button";
import { useGetMatchEventById } from "~/hooks/use-match-events";
import { format } from "date-fns";

export default function EventTemplate() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isLiked, setIsLiked] = useState(false);

	const { data, isLoading } = useGetMatchEventById(id!, {
		fields: "id, title, description, createdBy, status, skillLevel, genderPreference, ageRange, rules, requirements, maxParticipants, createdAt, updatedAt, participants, reservation.bookingPeriod, reservation.facility.id, reservation.facility.images, reservation.facility.identifier, reservation.facility.displayName, reservation.facility.subtype, reservation.facility.metadata",
	});

	const matchEvent = data?.matchEvent;

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="text-center">Loading event details...</div>
			</div>
		);
	}

	if (!matchEvent) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="text-center">
					<h1 className="text-2xl font-semibold text-foreground">Event not found</h1>
					<Link to="/" className="mt-4 text-accent hover:underline">
						Go back home
					</Link>
				</div>
			</div>
		);
	}

	const facility = matchEvent.reservation.facility;
	const bookingPeriod = matchEvent.reservation.bookingPeriod;
	const participants = matchEvent.participants || [];
	const playersJoined = participants.length;
	const maxPlayers = matchEvent.maxParticipants;
	const spotsLeft = maxPlayers - playersJoined;
	const host = matchEvent.createdBy;
	const eventDate = new Date(bookingPeriod.startDateTime);
	const price = facility.metadata.price || 0;

	// Helper to get initials
	const getInitials = (firstName?: string, lastName?: string) => {
		return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "??";
	};

	const handleJoin = () => {
		const params = new URLSearchParams();
		// In the real flow, we might need a different confirmation page or pass the matchEventId
		// For now, mirroring the previous logic but pointing to matchEvent
		params.set("matchEventId", matchEvent.id);
		params.set("type", "game");
		navigate(`/reservation/confirmation?${params.toString()}`);
	};

	return (
		<div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Header Section */}
			<div className="mb-6">
				{/* Back Button */}
				<div className="mb-4">
					<BackButton fallbackPath="/" showText />
				</div>

				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
					<h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
						{matchEvent.title}
					</h1>
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="sm" className="gap-2 underline font-medium">
							<Share className="h-4 w-4" />
							<span className="hidden sm:inline">Share</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="gap-2 underline font-medium"
							onClick={() => setIsLiked(!isLiked)}>
							<Heart
								className={cn("h-4 w-4", isLiked && "fill-accent text-accent")}
							/>
							<span className="hidden sm:inline">Save</span>
						</Button>
					</div>
				</div>

				<div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
					<span className="font-medium text-foreground underline">
						{format(eventDate, "PPP")}
					</span>
					<span>·</span>
					<div className="flex items-center gap-1">
						<span className="font-medium text-foreground underline">
							{facility.metadata.location || facility.displayName}
						</span>
					</div>
				</div>
			</div>

			{/* Banner Image */}
			<div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden mb-8">
				<img
					src={facility.images?.[0]?.url || "/placeholder-image.jpg"}
					alt={matchEvent.title}
					className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
				{/* Left Content */}
				<div className="lg:col-span-2 space-y-10">
					{/* Host/Game Info Header */}
					<div className="flex items-center justify-between pb-8 border-b border-border">
						<div>
							<h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
								Hosted by {host.firstName} {host.lastName}
							</h2>
							<p className="text-muted-foreground">
								{spotsLeft} spots remaining · {formatEnum(facility.subtype)}
							</p>
						</div>
						<Avatar className="h-14 w-14 border border-border">
							<AvatarImage
								src={`https://api.dicebear.com/7.x/initials/svg?seed=${host.firstName} ${host.lastName}`}
							/>
							<AvatarFallback>
								{getInitials(host.firstName, host.lastName)}
							</AvatarFallback>
						</Avatar>
					</div>

					{/* Description / Rules */}
					<div className="pb-8 border-b border-border space-y-6">
						{matchEvent.description && (
							<div>
								<h2 className="text-xl font-semibold text-foreground mb-4">
									About this game
								</h2>
								<p className="text-muted-foreground">{matchEvent.description}</p>
							</div>
						)}

						{matchEvent.rules && matchEvent.rules.length > 0 && (
							<div>
								<h2 className="text-xl font-semibold text-foreground mb-4">
									Rules
								</h2>
								<ul className="list-disc pl-5 text-muted-foreground space-y-1">
									{matchEvent.rules.map((rule: string, idx: number) => (
										<li key={idx}>{rule}</li>
									))}
								</ul>
							</div>
						)}

						<div className="grid grid-cols-2 gap-4 pt-4">
							<div className="p-4 bg-muted/30 rounded-lg">
								<p className="text-sm font-medium text-foreground mb-1">
									Skill Level
								</p>
								<p className="text-muted-foreground">
									{formatEnum(matchEvent.skillLevel)}
								</p>
							</div>
							<div className="p-4 bg-muted/30 rounded-lg">
								<p className="text-sm font-medium text-foreground mb-1">Gender</p>
								<p className="text-muted-foreground">
									{formatEnum(matchEvent.genderPreference)}
								</p>
							</div>
						</div>
					</div>

					{/* Players Joined Section */}
					<div className="pb-8 border-b border-border">
						<h2 className="text-xl font-semibold text-foreground mb-6">Who's coming</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{participants.map((participant: any) => {
								// Handle case where user might be null (e.g. pending/guest or restricted)
								// Since the sample data showed user: null, we'll try to handle it gracefully
								const pUser = participant.user;
								const pName = pUser
									? `${pUser.firstName} ${pUser.lastName}`
									: "Reserved Spot";

								return (
									<div
										key={participant.id}
										className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-border transition-colors">
										<div className="h-12 w-12 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
											{pUser ? (
												<Avatar className="h-full w-full">
													<AvatarImage
														src={`https://api.dicebear.com/7.x/initials/svg?seed=${pName}`}
													/>
													<AvatarFallback>
														{getInitials(
															pUser.firstName,
															pUser.lastName,
														)}
													</AvatarFallback>
												</Avatar>
											) : (
												<User className="h-6 w-6 text-muted-foreground" />
											)}
										</div>
										<div>
											<p className="font-medium text-foreground">{pName}</p>
											<p className="text-xs text-muted-foreground">
												{formatEnum(participant.status)}
											</p>
										</div>
									</div>
								);
							})}
							{/* Empty Slots Indicator */}
							{spotsLeft > 0 && (
								<div className="flex items-center justify-center p-4 rounded-xl border border-dashed border-border bg-muted/20 text-muted-foreground text-sm">
									{spotsLeft} spots open
								</div>
							)}
						</div>
					</div>

					{/* Facility Info */}
					{facility && (
						<div className="pb-8 border-b border-border">
							<h2 className="text-xl font-semibold text-foreground mb-6">
								Where you'll be
							</h2>
							<div className="overflow-hidden border-b border-border pb-4">
								<FacilityCard facility={facility} />
							</div>
							<div className="mt-4 text-muted-foreground">
								<p>{facility.metadata.location}</p>
								<p className="mt-2 text-sm max-w-2xl">
									{facility.metadata.description}
								</p>
							</div>
						</div>
					)}
				</div>

				{/* Booking Card sidebar */}
				<div className="lg:col-span-1">
					<div className="sticky top-24">
						<Card className="shadow-xl border-border rounded-xl overflow-hidden">
							<CardContent className="px-6">
								<div className="flex items-baseline justify-between mb-6">
									<div className="flex items-baseline gap-1">
										<span className="text-2xl font-bold text-foreground">
											₱{price.toLocaleString()}
										</span>
										<span className="text-muted-foreground font-normal">
											/ head
										</span>
									</div>
									<div className="flex items-center gap-1 text-sm text-muted-foreground">
										<span className="font-semibold text-foreground underline">
											{playersJoined}
										</span>{" "}
										joined
									</div>
								</div>

								<div className="border border-border rounded-lg mb-4 overflow-hidden">
									<div className="grid grid-cols-2 divide-x divide-border border-b border-border">
										<div className="p-3 hover:bg-gray-100 cursor-pointer">
											<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
												Date
											</label>
											<span className="text-sm text-foreground">
												{format(eventDate, "MMM d")}
											</span>
										</div>
										<div className="p-3 hover:bg-gray-100 cursor-pointer">
											<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
												Time
											</label>
											<span className="text-sm text-foreground">
												{format(eventDate, "h:mm a")}
											</span>
										</div>
									</div>
									<div className="p-3 bg-background">
										<div className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
											Players
										</div>
										<div className="text-sm font-medium text-foreground">
											{playersJoined} / {maxPlayers} spots filled
										</div>
									</div>
								</div>

								<Button
									className="w-full qcsc-gradient h-12 text-base font-semibold rounded-lg cursor-pointer"
									onClick={handleJoin}
									disabled={playersJoined >= maxPlayers}>
									{playersJoined >= maxPlayers ? "Full Game" : "Join Game"}
								</Button>
							</CardContent>
						</Card>

						<div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
							<MapPin className="h-3 w-3" />
							<Link to="#" className="underline">
								Report this listing
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
