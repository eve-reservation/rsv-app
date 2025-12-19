import type { Route } from "./+types/lifestyle";
import { PAGE_TITLES } from "~/config/page-titles";
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
			{/* Minimal Background Pattern */}
			<div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
			<div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px] pointer-events-none" />

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
