import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarPlus, Edit2, Users, Trophy, Shapes } from "lucide-react";

interface PublicEventCardProps {
	matchEventData: any;
	onEdit: () => void;
}

export function PublicEventCard({ matchEventData, onEdit }: PublicEventCardProps) {
	return (
		<div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
			{!matchEventData ? (
				<Card
					className="group flex cursor-pointer flex-col items-center justify-center gap-3 border-dashed p-6 text-center shadow-none transition-colors hover:bg-muted/50"
					onClick={onEdit}>
					<div className="rounded-full bg-muted p-3 transition-colors group-hover:bg-background">
						<CalendarPlus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
					</div>
					<div>
						<h3 className="font-medium">Create Public Event</h3>
						<p className="text-sm text-muted-foreground">Open to others</p>
					</div>
				</Card>
			) : (
				<Card className="flex items-start justify-between p-4 shadow-sm">
					<div className="space-y-3 w-full">
						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<div className="flex items-center gap-2">
									<Badge
										variant="secondary"
										className="px-1.5 py-0 text-[10px] font-normal tracking-wide text-muted-foreground uppercase">
										Public
									</Badge>
									<h3 className="font-semibold">{matchEventData.title}</h3>
								</div>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={onEdit}
								className="h-8 w-8 text-muted-foreground hover:text-foreground -mt-1 -mr-2">
								<Edit2 className="h-3.5 w-3.5" />
							</Button>
						</div>

						<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
							<div className="flex items-center gap-1.5">
								<Users className="h-3.5 w-3.5" />
								<span>{matchEventData.maxParticipants} max</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Trophy className="h-3.5 w-3.5" />
								<span>{matchEventData.skillLevel || "Any"}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Shapes className="h-3.5 w-3.5" />
								<span>{matchEventData.genderPreference || "Mixed"}</span>
							</div>
						</div>

						{matchEventData.description && (
							<p className="text-sm text-muted-foreground line-clamp-1 border-l-2 pl-3">
								{matchEventData.description}
							</p>
						)}
					</div>
				</Card>
			)}
		</div>
	);
}
