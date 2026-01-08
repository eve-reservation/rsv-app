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
import { useGetReservationById } from "~/hooks/use-reservations";
import { useParams } from "react-router";
import { format } from "date-fns";

const statusStyles = {
	confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
	pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
	cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
	completed: "bg-blue-100 text-blue-800 hover:bg-blue-100",
};

export default function BookingDetails() {
	const { id } = useParams();
	const { data, isLoading } = useGetReservationById(id!, {
		fields: "id, status, guestCount, specialRequests, reservationNumber, confirmationCode, createdAt, updatedAt, guests, user, bookingPeriod, facility",
	});

	if (isLoading) {
		return <div className="p-8 text-center">Loading reservation details...</div>;
	}

	if (!data) {
		return <div className="p-8 text-center">Reservation not found</div>;
	}

	// Derived data for display
	const booking = data;
	const facility = booking.facility;
	const bookingPeriod = booking.bookingPeriod;
	const user = booking.user;

	// Calculate dates
	const date = new Date(bookingPeriod.startDateTime);
	const endDate = new Date(bookingPeriod.endDateTime);

	// Calculate Price (Mock calculation based on facility price since totals aren't in example JSON)
	const pricePerHour = facility.metadata?.price || 0;
	const hours = bookingPeriod.numberOfHours;
	const totalAmount = pricePerHour * hours;

	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			{/* Breadcrumb / Back Navigation */}
			<BackButton fallbackPath="/admin/booking" showText />

			{/* Header Section */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="">
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-bold tracking-tight">
							Booking #{booking.reservationNumber || booking.id.substring(0, 8)}
						</h1>
						<Badge
							variant="outline"
							className={
								statusStyles[booking.status as keyof typeof statusStyles] || ""
							}>
							{booking.status.charAt(0).toUpperCase() +
								booking.status.slice(1).toLowerCase()}
						</Badge>
					</div>
					<p className="text-muted-foreground text-sm">
						Created on {format(new Date(booking.createdAt), "MMM d, yyyy, h:mm a")}
					</p>
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
									{facility.images && facility.images[0] ? (
										<img
											src={facility.images[0].url}
											alt={booking.facility.name}
											className="h-full w-full object-cover"
										/>
									) : (
										<div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
											No Image
										</div>
									)}
								</div>
								<div>
									<h3 className="font-semibold text-lg">
										{facility.displayName}
									</h3>
									<div className="flex items-center text-muted-foreground text-sm mt-1">
										<MapPin className="mr-1 h-3.5 w-3.5" />
										Taguig City
									</div>
									<div className="mt-2 flex gap-2">
										{facility.subtype && (
											<Badge variant="outline">{facility.subtype}</Badge>
										)}
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
											{format(date, "MMMM d, yyyy")}
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
											{format(date, "h:mm a")} - {format(endDate, "h:mm a")}
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
											{bookingPeriod.numberOfHours} hours
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
										<p className="text-2xl font-bold">
											₱{totalAmount.toLocaleString()}
										</p>
									</div>
								</div>
								<Badge variant="outline" className="text-xs">
									UNPAID
								</Badge>
							</div>

							<div className="grid gap-3 text-sm">
								{/* <div className="flex justify-between py-1">
									<span className="text-muted-foreground">Payment Method</span>
									<span className="font-medium">N/A</span>
								</div> */}
								<div className="flex justify-between py-1">
									<span className="text-muted-foreground">Confirmation Code</span>
									<span className="font-mono text-muted-foreground">
										{booking.confirmationCode}
									</span>
								</div>
								<Separator className="my-2" />
								<div className="space-y-2">
									<p className="font-medium text-xs text-muted-foreground uppercase tracking-wider">
										Breakdown
									</p>
									<div className="flex justify-between">
										<span>Facility Fee</span>
										<span>
											₱{pricePerHour.toLocaleString()} x {hours} hrs
										</span>
									</div>
									<div className="flex justify-between font-medium">
										<span>Total</span>
										<span>₱{totalAmount.toLocaleString()}</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar - Right Column (1/3) */}
				<div className="space-y-6">
					{/* Note Card */}
					{booking.specialRequests && (
						<Card className="bg-amber-50/50 border-amber-200">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-amber-900">
									Special Requests
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-amber-800 italic">
									"{booking.specialRequests}"
								</p>
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
										src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
										alt={user.firstName}
									/>
									<AvatarFallback className="text-lg">
										{user.firstName?.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="font-medium text-lg leading-none">
										{user.firstName} {user.lastName}
									</h3>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<div className="flex items-center gap-3 text-sm">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<a
										href={`mailto:${user.email}`}
										className="hover:underline text-foreground">
										{user.email}
									</a>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<User className="h-4 w-4 text-muted-foreground" />
									<span className="text-muted-foreground">
										{booking.guestCount} guests
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
