import { Mail, MapPin, Phone } from "lucide-react";

interface PersonalCardProps {
	user: {
		fullName: string;
		email: string;
		phone: string;
		location: string;
		// Add other fields if needed for future extensions, but these are what's used
	};
}

export default function PersonalCard({ user }: PersonalCardProps) {
	return (
		<div className="space-y-8 w-full flex-1">
			<div className="bg-card border border-border rounded-lg p-8 shadow-sm">
				<h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-8">
					Contact Information
				</h3>

				<div className="space-y-6 w-full">
					<div className="flex items-center gap-4">
						<Mail className="w-5 h-5 mt-1 flex-shrink-0" />
						<div>
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
								Email
							</p>
							<p className="text-foreground font-light">
								{user.email || "Not specified"}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<Phone className="w-5 h-5 mt-1 flex-shrink-0" />
						<div>
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
								Phone
							</p>
							<p className="text-foreground font-light">{user.phone}</p>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
						<div>
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
								Location
							</p>
							<p className="text-foreground font-light">{user.location}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
