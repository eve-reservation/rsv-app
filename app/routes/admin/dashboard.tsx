import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Building2, Users, TrendingUp, DollarSign, Clock } from "lucide-react";
import { BookingChart } from "~/components/molecule/booking-chart";
import { PopularFacilities } from "~/components/molecule/popular-facilities";
import { RecentBookingsTable } from "~/components/organisms/recent-bookings-table";
import { useNavigate } from "react-router";
import { StatCard } from "~/components/molecule/stat-card";

const sportsBookings = [
	{
		id: "BK001",
		user: { name: "Juan Dela Cruz", avatar: "JD" },
		facility: "Indoor Basketball Court",
		time: "3:00 PM",
		status: "confirmed",
	},
	{
		id: "BK002",
		user: { name: "Maria Santos", avatar: "MS" },
		facility: "Tennis Courts",
		time: "9:00 AM",
		status: "pending",
	},
	{
		id: "BK003",
		user: { name: "Carlos Reyes", avatar: "CR" },
		facility: "Badminton Hall",
		time: "6:00 PM",
		status: "confirmed",
	},
	{
		id: "BK004",
		user: { name: "Ana Garcia", avatar: "AG" },
		facility: "Bowling Alley",
		time: "8:00 AM",
		status: "cancelled",
	},
];

const diningBookings = [
	{
		id: "BK005",
		user: { name: "Pedro Lim", avatar: "PL" },
		facility: "Daily Dining Room",
		time: "12:00 PM",
		status: "confirmed",
	},
	{
		id: "BK006",
		user: { name: "Sofia Diaz", avatar: "SD" },
		facility: "Shabu-Shabu Restaurant",
		time: "7:00 PM",
		status: "confirmed",
	},
];

const wellnessBookings = [
	{
		id: "BK007",
		user: { name: "Miguel Torres", avatar: "MT" },
		facility: "Wellness Spa & Sauna",
		time: "2:00 PM",
		status: "confirmed",
	},
	{
		id: "BK008",
		user: { name: "Elena Cruz", avatar: "EC" },
		facility: "Beauty Salon & Barber Shop",
		time: "4:00 PM",
		status: "pending",
	},
	{
		id: "BK009",
		user: { name: "Ricardo Dalisay", avatar: "RD" },
		facility: "Club Library",
		time: "10:00 AM",
		status: "confirmed",
	},
];

const statusStyles = {
	confirmed: "bg-green-100 text-green-800",
	pending: "bg-yellow-100 text-yellow-800",
	cancelled: "bg-red-100 text-red-800",
};

function CategoryBookingList({ bookings }: { bookings: typeof sportsBookings }) {
	const navigate = useNavigate();
	return (
		<div className="divide-y">
			{bookings.map((booking) => (
				<div
					onClick={() => navigate("/admin/booking/123")}
					key={booking.id}
					className="flex items-center justify-between hover:bg-gray-50 cursor-pointer p-2 rounded-md">
					<div className="flex items-center gap-3">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={`/.jpg?height=32&width=32&query=${booking.user.name}`}
							/>
							<AvatarFallback>{booking.user.avatar}</AvatarFallback>
						</Avatar>
						<div className="grid gap-1">
							<p className="text-sm font-medium leading-none">{booking.facility}</p>
							<p className="text-xs text-muted-foreground">{booking.user.name}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground">{booking.time}</span>
						<Badge
							variant="secondary"
							className={`text-[10px] px-1.5 py-0 ${
								statusStyles[booking.status as keyof typeof statusStyles]
							}`}>
							{booking.status}
						</Badge>
					</div>
				</div>
			))}
		</div>
	);
}

const stats = [
	{
		title: "Total Bookings",
		value: "1,284",
		change: "+12.5%",
		changeType: "positive" as const,
		icon: CalendarDays,
	},
	{
		title: "Active Facilities",
		value: "24",
		change: "+2",
		changeType: "positive" as const,
		icon: Building2,
	},
	{
		title: "Total Users",
		value: "3,847",
		change: "+8.2%",
		changeType: "positive" as const,
		icon: Users,
	},
	{
		title: "Revenue",
		value: "₱847,500",
		change: "+15.3%",
		changeType: "positive" as const,
		icon: DollarSign,
	},
];

export default function AdminDashboard() {
	const navigate = useNavigate();
	return (
		<div className="space-y-6 w-full">
			<div>
				<h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back! Here&apos;s what&apos;s happening with your facilities.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<StatCard
						key={stat.title}
						title={stat.title}
						value={stat.value}
						change={stat.change}
						changeType={stat.changeType}
						icon={stat.icon}
						className="bg-gradient-to-br from-primary/30 via-white to-white"
					/>
				))}
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<Card className="">
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Users className="h-5 w-5" />
								Sports Bookings
							</div>
							<Badge variant="secondary" className="bg-primary/20">
								{sportsBookings.length}
							</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CategoryBookingList bookings={sportsBookings} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Users className="h-5 w-5" />
								Dining Bookings
							</div>
							<Badge variant="secondary" className="bg-primary/20">
								{diningBookings.length}
							</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CategoryBookingList bookings={diningBookings} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Users className="h-5 w-5" />
								Wellness Bookings
							</div>
							<Badge variant="secondary" className="bg-primary/20">
								{wellnessBookings.length}
							</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CategoryBookingList bookings={wellnessBookings} />
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5" />
							Booking Trends
						</CardTitle>
					</CardHeader>
					<CardContent>
						<BookingChart />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Building2 className="h-5 w-5" />
							Popular Facilities
						</CardTitle>
					</CardHeader>
					<CardContent>
						<PopularFacilities />
					</CardContent>
				</Card>
			</div>

			{/* <Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Clock className="h-5 w-5" />
						Recent Bookings
					</CardTitle>
				</CardHeader>
				<CardContent>
					<RecentBookingsTable />
				</CardContent>
			</Card> */}
		</div>
	);
}
