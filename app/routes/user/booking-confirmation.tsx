import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { setHours, setMinutes } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatEnum, RATE_UNIT_MAP } from "~/lib/utils";
import { useGetFacilityById } from "~/hooks/use-facilities";
import {
	useCreateMatchEvent,
	useGetMatchEventById,
	useJoinMatchEvent,
} from "~/hooks/use-match-events";
import { useCreateReservation } from "~/hooks/use-reservations";
import { BookingSummary } from "~/components/organisms/booking-summary";
import { BookingSteps } from "~/components/organisms/booking-steps";
import { BookingJoinSteps } from "~/components/organisms/booking-join-steps";
import { useAuth } from "~/hooks/use-auth";

export default function ConfirmPayment() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const facilityId = searchParams.get("facilityId");
	const matchEventId = searchParams.get("matchEventId");
	const isGameJoin = searchParams.get("type") === "game";
	const { mutate: createReservation, isPending: isCreatingReservation } = useCreateReservation();

	// Fetch match event data if joining a game
	const { data: matchEventResponse, isLoading: isLoadingMatchEvent } = useGetMatchEventById(
		matchEventId!,
		{
			fields: "id, title, maxParticipants, description, participants, reservation.facility, reservation.bookingPeriod",
		},
		{ enabled: !!matchEventId },
	);
	const matchEvent = matchEventResponse?.matchEvent;

	// Fetch real facility data if not joining via match event (or if we need standalone facility data)
	const { data: facilityData, isLoading: isLoadingFacility } = useGetFacilityById(
		facilityId!,
		{
			fields: "identifier, subtype, displayName, metadata, rateType, status, createdAt, updatedAt, location, images, price, priceUnit",
		},
		{ enabled: !matchEventId && !!facilityId },
	);

	const { user } = useAuth();

	// State Hooks (Must be before any early returns)
	const [activeStep, setActiveStep] = useState(isGameJoin ? 2 : 1);
	const [gameType, setGameType] = useState<"private" | "public">("private");
	const [paymentMethod, setPaymentMethod] = useState("gcash");
	const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
	const { mutate: createMatchEvent, isPending: isCreatingMatchEvent } = useCreateMatchEvent();
	const { mutate: joinMatchEvent, isPending: isJoining } = useJoinMatchEvent();
	const [matchEventData, setMatchEventData] = useState<any>(null);

	// Safe initialization
	const [players, setPlayers] = useState(() => {
		const guestParam = searchParams.get("guests");
		return guestParam ? parseInt(guestParam, 10) : 1;
	});

	// Date/Time State
	// If joining game, derive from match event (handled in render/derived vars usually, but we need state for non-game flow)
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
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

	const isLoading = isLoadingMatchEvent || isLoadingFacility;

	// Helper to normalize data
	const getBookingItem = () => {
		if (matchEventId && matchEvent) {
			const facility = matchEvent.reservation.facility;
			return {
				id: matchEvent.id,
				name: matchEvent.title,
				type: "Public Game",
				// Use facility image or placeholder
				images: (facility.images || []).map((img: any) =>
					typeof img === "string" ? img : img.url || "/placeholder.svg",
				),
				// Use facility price for now (per head calculation done later)
				// Assuming facility.metadata has price, or we need rateType from facility
				// The fetch above for matchEvent included reservation.facility.
				// Need to ensure facility object has rateType or metadata.price
				price: facility.rateType?.baseRate || facility.metadata?.price || 0,
				priceUnit: facility.rateType?.rateUnit
					? RATE_UNIT_MAP[facility.rateType.rateUnit] ||
						formatEnum(facility.rateType.rateUnit)
					: facility.metadata?.priceUnit || "head",
				capacity: matchEvent.maxParticipants,
				facilityId: facility.id, // Keep track of actual facility ID
			};
		}

		if (facilityData) {
			return {
				id: facilityData.id,
				name: facilityData.displayName || facilityData.identifier,
				type: facilityData.subtype || "Facility",
				images: (facilityData.images || []).map((img: any) =>
					typeof img === "string" ? img : img.url || "/placeholder.svg",
				),
				price: facilityData.rateType?.baseRate || 0,
				priceUnit:
					RATE_UNIT_MAP[facilityData.rateType?.rateUnit ?? ""] ||
					formatEnum(facilityData.rateType?.rateUnit) ||
					"hour",
				capacity: facilityData.metadata?.maxOccupancy || 15,
				facilityId: facilityData.id,
			};
		}

		return null;
	};

	const bookingItem = getBookingItem();

	// Effect to update date/time from match event if loaded
	if (matchEventId && matchEvent && bookingItem) {
		const eventStart = new Date(matchEvent.reservation.bookingPeriod.startDateTime);
		const eventEnd = new Date(matchEvent.reservation.bookingPeriod.endDateTime);

		// Only update if different to avoid infinite render loops?
		// Actually, better to just use derived values for display if isGameJoin
	}

	// Use derived values for display if Game Join to ensure we show Event time
	const displayDate =
		isGameJoin && matchEvent
			? new Date(matchEvent.reservation.bookingPeriod.startDateTime)
			: selectedDate;
	const displayStartTime =
		isGameJoin && matchEvent
			? new Date(matchEvent.reservation.bookingPeriod.startDateTime)
			: startTime;
	const displayEndTime =
		isGameJoin && matchEvent
			? new Date(matchEvent.reservation.bookingPeriod.endDateTime)
			: endTime;

	// Determine max players based on item type AFTER hooks
	const maxPlayers = (bookingItem as any)?.capacity || 15;

	if (isLoading) {
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
		const start = displayStartTime;
		const end = displayEndTime;
		if (!start || !end) return 0;
		const diff = end.getTime() - start.getTime();
		return diff > 0 ? Number((diff / (1000 * 60 * 60)).toFixed(2)) : 0;
	};

	const duration = getDuration();

	// Price Calculation
	let totalPrice = 0;
	let calculationText = "";

	if (isGameJoin) {
		// Game Join: Price per head * players
		// Assume price in bookingItem is per head or per session?
		// Usually for Public Game, it's shared cost or fixed fee per head.
		// Using price from bookingItem (derived from facility)
		const price = bookingItem.price;
		totalPrice = price * players; // Assuming price is per head for game join context
		// Adjust text based on unit. If unit is 'hour', and it's a game, is it split?
		// For simplicity/safety, let's assume the displayed price is the "Per Head" price for this event
		// Or if it's hourly facility price, we need to know how it's split.
		// Reverting to simple: Price * Players (as per previous mock logic)
		calculationText = `₱${price.toLocaleString()}/head x ${players} ${
			players === 1 ? "player" : "players"
		}`;
	} else {
		// Facility
		const price = bookingItem.price;
		totalPrice = price * duration;
		calculationText = `₱${price.toLocaleString()}/${bookingItem.priceUnit} x ${duration} ${
			duration === 1 ? "hour" : "hours"
		}`;
	}

	const serviceFee = 500;
	const grandTotal = totalPrice + serviceFee;

	// Target Facility ID for reservation
	const targetFacilityId = bookingItem.facilityId;

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
						linkedFacility={null}
						isGameJoin={isGameJoin}
						players={players}
						calculationText={calculationText}
						totalPrice={totalPrice}
						serviceFee={serviceFee}
						grandTotal={grandTotal}
						selectedDate={displayDate}
						startTime={displayStartTime}
						endTime={displayEndTime}
					/>

					{isGameJoin ? (
						<BookingJoinSteps
							activeStep={activeStep}
							setActiveStep={setActiveStep}
							isPromoModalOpen={isPromoModalOpen}
							setIsPromoModalOpen={setIsPromoModalOpen}
							selectedDate={displayDate}
							startTime={displayStartTime}
							endTime={displayEndTime}
							players={players}
							maxPlayers={maxPlayers}
							paymentMethod={paymentMethod}
							setPaymentMethod={setPaymentMethod}
							onConfirm={(data) => {
								if (!matchEventId || !user) {
									toast.error("Missing event or user information");
									return;
								}

								// Construct Join Payload
								// Payload requirements: matchEventId, user, notes, groupMembers
								const payload = {
									matchEventId: matchEventId,
									user: {
										userId: user.id,
										firstName:
											user.metadata.person.personalInfo?.firstName || "",
										lastName: user.metadata.person.personalInfo?.lastName || "",
										email: user.email,
									},
									notes: data.notes || "",
									groupMembers: data.groupMembers,
								};

								joinMatchEvent(
									{ matchEventId, data: payload },
									{
										onSuccess: (responseData: any) => {
											// Assuming responseData contains some confirmation ID or we just need to know it succeeded
											// Navigate to completion page. Maybe pass type=public_join?
											// Or maybe reuse creation success page but with different context?
											// Let's pass 'newReservation' as the matchEventId just for display or a fake ID if not provided,
											// because the completion page likely expects a reservation ID.
											// If join returns a reservation object, use that ID.
											// Assuming it returns the updated match event or a reservation.
											// For now, let's use matchEventId as the reference ID if API doesn't return one clearly.
											const refId =
												responseData?.reservationId ||
												responseData?.id ||
												matchEventId;
											navigate(
												`/reservation/complete?newReservation=${refId}&type=public`,
											);
										},
										onError: (error) => {
											console.error("Failed to join match event:", error);
											toast.error("Failed to join the match event");
										},
									},
								);
							}}
							isPending={isJoining}
						/>
					) : (
						<BookingSteps
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
								if (!isGameJoin && gameType === "public" && !matchEventData) {
									toast.error(
										"Please create event details first for public games",
									);
									return;
								}

								if (!targetFacilityId || !displayStartTime || !displayEndTime)
									return;

								// Construct payload
								const payload = {
									facilityId: targetFacilityId,
									guestCount: players,
									user: {
										userId: user?.id,
										firstName: user?.metadata.person.personalInfo?.firstName,
										lastName: user?.metadata.person.personalInfo?.lastName,
										email: user?.email,
									},
									bookingPeriod: {
										startDateTime: displayStartTime.toISOString(),
										endDateTime: displayEndTime.toISOString(),
										numberOfDays: 1,
										numberOfHours: duration,
									},
									// If joining, maybe pass matchEventId in metadata or something?
									metadata: matchEventId ? { matchEventId } : {},
								};

								createReservation(payload, {
									onSuccess: (responseData: any) => {
										if (
											!isGameJoin &&
											gameType === "public" &&
											matchEventData
										) {
											// ... Create Match Event Logic (Same as before)
											const matchEventPayload = {
												...matchEventData,
												status: "OPEN",
												reservationId: responseData.id,
												createdBy: {
													userId: user?.id,
													firstName:
														user?.metadata.person.personalInfo
															?.firstName,
													lastName:
														user?.metadata.person.personalInfo
															?.lastName,
													email: user?.email,
												},
											};
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
													navigate(
														`/reservation/complete?newReservation=${responseData.id}&eventCreationError=true`,
													);
												},
											});
										} else {
											// Normal booking or Game Join success
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
					)}
				</div>
			</main>
		</div>
	);
}
