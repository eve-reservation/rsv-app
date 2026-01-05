import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ month: "Jan", bookings: 65 },
	{ month: "Feb", bookings: 78 },
	{ month: "Mar", bookings: 90 },
	{ month: "Apr", bookings: 81 },
	{ month: "May", bookings: 95 },
	{ month: "Jun", bookings: 110 },
	{ month: "Jul", bookings: 125 },
	{ month: "Aug", bookings: 140 },
	{ month: "Sep", bookings: 132 },
	{ month: "Oct", bookings: 148 },
	{ month: "Nov", bookings: 155 },
	{ month: "Dec", bookings: 170 },
];

export function BookingChart() {
	return (
		<div className="h-[300px] w-full">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data}>
					<defs>
						<linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
							<stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
					<XAxis dataKey="month" className="text-xs" tick={{ fill: "#888" }} />
					<YAxis className="text-xs" tick={{ fill: "#888" }} />
					<Tooltip
						contentStyle={{
							backgroundColor: "hsl(var(--card))",
							border: "1px solid hsl(var(--border))",
							borderRadius: "8px",
						}}
					/>
					<Area
						type="monotone"
						dataKey="bookings"
						stroke="#dc2626"
						fillOpacity={1}
						fill="url(#colorBookings)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
