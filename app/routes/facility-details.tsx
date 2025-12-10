import type React from "react";

import { useState, use } from "react";
import { facilities } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Star,
	Share,
	Heart,
	MapPin,
	Users,
	Wifi,
	Tv,
	Wine,
	ConciergeBell,
	Building,
	Check,
	X,
	Grid3x3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";

const amenityIcons: Record<string, React.ElementType> = {
	WiFi: Wifi,
	TV: Tv,
	"Mini Bar": Wine,
	"Room Service": ConciergeBell,
	"City View": Building,
};

const timeSlots = Array.from({ length: (22 - 8) * 2 + 1 }, (_, i) => {
	const totalMinutes = i * 30 + 8 * 60;
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const period = hours >= 12 ? "PM" : "AM";
	const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
	return {
		value: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
		label: `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`,
	};
});

export default function FacilityPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const facility = facilities.find((f) => f.id === id);
	const [currentImage, setCurrentImage] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [startTime, setStartTime] = useState<string | undefined>(timeSlots[2].value); // 9:00 AM
	const [endTime, setEndTime] = useState<string | undefined>(timeSlots[6].value); // 11:00 AM
	const [guests, setGuests] = useState(1);
	const [showAllPhotos, setShowAllPhotos] = useState(false);

	if (!facility) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="text-center">
					<h1 className="text-2xl font-semibold text-foreground">Facility not found</h1>
					<Link to="/" className="mt-4 text-accent hover:underline">
						Go back home
					</Link>
				</div>
			</div>
		);
	}

	const getDuration = () => {
		if (!startTime || !endTime) return 0;
		const start = new Date(`1970-01-01T${startTime}:00`);
		const end = new Date(`1970-01-01T${endTime}:00`);
		const diff = end.getTime() - start.getTime();
		return diff > 0 ? diff / (1000 * 60 * 60) : 0;
	};

	const duration = getDuration();
	const totalPrice =
		facility.priceUnit === "hour" ? facility.price * duration : facility.price;
	const serviceFee = Math.round(totalPrice * 0.12);
	const total = totalPrice + serviceFee;
	const isReservationValid = date && duration > 0;

	const handleReserve = () => {
		if (!isReservationValid) return;
		const params = new URLSearchParams();
		params.set("facilityId", facility.id);
		if (date) params.set("date", date.toISOString());
		if (startTime) params.set("startTime", startTime);
		if (endTime) params.set("endTime", endTime);
		params.set("guests", guests.toString());
		navigate(`/user/booking-confirmation?${params.toString()}`);
	};

	return (
		<div>
			<main className="flex-1">
				{/* Photo Gallery Modal */}
				{showAllPhotos && (
					<div className="fixed inset-0 z-50 bg-background overflow-y-auto">
						<div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
							<Button
								variant="ghost"
								onClick={() => setShowAllPhotos(false)}
								className="gap-2">
								<X className="h-4 w-4" />
								Close
							</Button>
							<span className="text-sm text-muted-foreground">
								{currentImage + 1} / {facility.images.length}
							</span>
						</div>
						<div className="max-w-4xl mx-auto py-8 px-4 space-y-4">
							{facility.images.map((image, index) => (
								<div
									key={index}
									className="relative aspect-video rounded-xl overflow-hidden">
									<img
										src={image || "/placeholder.svg"}
										alt={`${facility.name} - Image ${index + 1}`}
										className="object-cover"
									/>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Image Gallery - FIXED */}
				<section className="relative">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
						<div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
							{/* Main Large Image - Left Side (2x2) */}
							<div
								className="col-span-4 md:col-span-2 row-span-2 relative overflow-hidden rounded-l-2xl cursor-pointer group"
								onClick={() => setShowAllPhotos(true)}>
								<img
									src={facility.images[0] || "/placeholder.svg"}
									alt={facility.name}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
							</div>

							{/* Right Side 2x2 Grid */}
							{facility.images.slice(1, 5).map((image, index) => (
								<div
									key={index}
									className={cn(
										"relative overflow-hidden cursor-pointer group",
										index === 0 && "rounded-tr-2xl",
										index === 3 && "rounded-br-2xl md:rounded-br-none",
										index === facility.images.slice(1, 5).length - 1 &&
											facility.images.length <= 4 &&
											"md:rounded-br-2xl",
									)}
									onClick={() => setShowAllPhotos(true)}>
									<img
										src={image || "/placeholder.svg"}
										alt={`${facility.name} - ${index + 2}`}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
								</div>
							))}

							{/* Show All Photos Button */}
							<Button
								variant="secondary"
								className="absolute bottom-6 right-6 bg-white/90 backdrop-blur hover:bg-white shadow-lg border border-white/50"
								onClick={() => setShowAllPhotos(true)}>
								<Grid3x3 className="h-4 w-4 mr-2" />
								Show all photos
							</Button>
						</div>
					</div>
				</section>

				{/* Content */}
				<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Left Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Header */}
							<div className="flex items-start justify-between">
								<div>
									<h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
										{facility.name}
									</h1>
									<div className="mt-2 flex items-center gap-4 text-sm">
										<div className="flex items-center gap-1">
											<Star className="h-4 w-4 fill-foreground text-foreground" />
											<span className="font-medium">{facility.rating}</span>
											<span className="text-muted-foreground">
												({facility.reviewCount} reviews)
											</span>
										</div>
										<span className="text-muted-foreground">·</span>
										<div className="flex items-center gap-1 text-muted-foreground">
											<MapPin className="h-4 w-4" />
											{facility.location}
										</div>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button variant="ghost" size="sm" className="gap-2">
										<Share className="h-4 w-4" />
										<span className="hidden sm:inline">Share</span>
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="gap-2"
										onClick={() => setIsLiked(!isLiked)}>
										<Heart
											className={cn(
												"h-4 w-4",
												isLiked && "fill-accent text-accent",
											)}
										/>
										<span className="hidden sm:inline">Save</span>
									</Button>
								</div>
							</div>

							<div className="border-t border-border" />

							{/* Host Info */}
							<div className="flex items-center gap-4">
								<div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
									<Users className="h-6 w-6 text-muted-foreground" />
								</div>
								<div>
									<p className="font-medium text-foreground">{facility.type}</p>
									<p className="text-sm text-muted-foreground">
										Up to {facility.capacity} guests
									</p>
								</div>
							</div>

							<div className="border-t border-border" />

							{/* Description */}
							<div>
								<h2 className="text-xl font-semibold text-foreground mb-4">
									About this space
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									{facility.description}
								</p>
							</div>

							<div className="border-t border-border" />

							{/* Amenities */}
							<div>
								<h2 className="text-xl font-semibold text-foreground mb-4">
									What this place offers
								</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{facility.amenities.map((amenity) => {
										const Icon = amenityIcons[amenity] || Check;
										return (
											<div key={amenity} className="flex items-center gap-4">
												<Icon className="h-5 w-5 text-muted-foreground" />
												<span className="text-foreground">{amenity}</span>
											</div>
										);
									})}
								</div>
							</div>

							<div className="border-t border-border" />

							{/* Calendar */}
							<div>
								<h2 className="text-xl font-semibold text-foreground mb-2">
									{duration > 0
										? `Selected ${duration} ${duration === 1 ? "hour" : "hours"}`
										: "Select a date and time"}
								</h2>
								{date && (
									<p className="text-sm text-muted-foreground mb-4">
										{format(date, "MMMM d, yyyy")}
									</p>
								)}
								<div className="flex justify-center">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										disabled={(date) => date < new Date()}
										className="rounded-xl border border-border"
									/>
								</div>
							</div>
						</div>

						{/* Booking Card */}
						<div className="lg:col-span-1">
							<Card className="sticky top-24 shadow-xl border-border">
								<CardContent className="p-6 space-y-6">
									<div className="flex items-baseline justify-between">
										<div>
											<span className="text-2xl font-semibold text-foreground">
												₱{facility.price}
											</span>
											<span className="text-muted-foreground">
												{" "}
												/ {facility.priceUnit}
											</span>
										</div>
										<div className="flex items-center gap-1 text-sm">
											<Star className="h-4 w-4 fill-foreground text-foreground" />
											<span className="font-medium">{facility.rating}</span>
										</div>
									</div>

									{/* Date & Time Selection */}
									<div className="border border-border rounded-xl p-3 space-y-4">
										{/* Date */}
										<div>
											<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
												Date
											</label>
											<span className="text-sm text-foreground">
												{date ? format(date, "MMM d, yyyy") : "Select a date"}
											</span>
										</div>

										{/* Time */}
										<div className="grid grid-cols-2 gap-3">
											<div>
												<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
													Start Time
												</label>
												<Select value={startTime} onValueChange={setStartTime}>
													<SelectTrigger>
														<SelectValue placeholder="Select" />
													</SelectTrigger>
													<SelectContent>
														{timeSlots.map((slot) => (
															<SelectItem key={slot.value} value={slot.value}>
																{slot.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
											<div>
												<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
													End Time
												</label>
												<Select value={endTime} onValueChange={setEndTime}>
													<SelectTrigger>
														<SelectValue placeholder="Select" />
													</SelectTrigger>
													<SelectContent>
														{timeSlots.map((slot) => (
															<SelectItem key={slot.value} value={slot.value}>
																{slot.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>

										{/* Guests */}
										<div>
											<label className="block text-[10px] font-semibold uppercase tracking-wide text-foreground">
												Guests
											</label>
											<div className="flex items-center justify-between">
												<span className="text-sm text-foreground">
													{guests === 1 ? "1 guest" : `${guests} guests`}
												</span>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="icon"
														className="h-7 w-7 rounded-full bg-transparent"
														onClick={() =>
															setGuests(Math.max(1, guests - 1))
														}>
														-
													</Button>
													<Button
														variant="outline"
														size="icon"
														className="h-7 w-7 rounded-full bg-transparent"
														onClick={() =>
															setGuests(
																Math.min(facility.capacity, guests + 1),
															)
														}>
														+
													</Button>
												</div>
											</div>
										</div>
									</div>

									<Button
										className="w-full qcsc-gradient hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
										onClick={handleReserve}
										disabled={!isReservationValid}>
										Reserve
									</Button>

									{isReservationValid && (
										<>
											<p className="text-center text-sm text-muted-foreground">
												You won't be charged yet
											</p>

											<div className="space-y-3 pt-4 border-t border-border">
												<div className="flex items-center justify-between text-foreground">
													<span className="underline">
														₱{facility.price} x {duration}{" "}
														{facility.priceUnit}
														{duration > 1 ? "s" : ""}
													</span>
													<span>₱{totalPrice.toFixed(2)}</span>
												</div>
												<div className="flex items-center justify-between text-foreground">
													<span className="underline">Service fee</span>
													<span>₱{serviceFee.toFixed(2)}</span>
												</div>
												<div className="flex items-center justify-between font-semibold text-foreground pt-3 border-t border-border">
													<span>Total</span>
													<span>₱{total.toFixed(2)}</span>
												</div>
											</div>
										</>
									)}
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
