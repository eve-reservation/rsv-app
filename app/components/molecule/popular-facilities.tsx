const facilities = [
	{ name: "BGC Full Court", sport: "Basketball", bookings: 245 },
	{ name: "Makati Tennis Club", sport: "Tennis", bookings: 198 },
	{ name: "Ayala Alabang Futsal", sport: "Futsal", bookings: 167 },
	{ name: "La Union Beach Volleyball", sport: "Volleyball", bookings: 142 },
	{ name: "MOA Badminton Center", sport: "Badminton", bookings: 128 },
];

export function PopularFacilities() {
	const maxBookings = Math.max(...facilities.map((f) => f.bookings));

	return (
		<div className="space-y-4">
			{facilities.map((facility, index) => (
				<div key={facility.name} className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<div>
							<span className="font-medium">{facility.name}</span>
							<span className="ml-2 text-muted-foreground">({facility.sport})</span>
						</div>
						<span className="font-semibold">{facility.bookings}</span>
					</div>
					<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
						<div
							className="h-full rounded-full bg-red-600"
							style={{ width: `${(facility.bookings / maxBookings) * 100}%` }}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
