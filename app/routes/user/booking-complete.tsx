import { Check, Calendar, Users, MapPin, MessageSquare, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lebronCourt } from "@/assets/images/index";
import { useGetReservationById } from "~/hooks/use-reservations";
import { useSearchParams } from "react-router";
import { format } from "date-fns";
import { Link } from "react-router";

export default function BookingConfirmation() {
	const [searchParams, setSearchParams] = useSearchParams();
	const reservationId = searchParams.get("newReservation");
	const { data: reservation, isLoading } = useGetReservationById(reservationId!, {
		fields: "id, status, confirmationCode, reservationNumber, bookingPeriod, facility.id, facility.identifier, facility.displayName, facility.subtype, facility.metadata, facility.facilityType.name",
	});

	if (isLoading) {
		return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
	}

	if (!reservation) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Reservation not found
			</div>
		);
	}

	const { confirmationCode, facility, bookingPeriod, reservationNumber } = reservation;
	const start = new Date(bookingPeriod.startDateTime);
	const end = new Date(bookingPeriod.endDateTime);

	return (
		<main className="bg-background">
			{/* Navbar placeholder if needed, but we assume it's in a layout */}

			<div className="max-w-6xl mx-auto px-6 py-6">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
					{/* Left Column: Confirmation Details */}
					<div>
						{/* Success Header */}
						<div className="mb-8">
							{/* <div className="mb-6 inline-flex items-center justify-center p-3 bg-green-100 rounded-full">
								<Check className="w-8 h-8 text-green-600" />
							</div> */}
							<h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
								Your reservation is confirmed
							</h1>
							<p className="text-lg text-muted-foreground">
								You're going to Taguig, Metro Manila!
							</p>
						</div>

						<div className="py-6 border-t border-b border-border mb-8 grid grid-cols-1 gap-4">
							{/* <div>
								<p className="text-sm font-medium text-muted-foreground mb-1">
									Confirmation code
								</p>
								<p className="text-xl font-mono font-semibold tracking-wide">
									{confirmationCode || "PENDING"}
								</p>
							</div> */}
							<div>
								<p className="text-sm font-medium text-muted-foreground mb-1">
									Reservation No.
								</p>
								<p className="text-xl font-mono font-semibold tracking-wide">
									{reservationNumber}
								</p>
							</div>
						</div>

						{/* What's Next / Guidance */}
						<div className="space-y-8">
							<section>
								<h3 className="text-xl font-semibold mb-4">
									What you need to know
								</h3>
								<div className="space-y-6">
									<div className="flex gap-4">
										<MessageSquare className="w-6 h-6 text-foreground shrink-0" />
										<div>
											<p className="font-medium text-foreground">
												Message the host
											</p>
											<p className="text-muted-foreground text-sm">
												Coordinate check-in details with the venue manager.
											</p>
										</div>
									</div>
									<div className="flex gap-4">
										<ShieldCheck className="w-6 h-6 text-foreground shrink-0" />
										<div>
											<p className="font-medium text-foreground">
												Court Rules
											</p>
											<p className="text-muted-foreground text-sm">
												Wear proper shoes, bring your own ball, and respect
												the court.
											</p>
										</div>
									</div>
									<div className="flex gap-4">
										<Clock className="w-6 h-6 text-foreground shrink-0" />
										<div>
											<p className="font-medium text-foreground">Check-in</p>
											<p className="text-muted-foreground text-sm">
												Please arrive 15 minutes before your scheduled time.
											</p>
										</div>
									</div>
								</div>
							</section>

							<div className="pt-8">
								<div className="flex flex-col sm:flex-row gap-4">
									<Link to="/profile?tab=reservations">
										<Button size="lg" className="rounded-lg text-base px-8">
											View booking
										</Button>
									</Link>
									<Link to="/">
										<Button
											size="lg"
											variant="outline"
											className="rounded-lg text-base px-8 border-foreground text-foreground hover:bg-muted w-full sm:w-auto">
											Explore activities
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column: Reservation Summary */}
					<div className="relative">
						<div className="border border-border rounded-xl p-6 md:p-8 sticky top-8">
							<div className="flex gap-4 mb-6 pb-6 border-b border-border">
								<img
									src={lebronCourt}
									alt={facility.displayName}
									className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-muted"
								/>
								<div className="flex flex-col justify-center">
									<p className="text-sm text-muted-foreground mb-1">
										{facility.subtype || facility.facilityType?.name}
									</p>
									<h2 className="text-lg font-semibold mb-1">
										{facility.displayName}
									</h2>
									<div className="flex items-center text-sm text-muted-foreground">
										<MapPin className="w-3 h-3 mr-1" />
										Taguig
									</div>
								</div>
							</div>

							<div className="space-y-4 text-sm md:text-base">
								<div className="flex justify-between py-2 border-b border-border">
									<div className="flex items-center gap-2">
										<Calendar className="w-4 h-4 text-muted-foreground" />
										<span className="font-medium">Date</span>
									</div>
									<span className="text-muted-foreground">
										{format(start, "MMM dd, yyyy")}
									</span>
								</div>
								<div className="flex justify-between py-2 border-b border-border">
									<div className="flex items-center gap-2">
										<Clock className="w-4 h-4 text-muted-foreground" />
										<span className="font-medium">Time</span>
									</div>
									<span className="text-muted-foreground">
										{format(start, "h:mm a")} - {format(end, "h:mm a")}
									</span>
								</div>
								<div className="flex justify-between py-2 border-b border-border">
									<div className="flex items-center gap-2">
										<Users className="w-4 h-4 text-muted-foreground" />
										<span className="font-medium">Players</span>
									</div>
									<span className="text-muted-foreground">
										{reservation.guests?.length || 1} players
									</span>
								</div>
							</div>

							<div className="mt-8 pt-4">
								<h3 className="font-semibold mb-4 text-lg">Payment details</h3>
								<div className="space-y-2 text-sm md:text-base">
									<div className="flex justify-between mb-2">
										<span className="text-muted-foreground">
											₱{(facility.metadata?.price || 0).toLocaleString()} x{" "}
											{bookingPeriod.numberOfHours} hours
										</span>
										<span>
											₱
											{(
												(facility.metadata?.price || 0) *
												bookingPeriod.numberOfHours
											).toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between mb-2">
										<span className="text-muted-foreground">Service fee</span>
										<span>₱500</span>
									</div>
									<div className="flex justify-between pt-4 mt-2 border-t border-border font-bold text-lg">
										<span>Total (PHP)</span>
										<span>
											₱
											{(
												(facility.metadata?.price || 0) *
													bookingPeriod.numberOfHours +
												500
											).toLocaleString()}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
