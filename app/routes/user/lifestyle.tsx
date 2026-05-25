import type { Route } from "./+types/lifestyle";
import { PAGE_TITLES } from "~/config/page-titles";
import { BackgroundPattern } from "~/components/ui/background-pattern";
import { facilities } from "@/lib/data";
import { SearchBar } from "~/components/molecule/search-bar";
import { FacilitySection } from "~/components/organisms/facility-section";
import { Link } from "react-router";
import { FacilityCard } from "~/components/molecule/facility-card";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.lifestyle || "Lifestyle | Reserve" }];
}

export default function LifestylePage() {
	const allFacilities = facilities;
	const diningFacilities = allFacilities.filter((f) => f.category === "dining");
	const wellnessFacilities = allFacilities.filter((f) => f.category === "wellness");

	const wellnessAndOthers = wellnessFacilities.filter(
		(f) =>
			f.facilityType?.spaceType === "Wellness" ||
			f.facilityType?.spaceType === "Leisure" ||
			f.facilityType?.spaceType === "Function Room" ||
			f.facilityType?.spaceType === "Meeting Space",
	);

	// We can further segment if needed, for instance isolating strictly "Wellness" (Spa/Salon) vs "Social" (Function Rooms)
	const spaAndSalon = wellnessFacilities.filter((f) => f.facilityType?.spaceType === "Wellness");
	const socialSpaces = wellnessFacilities.filter((f) => f.facilityType?.spaceType !== "Wellness");

	return (
		<div className="min-h-screen flex flex-col bg-background relative isolate overflow-hidden">
			<BackgroundPattern />
			{/* Hero Section */}
			<section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<SearchBar
						allowedCategories={["dining", "wellness"]}
						whatPlaceholder="Search for dining, spa, etc..."
					/>
				</div>
			</section>

			<main>
				<div className="mx-auto max-w-7xl">
					{/* Dining Section */}
					<FacilitySection title="Dining & Gastronomy" columns={4}>
						{diningFacilities.map((facility) => (
							<Link key={facility.id} to={`/facility/${facility.id}`}>
								<FacilityCard facility={facility} />
							</Link>
						))}
					</FacilitySection>

					{/* Wellness Section */}
					{spaAndSalon.length > 0 && (
						<FacilitySection title="Wellness & Relaxation" columns={4}>
							{spaAndSalon.map((facility) => (
								<Link key={facility.id} to={`/facility/${facility.id}`}>
									<FacilityCard facility={facility} />
								</Link>
							))}
						</FacilitySection>
					)}

					{/* Social/Leisure Section */}
					{socialSpaces.length > 0 && (
						<FacilitySection title="Social & Leisure Spaces" columns={4}>
							{socialSpaces.map((facility) => (
								<Link key={facility.id} to={`/facility/${facility.id}`}>
									<FacilityCard facility={facility} />
								</Link>
							))}
						</FacilitySection>
					)}

					{/* Fallback or specific logical grouping if needed */}
					{/* Example: Highlights or Specific amenities could go here */}
				</div>
			</main>
		</div>
	);
}
