import {
	CheckCircle,
	MapPin,
	Calendar,
	Clock,
	User,
	Briefcase,
	ChevronLeft,
	Home,
	ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function ReservationConfirmation() {
	const navigate = useNavigate();
	const location = useLocation();
	const { selectedSlots, roomName, roomLocation, calendarDate } = location.state || {};

	const [isConfirmed, setIsConfirmed] = useState(false);

	// Mock Booker Details (since we don't have a real user context yet)
	const bookerName = "Alex Morgan";
	const bookerRole = "Product Design Lead";
	const bookerDept = "User Experience";

	// Sort slots to find start and end time
	const sortedSlots = selectedSlots?.sort() || [];
	const startTime = sortedSlots.length > 0 ? sortedSlots[0].split(" - ")[0] : "";
	const endTime =
		sortedSlots.length > 0 ? sortedSlots[sortedSlots.length - 1].split(" - ")[1] : "";

	if (!location.state) {
		return (
			<div className="flex flex-col items-center justify-center w-screen h-screen text-slate-500">
				<p>No reservation data found.</p>
				<button
					onClick={() => navigate("/kiosk/facility")}
					className="mt-4 text-blue-500 hover:underline">
					Return to Facility
				</button>
			</div>
		);
	}

	return (
		<div className="overflow-hidden select-none flex flex-col lg:p-10 gap-6 lg:gap-6 text-slate-600 w-screen h-screen pt-6 pr-6 pb-6 pl-6">
			<div className="flex flex-1 w-full gap-6 h-full min-h-0 justify-center items-center">
				<section className="w-full max-w-3xl neu-flat p-10 flex flex-col relative overflow-hidden rounded-3xl animate-fade-in">
					{/* Header */}
					{!isConfirmed ? (
						<div className="flex flex-col items-center justify-center mb-10 text-center">
							<div className="w-20 h-20 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shadow-[inset_4px_4px_8px_#dbeafe,inset_-4px_-4px_8px_#ffffff] mb-6">
								<ClipboardList size={40} strokeWidth={2.5} />
							</div>
							<h1 className="text-3xl font-semibold text-slate-700 tracking-tight mb-2">
								Review Reservation
							</h1>
							<p className="text-slate-400">
								Please review your booking details before confirming.
							</p>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center mb-10 text-center animate-fade-in">
							<div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-[inset_4px_4px_8px_#d1fae5,inset_-4px_-4px_8px_#ffffff] mb-6">
								<CheckCircle size={40} strokeWidth={2.5} />
							</div>
							<h1 className="text-3xl font-semibold text-slate-700 tracking-tight mb-2">
								Booking Confirmed
							</h1>
							<p className="text-slate-400">
								Your reservation has been successfully scheduled.
							</p>
						</div>
					)}

					{/* Ticket / Details Card */}
					<div className="neu-pressed rounded-2xl p-8 mb-10 relative overflow-hidden">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
							{/* Room Details */}
							<div className="space-y-6">
								<div>
									<h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
										Room
									</h3>
									<div className="flex items-start gap-3">
										<div className="mt-1 text-slate-400">
											<MapPin size={18} />
										</div>
										<div>
											<p className="text-lg font-medium text-slate-700">
												{roomName}
											</p>
											<p className="text-sm text-slate-500">{roomLocation}</p>
										</div>
									</div>
								</div>

								<div>
									<h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
										Date & Time
									</h3>
									<div className="flex items-start gap-3">
										<div className="mt-1 text-slate-400">
											<Clock size={18} />
										</div>
										<div>
											<p className="text-lg font-medium text-slate-700">
												{calendarDate}
											</p>
											<p className="text-sm text-slate-500">
												{startTime} - {endTime}
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Booker Details */}
							<div className="space-y-6 md:border-l md:border-slate-200/50 md:pl-8">
								<div>
									<h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
										Booked By
									</h3>
									<div className="flex items-start gap-3">
										<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shadow-inner">
											<User size={20} />
										</div>
										<div>
											<p className="text-lg font-medium text-slate-700">
												{bookerName}
											</p>
											<p className="text-sm text-slate-500">{bookerRole}</p>
										</div>
									</div>
								</div>
								<div>
									<h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
										Department
									</h3>
									<div className="flex items-center gap-2 text-slate-600">
										<Briefcase size={16} className="text-slate-400" />
										<span className="text-sm font-medium">{bookerDept}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className="flex gap-4">
						{!isConfirmed ? (
							<>
								<button
									onClick={() => navigate(-1)}
									className="flex-1 h-12 neu-btn flex items-center justify-center gap-2 text-slate-600 font-medium transition-transform active:scale-95">
									<ChevronLeft size={18} />
									Modify
								</button>
								<button
									onClick={() => setIsConfirmed(true)}
									className="flex-[2] h-12 neu-btn-primary flex items-center justify-center gap-2 text-sm font-medium tracking-wide uppercase transition-transform active:scale-95">
									<CheckCircle size={18} />
									Confirm Booking
								</button>
							</>
						) : (
							<button
								onClick={() => navigate("/scheduling/facility/1")}
								className="w-full h-12 neu-btn-primary flex items-center justify-center gap-2 text-sm font-medium tracking-wide uppercase transition-transform active:scale-95">
								<Home size={18} />
								Done
							</button>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}
