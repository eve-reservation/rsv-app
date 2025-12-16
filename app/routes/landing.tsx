import type { Route } from "./+types/landing";
import { PAGE_TITLES } from "~/config/page-titles";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.landing }];
}

import { facilities } from "@/lib/data";
import { Header } from "~/components/organisms/header";
import { SearchBar } from "~/components/molecule/search-bar";
import { FacilitySection } from "~/components/organisms/facility-section";

export default function LandingPage() {
	// const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

			{/* Hero Section */}
			<section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="text-center mb-8">
						<h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground text-balance">
							Find and book your perfect court
						</h1>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
							From basketball to tennis, discover and reserve courts for your next
							game.
						</p>
					</div>
					<SearchBar />
				</div>
			</section>
			{/* Deals Section */}
			{/* <DealsSection /> */}

			{/* Categories */}
			{/* <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border">
				<div className="mx-auto max-w-5xl">
					<CategoryNav />
				</div>
			</section> */}
			{/* <div className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border"></div> */}

			{/* Facility Grid */}
			{/* Facility Sections */}
			<main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl space-y-8">
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
			</main>
		</div>
	);
}
