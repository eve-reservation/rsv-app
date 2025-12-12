import { facilities } from "@/lib/data";
import { Link } from "react-router";
import { FacilityCard } from "~/components/molecule/facility-card";

export default function Facilities() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-foreground">Facility Management</h1>
				<p className="text-muted-foreground">Manage and track all facilities</p>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{facilities.map((facility) => (
					<Link to={`/admin/facility/${facility.id}`} key={facility.id}>
						<FacilityCard facility={facility} />
					</Link>
				))}
			</div>
		</div>
	);
}
