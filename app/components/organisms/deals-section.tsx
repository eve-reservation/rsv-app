import { deals, type Deal } from "~/lib/data";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "~/components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import { useState } from "react";
import { DealModal } from "./deal-modal";

export function DealsSection() {
	const [open, setOpen] = useState(false);
	const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

	return (
		<section className="py-px-4">
			<div className="mx-auto max-w-7xl">
				{/* <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
					<div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
						Limited Time Offers
					</div>
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif">
						Deals & Promos
					</h2>
					<p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Grab these exclusive offers for your next game.
					</p>
				</div> */}
				<div>
					<h2 className="text-xl md:text-2xl font-semibold mb-2">Deals & Promos</h2>
				</div>

				<Carousel
					plugins={[
						Autoplay({
							delay: 5000,
						}),
					]}
					className="w-full max-w-7xl mx-auto">
					<CarouselContent>
						{deals.map((deal) => (
							<CarouselItem
								key={deal.id}
								className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
								<div
									className="h-full"
									onClick={() => {
										setSelectedDeal(deal);
										setOpen(true);
									}}>
									<div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl border border-border/50 shadow-md group cursor-pointer">
										<img
											src={deal.image}
											alt={deal.title}
											className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white bg-opacity-80">
											<Badge
												variant="destructive"
												className="self-start mb-3 font-bold px-3 py-1 shadow-sm border-white/20">
												{deal.discount}
											</Badge>
											<h3 className="text-2xl font-bold font-serif mb-2 leading-tight text-white">
												{deal.title}
											</h3>
											<p className="text-white/80 text-sm line-clamp-2 mb-4">
												{deal.description}
											</p>

											<div className="flex items-center justify-between pt-4 border-t border-white/20">
												<div className="flex flex-col gap-1">
													<span className="text-[10px] uppercase text-white/60 font-bold tracking-wider">
														Use Code
													</span>
													<div className="flex items-center gap-1.5 font-mono bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded text-sm font-semibold text-white">
														<Tag className="w-3.5 h-3.5 text-white" />
														{deal.code}
													</div>
												</div>
												<div className="flex flex-col items-end gap-1 text-right">
													<span className="text-[10px] uppercase text-white/60 font-bold tracking-wider">
														Valid until
													</span>
													<div className="flex items-center gap-1.5 text-xs font-medium text-white/90">
														<Calendar className="w-3.5 h-3.5 text-white/70" />
														{deal.validUntil}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden md:flex -left-12 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
					<CarouselNext className="hidden md:flex -right-12 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
				</Carousel>
			</div>

			<DealModal deal={selectedDeal} open={open} onOpenChange={setOpen} />
		</section>
	);
}
