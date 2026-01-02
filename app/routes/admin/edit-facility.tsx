import type React from "react";

import { useState, useEffect } from "react";
import { facilities } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Star, Share, Heart, MapPin, Users, Upload, Trash2, Plus, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BackButton } from "~/components/molecule/back-button";

export default function EditFacility() {
	const { id } = useParams();
	const navigate = useNavigate();
	const originalFacility = facilities.find((f) => f.id === id);

	// Form State
	const [formData, setFormData] = useState({
		name: "",
		location: "",
		description: "",
		price: 0,
		priceUnit: "",
		capacity: 0,
		type: "",
		amenities: [] as string[],
		images: [] as (string | null)[],
	});

	useEffect(() => {
		if (originalFacility) {
			setFormData({
				name: originalFacility.name,
				location: originalFacility.location,
				description: originalFacility.description,
				price: originalFacility.price,
				priceUnit: originalFacility.priceUnit,
				capacity: originalFacility.capacity,
				type: originalFacility.type,
				amenities: [...originalFacility.amenities],
				// Ensure we have at least 5 slots for the grid layout
				images: Array(5)
					.fill(null)
					.map((_, i) => originalFacility.images[i] || null),
			});
		}
	}, [originalFacility]);

	if (!originalFacility) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="text-center">
					<h1 className="text-2xl font-semibold text-foreground">Facility not found</h1>
					<Link to="/admin/facilities" className="mt-4 text-accent hover:underline">
						Go back to facilities
					</Link>
				</div>
			</div>
		);
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAmenityChange = (index: number, value: string) => {
		const newAmenities = [...formData.amenities];
		newAmenities[index] = value;
		setFormData((prev) => ({ ...prev, amenities: newAmenities }));
	};

	const addAmenity = () => {
		setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, ""] }));
	};

	const removeAmenity = (index: number) => {
		const newAmenities = formData.amenities.filter((_, i) => i !== index);
		setFormData((prev) => ({ ...prev, amenities: newAmenities }));
	};

	// Mock image upload trigger
	const handleImageClick = (index: number) => {
		console.log(`Upload image for slot ${index}`);
		// In a real app, this would trigger a file input
	};

	const handleSave = () => {
		console.log("Saving facility data:", formData);
		// Mock save delay
		setTimeout(() => {
			navigate(`/admin/facility/${id}`);
		}, 500);
	};

	return (
		<div className="animate-in fade-in duration-500 container mx-auto pb-10">
			<div className="flex items-center justify-between">
				<BackButton showText text="Cancel" />
				{/* <Button onClick={handleSave} className="gap-2">
					<Save className="h-4 w-4" />
					Save Changes
				</Button> */}
			</div>

			<main className="flex-1">
				<div className="py-2">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Left Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Image Gallery Editable */}
							<div className="relative grid grid-cols-3 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
								{/* Main Large Image - Left Side (2x2) */}
								<div
									className={cn(
										"row-span-2 relative overflow-hidden cursor-pointer group bg-muted border-2 border-dashed border-border hover:border-accent transition-colors flex flex-col items-center justify-center",
										"col-span-4 md:col-span-2 rounded-l-2xl",
									)}
									onClick={() => handleImageClick(0)}>
									{formData.images[0] ? (
										<img
											src={formData.images[0]!}
											alt="Main"
											className="w-full h-full object-cover opacity-80 group-hover:opacity-60"
										/>
									) : (
										<div className="flex flex-col items-center text-muted-foreground group-hover:text-accent">
											<Upload className="h-10 w-10 mb-2" />
											<span className="font-medium">Upload Cover Photo</span>
										</div>
									)}
									{formData.images[0] && (
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
											<span className="bg-background text-foreground px-3 py-1 rounded-full text-sm font-medium">
												Change
											</span>
										</div>
									)}
								</div>

								{/* Right Side 2x2 Grid */}
								{formData.images.slice(1, 5).map((image, index) => (
									<div
										key={index}
										className={cn(
											"relative overflow-hidden cursor-pointer group bg-muted border-2 border-dashed border-border hover:border-accent transition-colors flex items-center justify-center",
											index === 0 && "rounded-tr-2xl",
											index === 3 && "rounded-br-2xl md:rounded-br-none",
										)}
										onClick={() => handleImageClick(index + 1)}>
										{image ? (
											<img
												src={image}
												alt={`Gallery ${index + 1}`}
												className="w-full h-full object-cover opacity-80 group-hover:opacity-60"
											/>
										) : (
											<Upload className="h-6 w-6 text-muted-foreground group-hover:text-accent" />
										)}
									</div>
								))}
							</div>

							{/* Header Editable */}
							<div className="space-y-4">
								<div className="space-y-2">
									<label
										htmlFor="name"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
										Facility Name
									</label>
									<Input
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										className="text-2xl md:text-3xl font-serif font-semibold h-auto py-2"
										placeholder="Facility Name"
									/>
								</div>

								<div className="flex items-center gap-4">
									<div className="flex-1 space-y-2">
										<label
											htmlFor="location"
											className="text-sm font-medium leading-none">
											Location
										</label>
										<div className="relative">
											<MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
											<Input
												id="location"
												name="location"
												value={formData.location}
												onChange={handleInputChange}
												className="pl-9"
												placeholder="City, Country"
											/>
										</div>
									</div>

									{/* Read-only rating */}
									<div className="mt-6 flex items-center gap-1 text-sm bg-muted px-3 py-2 rounded-md h-10">
										<Star className="h-4 w-4 fill-foreground text-foreground" />
										<span className="font-medium">
											{originalFacility.rating}
										</span>
										<span className="text-muted-foreground">
											({originalFacility.reviewCount} reviews)
										</span>
									</div>
								</div>
							</div>

							<div className="border-t border-border" />

							{/* Host & Capacity Info Editable */}
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label
										htmlFor="type"
										className="text-sm font-medium leading-none">
										Property Type
									</label>
									<div className="relative">
										<Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
										<Input
											id="type"
											name="type"
											value={formData.type}
											onChange={handleInputChange}
											className="pl-9"
											placeholder="e.g. Entire Villa"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="capacity"
										className="text-sm font-medium leading-none">
										Guest Capacity
									</label>
									<Input
										id="capacity"
										name="capacity"
										type="number"
										value={formData.capacity}
										onChange={handleInputChange}
										placeholder="Max guests"
									/>
								</div>
							</div>

							<div className="border-t border-border" />

							{/* Description Editable */}
							<div className="space-y-2">
								<h2 className="text-xl font-semibold text-foreground">
									About this space
								</h2>
								<Textarea
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									className="min-h-[150px]"
									placeholder="Describe the facility..."
								/>
							</div>

							<div className="border-t border-border" />

							{/* Amenities Editable */}
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-semibold text-foreground">
										What this place offers
									</h2>
									<Button
										variant="outline"
										size="sm"
										onClick={addAmenity}
										className="gap-2">
										<Plus className="h-4 w-4" />
										Add Amenity
									</Button>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{formData.amenities.map((amenity, index) => (
										<div key={index} className="flex items-center gap-2 group">
											<Input
												value={amenity}
												onChange={(e) =>
													handleAmenityChange(index, e.target.value)
												}
												placeholder="Amenity name"
											/>
											<Button
												variant="ghost"
												size="icon"
												className="opacity-50 group-hover:opacity-100 hover:text-destructive"
												onClick={() => removeAmenity(index)}>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Booking Card Editable (Price & Settings) */}
						<div className="lg:col-span-1">
							<Card className="sticky top-0 shadow-xl border-border py-0">
								<CardContent className="p-6 space-y-6">
									<div className="space-y-4">
										<h3 className="font-semibold text-lg">Pricing Settings</h3>

										<div className="space-y-2">
											<label
												htmlFor="price"
												className="text-sm font-medium leading-none">
												Base Price (₱)
											</label>
											<Input
												id="price"
												name="price"
												type="number"
												value={formData.price}
												onChange={handleInputChange}
											/>
										</div>

										<div className="space-y-2">
											<label
												htmlFor="priceUnit"
												className="text-sm font-medium leading-none">
												Price Unit
											</label>
											<Input
												id="priceUnit"
												name="priceUnit"
												value={formData.priceUnit}
												onChange={handleInputChange}
												placeholder="e.g. night, hour"
											/>
										</div>
									</div>

									<Button
										className="w-full cursor-pointer h-12 text-base font-semibold gap-2"
										onClick={handleSave}>
										<Save className="h-4 w-4" />
										Save Changes
									</Button>

									<p className="text-xs text-muted-foreground text-center">
										Changes will be reflected immediately after saving.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
