import { Button } from "~/components/ui/button";
import { FacilitySection } from "~/components/organisms/facility-section";
import { useGetFacilityTypes } from "~/hooks/use-facility-types";
import { CreateFacilityTypeModal } from "~/components/molecule/create-facility-type-modal";
import { CreateFacilityModal } from "~/components/molecule/create-facility-modal";
import { DeleteFacilityTypeModal } from "~/components/molecule/delete-facility-type-modal";
import { Link } from "react-router";
import { FacilityCard } from "~/components/molecule/facility-card";
import { Plus } from "lucide-react";

export default function Facilities() {
	const { data, isLoading } = useGetFacilityTypes({
		limit: 100,
		sort: "createdAt",
		order: "asc",
		fields: "id, name, spaceType, facilities.id, facilities.identifier, facilities.displayName, facilities.subtype, facilities.metadata, facilities.status, facilities.images, facilities.createdAt, facilities.updatedAt, facilities.rateType.baseRate, facilities.rateType.rateUnit",
	});

	if (isLoading) return <div>Loading...</div>;

	const facilityTypes = data?.facilityTypes || [];

	return (
		<div className="space-y-4">
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
				{facilityTypes.length === 0 ? (
					<div className="flex flex-col items-center justify-center p-8 bg-muted/10 rounded-lg border border-dashed text-center">
						<div className="max-w-[420px] space-y-4">
							<h3 className="text-lg font-semibold">No facility types found</h3>
							<p className="text-sm text-muted-foreground">
								You haven't created any facility types yet. Create one to start
								managing your facilities.
							</p>
							<CreateFacilityTypeModal
								trigger={
									<Button className="cursor-pointer">Add facility type</Button>
								}
							/>
						</div>
					</div>
				) : (
					facilityTypes.map((type: any) => {
						return (
							<FacilitySection
								key={type.id}
								title={type.name}
								action={
									<div className="flex gap-2">
										<DeleteFacilityTypeModal
											facilityTypeId={type.id}
											typeName={type.name}
										/>
										<CreateFacilityModal
											facilityTypeId={type.id}
											spaceType={type.spaceType}
											trigger={<Button size="sm">Add Facility</Button>}
										/>
									</div>
								}>
								{(type.facilities || []).map((facility: any) => (
									<Link key={facility.id} to={`/admin/facility/${facility.id}`}>
										<FacilityCard
											facility={{
												...facility,
												facilityType: { spaceType: type.spaceType },
											}}
											admin
										/>
									</Link>
								))}
								<CreateFacilityModal
									facilityTypeId={type.id}
									spaceType={type.spaceType}
									trigger={
										<div className="group block cursor-pointer">
											<div className="aspect-[4/3] rounded-2xl w-full relative overflow-hidden bg-muted/30 border-2 border-dashed border-muted-foreground/25 flex items-center justify-center hover:bg-muted/50 transition-colors">
												<Plus className="h-12 w-12 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
											</div>
											<div className="mt-3">
												<h3 className="font-medium text-foreground text-center">
													Create Facility
												</h3>
												<p className="text-sm text-muted-foreground text-center">
													Add a new facility to this category
												</p>
											</div>
										</div>
									}
								/>
							</FacilitySection>
						);
					})
				)}
			</div>
		</div>
	);
}
