import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PromoCodeModal } from "~/components/organisms/promo-code-modal";
import { BookingDetailsSelector } from "~/components/organisms/booking-details-selector";
import { Tag } from "lucide-react";
import { gcash, maya } from "@/assets/images";
import { useAuth } from "~/hooks/use-auth";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { CreateEventModal } from "./create-event-modal";
import { PublicEventCard } from "./public-event-card";

interface BookingStepsProps {
	activeStep: number;
	setActiveStep: (step: number) => void;
	gameType: "private" | "public";
	setGameType: (type: "private" | "public") => void;
	isPromoModalOpen: boolean;
	setIsPromoModalOpen: (open: boolean) => void;
	selectedDate: Date | undefined;
	setSelectedDate: (date: Date | undefined) => void;
	startTime: Date | undefined;
	endTime: Date | undefined;
	onTimeChange: (start: Date, end: Date) => void;
	players: number;
	setPlayers: (guests: number) => void;
	maxPlayers: number;
	paymentMethod: string;
	setPaymentMethod: (method: string) => void;
	onConfirm: () => void;
	isPending?: boolean;
	matchEventData: any;
	setMatchEventData: (data: any) => void;
}

export function BookingSteps({
	activeStep,
	setActiveStep,
	gameType,
	setGameType,
	isPromoModalOpen,
	setIsPromoModalOpen,
	selectedDate,
	setSelectedDate,
	startTime,
	endTime,
	onTimeChange,
	players,
	setPlayers,
	maxPlayers,
	paymentMethod,
	setPaymentMethod,
	onConfirm,
	isPending = false,
	matchEventData,
	setMatchEventData,
}: BookingStepsProps) {
	const { user } = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

	const handleNextStep1 = () => {
		if (!user) {
			setSearchParams((prev) => {
				const params = new URLSearchParams(prev);
				params.set("action", "signin");
				return params;
			});
		} else {
			if (gameType === "public" && !matchEventData) {
				setIsCreateEventOpen(true);
				return;
			}
			setActiveStep(2);
		}
	};

	const handleConfirm = () => {
		onConfirm();
	};

	return (
		<div className="order-1 lg:order-2 space-y-2">
			{/* Step 1: Choose reservation type */}
			<Card className="overflow-hidden gap-0 p-0">
				<button
					onClick={() => setActiveStep(activeStep === 1 ? 0 : 1)}
					className="flex w-full items-center justify-between p-6">
					<h2 className="text-lg font-semibold">1. Choose reservation type</h2>
				</button>
				{activeStep === 1 && (
					<div className="px-6 pb-6">
						<RadioGroup
							value={gameType}
							onValueChange={(value) => setGameType(value as "private" | "public")}>
							<div
								className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
									gameType === "private" ? "border-foreground" : "border-border"
								}`}
								onClick={() => setGameType("private")}>
								<div className="flex flex-col gap-1">
									<Label htmlFor="private" className="cursor-pointer font-medium">
										Private
									</Label>
									<p className="text-sm text-muted-foreground">
										Book the entire facility for your group
									</p>
								</div>
								<RadioGroupItem value="private" id="private" />
							</div>
							<div
								className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
									gameType === "public" ? "border-foreground" : "border-border"
								}`}
								onClick={() => setGameType("public")}>
								<div className="flex flex-col gap-1">
									<Label htmlFor="public" className="cursor-pointer font-medium">
										Public
									</Label>
									<p className="text-sm text-muted-foreground">
										Host a facility and let others join you
									</p>
								</div>
								<RadioGroupItem value="public" id="public" />
							</div>
						</RadioGroup>

						{gameType === "public" && (
							<PublicEventCard
								matchEventData={matchEventData}
								onEdit={() => setIsCreateEventOpen(true)}
							/>
						)}

						<div className="flex items-center justify-end mt-6">
							<Button
								className="cursor-pointer rounded-lg bg-foreground text-background hover:bg-foreground/90 py-4 px-8"
								onClick={handleNextStep1}
								disabled={gameType === "public" && !matchEventData}>
								Next
							</Button>
						</div>
					</div>
				)}
			</Card>

			<CreateEventModal
				open={isCreateEventOpen}
				onOpenChange={setIsCreateEventOpen}
				onSave={setMatchEventData}
				initialData={matchEventData}
			/>

			<PromoCodeModal
				open={isPromoModalOpen}
				onOpenChange={setIsPromoModalOpen}
				onApply={(code) => {
					console.log("Applied code:", code);
				}}
			/>

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
							onTimeChange={onTimeChange}
							guests={players}
							setGuests={setPlayers}
							maxGuests={maxPlayers}
							guestLabel="Players"
						/>
						<div className="flex justify-end">
							<Button
								className="cursor-pointer mt-6 rounded-lg bg-foreground text-background hover:bg-foreground/90 py-4 px-8"
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
						<RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
							<div
								className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
									paymentMethod === "gcash"
										? "border-foreground"
										: "border-border"
								}`}
								onClick={() => setPaymentMethod("gcash")}>
								<div className="w-20 h-full">
									<img src={gcash} alt="GCash" />
								</div>
								<RadioGroupItem value="gcash" id="gcash" />
							</div>
							<div
								className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
									paymentMethod === "maya" ? "border-foreground" : "border-border"
								}`}
								onClick={() => setPaymentMethod("maya")}>
								<div className="w-14 h-full">
									<img src={maya} alt="Maya" />
								</div>
								<RadioGroupItem value="maya" id="maya" />
							</div>
							<div
								className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-colors ${
									paymentMethod === "card" ? "border-foreground" : "border-border"
								}`}
								onClick={() => setPaymentMethod("card")}>
								<Label htmlFor="card" className="flex-1 cursor-pointer font-medium">
									Credit or debit card
								</Label>
								<RadioGroupItem value="card" id="card" />
							</div>
						</RadioGroup>
						<div className="flex items-center justify-between mt-6">
							<button
								className="cursor-pointer text-sm font-medium text-primary hover:underline flex items-center gap-2 transition-colors"
								onClick={() => setIsPromoModalOpen(true)}>
								<Tag className="w-4 h-4" />I have a promo code
							</button>
							<Button
								className="cursor-pointer rounded-lg bg-foreground text-background hover:bg-foreground/90 py-4 px-8"
								onClick={() => setActiveStep(4)}>
								Next
							</Button>
						</div>
					</div>
				)}
			</Card>

			{/* Step 4: Review your reservation */}
			<Card className="overflow-hidden p-0 gap-0">
				<button
					onClick={() => setActiveStep(activeStep === 4 ? 0 : 4)}
					className="flex w-full items-center justify-between p-6">
					<h2 className="text-lg font-semibold">4. Review your reservation</h2>
				</button>
				{activeStep === 4 && (
					<div className="px-6 pb-6">
						<p className="text-muted-foreground text-sm">
							Review your booking details before confirming your payment.
						</p>
						<div className="flex justify-end">
							<Button
								onClick={handleConfirm}
								disabled={isPending}
								className="cursor-pointer mt-6 w-full rounded-lg qcsc-gradient text-white py-6 px-8">
								{isPending ? "Processing..." : "Confirm and pay"}
							</Button>
						</div>
					</div>
				)}
			</Card>
		</div>
	);
}
