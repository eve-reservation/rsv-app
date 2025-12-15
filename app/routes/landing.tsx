import type { Route } from "./+types/landing";
import { PAGE_TITLES } from "~/config/page-titles";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.landing }];
}

import { useMemo } from "react";
import { facilities } from "@/lib/data";
import { Header } from "~/components/organisms/header";
import { Link } from "react-router";
import { SearchBar } from "~/components/molecule/search-bar";
import { CategoryNav } from "~/components/organisms/category-nav";
import { FacilityCard } from "~/components/molecule/facility-card";
import { DealsSection } from "~/components/organisms/deals-section";

export default function LandingPage() {
	// const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const filteredFacilities = useMemo(() => {
		return facilities;
	}, []);

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
			<DealsSection />

			{/* Categories */}
			<section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border">
				<div className="mx-auto max-w-5xl">
					<CategoryNav />
				</div>
			</section>

			{/* Facility Grid */}
			<main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredFacilities.map((facility) => (
							<Link to={`/facility/${facility.id}`} key={facility.id}>
								<FacilityCard facility={facility} />
							</Link>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
