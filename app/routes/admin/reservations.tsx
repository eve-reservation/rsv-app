import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Calendar, Download, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { DataTable, type DataTableColumn } from "@/components/molecule/data-table";
import { Input } from "~/components/ui/input";
import { StatCard } from "~/components/molecule/stat-card";
import { useGetReservations } from "~/hooks/use-reservations";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

const statusStyles = {
	CONFIRMED: "bg-green-100 text-green-800",
	PENDING: "bg-yellow-100 text-yellow-800",
	CANCELLED: "bg-red-100 text-red-800",
	COMPLETED: "bg-blue-100 text-blue-800",
};

export default function BookingsPage() {
	const navigate = useNavigate();
	const { data, isLoading } = useGetReservations({
		fields: "id, reservationNumber, status, totals, user, bookingPeriod, facility.displayName",
	});

	const reservations = data?.reservations || [];

	const tableData = reservations.map((booking: any) => ({
		...booking,
		userName: booking.user
			? `${booking.user.firstName} ${booking.user.lastName}`
			: "Unknown User",
		userEmail: booking.user?.email || "",
		facilityName: booking.facility?.displayName || "Unknown Facility",
		startDate: booking.bookingPeriod?.startDateTime,
		endDate: booking.bookingPeriod?.endDateTime,
	}));

	const columns: DataTableColumn<(typeof tableData)[0]>[] = [
		{
			key: "reservationNumber",
			label: "Reservation",
			sortable: true,
			searchable: true,
			render: (val) => (
				<span
					className="font-medium text-sm overflow-hidden max-w-[100px] inline-block"
					title={val as string}>
					{(val as string)}
				</span>
			),
		},
		{
			key: "userName",
			label: "User",
			sortable: true,
			searchable: true,
			render: (_, row) => (
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarFallback>
							{row.user?.firstName?.charAt(0) || "U"}
							{row.user?.lastName?.charAt(0) || "U"}
						</AvatarFallback>
					</Avatar>
					<div className="text-sm">
						<div className="font-medium">{row.userName}</div>
						<div className="text-muted-foreground text-xs">{row.userEmail}</div>
					</div>
				</div>
			),
		},
		{
			key: "facilityName",
			label: "Facility",
			sortable: true,
			searchable: true,
			render: (val) => (
				<div className="text-sm">
					<div className="font-medium">{val as string}</div>
				</div>
			),
		},
		{
			key: "startDate", // Using startDate as key for sorting, but rendering formatted date/time
			label: "Date & Time",
			sortable: true,
			render: (_, row) => {
				if (!row.startDate || !row.endDate)
					return <span className="text-muted-foreground text-sm">N/A</span>;
				try {
					const date = format(new Date(row.startDate), "MMM d, yyyy");
					const startTime = format(new Date(row.startDate), "h:mm a");
					const endTime = format(new Date(row.endDate), "h:mm a");
					return (
						<div className="text-sm">
							<div>{date}</div>
							<div className="text-muted-foreground text-xs">
								{startTime} - {endTime}
							</div>
						</div>
					);
				} catch (e) {
					return <span className="text-red-400 text-xs">Invalid Date</span>;
				}
			},
		},
		{
			key: "status",
			label: "Status",
			filterable: true,
			filterOptions: [
				{ label: "Confirmed", value: "CONFIRMED" },
				{ label: "Pending", value: "PENDING" },
				{ label: "Cancelled", value: "CANCELLED" },
				{ label: "Completed", value: "COMPLETED" },
			],
			render: (val) => (
				<Badge
					variant="secondary"
					className={
						statusStyles[val as keyof typeof statusStyles] ||
						"bg-gray-100 text-gray-800"
					}>
					{val as string}
				</Badge>
			),
		},
		{
			key: "totals",
			label: "Amount",
			sortable: true,
			render: (val) => {
				// Assuming totals might be null or have an amount property, or be the amount itself.
				// Based on "totals": null in example, we handle null.
				// If totals has structure, we might need to adjust. For now assuming it might be numeric or object with total.
				const amount = val
					? typeof val === "object" && "amount" in val
						? val.amount
						: val
					: 0;
				// Format currency
				return (
					<span className="text-sm font-medium">
						{new Intl.NumberFormat("en-PH", {
							style: "currency",
							currency: "PHP",
						}).format(Number(amount) || 0)}
					</span>
				);
			},
		},
		{
			key: "id", // Key reused for actions
			label: "Actions",
			render: (_, booking) => (
				<div className="text-right">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => navigate(booking.id)}>
								<Eye className="mr-2 h-4 w-4" />
								View Details
							</DropdownMenuItem>
							{booking.status === "PENDING" && (
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
				</div>
			),
		},
	];

	const onRowClick = (row: any) => {
		navigate(row.id);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Booking Management</h1>
					<p className="text-muted-foreground">Manage and track all facility bookings</p>
				</div>
			</div>

			{/* StatCards can be updated later with real aggregation data if available, keeping static for now or could derive from list but that's pagination dependent */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Total Bookings"
					value={String(data?.pagination?.total || 0)}
					change="+12%"
					changeType="positive"
					icon={Calendar}
					className="bg-gradient-to-br from-primary/30 via-white to-white"
				/>
				<StatCard
					title="Pending Approval"
					value="8" // TODO: Fetch real stats
					change="-2"
					changeType="positive"
					icon={CheckCircle}
					className="bg-gradient-to-br from-primary/30 via-white to-white"
				/>
				<StatCard
					title="Confirmed Today"
					value="24" // TODO: Fetch real stats
					change="+5"
					changeType="positive"
					icon={CheckCircle}
					className="bg-gradient-to-br from-primary/30 via-white to-white"
				/>
				<StatCard
					title="Revenue (Dec)"
					value="₱45,200" // TODO: Fetch real stats
					change="+15.3%"
					changeType="positive"
					icon={Download}
					className="bg-gradient-to-br from-primary/30 via-white to-white"
				/>
			</div>

			<Card>
				<CardHeader className="!py-0">
					<div className="flex items-center justify-between">
						<div>
							<Input type="text" placeholder="Search bookings..." />
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
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="py-10 text-center text-muted-foreground">
							Loading reservations...
						</div>
					) : (
						<DataTable columns={columns} data={tableData} onRowClick={onRowClick} />
					)}
				</CardContent>
			</Card>
		</div>
	);
}
