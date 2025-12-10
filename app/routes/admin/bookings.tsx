import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Search,
	Filter,
	MoreHorizontal,
	Eye,
	CheckCircle,
	XCircle,
	Calendar,
	Download,
	Plus,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const bookings = [
	{
		id: "BK001",
		user: { name: "Juan Dela Cruz", email: "juan@email.com", avatar: "JD" },
		facility: "BGC Full Court",
		sport: "Basketball",
		location: "Taguig, Metro Manila",
		date: "Dec 10, 2025",
		time: "3:00 PM - 5:00 PM",
		players: 10,
		status: "confirmed",
		amount: "₱9,000",
		createdAt: "Dec 8, 2025",
	},
	{
		id: "BK002",
		user: { name: "Maria Santos", email: "maria@email.com", avatar: "MS" },
		facility: "Makati Tennis Club",
		sport: "Tennis",
		location: "Makati, Metro Manila",
		date: "Dec 10, 2025",
		time: "9:00 AM - 11:00 AM",
		players: 4,
		status: "pending",
		amount: "₱5,000",
		createdAt: "Dec 9, 2025",
	},
	{
		id: "BK003",
		user: { name: "Carlos Reyes", email: "carlos@email.com", avatar: "CR" },
		facility: "Ayala Alabang Futsal Pitch",
		sport: "Futsal",
		location: "Muntinlupa, Metro Manila",
		date: "Dec 11, 2025",
		time: "6:00 PM - 8:00 PM",
		players: 14,
		status: "confirmed",
		amount: "₱11,000",
		createdAt: "Dec 9, 2025",
	},
	{
		id: "BK004",
		user: { name: "Ana Garcia", email: "ana@email.com", avatar: "AG" },
		facility: "La Union Beach Volleyball",
		sport: "Volleyball",
		location: "San Juan, La Union",
		date: "Dec 12, 2025",
		time: "8:00 AM - 12:00 PM",
		players: 12,
		status: "cancelled",
		amount: "₱7,200",
		createdAt: "Dec 7, 2025",
	},
	{
		id: "BK005",
		user: { name: "Pedro Lim", email: "pedro@email.com", avatar: "PL" },
		facility: "MOA Badminton Center",
		sport: "Badminton",
		location: "Pasay, Metro Manila",
		date: "Dec 12, 2025",
		time: "2:00 PM - 4:00 PM",
		players: 4,
		status: "confirmed",
		amount: "₱3,600",
		createdAt: "Dec 10, 2025",
	},
	{
		id: "BK006",
		user: { name: "Rosa Mendoza", email: "rosa@email.com", avatar: "RM" },
		facility: "Quezon City Sports Complex",
		sport: "Basketball",
		location: "Quezon City, Metro Manila",
		date: "Dec 13, 2025",
		time: "5:00 PM - 7:00 PM",
		players: 10,
		status: "pending",
		amount: "₱4,500",
		createdAt: "Dec 10, 2025",
	},
	{
		id: "BK007",
		user: { name: "Miguel Torres", email: "miguel@email.com", avatar: "MT" },
		facility: "Makati Tennis Club",
		sport: "Tennis",
		location: "Makati, Metro Manila",
		date: "Dec 14, 2025",
		time: "7:00 AM - 9:00 AM",
		players: 2,
		status: "confirmed",
		amount: "₱5,000",
		createdAt: "Dec 10, 2025",
	},
];

const statusStyles = {
	confirmed: "bg-green-100 text-green-800",
	pending: "bg-yellow-100 text-yellow-800",
	cancelled: "bg-red-100 text-red-800",
};

