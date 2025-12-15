import React from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { facilities } from "~/lib/data";

// Mock data
const currentBookings = [
	{
		id: 1,
		facility: facilities[0].name,
		image: facilities[0].images[0],
		status: "In Progress",
		date: "Oct 24, 2025",
		time: "10:00 AM - 2:00 PM",
		location: facilities[0].location,
		bookedBy: "John Doe",
	},
	{
		id: 4,
		facility: facilities[1].name,
		image: facilities[1].images[0],
		status: "In Progress",
		date: "Oct 24, 2025",
		time: "3:00 PM - 5:00 PM",
		location: facilities[1].location,
		bookedBy: "Jane Smith",
	},
];

const upcomingBookings = [
	{
		id: 2,
		facility: facilities[1].name,
		image: facilities[1].images[0],
		status: "Confirmed",
		date: "Oct 28, 2025",
		time: "3:00 PM - 5:00 PM",
		location: facilities[1].location,
		bookedBy: "Jane Smith",
	},
];

const pastBookings = [
	{
		id: 3,
		facility: facilities[2].name,
		image: facilities[2].images[0],
		status: "Completed",
		date: "Oct 15, 2025",
		time: "6:00 PM - 8:00 PM",
		location: facilities[2].location,
		bookedBy: "Mike Johnson",
	},
];

export default function UserReservations() {
	// Function to render a list of bookings
	const renderBookings = (bookings: typeof currentBookings) => {
		if (bookings.length === 0) {
			return <p className="text-slate-500 py-4">No bookings found.</p>;
		}

		return (
			<div className="space-y-6">
				{bookings.map((booking) => (
					<div
						key={booking.id}
						className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
						<div className="flex flex-col md:flex-row">
							{/* Left Section - Image */}
							<div className="relative w-full md:w-1/3 h-48 md:h-auto flex-shrink-0">
								<img
									src={booking.image}
									alt={booking.facility}
									className="w-full h-full object-cover"
								/>
								<div className="absolute top-4 left-4">
									<span
										className={`px-3 py-1 rounded-full text-xs font-bold ${
											booking.status === "In Progress"
												? "bg-green-500 text-white"
												: booking.status === "Confirmed"
													? "bg-blue-500 text-white"
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
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
									<div>
										<h2 className="text-2xl font-bold text-slate-900 mb-4">
											{booking.facility}
										</h2>

										<div className="space-y-3">
											<div className="flex items-center text-slate-700">
												<Calendar className="w-5 h-5 mr-3 text-blue-600" />
												<span className="font-medium">{booking.date}</span>
											</div>

											<div className="flex items-center text-slate-700">
												<Clock className="w-5 h-5 mr-3 text-blue-600" />
												<span>{booking.time}</span>
											</div>
										</div>
									</div>

									<div className="space-y-3">
										<div className="flex items-center text-slate-700">
											<MapPin className="w-5 h-5 mr-3 text-blue-600" />
											<span>{booking.location}</span>
										</div>

										<div className="flex items-center text-slate-700">
											<User className="w-5 h-5 mr-3 text-blue-600" />
											<span>Booked by: {booking.bookedBy}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="w-full">
			<Accordion
				type="multiple"
				defaultValue={["current", "upcoming"]}
				className="w-full space-y-4">
				<AccordionItem value="current" className="border-none">
					<AccordionTrigger className="font-semibold px-4 hover:no-underline hover:bg-slate-50 rounded-lg">
						Current Bookings ({currentBookings.length})
					</AccordionTrigger>
					<AccordionContent className="px-1">
						{renderBookings(currentBookings)}
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="upcoming" className="border-none">
					<AccordionTrigger className="font-semibold px-4 hover:no-underline hover:bg-slate-50 rounded-lg">
						Upcoming Bookings ({upcomingBookings.length})
					</AccordionTrigger>
					<AccordionContent className="px-1">
						{renderBookings(upcomingBookings)}
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="past" className="border-none">
					<AccordionTrigger className="font-semibold px-4 hover:no-underline hover:bg-slate-50 rounded-lg">
						Past Bookings ({pastBookings.length})
					</AccordionTrigger>
					<AccordionContent className="px-1">
						{renderBookings(pastBookings)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
