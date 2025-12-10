import {
	CheckCircle,
	Calendar,
	Users,
	AlertCircle,
	Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { lebronCourt } from "@/assets/images/index";

export default function BookingConfirmation() {
	return (
		<main className="min-h-screen bg-background">
			{/* Main Content */}
			<div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
				{/* Success Section */}
				<div className="text-center mb-12">
					<div className="flex justify-center mb-4">
						<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
							<CheckCircle className="w-8 h-8 text-primary-foreground" />
						</div>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">
						You're all booked!
					</h1>
					<p className="text-lg text-muted-foreground">
						Your reservation is confirmed. Check your email for details.
					</p>
				</div>

				{/* Confirmation Number */}
				<Card className="bg-card border border-border p-6 mb-8 text-center">
					<p className="text-sm text-muted-foreground mb-2">Confirmation number</p>
					<p className="text-3xl font-bold text-foreground tracking-widest">
						QCS123XYZ
					</p>
				</Card>

				{/* Property Details */}
				<div className="grid md:grid-cols-3 gap-6 mb-8">
					{/* Property Image */}
					<div className="md:col-span-2">
						<Card className="overflow-hidden border border-border h-full gap-0">
							<img
								src={lebronCourt}
								alt="BGC Full Court"
								className="w-full h-80 object-cover"
							/>
							<div className="p-6">
								<h2 className="text-2xl font-bold text-foreground mb-2">
									BGC Full Court
								</h2>
								<p className="text-muted-foreground mb-4">
									Taguig, Metro Manila
								</p>
								<div className="flex gap-4 flex-wrap">
									<span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
										Basketball
									</span>
									<span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
										Up to 15 players
									</span>
								</div>
							</div>
						</Card>
					</div>

					{/* Booking Summary */}
					<Card className="bg-card border border-border p-6 h-fit sticky top-4">
						<h3 className="text-xl font-bold text-foreground mb-6">
							Booking details
						</h3>

						<div className="space-y-4">
							<div className="flex gap-3">
								<Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
								<div>
									<p className="text-sm text-muted-foreground">Date</p>
									<p className="font-semibold text-foreground">
										December 20, 2025
									</p>
								</div>
							</div>

							<div className="flex gap-3">
								<Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
								<div>
									<p className="text-sm text-muted-foreground">Time Slot</p>
									<p className="font-semibold text-foreground">
										4:00 PM - 6:00 PM
									</p>
								</div>
							</div>

							<div className="flex gap-3">
								<Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
								<div>
									<p className="text-sm text-muted-foreground">Players</p>
									<p className="font-semibold text-foreground">10 players</p>
								</div>
							</div>

							<div className="border-t border-border pt-4 mt-4">
								<div className="flex justify-between mb-2">
									<p className="text-muted-foreground">
										₱4500/hour × 2 hours
									</p>
									<p className="text-foreground font-semibold">₱9,000</p>
								</div>
								<div className="flex justify-between mb-2">
									<p className="text-muted-foreground">Service fee</p>
									<p className="text-foreground font-semibold">₱500</p>
								</div>
								<div className="border-t border-border pt-4 mt-4 flex justify-between">
									<p className="font-bold text-foreground">Total paid</p>
									<p className="font-bold text-primary text-lg">₱9,500</p>
								</div>
							</div>
						</div>
					</Card>
				</div>

				{/* Important Info */}
				<div className="grid md:grid-cols-2 gap-6 mb-8">
					<Card className="border border-border p-6">
						<div className="flex gap-4">
							<AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
							<div>
								<h4 className="font-bold text-foreground mb-2">
									Court rules
								</h4>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Wear proper court shoes</li>
									<li>• No food or drinks on the court</li>
									<li>• Good sportsmanship is required</li>
									<li>• Check-in 15 minutes before your schedule</li>
								</ul>
							</div>
						</div>
					</Card>

					<Card className="border border-border p-6">
						<div className="flex gap-4">
							<Home className="w-6 h-6 text-primary flex-shrink-0" />
							<div>
								<h4 className="font-bold text-foreground mb-2">
									Getting there
								</h4>
								<p className="text-sm text-muted-foreground mb-2">
									The court is located in BGC. Easily accessible via Grab or
									commute. Paid parking is available.
								</p>
								<p className="text-sm text-muted-foreground">
									Present your booking confirmation at the entrance.
								</p>
							</div>
						</div>
					</Card>
				</div>

				{/* Next Steps */}
				<Card className="border border-border p-8 mb-8 bg-muted">
					<h3 className="text-2xl font-bold text-foreground mb-4">
						What's next?
					</h3>
					<div className="space-y-3">
						<div className="flex gap-3">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
								1
							</div>
							<div>
								<p className="font-semibold text-foreground">
									Save this confirmation
								</p>
								<p className="text-sm text-muted-foreground">
									You'll need it for check-in
								</p>
							</div>
						</div>
						<div className="flex gap-3">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
								2
							</div>
							<div>
								<p className="font-semibold text-foreground">
									Review court rules and requirements
								</p>
								<p className="text-sm text-muted-foreground">
									Check the full details in your confirmation email
								</p>
							</div>
						</div>
						<div className="flex gap-3">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
								3
							</div>
							<div>
								<p className="font-semibold text-foreground">
									Invite your friends
								</p>
								<p className="text-sm text-muted-foreground">
									Share your booking and get ready for the game!
								</p>
							</div>
						</div>
					</div>
				</Card>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						size="lg"
						className="bg-primary text-primary-foreground hover:bg-primary/90">
						View my bookings
					</Button>
					<Button size="lg" variant="outline">
						Explore more courts
					</Button>
				</div>
			</div>

			{/* Footer */}
			<footer className="border-t border-border mt-16 py-8 bg-muted">
				<div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
					<p>Questions? Contact us at support@qcsports.com</p>
				</div>
			</footer>
		</main>
	);
}
