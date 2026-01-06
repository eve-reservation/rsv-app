import { Link } from "react-router";
import { FacilityCard } from "~/components/molecule/facility-card";
import { useGetFacilities } from "~/hooks/use-facilities";
import type { Facility } from "~/lib/data";

export default function FilteredFacilities() {
	const { data, isLoading } = useGetFacilities();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	// Direct usage of data, assuming API returns structure matching Facility
	const facilities = (data?.facilities || []) as Facility[];

	return (
		<div className="container mx-auto py-8">
			<h2 className="text-2xl font-semibold tracking-tight mb-6">All Facilities</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{facilities.map((facility) => (
					<Link to={`/facility/${facility.id}`} key={facility.id} className="block">
						<FacilityCard facility={facility} />
					</Link>
				))}
			</div>
		</div>
	);
}
