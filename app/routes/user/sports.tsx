import type { Route } from "./+types/sports";
import { PAGE_TITLES } from "~/config/page-titles";
import { BackgroundPattern } from "~/components/ui/background-pattern";
import { SearchBar } from "~/components/molecule/search-bar";
import { FacilitySection } from "~/components/organisms/facility-section";
import { Link } from "react-router";
import { FacilityCard } from "~/components/molecule/facility-card";
import { EventCard } from "~/components/molecule/event-card";
import { useGetMatchEvents } from "~/hooks/use-match-events";
import { useGetFacilityTypes } from "~/hooks/use-facility-types";
import { facilities } from "@/lib/data";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.sports || "Sports | Reserve" }];
}

export default function SportsPage() {
	const { data: matchEventsData } = useGetMatchEvents({
		fields: "id, createdBy, title, status, reservation.bookingPeriod, reservation.facility.images,reservation.facility.metadata,reservation.facility.subtype,maxParticipants,_count",
	});

	const { data: facilityTypesData, isLoading: isLoadingFacilities } = useGetFacilityTypes({
		limit: 100,
		sort: "createdAt",
		order: "asc",
		fields: "id, name, spaceType, facilities.id, facilities.identifier, facilities.displayName, facilities.subtype, facilities.metadata, facilities.status, facilities.images, facilities.createdAt, facilities.updatedAt, facilities.rateType.baseRate, facilities.rateType.rateUnit",
	});

	const events = matchEventsData?.matchEvents || [];
	const facilityTypes = facilityTypesData?.facilityTypes || [];

	const sportsFacilities = facilities.filter((f) => f.category === "sports");
	const popularCourts = sportsFacilities.filter((f) => f.rating && f.rating >= 4.8);

	return (
		<div className="min-h-screen flex flex-col bg-background relative isolate overflow-hidden">
			<BackgroundPattern />
			{/* Hero Section */}
			<section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
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
					{popularCourts.length > 0 && (
						<FacilitySection title="Most Popular Courts" columns={3}>
							{popularCourts.map((facility) => (
								<Link key={facility.id} to={`/facility/${facility.id}`}>
									<FacilityCard facility={facility} />
								</Link>
							))}
						</FacilitySection>
					)}

					{/* Open Games */}
					<div className="py-6">
						<h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight mb-4">
							Open Games Near You
						</h2>
						{events.length > 0 ? (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								{events.map((event: any) => (
									<Link key={event.id} to={`/event/${event.id}`}>
										<EventCard event={event} />
									</Link>
								))}
							</div>
						) : (
							<div className="text-muted-foreground pb-4">
								No upcoming public games found.
							</div>
						)}
					</div>

					<div className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border mb-6" />

					{/* Facility Types Sections */}
					{isLoadingFacilities ? (
						<div className="text-center py-8">Loading facilities...</div>
					) : (
						<div className="space-y-8">
							{facilityTypes.map((type: any) => {
								if (!type.facilities || type.facilities.length === 0) return null;

								return (
									<FacilitySection key={type.id} title={type.name}>
										{type.facilities.map((facility: any) => (
											<Link key={facility.id} to={`/facility/${facility.id}`}>
												<FacilityCard
													facility={{
														...facility,
														facilityType: { spaceType: type.spaceType },
													}}
												/>
											</Link>
										))}
									</FacilitySection>
								);
							})}
							{facilityTypes.length === 0 && (
								<div className="text-center text-muted-foreground py-8">
									No sports facilities found.
								</div>
							)}
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