export default function BookingsPage() {
	const [selectedBooking, setSelectedBooking] = useState<(typeof bookings)[0] | null>(null);
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [sportFilter, setSportFilter] = useState<string>("all");

	const filteredBookings = bookings.filter((booking) => {
		if (statusFilter !== "all" && booking.status !== statusFilter) return false;
		if (sportFilter !== "all" && booking.sport !== sportFilter) return false;
		return true;
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Booking Management</h1>
					<p className="text-muted-foreground">Manage and track all facility bookings</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Export
					</Button>
					<Button asChild>
						<Link to="/admin/bookings/new">
							<Plus className="mr-2 h-4 w-4" />
							New Booking
						</Link>
					</Button>
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="relative w-full max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search by ID, user, or facility..."
								className="pl-10"
							/>
						</div>
						<div className="flex flex-wrap gap-2">
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-[140px]">
									<Filter className="mr-2 h-4 w-4" />
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="confirmed">Confirmed</SelectItem>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="cancelled">Cancelled</SelectItem>
								</SelectContent>
							</Select>
							<Select value={sportFilter} onValueChange={setSportFilter}>
								<SelectTrigger className="w-[140px]">
									<SelectValue placeholder="Sport" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Sports</SelectItem>
									<SelectItem value="Basketball">Basketball</SelectItem>
									<SelectItem value="Tennis">Tennis</SelectItem>
									<SelectItem value="Futsal">Futsal</SelectItem>
									<SelectItem value="Volleyball">Volleyball</SelectItem>
									<SelectItem value="Badminton">Badminton</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-border text-left text-sm text-muted-foreground">
									<th className="pb-3 font-medium">Booking ID</th>
									<th className="pb-3 font-medium">User</th>
									<th className="pb-3 font-medium">Facility</th>
									<th className="pb-3 font-medium">Date & Time</th>
									<th className="pb-3 font-medium">Status</th>
									<th className="pb-3 text-right font-medium">Amount</th>
									<th className="pb-3 text-right font-medium">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredBookings.map((booking) => (
									<tr
										key={booking.id}
										className="border-b border-border last:border-0">
										<td className="py-4 text-sm font-medium">{booking.id}</td>
										<td className="py-4">
											<div className="flex items-center gap-2">
												<Avatar className="h-8 w-8">
													<AvatarFallback>
														{booking.user.avatar}
													</AvatarFallback>
												</Avatar>
												<div className="text-sm">
													<div className="font-medium">
														{booking.user.name}
													</div>
													<div className="text-muted-foreground">
														{booking.user.email}
													</div>
												</div>
											</div>
										</td>
										<td className="py-4">
											<div className="text-sm">
												<div className="font-medium">
													{booking.facility}
												</div>
												<div className="text-muted-foreground">
													{booking.sport}
												</div>
											</div>
										</td>
										<td className="py-4">
											<div className="text-sm">
												<div>{booking.date}</div>
												<div className="text-muted-foreground">
													{booking.time}
												</div>
											</div>
										</td>
										<td className="py-4">
											<Badge
												variant="secondary"
												className={
													statusStyles[
														booking.status as keyof typeof statusStyles
													]
												}>
												{booking.status}
											</Badge>
										</td>
										<td className="py-4 text-right text-sm font-medium">
											{booking.amount}
										</td>
										<td className="py-4 text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() => setSelectedBooking(booking)}>
														<Eye className="mr-2 h-4 w-4" />
														View Details
													</DropdownMenuItem>
													{booking.status === "pending" && (
														<>
															<DropdownMenuItem className="text-green-600">
																<CheckCircle className="mr-2 h-4 w-4" />
																Confirm
															</DropdownMenuItem>
															<DropdownMenuItem className="text-red-600">
																<XCircle className="mr-2 h-4 w-4" />
																Cancel
															</DropdownMenuItem>
														</>
													)}
													<DropdownMenuSeparator />
													<DropdownMenuItem>
														<Calendar className="mr-2 h-4 w-4" />
														Reschedule
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			<Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
				<DialogContent className="max-w-lg">
					<DialogHeader>
						<DialogTitle>Booking Details</DialogTitle>
						<DialogDescription>
							Full details for booking {selectedBooking?.id}
						</DialogDescription>
					</DialogHeader>
					{selectedBooking && (
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<Avatar className="h-12 w-12">
									<AvatarFallback>{selectedBooking.user.avatar}</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-semibold">{selectedBooking.user.name}</div>
									<div className="text-sm text-muted-foreground">
										{selectedBooking.user.email}
									</div>
								</div>
								<Badge
									variant="secondary"
									className={`ml-auto ${statusStyles[selectedBooking.status as keyof typeof statusStyles]}`}>
									{selectedBooking.status}
								</Badge>
							</div>

							<div className="grid gap-3 rounded-lg border border-border p-4">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Facility</span>
									<span className="font-medium">{selectedBooking.facility}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Sport</span>
									<span>{selectedBooking.sport}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Location</span>
									<span>{selectedBooking.location}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Date</span>
									<span>{selectedBooking.date}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Time</span>
									<span>{selectedBooking.time}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Players</span>
									<span>{selectedBooking.players}</span>
								</div>
								<div className="flex justify-between border-t border-border pt-3">
									<span className="font-medium">Total Amount</span>
									<span className="font-bold text-lg">
										{selectedBooking.amount}
									</span>
								</div>
							</div>

							<div className="flex gap-2">
								{selectedBooking.status === "pending" && (
									<>
										<Button className="flex-1 bg-green-600 hover:bg-green-700">
											<CheckCircle className="mr-2 h-4 w-4" />
											Confirm Booking
										</Button>
										<Button variant="destructive" className="flex-1">
											<XCircle className="mr-2 h-4 w-4" />
											Cancel Booking
										</Button>
									</>
								)}
								{selectedBooking.status === "confirmed" && (
									<Button variant="outline" className="flex-1 bg-transparent">
										<Calendar className="mr-2 h-4 w-4" />
										Reschedule
									</Button>
								)}
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
