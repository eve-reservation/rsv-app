import { FacilityCardSkeleton } from "./facility-card-skeleton";

interface FacilitySkeletonGridProps {
	count?: number;
}

export function FacilitySkeletonGrid({ count = 8 }: FacilitySkeletonGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{Array.from({ length: count }).map((_, i) => (
				<FacilityCardSkeleton key={i} />
			))}
		</div>
	);
}
