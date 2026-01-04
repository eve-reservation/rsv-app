import { useParams } from "react-router-dom";
import { useGetFacilityById } from "~/hooks/use-facilities";
import { BackButton } from "../molecule/back-button";
import { Link } from "react-router-dom";

export default function FacilityPhotosTemplate() {
	const { id } = useParams();
	const { data: facilityData, isLoading } = useGetFacilityById(id!, {
		fields: "identifier, displayName, metadata, images",
	});

	if (isLoading) return <div>Loading...</div>;

	if (!facilityData) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="text-center">
					<h1 className="text-2xl font-semibold text-foreground">Facility not found</h1>
					<BackButton showText />
				</div>
			</div>
		);
	}

	const facility = {
		name: facilityData.displayName || facilityData.identifier,
		images: (facilityData.images || []).map((img: any) =>
			typeof img === "string" ? img : img.url || "/placeholder.svg",
		),
	};

	return (
		<div className="animate-in fade-in duration-500">
			<div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
				<BackButton showText />
				<span className="text-sm text-muted-foreground mr-4">
					{facility.images.length} Photos
				</span>
			</div>

			<div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
				<div className="space-y-2">
					<h1 className="text-2xl font-serif font-semibold text-foreground">
						Photos of {facility.name}
					</h1>
					<p className="text-muted-foreground">
						Explore the facility through our gallery.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{facility.images.map((image: string, index: number) => (
						<div
							key={index}
							className={`relative rounded-xl overflow-hidden ${
								index % 3 === 0 ? "md:col-span-2 aspect-video" : "aspect-square"
							}`}>
							<img
								src={image || "/placeholder.svg"}
								alt={`${facility.name} - Image ${index + 1}`}
								className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
