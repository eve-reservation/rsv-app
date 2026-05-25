import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PromoCodeModal } from "~/components/organisms/promo-code-modal";
import { BookingDetailsSelector } from "~/components/organisms/booking-details-selector";
import { Tag, Users, UserPlus } from "lucide-react";
import { gcash, maya } from "@/assets/images";
import { useState } from "react";
import type { GroupMember } from "./add-participants-modal";
import { AddParticipantsModal } from "./add-participants-modal";

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
	onConfirm: (data: { groupMembers: GroupMember[]; notes: string }) => void;
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
	// Step 1: Review Date
	// Step 2: Add Participants
	// Step 3: Payment
	// Step 4: Review & Confirm

	const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
	const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
	const [notes, setNotes] = useState("");

	return (
		<div className="order-1 lg:order-2 space-y-2">
			<PromoCodeModal
				open={isPromoModalOpen}
				onOpenChange={setIsPromoModalOpen}
				onApply={(code) => {
					console.log("Applied code:", code);
				}}
			/>

			<AddParticipantsModal
				open={isParticipantsModalOpen}
				onOpenChange={setIsParticipantsModalOpen}
				participants={groupMembers}
				onSave={setGroupMembers}
			/>

			{/* Step 1: Review date & time */}
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
							setDate={() => {}}
							startTime={startTime}
							endTime={endTime}
							onTimeChange={() => {}}
							guests={players}
							setGuests={() => {}} // Usually locked to 1 + groupMembers.length? Or just informative
							maxGuests={maxPlayers}
							guestLabel="Total Slots Needed"
							readOnly={true}
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

			{/* Step 2: Add Participants (Optional) */}
			<Card className="overflow-hidden gap-0 p-0">
				<button
					onClick={() => setActiveStep(activeStep === 2 ? 0 : 2)}
					className="flex w-full items-center justify-between p-6">
					<h2 className="text-lg font-semibold">2. Add participants (Optional)</h2>
				</button>
				{activeStep === 2 && (
					<div className="px-6 pb-6 space-y-4">
						<p className="text-sm text-muted-foreground">
							Bringing friends? Add their details here so they are included in the
							event roster.
						</p>

						<div className="flex items-center gap-4">
							<div className="flex-1 bg-muted/30 border rounded-lg p-3 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">
										{groupMembers.length}{" "}
										{groupMembers.length === 1 ? "Guest" : "Guests"} Added
									</span>
								</div>
								{groupMembers.length > 0 && (
									<span className="text-xs text-muted-foreground">
										(+ You = {groupMembers.length + 1} Total)
									</span>
								)}
							</div>
							<Button
								variant="outline"
								onClick={() => setIsParticipantsModalOpen(true)}
								className="gap-2">
								<UserPlus className="h-4 w-4" />
								Manage List
							</Button>
						</div>

						<div className="pt-2">
							<Label htmlFor="notes" className="text-sm font-medium mb-1.5 block">
								Notes for host (Optional)
							</Label>
							<Input
								id="notes"
								placeholder="E.g. We are bringing our own ball..."
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
							/>
						</div>

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
						<p className="text-muted-foreground text-sm mb-4">
							Review your booking details before confirming your payment.
						</p>
						<div className="bg-muted/20 p-4 rounded-lg space-y-2 text-sm border">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Participants</span>
								<span className="font-medium">
									{groupMembers.length + 1} (You + {groupMembers.length})
								</span>
							</div>
							{notes && (
								<div className="flex justify-between">
									<span className="text-muted-foreground">Notes</span>
									<span className="font-medium truncate max-w-[200px]">
										{notes}
									</span>
								</div>
							)}
						</div>

						<div className="flex justify-end">
							<Button
								onClick={() => onConfirm({ groupMembers, notes })}
								disabled={isPending}
								className="cursor-pointer mt-6 w-full rounded-lg qcsc-gradient text-white py-6 px-8">
								{isPending ? "Joining..." : "Confirm and pay"}
							</Button>
						</div>
					</div>
				)}
			</Card>
		</div>
	);
}
