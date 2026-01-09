import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PromoCodeModal } from "~/components/organisms/promo-code-modal";
import { BookingDetailsSelector } from "~/components/organisms/booking-details-selector";
import { Tag } from "lucide-react";
import { gcash, maya } from "@/assets/images";
import { useState } from "react";

interface BookingJoinStepsProps {
	activeStep: number;
	setActiveStep: (step: number) => void;
	isPromoModalOpen: boolean;
	setIsPromoModalOpen: (open: boolean) => void;
	selectedDate: Date | undefined;
	startTime: Date | undefined;
	endTime: Date | undefined;
	players: number;
	maxPlayers: number;
	paymentMethod: string;
	setPaymentMethod: (method: string) => void;
	onConfirm: () => void;
	isPending?: boolean;
}

export function BookingJoinSteps({
	activeStep,
	setActiveStep,
	isPromoModalOpen,
	setIsPromoModalOpen,
	selectedDate,
	startTime,
	endTime,
	players,
	maxPlayers,
	paymentMethod,
	setPaymentMethod,
	onConfirm,
	isPending = false,
}: BookingJoinStepsProps) {
	// Step 1 for Joiner is Review Date & Time (which was Step 2 in original)
	// We'll map internal steps: 1=ReviewDate, 2=Payment, 3=Review

	return (
		<div className="order-1 lg:order-2 space-y-2">
			<PromoCodeModal
				open={isPromoModalOpen}
				onOpenChange={setIsPromoModalOpen}
				onApply={(code) => {
					console.log("Applied code:", code);
				}}
			/>

			{/* Step 1: Review date & time (Joiner View) */}
			<Card className="overflow-hidden gap-0 p-0">
				<button
					onClick={() => setActiveStep(activeStep === 1 ? 0 : 1)}
					className="flex w-full items-center justify-between p-6">
					<h2 className="text-lg font-semibold">1. Review date & time</h2>
				</button>
				{activeStep === 1 && (
					<div className="px-6 pb-6">
						<BookingDetailsSelector
							date={selectedDate}
							setDate={() => {}} // Read-only
							startTime={startTime}
							endTime={endTime}
							onTimeChange={() => {}} // Read-only
							guests={players}
							setGuests={() => {}} // Read-only (usually joiner just joins as 1, or maybe invites friends? User said separate component, we'll keep it read only for now or allow changing guests if needed? Prompt said "bookingSteps for match joining". Usually you define how many spots you take.)
							// Actually, let's allow changing players if they are bringing guests?
							// Re-reading code: BookingDetailsSelector has `readOnly` prop.
							maxGuests={maxPlayers}
							guestLabel="Players"
							readOnly={true} // As per plan "Make Date/Time selection read-only"
						/>
						<div className="flex justify-end">
							<Button
								className="cursor-pointer mt-6 rounded-lg bg-foreground text-background hover:bg-foreground/90 py-4 px-8"
								onClick={() => setActiveStep(2)}>
								Next
							</Button>
						</div>
					</div>
				)}
			</Card>

			{/* Step 2: Select payment method */}
			<Card className="overflow-hidden gap-0 p-0">
				<button
					onClick={() => setActiveStep(activeStep === 2 ? 0 : 2)}
					className="flex w-full items-center justify-between p-6">
					<h2 className="text-lg font-semibold">2. Select payment method</h2>
				</button>
				{activeStep === 2 && (
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
								onClick={() => setActiveStep(3)}>
								Next
							</Button>
						</div>
					</div>
				)}
			</Card>

			{/* Step 3: Review your reservation */}
			<Card className="overflow-hidden p-0 gap-0">
				<button
					onClick={() => setActiveStep(activeStep === 3 ? 0 : 3)}
					className="flex w-full items-center justify-between p-6">
					<h2 className="text-lg font-semibold">3. Review your reservation</h2>
				</button>
				{activeStep === 3 && (
					<div className="px-6 pb-6">
						<p className="text-muted-foreground text-sm">
							Review your booking details before confirming your payment.
						</p>
						<div className="flex justify-end">
							<Button
								onClick={onConfirm}
								disabled={true} // "wont have a functionality"
								className="cursor-pointer mt-6 w-full rounded-lg qcsc-gradient text-white py-6 px-8 opacity-50">
								Confirm and pay (Disabled)
							</Button>
						</div>
					</div>
				)}
			</Card>
		</div>
	);
}
