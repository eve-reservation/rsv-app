import type { Route } from "./+types/sports";
import { PAGE_TITLES } from "~/config/page-titles";
import { BackgroundPattern } from "~/components/ui/background-pattern";
import { facilities, games } from "@/lib/data";
import { Header } from "~/components/organisms/header";
import { SearchBar } from "~/components/molecule/search-bar";
import { FacilitySection } from "~/components/organisms/facility-section";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.sports || "Sports | Reserve" }];
}

export default function SportsPage() {
	const sportsFacilities = facilities.filter((f) => f.category === "sports");
	const popularCourts = sportsFacilities.filter((f) => f.rating >= 4.8);
	const basketballFacilities = sportsFacilities.filter(
		(f) =>
			f.name.toLowerCase().includes("basketball") ||
			f.description.toLowerCase().includes("basketball"),
	);
	const racquetFacilities = sportsFacilities.filter((f) => f.type === "Racquet Sports");

	return (
		<div className="min-h-screen flex flex-col bg-background relative isolate overflow-hidden">
			<BackgroundPattern />
			{/* Hero Section */}
			<section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					{/* <div className="text-center mb-8">
						<h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground text-balance">
							Find your perfect court
						</h1>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
							Discover and book top-rated sports venues near you.
						</p>
					</div> */}
					<SearchBar
						allowedCategories={["sports"]}
						whatPlaceholder="Search for sports facilities..."
						guestLabel="player"
						guestLabelPlural="players"
					/>
				</div>
			</section>

			<main>
				<div className="mx-auto max-w-7xl">
					{/* Popular Courts */}
					<FacilitySection
						title="Most Popular Courts"
						facilities={popularCourts}
						columns={3}
					/>

					{/* Open Games */}
					<FacilitySection
						title="Open Games Near You"
						facilities={games}
						columns={2}
						cardVariant="horizontal"
					/>

					<div className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border mb-6" />

					{/* Specific Sports Facilities */}
					{basketballFacilities.length > 0 && (
						<FacilitySection
							title="Basketball Facilities"
							facilities={basketballFacilities}
						/>
					)}

					{racquetFacilities.length > 0 && (
						<FacilitySection
							title="Racquet Sports Facilities"
							facilities={racquetFacilities}
						/>
					)}

					{/* Remaining Sports - if needed, or just general "Other Sports" */}
					<FacilitySection
						title="All Sports Facilities"
						facilities={sportsFacilities.filter(
							(f) =>
								!basketballFacilities.includes(f) && !racquetFacilities.includes(f),
						)}
					/>
				</div>
			</main>
		</div>
	);
}
