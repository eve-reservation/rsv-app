import { Mail, MapPin, Phone } from "lucide-react";

interface PersonalCardProps {
	user: {
		email?: string;
		person?: {
			contacts?: Array<{
				type: string;
				phoneNumber: string;
				email: string;
				isPrimary: boolean;
			}>;
			addresses?: Array<{
				type: string;
				city: string | null;
				country: string | null;
				region: string | null;
				isPrimary: boolean;
			}>;
		};
	};
}

export default function PersonalCard({ user }: PersonalCardProps) {
	// Get primary contact or first contact
	const primaryContact =
		user.person?.contacts?.find((c) => c.isPrimary) || user.person?.contacts?.[0];

	// Get primary address or first address
	const primaryAddress =
		user.person?.addresses?.find((a) => a.isPrimary) || user.person?.addresses?.[0];

	// Format location
	const location = primaryAddress
		? [primaryAddress.city, primaryAddress.region, primaryAddress.country]
				.filter(Boolean)
				.join(", ")
		: "Not specified";

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

					{primaryContact && (
						<div className="flex items-center gap-4">
							<Phone className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
									Phone
								</p>
								<p className="text-foreground font-light">
									{primaryContact.phoneNumber}
								</p>
							</div>
						</div>
					)}

					<div className="flex items-center gap-4">
						<MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
						<div>
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
								Location
							</p>
							<p className="text-foreground font-light">{location}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
