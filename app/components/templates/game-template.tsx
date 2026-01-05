import type React from "react";
import { useState } from "react";
import { games, facilities } from "@/lib/data";
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
import { cn } from "@/lib/utils";
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
						{game.name}
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
					<span className="font-medium text-foreground underline">{game.date}</span>
					<span>·</span>
					<div className="flex items-center gap-1">
						<span className="font-medium text-foreground underline">
							{game.location}
						</span>
					</div>
				</div>
			</div>

			{/* Banner Image */}
			<div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden mb-12">
				<img
					src={game.images[0]}
					alt={game.name}
					className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
				{/* Left Content */}
				<div className="lg:col-span-2 space-y-10">
					{/* Host/Game Info Header */}
					<div className="flex items-center justify-between pb-8 border-b border-border">
						<div>
							<h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
								Hosted by {game.host.name}
							</h2>
							<p className="text-muted-foreground">
								{game.maxPlayers - game.playersJoined} spots remaining ·{" "}
								{game.category}
							</p>
						</div>
						<Avatar className="h-14 w-14 border border-border">
							<AvatarImage
								src={`https://api.dicebear.com/7.x/initials/svg?seed=${game.host.name}`}
							/>
							<AvatarFallback>{game.host.avatar}</AvatarFallback>
						</Avatar>
					</div>

					{/* Players Joined Section */}
					<div className="pb-8 border-b border-border">
						<h2 className="text-xl font-semibold text-foreground mb-6">Who's coming</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{game.players.map((player) => (
								<div
									key={player.id}
									className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-border transition-colors">
									<div className="h-12 w-12 rounded-full bg-muted border border-border flex items-center justify-center">
										<span className="text-sm font-semibold text-foreground">
											{player.avatar}
										</span>
									</div>
									<div>
										<p className="font-medium text-foreground">{player.name}</p>
										<p className="text-xs text-muted-foreground">Player</p>
									</div>
								</div>
							))}
							{/* Empty Slots Indicator */}
							{game.maxPlayers > game.playersJoined && (
								<div className="flex items-center justify-center p-4 rounded-xl border border-dashed border-border bg-muted/20 text-muted-foreground text-sm">
									{game.maxPlayers - game.playersJoined} spots open
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
								<p>{facility.location}</p>
								<p className="mt-2 text-sm max-w-2xl">{facility.description}</p>
							</div>
						</div>
					)}
				</div>

				{/* Booking Card sidebar */}
				<div className="lg:col-span-1">
					<div className="sticky top-24">
						<Card className="shadow-xl border-border rounded-xl overflow-hidden">
							<CardContent className="p-6">
								<div className="flex items-baseline justify-between mb-6">
									<div className="flex items-baseline gap-1">
										<span className="text-2xl font-bold text-foreground">
											₱{game.pricePerHead.toLocaleString()}
										</span>
										<span className="text-muted-foreground font-normal">
											/ head
										</span>
									</div>
									<div className="flex items-center gap-1 text-sm text-muted-foreground">
										<span className="font-semibold text-foreground underline">
											{game.playersJoined}
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
												{game.date}
											</span>
										</div>
										<div className="p-3 hover:bg-gray-100 cursor-pointer">
											<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
												Time
											</label>
											<span className="text-sm text-foreground">
												See details
											</span>
										</div>
									</div>
									<div className="p-3 bg-background">
										<div className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
											Players
										</div>
										<div className="text-sm font-medium text-foreground">
											{game.playersJoined} / {game.maxPlayers} spots filled
										</div>
									</div>
								</div>

								<Button
									className="w-full qcsc-gradient h-12 text-base font-semibold rounded-lg mb-4"
									onClick={handleJoin}
									disabled={game.playersJoined >= game.maxPlayers}>
									{game.playersJoined >= game.maxPlayers
										? "Full Game"
										: "Join Game"}
								</Button>

								<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
									<span>Hosted by {game.host.name}</span>
								</div>
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
