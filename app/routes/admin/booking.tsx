import {
	Calendar,
	CheckCircle,
	Clock,
	CreditCard,
	Mail,
	MapPin,
	MoreHorizontal,
	Phone,
	User,
	XCircle,
	Download,
	MessageSquare,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "~/components/molecule/back-button";

// Mock Data for a single booking
const booking = {
	id: "BK-2024-001",
	status: "confirmed",
	createdAt: "Dec 8, 2025, 9:00 AM",
	amount: "₱9,000.00",
	paymentStatus: "paid",
	paymentMethod: "Credit Card ending in 4242",
	transactionId: "TXN-123456789",
	user: {
		name: "Juan Dela Cruz",
		email: "juan.delacruz@example.com",
		phone: "+63 917 123 4567",
		avatar: "JD",
		type: "Member",
		memberSince: "Jan 2024",
	},
	facility: {
		name: "BGC Active Court 1",
		sport: "Basketball",
		location: "32nd St., BGC, Taguig City",
		capacity: "20-30 pax",
		image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000",
	},
	schedule: {
		date: "December 10, 2025",
		day: "Wednesday",
		startTime: "3:00 PM",
		endTime: "5:00 PM",
		duration: "2 hours",
	},
	addons: [
		{ name: "Scoreboard Operator", price: "₱500.00" },
		{ name: "Water Cooler (5 Gallons)", price: "₱250.00" },
	],
	notes: "Client requested early access for warm-up (15 mins prior) if possible.",
};

const statusStyles = {
	confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
	pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
	cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
	completed: "bg-blue-100 text-blue-800 hover:bg-blue-100",
};

export default function BookingDetails() {
	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			{/* Breadcrumb / Back Navigation */}
			<BackButton fallbackPath="/admin/booking" showText />

			{/* Header Section */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="space-y-1">
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-bold tracking-tight">Booking #{booking.id}</h1>
						<Badge
							variant="secondary"
							className={statusStyles[booking.status as keyof typeof statusStyles]}>
							{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
						</Badge>
					</div>
					<p className="text-muted-foreground">Created on {booking.createdAt}</p>
				</div>
				<div className="flex flex-wrap gap-2">
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Invoice
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="default">
								Manage Booking
								<MoreHorizontal className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<MessageSquare className="mr-2 h-4 w-4" />
								Message User
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-green-600">
								<CheckCircle className="mr-2 h-4 w-4" />
								Mark Completed
							</DropdownMenuItem>
							<DropdownMenuItem className="text-red-600">
								<XCircle className="mr-2 h-4 w-4" />
								Cancel Booking
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Main Content - Left Column (2/3) */}
				<div className="space-y-6 lg:col-span-2">
					{/* Facility & Schedule Card */}
					<Card>
						<CardHeader>
							<CardTitle>Reservation Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Facility Info */}
							<div className="flex gap-4">
								<div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
									<img
										src={booking.facility.image}
										alt={booking.facility.name}
										className="h-full w-full object-cover"
									/>
								</div>
								<div>
									<h3 className="font-semibold text-lg">
										{booking.facility.name}
									</h3>
									<div className="flex items-center text-muted-foreground text-sm mt-1">
										<MapPin className="mr-1 h-3.5 w-3.5" />
										{booking.facility.location}
									</div>
									<div className="mt-2 flex gap-2">
										<Badge variant="outline">{booking.facility.sport}</Badge>
										<Badge variant="outline">{booking.facility.capacity}</Badge>
									</div>
								</div>
							</div>

							<Separator />

							{/* Schedule Info */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
										<Calendar className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm font-medium">Date</p>
										<p className="text-sm text-muted-foreground">
											{booking.schedule.date}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
										<Clock className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm font-medium">Time</p>
										<p className="text-sm text-muted-foreground">
											{booking.schedule.startTime} -{" "}
											{booking.schedule.endTime}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
										<CheckCircle className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm font-medium">Duration</p>
										<p className="text-sm text-muted-foreground">
											{booking.schedule.duration}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Payment Details Card */}
					<Card>
						<CardHeader>
							<CardTitle>Payment Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between rounded-lg border p-4">
								<div className="flex items-center gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
										<CreditCard className="h-5 w-5" />
									</div>
									<div>
										<p className="font-medium text-sm">Total Amount</p>
										<p className="text-2xl font-bold">{booking.amount}</p>
									</div>
								</div>
								<Badge
									variant={
										booking.paymentStatus === "paid"
											? "secondary"
											: "destructive"
									}
									className={
										booking.paymentStatus === "paid"
											? "bg-green-100 text-green-800"
											: ""
									}>
									{booking.paymentStatus.toUpperCase()}
								</Badge>
							</div>

							<div className="grid gap-3 text-sm">
								<div className="flex justify-between py-1">
									<span className="text-muted-foreground">Payment Method</span>
									<span className="font-medium">{booking.paymentMethod}</span>
								</div>
								<div className="flex justify-between py-1">
									<span className="text-muted-foreground">Transaction ID</span>
									<span className="font-mono text-muted-foreground">
										{booking.transactionId}
									</span>
								</div>
								<Separator className="my-2" />
								<div className="space-y-2">
									<p className="font-medium text-xs text-muted-foreground uppercase tracking-wider">
										Breakdown
									</p>
									<div className="flex justify-between">
										<span>Facility Fee</span>
										<span>₱8,250.00</span>
									</div>
									{booking.addons.map((addon, index) => (
										<div
											key={index}
											className="flex justify-between text-muted-foreground">
											<span>{addon.name}</span>
											<span>{addon.price}</span>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar - Right Column (1/3) */}
				<div className="space-y-6">
					{/* Note Card */}
					{booking.notes && (
						<Card className="bg-amber-50/50 border-amber-200">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-amber-900">
									Notes from User
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-amber-800 italic">"{booking.notes}"</p>
							</CardContent>
						</Card>
					)}

					{/* User Details Card */}
					<Card>
						<CardHeader>
							<CardTitle>Booked By</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-4">
								<Avatar className="h-14 w-14 border-2 border-primary/10">
									<AvatarImage
										src={booking.user.avatar}
										alt={booking.user.name}
									/>
									<AvatarFallback className="text-lg">
										{booking.user.avatar}
									</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="font-medium text-lg leading-none">
										{booking.user.name}
									</h3>
									<p className="text-sm text-muted-foreground mt-1">
										{booking.user.type}
									</p>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<div className="flex items-center gap-3 text-sm">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<a
										href={`mailto:${booking.user.email}`}
										className="hover:underline text-foreground">
										{booking.user.email}
									</a>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Phone className="h-4 w-4 text-muted-foreground" />
									<a
										href={`tel:${booking.user.phone}`}
										className="hover:underline text-foreground">
										{booking.user.phone}
									</a>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<User className="h-4 w-4 text-muted-foreground" />
									<span className="text-muted-foreground">
										Member since {booking.user.memberSince}
									</span>
								</div>
							</div>

							<div className="pt-2">
								<Button variant="outline" className="w-full">
									View User Profile
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
