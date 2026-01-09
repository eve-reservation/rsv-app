import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Edit2 } from "lucide-react";

interface PublicEventCardProps {
	matchEventData: any;
	onEdit: () => void;
}

export function PublicEventCard({ matchEventData, onEdit }: PublicEventCardProps) {
	return (
		<div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
			{!matchEventData ? (
				<Card className="p-4 border-dashed bg-muted/30 flex flex-col items-center justify-center gap-3 text-center">
					<div className="p-3 bg-background rounded-full shadow-sm">
						<CalendarPlus className="w-6 h-6 text-primary" />
					</div>
					<div>
						<h3 className="font-medium">Create Public Event</h3>
						<p className="text-sm text-muted-foreground">
							Set up details for others to join your game
						</p>
					</div>
					<Button variant="outline" onClick={onEdit} className="mt-2 w-full sm:w-auto">
						Create Event
					</Button>
				</Card>
			) : (
				<Card className="p-4 bg-muted/30 flex items-start justify-between">
					<div>
						<h3 className="font-medium text-primary flex items-center gap-2">
							{matchEventData.title}
						</h3>
						<div className="text-sm text-muted-foreground mt-1 space-y-1">
							<p>Max Participants: {matchEventData.maxParticipants}</p>
							<p>Skill: {matchEventData.skillLevel || "Any"}</p>
							<p>Gender: {matchEventData.genderPreference || "Mixed"}</p>
						</div>
					</div>
					<Button variant="ghost" size="icon" onClick={onEdit} className="shrink-0">
						<Edit2 className="w-4 h-4" />
					</Button>
				</Card>
			)}
		</div>
	);
}
