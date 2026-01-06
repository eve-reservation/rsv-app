import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { setHours, setMinutes } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { facilities, games, type Game } from "@/lib/data";
import { useGetFacilityById } from "~/hooks/use-facilities";
import { useCreateReservation } from "~/hooks/use-reservations";
import { BookingSummary } from "~/components/organisms/booking-summary";
import { BookingSteps } from "~/components/organisms/booking-steps";

export default function ConfirmPayment() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const facilityId = searchParams.get("facilityId");
	const isGameJoin = searchParams.get("type") === "game";
	const { mutate: createReservation, isPending: isCreatingReservation } = useCreateReservation();

	// Fetch real facility data if not a game join
	const { data: facilityData, isLoading } = useGetFacilityById(facilityId!, {
		fields: "identifier, subtype, displayName, metadata, status, createdAt, updatedAt, location, images",
	});

	// Helper to normalize data
	const getBookingItem = () => {
		if (isGameJoin) {
			const game = games.find((g) => g.id === facilityId);
			if (!game) return null;
			return game;
		}

		if (facilityData) {
			return {
				id: facilityData.id,
				name: facilityData.displayName || facilityData.identifier,
				type: facilityData.subtype || "Facility", // Use optional chaining
				images: (facilityData.images || []).map((img: any) =>
					typeof img === "string" ? img : img.url || "/placeholder.svg",
				),
				price: facilityData.price || 0,
				priceUnit: facilityData.priceUnit || "hour",
				capacity: facilityData.metadata?.maxOccupancy || 15,
				date: "", // Not applicable for facility directly
			};
		}

		return null;
	};

	const bookingItem = getBookingItem();

	// Get related facility for Game (to get rating/reviews if needed)
	// For now, if it's a facility booking, we don't have a separate "linkedFacility" object from the hook unless we fetch it or it's self.
	// But the UI uses linkedFacility for rating. Let's assume for facility booking, the item itself is the facility.
	const linkedFacility = isGameJoin
		? facilities.find((f) => f.id === (bookingItem as Game)?.facilityId)
		: bookingItem
			? { ...bookingItem, rating: 0, reviewCount: 0 }
			: null; // Mock rating for now

	const [activeStep, setActiveStep] = useState(isGameJoin ? 2 : 1);
	const [gameType, setGameType] = useState<"private" | "public">("private");
	// Determine max players based on item type
	const maxPlayers = isGameJoin
		? (bookingItem as Game)?.maxPlayers
		: (bookingItem as any)?.capacity || 15;

	const [players, setPlayers] = useState(() => {
		const guestParam = searchParams.get("guests");
		return guestParam ? parseInt(guestParam, 10) : 1;
	});
	const [paymentMethod, setPaymentMethod] = useState("gcash");
	const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
		if (isGameJoin && bookingItem) {
			return new Date(); // Game date string logic handled separately in display
		}
		const dateParam = searchParams.get("date");
		return dateParam ? new Date(dateParam) : new Date();
	});

	// Default time: 4:00 PM - 6:00 PM or specific params
	const [startTime, setStartTime] = useState<Date | undefined>(() => {
		const timeParam = searchParams.get("startTime"); // HH:mm
		if (timeParam) {
			const [hours, minutes] = timeParam.split(":").map(Number);
			return setMinutes(setHours(new Date(), hours), minutes);
		}
		return setMinutes(setHours(new Date(), 16), 0);
	});

	const [endTime, setEndTime] = useState<Date | undefined>(() => {
		const timeParam = searchParams.get("endTime"); // HH:mm
		if (timeParam) {
			const [hours, minutes] = timeParam.split(":").map(Number);
			return setMinutes(setHours(new Date(), hours), minutes);
		}
		return setMinutes(setHours(new Date(), 18), 0);
	});

	if (isLoading && !isGameJoin) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p>Loading booking details...</p>
			</div>
		);
	}

	if (!bookingItem) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p>Item not found</p>
			</div>
		);
	}

	const getDuration = () => {
		if (!startTime || !endTime) return 0;
		const diff = endTime.getTime() - startTime.getTime();
		return diff > 0 ? Number((diff / (1000 * 60 * 60)).toFixed(2)) : 0;
	};

	const duration = getDuration();

	// Price Calculation
	let totalPrice = 0;
	let calculationText = "";

	if (isGameJoin) {
		const game = bookingItem as Game;
		totalPrice = game.pricePerHead * players;
		calculationText = `₱${game.pricePerHead.toLocaleString()}/head x ${players} ${
			players === 1 ? "player" : "players"
		}`;
	} else {
		// Facility
		const facility = bookingItem as any;
		// For now assume price is per hour if unit is hour
		const price = facility.price;
		totalPrice = price * duration;
		calculationText = `₱${price.toLocaleString()}/${facility.priceUnit} x ${duration} ${
			duration === 1 ? "hour" : "hours"
		}`;
	}

	const serviceFee = 500;
	const grandTotal = totalPrice + serviceFee;

	const handleTimeChange = (start: Date, end: Date) => {
		setStartTime(start);
		setEndTime(end);
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Main Content */}
			<main className="mx-auto max-w-6xl px-6">
				{/* Page Title */}
				<div className="mb-8 flex items-center gap-4">
					<button
						onClick={() => navigate(-1)}
						className="rounded-full p-2 hover:bg-muted transition-colors">
						<ArrowLeft className="h-5 w-5" />
					</button>
					<h1 className="text-3xl font-semibold">Confirm and pay</h1>
				</div>

				{/* Reversed Layout: Booking Details (Left) | Steps (Right) */}
				<div className="grid gap-8 lg:grid-cols-2">
					<BookingSummary
						bookingItem={bookingItem}
						linkedFacility={linkedFacility}
						isGameJoin={isGameJoin}
						players={players}
						calculationText={calculationText}
						totalPrice={totalPrice}
						serviceFee={serviceFee}
						grandTotal={grandTotal}
					/>

					<BookingSteps
						isGameJoin={isGameJoin}
						activeStep={activeStep}
						setActiveStep={setActiveStep}
						gameType={gameType}
						setGameType={setGameType}
						isPromoModalOpen={isPromoModalOpen}
						setIsPromoModalOpen={setIsPromoModalOpen}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						startTime={startTime}
						endTime={endTime}
						onTimeChange={handleTimeChange}
						players={players}
						setPlayers={setPlayers}
						maxPlayers={maxPlayers}
						paymentMethod={paymentMethod}
						setPaymentMethod={setPaymentMethod}
						isPending={isCreatingReservation}
						onConfirm={() => {
							if (!facilityId || !startTime || !endTime) return;

							// Construct payload
							const payload = {
								facilityId: facilityId,
								guestCount: players,
								bookingPeriod: {
									startDateTime: startTime.toISOString(), // Ensure this date includes the date part correctly if selectedDate is different
									endDateTime: endTime.toISOString(),
									numberOfDays: 1, // Logic for multi-day can be added if needed, currently assumes single day/session
									numberOfHours: duration,
								},
							};

							createReservation(payload, {
								onSuccess: () => {
									navigate("/reservation/complete");
								},
								onError: (error) => {
									console.error("Failed to create reservation:", error);
									// Could show a toast or alert here
								},
							});
						}}
					/>
				</div>
			</main>
		</div>
	);
}
