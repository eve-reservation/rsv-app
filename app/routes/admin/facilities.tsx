import { Button } from "~/components/ui/button";
import { FacilitySection } from "~/components/organisms/facility-section";
import { useGetFacilityTypes } from "~/hooks/use-facility-types";

export default function Facilities() {
	const { data, isLoading } = useGetFacilityTypes();

	if (isLoading) return <div>Loading...</div>;

	const facilityTypes = data?.facilityTypes || [];

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Facility Management</h1>
					<p className="text-muted-foreground">Manage and track all facilities</p>
				</div>
				<div>
					<Button variant="outline" className="cursor-pointer">
						Add facility type
					</Button>
				</div>
			</div>
			<div>
				{facilityTypes.map((type: any) => (
					<FacilitySection
						key={type.id}
						title={type.name}
						facilities={type.facilities}
						basePath="/admin/facility"
						action={<Button size="sm">Add Facility</Button>}
					/>
				))}
			</div>
		</div>
	);
}
