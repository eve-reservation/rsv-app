import { useGetFacilities } from "~/hooks/use-facilities";

export default function FilteredFacilities() {
	const { data, isLoading } = useGetFacilities();

	return (
		<div>
			<h2 className="text-2xl font-semibold tracking-tight">All Facilities</h2>
		</div>
	);
}
