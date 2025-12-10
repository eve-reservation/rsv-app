"use client";

import { useState } from "react";
import { ArrowLeft, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ConfirmPayment() {
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = useState(1);
	const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>({
		from: new Date(2026, 0, 9),
		to: new Date(2026, 0, 11),
	});
	const [guests, setGuests] = useState(1);
	const maxGuests = 4; // Assuming a max capacity for the suite
	const [paymentMethod, setPaymentMethod] = useState("card");

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
										src="https://a0.muscache.com/im/pictures/hosting/Hosting-1325071019292894976/original/73ced3c8-6814-43cb-a21a-6c38bfdd01e8.jpeg?im_w=720"
										alt="Hyacinths' Suite"
										className="object-cover w-full h-full"
									/>
								</div>
								<div className="flex flex-col justify-center">
									<h2 className="font-medium text-foreground">
										Hyacinths&apos; Suite (in Pine Suites Tagaytay)
									</h2>
									<div className="mt-1 flex items-center gap-1 text-sm">
										<Star className="h-3 w-3 fill-foreground" />
										<span className="font-medium">4.96</span>
										<span className="text-muted-foreground">(51)</span>
									</div>
								</div>
							</div>

							{/* Free Cancellation */}
							<div className="py-2 border-b border-border">
								<h3 className="font-semibold">Free cancellation</h3>
								<p className="text-sm text-muted-foreground mt-1">
									Cancel before January 4 for a full refund.
								</p>
								<button className="text-sm font-medium underline mt-1">
									Full policy
								</button>
							</div>

							{/* Dates */}
							<div className="py-2 border-b border-border">
								<h3 className="font-semibold">Dates</h3>
								<p className="text-sm text-muted-foreground mt-1">
									{dateRange
										? `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "d, yyyy")}`
										: "Not set"}
								</p>
							</div>

							{/* Guests */}
							<div className="py-2 border-b border-border">
								<h3 className="font-semibold">Guests</h3>
								<p className="text-sm text-muted-foreground mt-1">
									{guests === 1 ? "1 guest" : `${guests} guests`}
								</p>
							</div>

							{/* Price Details */}
							<div className="py-2 border-b border-border">
								<h3 className="font-semibold mb-4">Price details</h3>
								<div className="flex justify-between text-sm">
									<span>2 nights x ₱1,852.99</span>
									<span>₱3,705.98</span>
								</div>
							</div>

							{/* Total */}
							<div className="flex justify-between py-2 border-b border-border">
								<div>
									<span className="font-semibold">Total</span>
									<span className="ml-1 text-sm underline">PHP</span>
								</div>
								<span className="font-semibold">₱3,705.98</span>
							</div>

							<button className="text-sm font-medium underline mt-2">
								Price breakdown
							</button>
						</Card>
					</div>

					{/* Right Column - Accordion Steps */}
					<div className="order-1 lg:order-2 space-y-2">
						{/* Step 1: Review dates and guests */}
						<Card className="overflow-hidden gap-0">
							<button
								onClick={() => setActiveStep(activeStep === 1 ? 0 : 1)}
								className="flex w-full items-center justify-between p-6">
								<h2 className="text-lg font-semibold">1. Review dates</h2>
								{activeStep !== 1 && <ChevronDown className="h-5 w-5" />}
							</button>
							{activeStep === 1 && (
								<div className="px-6 pb-6">
									{/* Date Selection */}
									<div className="border border-border rounded-xl overflow-hidden">
										<div className="grid grid-cols-2 divide-x divide-border">
											<div className="p-3">
												<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
													Check-in
												</label>
												<span className="text-sm text-foreground">
													{dateRange?.from
														? format(dateRange.from, "M/d/yyyy")
														: "Add date"}
												</span>
											</div>
											<div className="p-3">
												<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
													Checkout
												</label>
												<span className="text-sm text-foreground">
													{dateRange?.to
														? format(dateRange.to, "M/d/yyyy")
														: "Add date"}
												</span>
											</div>
										</div>
										<div className="border-t border-border p-3">
											<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
												Guests
											</label>
											<div className="flex items-center justify-between">
												<span className="text-sm text-foreground">
													{guests === 1 ? "1 guest" : `${guests} guests`}
												</span>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="icon"
														className="h-7 w-7 rounded-full bg-transparent"
														onClick={() =>
															setGuests(Math.max(1, guests - 1))
														}>
														-
													</Button>
													<Button
														variant="outline"
														size="icon"
														className="h-7 w-7 rounded-full bg-transparent"
														onClick={() =>
															setGuests(
																Math.min(maxGuests, guests + 1),
															)
														}>
														+
													</Button>
												</div>
											</div>
										</div>
									</div>
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

						{/* Step 2: Add a payment method */}
						<Card className="overflow-hidden gap-0">
							<button
								onClick={() => setActiveStep(activeStep === 2 ? 0 : 2)}
								className="flex w-full items-center justify-between p-6">
								<h2 className="text-lg font-semibold">2. Select payment method</h2>
								{activeStep !== 2 && <ChevronDown className="h-5 w-5" />}
							</button>
							{activeStep === 2 && (
								<div className="px-6 pb-6">
									<RadioGroup
										value={paymentMethod}
										onValueChange={setPaymentMethod}>
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
									</RadioGroup>
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

						{/* Step 3: Review your reservation */}
						<Card className="overflow-hidden">
							<button
								onClick={() => setActiveStep(activeStep === 3 ? 0 : 3)}
								className="flex w-full items-center justify-between p-6">
								<h2 className="text-lg font-semibold">
									3. Review your reservation
								</h2>
								{activeStep !== 3 && <ChevronDown className="h-5 w-5" />}
							</button>
							{activeStep === 3 && (
								<div className="px-6 pb-6">
									<p className="text-muted-foreground">
										Review your booking details before confirming.
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
