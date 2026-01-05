import {
	Info,
	Users,
	Wifi,
	Monitor,
	Video,
	Coffee,
	ChevronLeft,
	ChevronRight,
	Check,
	CalendarPlus,
	Bell,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function RoomReservationKiosk() {
	const navigate = useNavigate();
	const mockData = {
		roomStatus: "Available Now",
		roomLocation: "Level 3, East Wing",
		roomName: "Executive Studio A",
		roomImage:
			"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
		roomCapacity: 12,
		amenities: [
			{
				color: "blue-500",
				icon: <Wifi size={22} strokeWidth={2} />,
				label: "5G Wi-Fi",
			},
			{
				color: "slate-500",
				icon: <Monitor size={22} strokeWidth={2} />,
				label: "4K Display",
			},
			{
				color: "slate-500",
				icon: <Video size={22} strokeWidth={2} />,
				label: "Video Conf",
			},
			{
				color: "amber-500",
				icon: <Coffee size={22} strokeWidth={2} />,
				label: "Service",
			},
		],
		calendarDate: "December 11",
		calendarDay: "Thursday",
		timeSlots: [
			{
				time: "09:00 - 09:30",
				status: "Booked",
			},
			{
				time: "09:30 - 10:00",
				status: "Available",
			},
			{
				time: "10:00 - 10:30",
				status: "Available",
			},
			{
				time: "10:30 - 11:00",
				status: "Available",
			},
			{
				time: "11:00 - 11:30",
				status: "Available",
			},
			{
				time: "11:30 - 12:00",
				status: "Available",
			},
			{
				time: "12:00 - 12:30",
				status: "Available",
			},
			{
				time: "12:30 - 13:00",
				status: "Available",
			},
			{
				time: "13:00 - 13:30",
				status: "Booked",
			},
			{
				time: "13:30 - 14:00",
				status: "Available",
			},
			{
				time: "14:00 - 14:30",
				status: "Available",
			},
			{
				time: "14:30 - 15:00",
				status: "Available",
			},
			{
				time: "15:00 - 15:30",
				status: "Available",
			},
			{
				time: "15:30 - 16:00",
				status: "Available",
			},
			{
				time: "16:00 - 16:30",
				status: "Available",
			},
			{
				time: "16:30 - 17:00",
				status: "Available",
			},
			{
				time: "17:00 - 17:30",
				status: "Available",
			},
			{
				time: "17:30 - 18:00",
				status: "Available",
			},
		],
		companyUpdate: "The quarterly All-Hands meeting starts at 2:00 PM in the Main Hall.",
		kioskId: "Kiosk #04",
	};

	const [selectedSlots, setSelectedSlots] = useState([]);
	const [currentTime, setCurrentTime] = useState("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setCurrentTime(
				now.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}),
			);
		};
		updateTime();
		const interval = setInterval(updateTime, 60000);
		return () => clearInterval(interval);
	}, []);

	const parseTime = (t) => {
		const [time, ampm] = t.split(" ");
		let [h, m] = time.split(":").map(Number);
		if (ampm === "PM" && h !== 12) h += 12;
		if (ampm === "AM" && h === 12) h = 0;
		return h * 60 + m;
	};

	const isPast = (slotTime, currTime) => {
		const [_, end] = slotTime.split(" - ");
		const endMin = parseTime(end);
		const currMin = parseTime(currTime);
		return endMin <= currMin;
	};

	const computeDuration = (time) => {
		const [start, end] = time.split(" - ");
		const startMin = parseTime(start);
		const endMin = parseTime(end);
		return endMin - startMin + " min";
	};

	return (
		<div className="overflow-hidden select-none flex flex-col lg:p-10 gap-6 lg:gap-6 text-slate-600 w-screen h-screen pt-6 pr-6 pb-6 pl-6">
			{/* Top Section: Main Content & Sidebar (Golden Ratio Layout) */}
			<div className="flex flex-1 w-full gap-6 h-full min-h-0">
				{/* LEFT: Room Details (~62% width) */}
				<section className="flex-[1.618] neu-flat p-8 flex flex-col relative overflow-hidden h-full">
					{/* Header */}
					<div className="flex justify-between items-start mb-6">
						<div className="">
							<div className="flex items-center gap-3 mb-2">
								<span className="px-3 py-1 rounded-full text-xs font-medium bg-[#eff2f6] text-emerald-600 border border-emerald-100 shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff]">
									{mockData.roomStatus}
								</span>
								<span className="text-xs text-slate-400 font-normal">
									{mockData.roomLocation}
								</span>
							</div>
							<h1 className="text-4xl text-slate-700 font-medium tracking-tight">
								{mockData.roomName}
							</h1>
						</div>
						<div className="neu-icon-box cursor-pointer text-slate-400 hover:text-slate-600 transition-colors">
							<Info size={20} strokeWidth={2} />
						</div>
					</div>

					{/* Hero Image Area (Inset/Pressed Look) */}
					<div className="flex-1 w-full neu-pressed mb-8 relative overflow-hidden group">
						<img
							src={mockData.roomImage}
							alt="Meeting Room"
							className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply filter grayscale-[20%] transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#eff2f6] via-transparent to-transparent opacity-80"></div>

						{/* Floating Capacity Badge */}
						<div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#eff2f6]/90 backdrop-blur-sm shadow-[4px_4px_8px_rgba(0,0,0,0.1)]">
							<Users size={16} strokeWidth={2} className="text-slate-500" />
							<span className="text-sm font-medium text-slate-700">
								Max {mockData.roomCapacity} People
							</span>
						</div>
					</div>

					{/* Amenities Grid */}
					<div className="grid grid-cols-4 gap-6">
						{mockData.amenities.map((amenity, index) => (
							<div key={index} className="flex flex-col items-center gap-3">
								<div className={`neu-icon-box text-${amenity.color}`}>
									{amenity.icon}
								</div>
								<span className="text-xs font-medium text-slate-500">
									{amenity.label}
								</span>
							</div>
						))}
					</div>
				</section>

				{/* RIGHT: Schedule / Reservation (~38% width) */}
				<section className="flex-1 neu-flat flex flex-col min-w-[320px] h-full pt-8 md:pt-8">
					{/* Calendar Header */}
					<div className="flex items-center justify-between mb-8 px-8">
						<button className="neu-btn w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600">
							<ChevronLeft size={20} strokeWidth={2} />
						</button>
						<div className="text-center">
							<h2 className="text-lg font-medium text-slate-700 tracking-tight">
								{mockData.calendarDate}
							</h2>
							<p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
								{mockData.calendarDay}
							</p>
						</div>
						<button className="neu-btn w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600">
							<ChevronRight size={20} strokeWidth={2} />
						</button>
					</div>

					{/* Time Slots */}
					<div className="flex-1 overflow-y-auto  space-y-4 mb-6 px-8">
						{/* Current Time Indicator */}
						<div className="flex items-center gap-2 mb-2 px-1">
							<div className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]"></div>
							<span className="text-[10px] text-red-400 font-medium">
								{currentTime}
							</span>
							<div className="h-[1px] flex-1 bg-gradient-to-r from-red-300/50 to-transparent"></div>
						</div>

						{mockData.timeSlots
							.filter((slot) => !isPast(slot.time, currentTime))
							.map((slot) => {
								const isSelected = selectedSlots.includes(slot.time);
								const isBooked = slot.status === "Booked";
								if (isBooked) {
									return (
										<div
											key={slot.time}
											className="neu-pressed p-4 flex justify-between items-center opacity-60">
											<span className="text-sm font-medium text-slate-400">
												{slot.time}
											</span>
											<span className="text-xs text-slate-400">
												{slot.status}
											</span>
										</div>
									);
								} else {
									return (
										<div
											key={slot.time}
											className={`${isSelected ? "neu-flat p-4 flex justify-between items-center border border-blue-100/50 relative overflow-hidden cursor-pointer group" : "neu-btn p-4 flex justify-between items-center cursor-pointer group"}`}
											onClick={() =>
												setSelectedSlots((prev) =>
													prev.includes(slot.time)
														? prev.filter((t) => t !== slot.time)
														: [...prev, slot.time],
												)
											}>
											{isSelected && (
												<div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>
											)}
											<div
												className={`flex flex-col ${isSelected ? "ml-2" : ""}`}>
												<span
													className={`text-${isSelected ? "base" : "sm"} font-medium text-slate-${isSelected ? "700 group-hover:text-blue-600 transition-colors" : "600 group-hover:text-slate-800"}`}>
													{slot.time}
												</span>
												{isSelected && (
													<span className="text-xs text-blue-500">
														{computeDuration(slot.time)}
													</span>
												)}
											</div>
											{isSelected ? (
												<div className="h-6 w-6 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-inner bg-blue-50">
													<Check size={14} strokeWidth={2} />
												</div>
											) : (
												<span className="text-xs text-slate-400">
													{slot.status}
												</span>
											)}
										</div>
									);
								}
							})}
					</div>

					<div className="px-8 pb-8">
						{/* Primary Action */}
						<button
							onClick={() => {
								if (selectedSlots.length > 0) {
									navigate("/kiosk/reservation/confirmation", {
										state: {
											selectedSlots,
											roomName: mockData.roomName,
											roomLocation: mockData.roomLocation,
											calendarDate: mockData.calendarDate,
										},
									});
								}
							}}
							disabled={selectedSlots.length === 0}
							className={`w-full h-14 neu-btn-primary flex items-center justify-center gap-3 text-sm font-medium tracking-wide uppercase mt-auto transition-all ${selectedSlots.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
							<CalendarPlus size={18} strokeWidth={2} />
							Reserve Room
						</button>
					</div>
				</section>
			</div>

			{/* Bottom Strip: Internal Comms / Widget */}
			<div className="h-16 w-full neu-flat flex items-center px-6 justify-between shrink-0">
				<div className="flex items-center gap-4">
					<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shadow-inner">
						<Bell size={16} strokeWidth={2} />
					</div>
					<div className="h-8 w-[1px] bg-slate-300/50"></div>
					<p className="text-sm text-slate-500 font-normal">
						<span className="font-medium text-slate-700">Company Update:</span>{" "}
						{mockData.companyUpdate}
					</p>
				</div>

				<div className="flex items-center gap-3">
					<span className="text-xs text-slate-400 font-medium">{mockData.kioskId}</span>
					<div className="flex gap-1">
						<div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.6)]"></div>
						<div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
