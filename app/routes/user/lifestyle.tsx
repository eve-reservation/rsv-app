import type { Route } from "./+types/lifestyle";
import { PAGE_TITLES } from "~/config/page-titles";
import { BackgroundPattern } from "~/components/ui/background-pattern";
import { facilities } from "@/lib/data";
import { SearchBar } from "~/components/molecule/search-bar";
import { FacilitySection } from "~/components/organisms/facility-section";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.lifestyle || "Lifestyle | Reserve" }];
}

export default function LifestylePage() {
	const allFacilities = facilities;
	const diningFacilities = allFacilities.filter((f) => f.category === "dining");
	const wellnessFacilities = allFacilities.filter((f) => f.category === "wellness");

	const wellnessAndOthers = wellnessFacilities.filter(
		(f) =>
			f.type === "Wellness" ||
			f.type === "Leisure" ||
			f.type === "Function Room" ||
			f.type === "Meeting Space",
	);

	// We can further segment if needed, for instance isolating strictly "Wellness" (Spa/Salon) vs "Social" (Function Rooms)
	const spaAndSalon = wellnessFacilities.filter((f) => f.type === "Wellness");
	const socialSpaces = wellnessFacilities.filter((f) => f.type !== "Wellness");

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
					<FacilitySection
						title="Dining & Gastronomy"
						facilities={diningFacilities}
						columns={4}
					/>

					{/* Wellness Section */}
					{spaAndSalon.length > 0 && (
						<FacilitySection
							title="Wellness & Relaxation"
							facilities={spaAndSalon}
							columns={4}
						/>
					)}

					{/* Social/Leisure Section */}
					{socialSpaces.length > 0 && (
						<FacilitySection
							title="Social & Leisure Spaces"
							facilities={socialSpaces}
							columns={4}
						/>
					)}

					{/* Fallback or specific logical grouping if needed */}
					{/* Example: Highlights or Specific amenities could go here */}
				</div>
			</main>
		</div>
	);
}
