import { format } from "date-fns";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";

interface Image {
	name: string;
	url: string;
	type: string;
}

interface Facility {
	id: string;
	displayName: string;
	images: Image[];
}

interface BookingPeriod {
	startDateTime: string;
	endDateTime: string;
	numberOfDays: number;
	numberOfHours: number;
	originalHours: number | null;
	extendedHours: number | null;
	checkedInAt: string | null;
	checkedOutAt: string | null;
}

interface UserData {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
}

interface Reservation {
	id: string;
	status: string;
	totals: any; // Using any for now as it's null in example
	user: UserData;
	bookingPeriod: BookingPeriod;
	facility: Facility;
	guests: any[];
}

interface UserReservationsProps {
	reservations?: Reservation[];
}

export default function UserReservations({ reservations = [] }: UserReservationsProps) {
	const now = new Date();

	const currentBookings = reservations.filter((r) => {
		const start = new Date(r.bookingPeriod.startDateTime);
		const end = new Date(r.bookingPeriod.endDateTime);
		return start <= now && end >= now;
	});

	const upcomingBookings = reservations.filter((r) => {
		const start = new Date(r.bookingPeriod.startDateTime);
		return start > now;
	});

	const pastBookings = reservations.filter((r) => {
		const end = new Date(r.bookingPeriod.endDateTime);
		return end < now;
	});

	// Function to render a list of bookings
	const renderBookings = (bookings: Reservation[]) => {
		if (bookings.length === 0) {
			return <p className="text-slate-500 p-4">No bookings found.</p>;
		}

		return (
			<div className="space-y-6">
				{bookings.map((booking) => {
					const start = new Date(booking.bookingPeriod.startDateTime);
					const end = new Date(booking.bookingPeriod.endDateTime);
					const dateStr = format(start, "MMM dd, yyyy");
					const timeStr = `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
					const facilityImage = booking.facility.images[0]?.url || "";
					// Assuming location isn't provided in the current payload, we'll leave it blank or hide it if empty
					const location = "";

					return (
						<div
							key={booking.id}
							className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
							<div className="flex flex-col md:flex-row">
								{/* Left Section - Image */}
								<div className="relative w-full md:w-1/3 h-48 md:h-auto flex-shrink-0">
									<img
										src={facilityImage}
										alt={booking.facility.displayName}
										className="w-full h-full object-cover"
									/>
									<div className="absolute top-4 left-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-bold ${
												booking.status === "PENDING" // Adjust status checks as needed
													? "bg-yellow-500 text-white"
													: booking.status === "CONFIRMED"
														? "bg-green-500 text-white"
														: "bg-gray-500 text-white"
											}`}>
											{booking.status}
										</span>
									</div>
								</div>

								{/* Perforation Mark (Hidden on mobile, visible on desktop) */}
								<div className="hidden md:block relative flex-shrink-0 bg-slate-50">
									{/* Vertical dotted line */}
									<div className="absolute inset-y-0 left-1/2 w-px border-l-2 border-dashed border-slate-300 transform -translate-x-1/2"></div>

									{/* Semi-circles */}
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-slate-100 rounded-full"></div>
									<div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-slate-100 rounded-full"></div>
								</div>

								{/* Right Section - Details */}
								<div className="flex-1 p-6 flex flex-col justify-between">
									<h2 className="text-xl font-bold text-slate-900 mb-4">
										{booking.facility.displayName}
									</h2>
									<div className="grid grid-cols-2 md:grid-cols-1 gap-3">
										<div>
											<div className="space-y-3">
												<div className="flex items-center text-slate-700">
													<Calendar className="w-5 h-5 mr-3 text-primary" />
													<span className="font-medium">{dateStr}</span>
												</div>

												<div className="flex items-center text-slate-700">
													<Clock className="w-5 h-5 mr-3 text-primary" />
													<span>{timeStr}</span>
												</div>
											</div>
										</div>

										<div className="space-y-3">
											{location && (
												<div className="flex items-center text-slate-700">
													<MapPin className="w-5 h-5 mr-3 text-primary" />
													<span>{location}</span>
												</div>
											)}

											<div className="flex items-center text-slate-700">
												<User className="w-5 h-5 mr-3 text-primary" />
												<span>
													Booked by: {booking.user.firstName}{" "}
													{booking.user.lastName}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className="w-full">
			<Accordion
				type="multiple"
				defaultValue={["current", "upcoming"]}
				className="w-full space-y-3">
				<AccordionItem value="current" className="border-none">
					<AccordionTrigger className="cursor-pointer font-semibold px-4 hover:no-underline bg-white border hover:bg-slate-50 rounded-lg">
						Current Bookings ({currentBookings.length})
					</AccordionTrigger>
					<AccordionContent className="py-2">
						{renderBookings(currentBookings)}
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="upcoming" className="border-none">
					<AccordionTrigger className="cursor-pointer font-semibold px-4 hover:no-underline bg-white border hover:bg-slate-50 rounded-lg">
						Upcoming Bookings ({upcomingBookings.length})
					</AccordionTrigger>
					<AccordionContent className="py-2">
						{renderBookings(upcomingBookings)}
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="past" className="border-none">
					<AccordionTrigger className="cursor-pointer font-semibold px-4 hover:no-underline bg-white border hover:bg-slate-50 rounded-lg">
						Past Bookings ({pastBookings.length})
					</AccordionTrigger>
					<AccordionContent className="py-2">
						{renderBookings(pastBookings)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
