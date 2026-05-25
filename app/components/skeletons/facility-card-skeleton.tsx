import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FacilityCardSkeletonProps {
	variant?: "vertical" | "horizontal";
	className?: string;
}

export function FacilityCardSkeleton({
	variant = "vertical",
	className,
}: FacilityCardSkeletonProps) {
	return (
		<div className={cn("group", variant === "horizontal" ? "flex gap-4" : "block", className)}>
			{/* Image Skeleton */}
			<div
				className={cn(
					"relative overflow-hidden",
					variant === "horizontal"
						? "w-80 shrink-0 rounded-xl aspect-[4/3]"
						: "aspect-[4/3] rounded-2xl w-full",
				)}>
				<Skeleton className="h-full w-full" />
			</div>

			{/* Content Skeleton */}
			<div
				className={cn(
					"space-y-2",
					variant === "horizontal"
						? "flex-1 min-w-0 flex flex-col justify-center space-y-2"
						: "mt-3",
				)}>
				<div className="flex items-start justify-between gap-2">
					{/* Title */}
					<Skeleton className="h-5 w-3/4" />
					{/* Rating */}
					<div className="flex items-center gap-1 shrink-0">
						<Skeleton className="h-3.5 w-3.5 rounded-full" />
						<Skeleton className="h-3.5 w-6" />
					</div>
				</div>

				{/* Subtypes/Location */}
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-4 w-1/3" />

				{/* Price and Price Unit */}
				<div className="mt-1 flex items-center justify-between">
					<div className="flex items-end gap-1">
						<Skeleton className="h-5 w-20" />
						<Skeleton className="h-4 w-12" />
					</div>
				</div>
			</div>
		</div>
	);
}
