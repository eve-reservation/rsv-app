import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Building2, Users, TrendingUp, DollarSign, Clock } from "lucide-react";
import { BookingChart } from "~/components/molecule/booking-chart";
import { PopularFacilities } from "~/components/molecule/popular-facilities";
import { RecentBookingsTable } from "~/components/organisms/recent-bookings-table";

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
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back! Here&apos;s what&apos;s happening with your facilities.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Card key={stat.title}>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								{stat.title}
							</CardTitle>
							<stat.icon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stat.value}</div>
							<p
								className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
								{stat.change} from last month
							</p>
						</CardContent>
					</Card>
				))}
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

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Clock className="h-5 w-5" />
						Recent Bookings
					</CardTitle>
				</CardHeader>
				<CardContent>
					<RecentBookingsTable />
				</CardContent>
			</Card>
		</div>
	);
}
