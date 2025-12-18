import type { Route } from "./+types/landing";
import { PAGE_TITLES } from "~/config/page-titles";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.landing }];
}

import { facilities, games } from "@/lib/data";
import { Header } from "~/components/organisms/header";
import { SearchBar } from "~/components/molecule/search-bar";
import { FacilitySection } from "~/components/organisms/facility-section";
import { DealsSection } from "~/components/organisms/deals-section";

export default function LandingPage() {
	// const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	return (
		<div className="min-h-screen flex flex-col bg-background relative isolate overflow-hidden">
			{/* Minimal Background Pattern */}
			<div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1.5px,transparent_1.5px),linear-gradient(to_bottom,#8080800a_1.5px,transparent_1.5px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
			<div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px] pointer-events-none" />
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

			{/* Categories */}
			{/* <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border">
				<div className="mx-auto max-w-5xl">
					<CategoryNav />
				</div>
			</section> */}
			{/* Facility Sections */}
			<main>
				{/* FIXED/PRIVATE FACILITIES */}
				<div className="mx-auto max-w-7xl">
					<FacilitySection
						title="Sports Facilities"
						facilities={facilities.filter((f) => f.category === "sports")}
					/>
					<FacilitySection
						title="Dining & Function Facilities"
						facilities={facilities.filter((f) => f.category === "dining")}
					/>
					<FacilitySection
						title="Wellness & Other Amenities"
						facilities={facilities.filter((f) => f.category === "wellness")}
					/>
				</div>

				<div className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border" />
				{/* FIXED/PRIVATE FACILITIES */}
				{/* OPEN/PUBLIC GAMES */}
				<div className="mx-auto max-w-7xl">
					<FacilitySection
						title="Browse open games near you"
						facilities={games}
						columns={3}
						// cardVariant="horizontal"
					/>
					<FacilitySection
						title="Basketball games"
						facilities={games.filter((g) => g.type === "Basketball")}
						columns={2}
						cardVariant="horizontal"
					/>
					<FacilitySection
						title="Volleyball games"
						facilities={games.filter((g) => g.type === "Volleyball")}
						columns={2}
						cardVariant="horizontal"
					/>
					<FacilitySection
						title="Tennis games"
						facilities={games.filter((g) => g.type === "Tennis")}
						columns={2}
						cardVariant="horizontal"
					/>
				</div>
			</main>
		</div>
	);
}
