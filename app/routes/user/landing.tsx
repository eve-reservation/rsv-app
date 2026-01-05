import type { Route } from "./+types/landing";
import { PAGE_TITLES } from "~/config/page-titles";
import { BackgroundPattern } from "~/components/ui/background-pattern";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.landing }];
}

import { facilities, games } from "@/lib/data";
import { Header } from "~/components/organisms/header";
import { SearchBar } from "~/components/molecule/search-bar";
import { FacilitySection } from "~/components/organisms/facility-section";
import { DealsSection } from "~/components/organisms/deals-section";
import { useGetFacilityTypes } from "~/hooks/use-facility-types";

export default function LandingPage() {
	const { data, isLoading } = useGetFacilityTypes();
	// const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	return (
		<div className="min-h-screen flex flex-col bg-background relative isolate overflow-hidden">
			<BackgroundPattern />
			{/* Hero Section */}
			<section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="text-center mb-8">
						<h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground text-balance">
							Book experiences near you
						</h1>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
							Courts, games, dining, and shared spaces — all in one place.
						</p>
					</div>
					<SearchBar />
				</div>
			</section>
			{/* Deals Section */}
			<DealsSection />
			{/* Facility Sections */}
			<main>
				{/* DYNAMIC FACILITY TYPES */}
				<div className="mx-auto max-w-7xl">
					{isLoading ? (
						<div className="py-8 text-center text-muted-foreground">
							Loading facilities...
						</div>
					) : (
						(data?.facilityTypes || []).map((type: any) => {
							const mappedFacilities = (type.facilities || []).map(
								(facility: any) => ({
									id: facility.id,
									name: facility.displayName,
									type: type.spaceType,
									location: type.subtype,
									price: type.rateType?.baseRate || 0,
									priceUnit: type.rateType?.rateUnit || "hour",
									capacity: facility.metadata?.maxOccupancy || 0,
									rating: 0,
									reviewCount: 0,
									images: (facility.images || [])
										.filter((img: any) => img.type === "COVER")
										.map((img: any) => img.url),
									amenities: facility.metadata?.amenities || [],
									description: type.description || "",
									available: facility.status === "AVAILABLE",
									category: "sports", // Default category for now
								}),
							);

							// Only show sections that have facilities
							if (mappedFacilities.length === 0) return null;

							return (
								<FacilitySection
									key={type.id}
									title={type.name}
									facilities={mappedFacilities}
								/>
							);
						})
					)}
				</div>

				<div className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border" />
				{/* OPEN/PUBLIC GAMES */}
				<div className="mx-auto max-w-7xl">
					<FacilitySection
						title="Browse public games near you"
						facilities={games}
						columns={2}
						cardVariant="horizontal"
					/>
				</div>
			</main>
		</div>
	);
}
