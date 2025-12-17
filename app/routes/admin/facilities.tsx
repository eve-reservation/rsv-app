import { facilities } from "@/lib/data";
import { Button } from "~/components/ui/button";
import { FacilitySection } from "~/components/organisms/facility-section";

export default function Facilities() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Facility Management</h1>
					<p className="text-muted-foreground">Manage and track all facilities</p>
				</div>
				<div>
					<Button>Add Facility</Button>
				</div>
			</div>
			<div>
				<FacilitySection
					title="Sports Facilities"
					facilities={facilities.filter((f) => f.category === "sports")}
					basePath="/admin/facility"
				/>
				<FacilitySection
					title="Dining & Function Facilities"
					facilities={facilities.filter((f) => f.category === "dining")}
					basePath="/admin/facility"
				/>
				<FacilitySection
					title="Wellness & Other Amenities"
					facilities={facilities.filter((f) => f.category === "wellness")}
					basePath="/admin/facility"
				/>
			</div>
		</div>
	);
}
