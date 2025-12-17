import type React from "react";
import { useState } from "react";
import { games, facilities } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FacilityCard } from "~/components/molecule/facility-card";
import { Share, Heart, MapPin, Calendar as CalendarIcon, Users, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../molecule/back-button";

export default function GameTemplate() {
	const { id } = useParams();
	const navigate = useNavigate();
	const game = games.find((g) => g.id === id);
	const facility = game ? facilities.find((f) => f.id === game.facilityId) : null;
	const [isLiked, setIsLiked] = useState(false);

	if (!game) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="text-center">
					<h1 className="text-2xl font-semibold text-foreground">Game not found</h1>
					<Link to="/" className="mt-4 text-accent hover:underline">
						Go back home
					</Link>
				</div>
			</div>
		);
	}

	const handleJoin = () => {
		const params = new URLSearchParams();
		params.set("facilityId", game.id);
		params.set("type", "game");
		navigate(`/booking/confirmation?${params.toString()}`);
	};

	return (
		<div className="animate-in fade-in duration-500">
			<div className="flex items-center justify-between mb-4">
				<BackButton fallbackPath="/" showText />
			</div>

			<main className="flex-1 space-y-8">
				{/* Banner Image */}
				<div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden">
					<img
						src={game.images[0]}
						alt={game.name}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
					<div className="absolute bottom-6 left-6 md:left-8 right-6 md:right-8 text-white">
						<h1 className="text-3xl md:text-4xl font-serif font-bold">{game.name}</h1>
						<div className="flex items-center gap-4 mt-2 text-white/90">
							<div className="flex items-center gap-1.5">
								<CalendarIcon className="h-4 w-4" />
								<span className="font-medium">{game.date}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<MapPin className="h-4 w-4" />
								<span>{game.location}</span>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Left Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Players Joined Section */}
						<div>
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold text-foreground">
									Players Joined ({game.playersJoined}/{game.maxPlayers})
								</h2>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{game.players.map((player) => (
									<div
										key={player.id}
										className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
										<Avatar>
											<AvatarImage
												src={`https://api.dicebear.com/7.x/initials/svg?seed=${player.name}`}
											/>
											<AvatarFallback>{player.avatar}</AvatarFallback>
										</Avatar>
										<span className="font-medium">{player.name}</span>
									</div>
								))}
								{/* Empty Slots */}
								{Array.from({
									length: Math.max(0, game.maxPlayers - game.playersJoined),
								}).map((_, i) => (
									<div
										key={`empty-${i}`}
										className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border bg-muted/30">
										<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
											<Users className="h-4 w-4 text-muted-foreground/50" />
										</div>
										<span className="text-muted-foreground text-sm italic">
											Open Slot
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="border-t border-border" />

						{/* Facility Info */}
						{facility && (
							<div>
								<h2 className="text-xl font-semibold text-foreground mb-4">
									Hosted at
								</h2>
								<div className="max-w-md">
									<FacilityCard facility={facility} />
								</div>
							</div>
						)}
					</div>

					{/* Booking Card */}
					<div className="lg:col-span-1">
						<Card className="sticky top-24 shadow-xl border-border py-0">
							<CardContent className="p-6 space-y-6">
								<div className="flex items-baseline justify-between">
									<div>
										<span className="text-2xl font-semibold text-foreground">
											₱{game.pricePerHead.toLocaleString()}
										</span>
										<span className="text-muted-foreground"> / head</span>
									</div>
								</div>

								<div className="space-y-4">
									<div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
										<CalendarIcon className="h-5 w-5 text-muted-foreground" />
										<div className="flex flex-col">
											<span className="text-sm font-medium">Date</span>
											<span className="text-sm text-muted-foreground">
												{game.date}
											</span>
										</div>
									</div>
									<div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
										<Users className="h-5 w-5 text-muted-foreground" />
										<div className="flex flex-col">
											<span className="text-sm font-medium">Spots</span>
											<span className="text-sm text-muted-foreground">
												{game.maxPlayers - game.playersJoined} remaining
											</span>
										</div>
									</div>
								</div>

								<Button
									className="w-full qcsc-gradient hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
									onClick={handleJoin}
									disabled={game.playersJoined >= game.maxPlayers}>
									{game.playersJoined >= game.maxPlayers
										? "Full Game"
										: "Join Game"}
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
