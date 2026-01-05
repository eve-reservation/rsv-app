import { useState, useEffect } from "react";
// import { facilities } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Star, Share, Heart, MapPin, Users, Upload, Trash2, Plus, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BackButton } from "~/components/molecule/back-button";
import { useGetFacilityById, useUpdateFacility, useDeleteFacility } from "~/hooks/use-facilities";
import { toast } from "sonner";

export default function EditFacility() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: facilityData, isLoading } = useGetFacilityById(id!, {
		fields: "identifier, displayName, metadata, status, createdAt, updatedAt, location, images",
	});

	const { mutate: updateFacility, isPending: isUpdating } = useUpdateFacility();
	const { mutate: deleteFacility, isPending: isDeleting } = useDeleteFacility();

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

	const [imageFiles, setImageFiles] = useState<(File | null)[]>(Array(5).fill(null));
	const normalizeImages = (images: any[]) => {
		return Array(5)
			.fill(null)
			.map((_, i) => {
				const img = images?.[i];
				return typeof img === "string" ? img : img?.url || null;
			});
	};

	useEffect(() => {
		if (facilityData) {
			const metadata = facilityData.metadata || {};
			setFormData({
				name: facilityData.displayName || facilityData.identifier,
				location: facilityData.location || "",
				description: metadata.description || "",
				price: metadata.price || 0,
				priceUnit: metadata.priceUnit || "hour",
				capacity: metadata.maxOccupancy || 0,
				type: metadata.type || "",
				amenities: metadata.amenities || [],
				// Ensure we have at least 5 slots for the grid layout
				images: normalizeImages(facilityData.images || []),
			});
		}
	}, [facilityData]);

	if (isLoading) return <div>Loading...</div>;

	if (!facilityData) {
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
		document.getElementById(`image-upload-${index}`)?.click();
	};

	const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Update files state
			const newFiles = [...imageFiles];
			newFiles[index] = file;
			setImageFiles(newFiles);

			// Update preview state
			const newImages = [...formData.images];
			newImages[index] = URL.createObjectURL(file);
			setFormData((prev) => ({ ...prev, images: newImages }));
		}
	};

	const handleSave = () => {
		const payload = new FormData();

		payload.append("displayName", formData.name);
		payload.append("location", formData.location);

		// Append metadata as JSON string
		const metadata = {
			description: formData.description,
			price: Number(formData.price),
			priceUnit: formData.priceUnit,
			maxOccupancy: Number(formData.capacity),
			type: formData.type,
			amenities: formData.amenities,
		};
		payload.append("metadata", JSON.stringify(metadata));

		// Handle images
		// Existing images (strings)
		formData.images.forEach((img) => {
			if (typeof img === "string" && !img.startsWith("blob:")) {
				payload.append("images", img);
			}
		});

		// New image files
		imageFiles.forEach((file) => {
			if (file) {
				payload.append("coverImages", file);
			}
		});

		updateFacility(
			{
				facilityId: id!,
				data: payload,
			},
			{
				onSuccess: () => {
					toast.success("Facility updated successfully");
					navigate(`/admin/facility/${id}`);
				},
				onError: (error) => {
					toast.error("Failed to update facility");
					console.error(error);
				},
			},
		);
	};

	const handleDelete = () => {
		if (
			confirm("Are you sure you want to delete this facility? This action cannot be undone.")
		) {
			deleteFacility(id!, {
				onSuccess: () => {
					toast.success("Facility deleted successfully");
					navigate("/admin/facilities");
				},
				onError: (error) => {
					toast.error("Failed to delete facility");
					console.error(error);
				},
			});
		}
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
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
						{/* Left Content */}
						<div className="lg:col-span-2 space-y-4">
							{/* Image Gallery Editable */}
							<div className="relative grid grid-cols-3 gap-2 auto-rows-[120px] md:auto-rows-[160px] rounded-2xl overflow-hidden">
								{/* Main Large Image - Left Side (2x2) */}
								<div
									className={cn(
										"row-span-2 relative overflow-hidden cursor-pointer group bg-muted border-2 border-dashed border-border hover:border-accent transition-colors flex flex-col items-center justify-center",
										"col-span-4 md:col-span-2 rounded-l-2xl",
									)}
									onClick={() => handleImageClick(0)}>
									<input
										type="file"
										id="image-upload-0"
										className="hidden"
										accept="image/*"
										onChange={(e) => handleFileChange(0, e)}
									/>
									{formData.images[0] ? (
										<img
											src={formData.images[0]!}
											alt="Main"
											className="w-full h-full object-cover opacity-80 group-hover:opacity-60"
										/>
									) : (
										<div className="flex flex-col items-center text-muted-foreground group-hover:text-foreground">
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
										<input
											type="file"
											id={`image-upload-${index + 1}`}
											className="hidden"
											accept="image/*"
											onChange={(e) => handleFileChange(index + 1, e)}
										/>
										{image ? (
											<img
												src={image}
												alt={`Gallery ${index + 1}`}
												className="w-full h-full object-cover opacity-80 group-hover:opacity-60"
											/>
										) : (
											<Upload className="h-6 w-6 text-muted-foreground group-hover:text-foreground" />
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
										<span className="font-medium">{0}</span>
										<span className="text-muted-foreground">({0} reviews)</span>
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

									<div className="flex gap-2">
										<Button
											variant="outline"
											size="icon"
											className="h-12 w-12 shrink-0 cursor-pointer"
											onClick={handleDelete}
											disabled={isDeleting || isUpdating}
											title="Delete Facility">
											<Trash2 className="h-5 w-5" />
										</Button>
										<Button
											className="flex-1 cursor-pointer h-12 text-base font-semibold gap-2"
											onClick={handleSave}
											disabled={isUpdating || isDeleting}>
											{isUpdating ? (
												"Saving..."
											) : (
												<>
													<Save className="h-4 w-4" />
													Save Changes
												</>
											)}
										</Button>
									</div>

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
