import { Button } from "~/components/ui/button";
import { FacilitySection } from "~/components/organisms/facility-section";
import { useGetFacilityTypes } from "~/hooks/use-facility-types";
import { CreateFacilityTypeModal } from "~/components/molecule/create-facility-type-modal";
import { CreateFacilityModal } from "~/components/molecule/create-facility-modal";
import { DeleteFacilityTypeModal } from "~/components/molecule/delete-facility-type-modal";

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
					<CreateFacilityTypeModal
						trigger={
							<Button variant="outline" className="cursor-pointer">
								Add facility type
							</Button>
						}
					/>
				</div>
			</div>
			<div>
				{facilityTypes.map((type: any) => {
					const mappedFacilities = (type.facilities || []).map((facility: any) => ({
						id: facility.id,
						name: facility.displayName,
						type: type.spaceType,
						location: type.subtype,
						price: type.rateType?.baseRate || 0,
						priceUnit: type.rateType?.rateUnit || "hour",
						capacity: facility.metadata?.maxOccupancy || 0,
						rating: 0,
						reviewCount: 0,
						images: (facility.images || [])
							.filter((img: any) => img.type === "COVER")
							.map((img: any) => img.url),
						amenities: facility.metadata?.amenities || [],
						description: type.description || "",
						available: facility.status === "AVAILABLE",
						category: "sports",
					}));

					return (
						<FacilitySection
							key={type.id}
							title={type.name}
							facilities={mappedFacilities}
							basePath="/admin/facility"
							action={
								<div className="flex gap-2">
									<DeleteFacilityTypeModal
										facilityTypeId={type.id}
										typeName={type.name}
									/>
									<CreateFacilityModal
										facilityTypeId={type.id}
										trigger={<Button size="sm">Add Facility</Button>}
									/>
								</div>
							}
							facilityTypeId={type.id}
						/>
					);
				})}
			</div>
		</div>
	);
}
