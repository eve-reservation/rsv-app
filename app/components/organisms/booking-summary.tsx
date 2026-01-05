import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Game } from "@/lib/data";

interface BookingSummaryProps {
	bookingItem: any;
	linkedFacility: any;
	isGameJoin: boolean;
	players: number;
	calculationText: string;
	totalPrice: number;
	serviceFee: number;
	grandTotal: number;
}

export function BookingSummary({
	bookingItem,
	linkedFacility,
	isGameJoin,
	players,
	calculationText,
	totalPrice,
	serviceFee,
	grandTotal,
}: BookingSummaryProps) {
	return (
		<div className="order-2 lg:order-1">
			<Card className="sticky top-8 p-6">
				{/* Property Info */}
				<div className="flex gap-4 pb-6 border-b border-border">
					<div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg">
						<img
							src={bookingItem.images[0] || "/placeholder.svg"}
							alt={bookingItem.name}
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="flex flex-col justify-center">
						<h2 className="font-medium text-foreground">{bookingItem.name}</h2>
						<p className="text-sm text-muted-foreground">{bookingItem.type}</p>
						{linkedFacility && (
							<div className="mt-1 flex items-center gap-1 text-sm">
								<Star className="h-3 w-3 fill-foreground" />
								<span className="font-medium">{linkedFacility.rating}</span>
								<span className="text-muted-foreground">
									({linkedFacility.reviewCount})
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Cancellation Policy */}
				<div className="py-2 border-b border-border">
					<h3 className="font-semibold">Cancellation policy</h3>
					<p className="text-sm text-muted-foreground mt-1">
						Free cancellation up to 24 hours before your booking.
					</p>
					<button className="text-sm font-medium underline mt-1">Full policy</button>
				</div>

				{/* Date & Time */}
				<div className="py-2 border-b border-border">
					<h3 className="font-semibold">Date & Time</h3>
					<div className="text-sm text-muted-foreground mt-1">
						{isGameJoin ? (
							(bookingItem as Game).date // Use game string date
						) : (
							<p className="text-lg font-semibold mt-1">
								{(bookingItem as Game).date}
							</p>
						)}
					</div>
				</div>

				{/* Players */}
				<div className="py-2 border-b border-border">
					<h3 className="font-semibold">Players</h3>
					<p className="text-sm text-muted-foreground mt-1">
						{players} {players === 1 ? "player" : "players"}
					</p>
				</div>

				{/* Price Details */}
				<div className="py-2 border-b border-border">
					<h3 className="font-semibold mb-4">Price details</h3>
					<div className="flex justify-between text-sm mb-2">
						<span>{calculationText}</span>
						<span>₱{totalPrice.toLocaleString()}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span>Service fee</span>
						<span>₱{serviceFee.toLocaleString()}</span>
					</div>
				</div>

				{/* Total */}
				<div className="flex justify-between py-2">
					<div>
						<span className="font-semibold">Total</span>
						<span className="ml-1 text-sm underline">(PHP)</span>
					</div>
					<span className="font-semibold">₱{grandTotal.toLocaleString()}</span>
				</div>
			</Card>
		</div>
	);
}
