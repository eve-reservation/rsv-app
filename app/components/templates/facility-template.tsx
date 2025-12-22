import type React from "react";

import { useState } from "react";
import { facilities } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

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
	Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, setHours, setMinutes } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BookingDetailsSelector } from "~/components/organisms/booking-details-selector";
import { BackButton } from "../molecule/back-button";

const amenityIcons: Record<string, React.ElementType> = {
	WiFi: Wifi,
	TV: Tv,
	"Mini Bar": Wine,
	"Room Service": ConciergeBell,
	"City View": Building,
};
interface FacilityTemplateProps {
	admin?: boolean;
}

export default function FacilityTemplate({ admin = false }: FacilityTemplateProps) {
	const { id } = useParams();
	const navigate = useNavigate();
	const facility = facilities.find((f) => f.id === id);
	const [currentImage, setCurrentImage] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [startTime, setStartTime] = useState<Date | undefined>(
		setMinutes(setHours(new Date(), 9), 0),
	); // 9:00 AM
	const [endTime, setEndTime] = useState<Date | undefined>(
		setMinutes(setHours(new Date(), 11), 0),
	); // 11:00 AM
	const [guests, setGuests] = useState(1);
	const [showAllPhotos, setShowAllPhotos] = useState(false);

	const handleTimeChange = (start: Date, end: Date) => {
		setStartTime(start);
		setEndTime(end);
	};

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
		const diff = endTime.getTime() - startTime.getTime();
		return diff > 0 ? Number((diff / (1000 * 60 * 60)).toFixed(2)) : 0;
	};

	const duration = getDuration();
	const totalPrice = facility.priceUnit === "hour" ? facility.price * duration : facility.price;
	const serviceFee = Math.round(totalPrice * 0.12);
	const total = totalPrice + serviceFee;
	const isReservationValid = date && duration > 0;

	const handleReserve = () => {
		if (!isReservationValid) return;
		const params = new URLSearchParams();
		params.set("facilityId", facility.id);
		if (date) params.set("date", date.toISOString());
		if (startTime) params.set("startTime", format(startTime, "HH:mm"));
		if (endTime) params.set("endTime", format(endTime, "HH:mm"));
		params.set("guests", guests.toString());
		navigate(`/reservation/confirmation?${params.toString()}`);
	};

	return (
		<div className="animate-in fade-in duration-500">
			<div className="flex items-center justify-between">
				<BackButton showText />
			</div>

			<main className="flex-1 ">
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

				<div className="py-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Left Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Image Gallery */}
							<div className="relative grid grid-cols-3 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
								{/* Main Large Image - Left Side (2x2) */}
								<div
									className={cn(
										"row-span-2 relative overflow-hidden cursor-pointer group",
										facility.images.length <= 1
											? "col-span-3 rounded-2xl"
											: "col-span-4 md:col-span-2 rounded-l-2xl",
									)}
									onClick={() => setShowAllPhotos(true)}>
									<img
										src={facility.images[0] || "/placeholder.svg"}
										alt={facility.name}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
								</div>

								{/* Right Side 2x2 Grid */}
								{facility.images.slice(1, 6).map((image, index) => (
									<div
										key={index}
										className={cn(
											"relative overflow-hidden cursor-pointer group bg-gray-200",
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
											className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 "
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
								<div className="w-full">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										disabled={(date) => date < new Date()}
										className="rounded-xl border border-border w-full"
									/>
								</div>
							</div>
						</div>

						{/* Booking Card */}
						<div className="lg:col-span-1">
							<Card
								className={cn(
									"sticky shadow-xl border-border py-0",
									admin ? "top-0" : "top-24",
								)}>
								<CardContent className="p-6 space-y-6">
									<div className="flex items-baseline justify-between">
										<div>
											<span className="text-2xl font-semibold text-foreground">
												₱{facility.price.toLocaleString()}
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
									{admin ? (
										<Button
											className="w-full cursor-pointer h-12 text-base font-semibold gap-2"
											onClick={() =>
												navigate(`edit`)
											}>
											<Pencil className="h-4 w-4" />
											Edit Facility
										</Button>
									) : (
										<>
											<BookingDetailsSelector
												date={date}
												setDate={setDate}
												startTime={startTime}
												endTime={endTime}
												onTimeChange={handleTimeChange}
												guests={guests}
												setGuests={setGuests}
												maxGuests={facility.capacity}
												guestLabel="Guests"
											/>

											<Button
												className="w-full cursor-pointer qcsc-gradient hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
												onClick={handleReserve}
												disabled={!isReservationValid}>
												Reserve
											</Button>

											{isReservationValid && (
												<>
													{/* <p className="text-center text-sm text-muted-foreground">
												You won't be charged yet
											</p> */}

													<div className="space-y-3 pt-4 border-t border-border">
														<div className="flex items-center justify-between text-foreground">
															<span className="underline">
																₱{facility.price.toLocaleString()} x{" "}
																{duration} {facility.priceUnit}
																{duration > 1 ? "s" : ""}
															</span>
															<span>
																₱{totalPrice.toLocaleString()}
															</span>
														</div>
														<div className="flex items-center justify-between text-foreground">
															<span className="underline">
																Service fee
															</span>
															<span>
																₱{serviceFee.toLocaleString()}
															</span>
														</div>
														<div className="flex items-center justify-between font-semibold text-foreground pt-3 border-t border-border">
															<span>Total</span>
															<span>₱{total.toLocaleString()}</span>
														</div>
													</div>
												</>
											)}
										</>
									)}
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
