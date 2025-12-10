import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentBookings = [
	{
		id: "BK001",
		user: { name: "Juan Dela Cruz", avatar: "JD" },
		facility: "BGC Full Court",
		sport: "Basketball",
		date: "Dec 10, 2025",
		time: "3:00 PM - 5:00 PM",
		status: "confirmed",
		amount: "₱9,000",
	},
	{
		id: "BK002",
		user: { name: "Maria Santos", avatar: "MS" },
		facility: "Makati Tennis Club",
		sport: "Tennis",
		date: "Dec 10, 2025",
		time: "9:00 AM - 11:00 AM",
		status: "pending",
		amount: "₱5,000",
	},
	{
		id: "BK003",
		user: { name: "Carlos Reyes", avatar: "CR" },
		facility: "Ayala Alabang Futsal",
		sport: "Futsal",
		date: "Dec 11, 2025",
		time: "6:00 PM - 8:00 PM",
		status: "confirmed",
		amount: "₱11,000",
	},
	{
		id: "BK004",
		user: { name: "Ana Garcia", avatar: "AG" },
		facility: "La Union Beach Volleyball",
		sport: "Volleyball",
		date: "Dec 12, 2025",
		time: "8:00 AM - 12:00 PM",
		status: "cancelled",
		amount: "₱7,200",
	},
	{
		id: "BK005",
		user: { name: "Pedro Lim", avatar: "PL" },
		facility: "MOA Badminton Center",
		sport: "Badminton",
		date: "Dec 12, 2025",
		time: "2:00 PM - 4:00 PM",
		status: "confirmed",
		amount: "₱3,600",
	},
];

const statusStyles = {
	confirmed: "bg-green-100 text-green-800",
	pending: "bg-yellow-100 text-yellow-800",
	cancelled: "bg-red-100 text-red-800",
};

export function RecentBookingsTable() {
	return (
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
					</tr>
				</thead>
				<tbody>
					{recentBookings.map((booking) => (
						<tr key={booking.id} className="border-b border-border last:border-0">
							<td className="py-4 text-sm font-medium">{booking.id}</td>
							<td className="py-4">
								<div className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										<AvatarImage
											src={`/.jpg?height=32&width=32&query=${booking.user.name}`}
										/>
										<AvatarFallback>{booking.user.avatar}</AvatarFallback>
									</Avatar>
									<span className="text-sm">{booking.user.name}</span>
								</div>
							</td>
							<td className="py-4">
								<div className="text-sm">
									<div className="font-medium">{booking.facility}</div>
									<div className="text-muted-foreground">{booking.sport}</div>
								</div>
							</td>
							<td className="py-4">
								<div className="text-sm">
									<div>{booking.date}</div>
									<div className="text-muted-foreground">{booking.time}</div>
								</div>
							</td>
							<td className="py-4">
								<Badge
									variant="secondary"
									className={
										statusStyles[booking.status as keyof typeof statusStyles]
									}>
									{booking.status}
								</Badge>
							</td>
							<td className="py-4 text-right text-sm font-medium">
								{booking.amount}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
