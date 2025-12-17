import { useState } from "react";
import { ArrowLeft, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { lebronCourt } from "@/assets/images/index";
import { format, setHours, setMinutes } from "date-fns";
import { BookingDetailsSelector } from "~/components/organisms/booking-details-selector";

export default function ConfirmPayment() {
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = useState(1);
	const [gameType, setGameType] = useState<"private" | "public">("private");
	const [players, setPlayers] = useState(10);
	const maxPlayers = 15;
	const [paymentMethod, setPaymentMethod] = useState("gcash");
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 11, 20));
	// Default time: 4:00 PM - 6:00 PM
	const [startTime, setStartTime] = useState<Date | undefined>(
		setMinutes(setHours(new Date(), 16), 0),
	);
	const [endTime, setEndTime] = useState<Date | undefined>(
		setMinutes(setHours(new Date(), 18), 0),
	);

	const handleTimeChange = (start: Date, end: Date) => {
		setStartTime(start);
		setEndTime(end);
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Main Content */}
			<main className="mx-auto max-w-6xl px-6 py-8">
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
					{/* Left Column - Booking Details */}
					<div className="order-2 lg:order-1">
						<Card className="sticky top-8 p-6">
							{/* Property Info */}
							<div className="flex gap-4 pb-6 border-b border-border">
								<div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg">
									<img
										src={lebronCourt}
										alt="BGC Full Court"
										className="object-cover w-full h-full"
									/>
								</div>
								<div className="flex flex-col justify-center">
									<h2 className="font-medium text-foreground">BGC Full Court</h2>
									<p className="text-sm text-muted-foreground">Basketball</p>
									<div className="mt-1 flex items-center gap-1 text-sm">
										<Star className="h-3 w-3 fill-foreground" />
										<span className="font-medium">4.8</span>
										<span className="text-muted-foreground">(154)</span>
									</div>
								</div>
							</div>

							{/* Cancellation Policy */}
							<div className="py-2 border-b border-border">
								<h3 className="font-semibold">Cancellation policy</h3>
								<p className="text-sm text-muted-foreground mt-1">
									Free cancellation up to 24 hours before your booking.
								</p>
								<button className="text-sm font-medium underline mt-1">
									Full policy
								</button>
							</div>

							{/* Date & Time */}
							<div className="py-2 border-b border-border">
								<h3 className="font-semibold">Date & Time</h3>
								<p className="text-sm text-muted-foreground mt-1">
									December 20, 2025 • 4:00 PM - 6:00 PM
								</p>
							</div>

							{/* Players */}
							<div className="py-2 border-b border-border">
								<h3 className="font-semibold">Players</h3>
								<p className="text-sm text-muted-foreground mt-1">
									{players} players
								</p>
							</div>

							{/* Price Details */}
							<div className="py-2 border-b border-border">
								<h3 className="font-semibold mb-4">Price details</h3>
								<div className="flex justify-between text-sm mb-2">
									<span>₱4,500/hour x 2 hours</span>
									<span>₱9,000</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Service fee</span>
									<span>₱500</span>
								</div>
							</div>

							{/* Total */}
							<div className="flex justify-between py-2">
								<div>
									<span className="font-semibold">Total</span>
									<span className="ml-1 text-sm underline">(PHP)</span>
								</div>
								<span className="font-semibold">₱9,500</span>
							</div>
						</Card>
					</div>

					{/* Right Column - Accordion Steps */}
					<div className="order-1 lg:order-2 space-y-2">
						{/* Step 1: Choose game type */}
						<Card className="overflow-hidden gap-0 p-0">
							<button
								onClick={() => setActiveStep(activeStep === 1 ? 0 : 1)}
								className="flex w-full items-center justify-between p-6">
								<h2 className="text-lg font-semibold">1. Choose game type</h2>
							</button>
							{activeStep === 1 && (
								<div className="px-6 pb-6">
									<RadioGroup
										value={gameType}
										onValueChange={(value) =>
											setGameType(value as "private" | "public")
										} // Fixed type error
									>
										<div
											className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
												gameType === "private"
													? "border-foreground"
													: "border-border"
											}`}
											onClick={() => setGameType("private")}>
											<div className="flex flex-col gap-1">
												<Label
													htmlFor="private"
													className="cursor-pointer font-medium">
													Private
												</Label>
												<p className="text-sm text-muted-foreground">
													Book the entire court for your group
												</p>
											</div>
											<RadioGroupItem value="private" id="private" />
										</div>
										<div
											className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
												gameType === "public"
													? "border-foreground"
													: "border-border"
											}`}
											onClick={() => setGameType("public")}>
											<div className="flex flex-col gap-1">
												<Label
													htmlFor="public"
													className="cursor-pointer font-medium">
													Public
												</Label>
												<p className="text-sm text-muted-foreground">
													Host a game and let others join you
												</p>
											</div>
											<RadioGroupItem value="public" id="public" />
										</div>
									</RadioGroup>
									<div className="flex justify-end">
										<Button
											className="mt-6 rounded-lg bg-foreground text-background hover:bg-foreground/90 py-4 px-8"
											onClick={() => setActiveStep(2)}>
											Next
										</Button>
									</div>
								</div>
							)}
						</Card>

						{/* Step 2: Review date, time, and players */}
						<Card className="overflow-hidden gap-0 p-0">
							<button
								onClick={() => setActiveStep(activeStep === 2 ? 0 : 2)}
								className="flex w-full items-center justify-between p-6">
								<h2 className="text-lg font-semibold">2. Review date & time</h2>
							</button>
							{activeStep === 2 && (
								<div className="px-6 pb-6">
									{/* Date & Time Selection */}
									<BookingDetailsSelector
										date={selectedDate}
										setDate={setSelectedDate}
										startTime={startTime}
										endTime={endTime}
										onTimeChange={handleTimeChange}
										guests={players}
										setGuests={setPlayers}
										maxGuests={maxPlayers}
										guestLabel="Players"
									/>
									<div className="flex justify-end">
										<Button
											className="mt-6 rounded-lg bg-foreground text-background hover:bg-foreground/90 py-4 px-8"
											onClick={() => setActiveStep(3)}>
											Next
										</Button>
									</div>
								</div>
							)}
						</Card>

						{/* Step 3: Select payment method */}
						<Card className="overflow-hidden gap-0 p-0">
							<button
								onClick={() => setActiveStep(activeStep === 3 ? 0 : 3)}
								className="flex w-full items-center justify-between p-6">
								<h2 className="text-lg font-semibold">3. Select payment method</h2>
							</button>
							{activeStep === 3 && (
								<div className="px-6 pb-6">
									<RadioGroup
										value={paymentMethod}
										onValueChange={setPaymentMethod}>
										<div
											className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
												paymentMethod === "gcash"
													? "border-foreground"
													: "border-border"
											}`}
											onClick={() => setPaymentMethod("gcash")}>
											<Label
												htmlFor="gcash"
												className="flex-1 cursor-pointer font-medium">
												GCash
											</Label>
											<RadioGroupItem value="gcash" id="gcash" />
										</div>
										<div
											className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
												paymentMethod === "maya"
													? "border-foreground"
													: "border-border"
											}`}
											onClick={() => setPaymentMethod("maya")}>
											<Label
												htmlFor="maya"
												className="flex-1 cursor-pointer font-medium">
												Maya
											</Label>
											<RadioGroupItem value="maya" id="maya" />
										</div>
										<div
											className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
												paymentMethod === "card"
													? "border-foreground"
													: "border-border"
											}`}
											onClick={() => setPaymentMethod("card")}>
											<Label
												htmlFor="card"
												className="flex-1 cursor-pointer font-medium">
												Credit or debit card
											</Label>
											<RadioGroupItem value="card" id="card" />
										</div>
									</RadioGroup>
									<div className="flex justify-end">
										<Button
											className="mt-6 rounded-lg bg-foreground text-background hover:bg-foreground/90 py-4 px-8"
											onClick={() => setActiveStep(4)}>
											Next
										</Button>
									</div>
								</div>
							)}
						</Card>

						{/* Step 4: Review your reservation */}
						<Card className="overflow-hidden p-0">
							<button
								onClick={() => setActiveStep(activeStep === 4 ? 0 : 4)}
								className="flex w-full items-center justify-between p-6">
								<h2 className="text-lg font-semibold">
									4. Review your reservation
								</h2>
							</button>
							{activeStep === 4 && (
								<div className="px-6 pb-6">
									<p className="text-muted-foreground">
										Review your booking details before confirming your payment.
									</p>
									<div className="flex justify-end">
										<Button
											onClick={() => navigate("/booking/complete")}
											className="mt-6 w-full rounded-lg qcsc-gradient text-white  py-6 px-8">
											Confirm and pay
										</Button>
									</div>
								</div>
							)}
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
