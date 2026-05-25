import { useGetMatchEvents } from "~/hooks/use-match-events";
import { FacilitySection } from "~/components/organisms/facility-section";
import { EventCard } from "~/components/molecule/event-card";

export default function Events() {
	const { data: matchEventsData, isLoading } = useGetMatchEvents({
		fields: "id, createdBy, title, status, reservation.bookingPeriod, reservation.facility.images,reservation.facility.metadata,reservation.facility.subtype,maxParticipants,_count",
	});

	if (isLoading) {
		return <div className="p-8 text-center">Loading events...</div>;
	}

	const events = matchEventsData?.matchEvents || [];

	const groupedEvents = events.reduce((acc: Record<string, any[]>, event: any) => {
		const subtype = event.reservation?.facility?.subtype || "Other Events";
		if (!acc[subtype]) {
			acc[subtype] = [];
		}
		acc[subtype].push(event);
		return acc;
	}, {});

	return (
		<div className="p-6 space-y-8">
			<h1 className="text-3xl font-bold tracking-tight mb-4">Match Events</h1>

			{Object.entries(groupedEvents).length > 0 ? (
				Object.entries(groupedEvents).map(([subtype, groupEvents]) => (
					<FacilitySection key={subtype} title={subtype} columns={2}>
						{(groupEvents as any[]).map((event: any) => (
							<EventCard key={event.id} event={event} />
						))}
					</FacilitySection>
				))
			) : (
				<div className="text-center text-muted-foreground py-8">No match events found.</div>
			)}
		</div>
	);
}
