import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { setHours, setMinutes } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { facilities, games, type Game } from "@/lib/data";
import { useGetFacilityById } from "~/hooks/use-facilities";
import { useCreateReservation } from "~/hooks/use-reservations";
import { useCreateMatchEvent } from "~/hooks/use-match-events";
import { BookingSummary } from "~/components/organisms/booking-summary";
import { BookingSteps } from "~/components/organisms/booking-steps";
import { useAuth } from "~/hooks/use-auth";

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

	const { user } = useAuth();

	// State Hooks (Must be before any early returns)
	const [activeStep, setActiveStep] = useState(isGameJoin ? 2 : 1);
	const [gameType, setGameType] = useState<"private" | "public">("private");
	const [paymentMethod, setPaymentMethod] = useState("gcash");
	const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
	const { mutate: createMatchEvent, isPending: isCreatingMatchEvent } = useCreateMatchEvent();
	const [matchEventData, setMatchEventData] = useState<any>(null);

	// Safe initialization even if bookingItem isn't ready yet (it will re-render when facilityData loads)
	const [players, setPlayers] = useState(() => {
		const guestParam = searchParams.get("guests");
		return guestParam ? parseInt(guestParam, 10) : 1;
	});

	const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
		// Logic handles temporary absence of bookingItem by falling back to date param or new Date()
		if (isGameJoin) {
			return new Date();
		}
		const dateParam = searchParams.get("date");
		return dateParam ? new Date(dateParam) : new Date();
	});

	const [startTime, setStartTime] = useState<Date | undefined>(() => {
		const timeParam = searchParams.get("startTime");
		if (timeParam) {
			const [hours, minutes] = timeParam.split(":").map(Number);
			return setMinutes(setHours(new Date(), hours), minutes);
		}
		return setMinutes(setHours(new Date(), 16), 0);
	});

	const [endTime, setEndTime] = useState<Date | undefined>(() => {
		const timeParam = searchParams.get("endTime");
		if (timeParam) {
			const [hours, minutes] = timeParam.split(":").map(Number);
			return setMinutes(setHours(new Date(), hours), minutes);
		}
		return setMinutes(setHours(new Date(), 18), 0);
	});

	const handleTimeChange = (start: Date, end: Date) => {
		setStartTime(start);
		setEndTime(end);
	};

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
				type: facilityData.subtype || "Facility",
				images: (facilityData.images || []).map((img: any) =>
					typeof img === "string" ? img : img.url || "/placeholder.svg",
				),
				price: facilityData.price || 0,
				priceUnit: facilityData.priceUnit || "hour",
				capacity: facilityData.metadata?.maxOccupancy || 15,
				date: "",
			};
		}

		return null;
	};

	const bookingItem = getBookingItem();

	// Determine max players based on item type AFTER hooks
	const maxPlayers = isGameJoin
		? (bookingItem as Game)?.maxPlayers
		: (bookingItem as any)?.capacity || 15;

	// ... rest of derived logic ...

	// Get related facility for Game
	const linkedFacility = isGameJoin
		? facilities.find((f) => f.id === (bookingItem as Game)?.facilityId)
		: bookingItem
			? { ...bookingItem, rating: 0, reviewCount: 0 }
			: null;
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

	// ... existing code ...

	return (
		<div className="bg-background">
			{/* Main Content */}
			<main className="mx-auto max-w-6xl px-6">
				{/* Page Title */}
				<div className="mb-4 pt-4 flex items-center gap-4">
					<button
						onClick={() => navigate(-1)}
						className="rounded-full p-2 hover:bg-muted transition-colors">
						<ArrowLeft className="h-5 w-5" />
					</button>
					<h1 className="text-3xl font-semibold">Confirm and pay</h1>
				</div>

				{/* Reversed Layout: Booking Details (Left) | Steps (Right) */}
				<div className="grid gap-6 lg:grid-cols-2">
					<BookingSummary
						bookingItem={bookingItem}
						linkedFacility={linkedFacility}
						isGameJoin={isGameJoin}
						players={players}
						calculationText={calculationText}
						totalPrice={totalPrice}
						serviceFee={serviceFee}
						grandTotal={grandTotal}
						selectedDate={selectedDate}
						startTime={startTime}
						endTime={endTime}
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
						isPending={isCreatingReservation || isCreatingMatchEvent}
						matchEventData={matchEventData}
						setMatchEventData={setMatchEventData}
						onConfirm={() => {
							if (gameType === "public" && !matchEventData) {
								toast.error("Please create event details first for public games");
								return;
							}

							if (!facilityId || !startTime || !endTime) return;

							// Construct payload
							const payload = {
								facilityId: facilityId,
								guestCount: players,
								user: {
									userId: user?.id,
									firstName: user?.metadata.person.personalInfo?.firstName,
									lastName: user?.metadata.person.personalInfo?.lastName,
									email: user?.email,
								},
								bookingPeriod: {
									startDateTime: startTime.toISOString(), // Ensure this date includes the date part correctly if selectedDate is different
									endDateTime: endTime.toISOString(),
									numberOfDays: 1, // Logic for multi-day can be added if needed, currently assumes single day/session
									numberOfHours: duration,
								},
							};

							createReservation(payload, {
								onSuccess: (responseData: any) => {
									console.log("Reservation created:", responseData);
									console.log("Game Type:", gameType);
									console.log("Match Event Data:", matchEventData);

									if (gameType === "public" && matchEventData) {
										console.log("Attempting to create match event...");
										// Helper to create match event after reservation
										const matchEventPayload = {
											...matchEventData,
											reservationId: responseData.id,
										};
										console.log("Match Event Payload:", matchEventPayload);

										createMatchEvent(matchEventPayload, {
											onSuccess: () => {
												navigate(
													`/reservation/complete?newReservation=${responseData.id}&type=public`,
												);
											},
											onError: (error) => {
												console.error(
													"Failed to create match event:",
													error,
												);
												toast.error(
													"Reservation created but failed to create event details",
												);
												// Navigate anyway but maybe show a toast that event creation failed?
												// For now, let's just navigate to complete page to avoid blocking the user
												navigate(
													`/reservation/complete?newReservation=${responseData.id}&eventCreationError=true`,
												);
											},
										});
									} else {
										navigate(
											`/reservation/complete?newReservation=${responseData.id}`,
										);
									}
								},
								onError: (error) => {
									console.error("Failed to create reservation:", error);
									toast.error("Failed to create reservation");
								},
							});
						}}
					/>
				</div>
			</main>
		</div>
	);
}
