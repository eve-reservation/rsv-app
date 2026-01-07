import type { Route } from "./+types/landing";
import { PAGE_TITLES } from "~/config/page-titles";
import { BackgroundPattern } from "~/components/ui/background-pattern";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.landing }];
}

import { facilities, games, mockLandingData, type Facility } from "@/lib/data";
import { SearchBar } from "~/components/molecule/search-bar";
import { FacilitySection } from "~/components/organisms/facility-section";
import { DealsSection } from "~/components/organisms/deals-section";

export default function LandingPage() {
	return (
		<div className="min-h-screen flex flex-col bg-background relative isolate overflow-hidden">
			<BackgroundPattern />
			{/* Hero Section */}
			<section className="pt-8 pb-6 ">
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
			{/* Facility Sections */}
			<main className="pt-8 pb-6">
				<div className="pb-4">
					<DealsSection />
				</div>
				{/* DYNAMIC FACILITY TYPES */}
				<div className="flex flex-col gap-6 py-4">
					{mockLandingData.map((type: any) => {
						// Only show sections that have facilities
						if ((type.facilities || []).length === 0) return null;

						return (
							<FacilitySection
								key={type.id}
								title={type.name}
								facilities={type.facilities}
								getLink={(facility) =>
									`/facility?title=${facility.id}&filter=${(facility as Facility).filter}`
								}
							/>
						);
					})}
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
