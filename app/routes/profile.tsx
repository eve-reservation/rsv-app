import { Crown, LogOut } from "lucide-react";
import { useState } from "react";
import UserReservations from "~/components/organisms/user-reservations";
import PersonalCard from "~/components/organisms/personal-card";
import { Button } from "~/components/ui/button";

export default function Profile() {
	const [activeTab, setActiveTab] = useState("personal");

	const mockUser = {
		firstName: "Alex",
		lastName: "Morgan",
		email: "alex.morgan@example.com",
		vipLevel: "Gold",
		createdAt: "December 2023",
		person: {
			contacts: [
				{
					type: "mobile",
					phoneNumber: "+1 (555) 123-4567",
					email: "alex.morgan@example.com",
					isPrimary: true,
				},
			],
			addresses: [
				{
					type: "home",
					city: "San Francisco",
					country: "USA",
					region: "CA",
					isPrimary: true,
				},
			],
		},
	};

	const firstInitial = mockUser.firstName.charAt(0);
	const fullName = `${mockUser.firstName} ${mockUser.lastName}`;
	const vipLevelDisplay = `${mockUser.vipLevel} Member`;
	const memberSince = mockUser.createdAt;

	return (
		<div className="min-h-screen bg-background">
			<main className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6">
				<div className="w-full max-w-3xl py-8 bg-gradient-to-br from-black/90 via-black/80 to-black/70 rounded-2xl relative">
					<div className="flex flex-col items-center text-center">
						{/* Avatar */}
						<div className="mb-8">
							<div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center shadow-sm">
								<div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
									<span className="text-3xl font-light text-muted-foreground">
										{firstInitial}
									</span>
								</div>
							</div>
						</div>

						{/* Name */}
						<h1 className="text-4xl font-light tracking-tight text-white mb-3">
							{fullName}
						</h1>

						{/* Membership Badge */}
						<div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-8">
							<Crown className="w-4 h-4 text-accent" />
							<span className="text-sm font-medium text-accent uppercase tracking-wide">
								{vipLevelDisplay}
							</span>
						</div>

						{/* Member Since */}
						<p className="text-sm text-white/80 tracking-wide">
							Member Since {memberSince}
						</p>

						<button className="top-4 right-4 absolute text-red-400 hover:text-red-500 cursor-pointer ">
							<span className="flex gap-2 items-center">
								<LogOut /> <span>Logout</span>
							</span>
						</button>
					</div>
				</div>

				<div className="w-full max-w-3xl space-y-4">
					{/* Navigation Tabs */}
					<div className="flex gap-8 border-b border-border pt-8">
						{[
							{ id: "personal", label: "Personal Information" },
							{ id: "reservations", label: "Reservations" },
							{ id: "settings", label: "Settings" },
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`pb-4 text-sm font-light tracking-wide transition-colors border-b-2 whitespace-nowrap ${
									activeTab === tab.id
										? "border-accent text-foreground"
										: "border-transparent text-muted-foreground hover:text-foreground"
								}`}>
								{tab.label}
							</button>
						))}
					</div>

					{/* Content */}
					<div className="py-4">
						{activeTab === "personal" && <PersonalCard user={mockUser} />}
						{activeTab === "reservations" && <UserReservations />}
						{activeTab === "settings" && <div />}
					</div>
				</div>
			</main>
		</div>
	);
}
