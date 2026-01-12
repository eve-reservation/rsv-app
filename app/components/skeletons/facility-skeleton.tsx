import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function FacilitySkeleton() {
	return (
		<div className="animate-in fade-in duration-500">
			{/* Back Button Skeleton */}
			<div className="flex items-center justify-between mb-8">
				<Skeleton className="h-10 w-24" />
			</div>

			<main className="flex-1">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Image Gallery Skeleton */}
						<div className="relative grid grid-cols-3 grid-rows-2 gap-2 h-[400px] md:h-[460px] rounded-2xl overflow-hidden">
							<Skeleton className="row-span-2 col-span-3 md:col-span-2 h-full w-full" />
							<div className="hidden md:grid grid-cols-1 gap-2 h-full">
								<Skeleton className="h-full w-full" />
								<Skeleton className="h-full w-full" />
							</div>
							<div className="hidden md:grid grid-cols-1 gap-2 h-full">
								<Skeleton className="h-full w-full" />
								<Skeleton className="h-full w-full" />
							</div>
						</div>

						{/* Header Skeleton */}
						<div className="flex items-start justify-between">
							<div className="space-y-2 w-full max-w-lg">
								<Skeleton className="h-8 w-3/4" />
								<div className="flex items-center gap-4">
									<Skeleton className="h-4 w-12" />
									<Skeleton className="h-4 w-32" />
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Skeleton className="h-9 w-20" />
								<Skeleton className="h-9 w-20" />
							</div>
						</div>

						<div className="border-t border-border" />

						{/* Host Info Skeleton */}
						<div className="flex items-center gap-4">
							<Skeleton className="h-12 w-12 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						</div>

						<div className="border-t border-border" />

						{/* Description Skeleton */}
						<div className="space-y-4">
							<Skeleton className="h-6 w-40" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />
							</div>
						</div>

						<div className="border-t border-border" />

						{/* Amenities Skeleton */}
						<div className="space-y-4">
							<Skeleton className="h-6 w-48" />
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{[...Array(6)].map((_, i) => (
									<div key={i} className="flex items-center gap-4">
										<Skeleton className="h-5 w-5" />
										<Skeleton className="h-4 w-32" />
									</div>
								))}
							</div>
						</div>

						<div className="border-t border-border" />

						{/* Calendar Skeleton */}
						<div className="space-y-4">
							<Skeleton className="h-6 w-48" />
							<Skeleton className="h-[350px] w-full rounded-xl" />
						</div>
					</div>

					{/* Booking Card Skeleton */}
					<div className="lg:col-span-1">
						<Card className="sticky top-24 shadow-xl border-border">
							<CardContent className="p-6 space-y-6">
								<div className="flex items-baseline justify-between">
									<Skeleton className="h-8 w-32" />
									<Skeleton className="h-4 w-16" />
								</div>

								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-2">
										<Skeleton className="h-14 w-full" />
										<Skeleton className="h-14 w-full" />
									</div>
									<Skeleton className="h-14 w-full" />
								</div>

								<Skeleton className="h-12 w-full rounded-md" />

								<div className="space-y-3 pt-4 border-t border-border">
									<div className="flex justify-between">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-4 w-16" />
									</div>
									<div className="flex justify-between">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-4 w-16" />
									</div>
									<div className="flex justify-between pt-3 border-t border-border">
										<Skeleton className="h-5 w-16" />
										<Skeleton className="h-5 w-24" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
