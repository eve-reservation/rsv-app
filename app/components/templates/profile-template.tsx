import { Crown, LogOut, Camera, Mail, Phone, MapPin } from "lucide-react";
import UserReservations from "~/components/organisms/user-reservations";
import PersonalCard from "~/components/organisms/personal-card";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { useNavigate } from "react-router";
import { useAuth } from "~/hooks/use-auth";

export const defaultMockUser = {
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

interface ProfileTemplateProps {
	user?: typeof defaultMockUser;
	isReadOnly?: boolean;
	handleLogout?: () => void;
}

export default function ProfileTemplate({
	user = defaultMockUser,
	handleLogout,
}: ProfileTemplateProps) {
	const navigate = useNavigate();
	const firstInitial = user.firstName.charAt(0);
	const fullName = `${user.firstName} ${user.lastName}`;
	const vipLevelDisplay = `${user.vipLevel} Member`;
	const memberSince = user.createdAt;

	return (
		<div className="">
			<main className="container max-w-5xl mx-auto">
				{/* Profile Header Card */}
				<Card className="overflow-hidden border-none shadow-lg mb-8 bg-card py-0">
					{/* Cover Image Area */}
					<div className="h-48 bg-gradient-to-r from-primary/10 via-primary/5 to-background relative">
						<div className="absolute top-4 right-4">
							<Button
								onClick={handleLogout}
								variant="ghost"
								size="sm"
								className="cursor-pointer text-muted-foreground hover:text-destructive gap-2 bg-background/50 backdrop-blur-sm">
								<LogOut className="h-4 w-4" />
								<span>Logout</span>
							</Button>
						</div>
					</div>

					<CardContent className="relative px-6 sm:px-10 pb-6">
						<div className="flex flex-col md:flex-row gap-6 items-center -mt-16 ">
							{/* Avatar */}
							<div className="relative group">
								<div className="h-32 w-32 rounded-full ring-4 ring-background bg-background p-1 shadow-xl">
									<Avatar className="h-full w-full">
										<AvatarImage src="" alt={fullName} />
										<AvatarFallback className="text-4xl bg-primary/10 text-primary font-light">
											{firstInitial}
										</AvatarFallback>
									</Avatar>
								</div>
								<Button
									size="icon"
									variant="secondary"
									className="absolute bottom-1 right-1 h-8 w-8 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
									<Camera className="h-4 w-4" />
								</Button>
							</div>

							{/* Profile Info */}
							<div className="flex-1 pt-4 md:pt-16 space-y-2 text-center md:text-left">
								<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
									<h1 className="text-3xl font-bold tracking-tight text-foreground">
										{fullName}
									</h1>
									<Badge
										variant="secondary"
										className="w-fit mx-auto md:mx-0 bg-primary/10 text-primary border-primary/20 gap-1 px-3 py-1">
										<Crown className="w-3.5 h-3.5" />
										{vipLevelDisplay}
									</Badge>
								</div>

								<div className="flex flex-wrap items-center justify-center md:justify-start gap-y-1 gap-x-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-1.5">
										<Mail className="h-3.5 w-3.5" />
										{user.email}
									</div>
									<div className="flex items-center gap-1.5">
										<Phone className="h-3.5 w-3.5" />
										{user.person.contacts[0].phoneNumber}
									</div>
									<div className="flex items-center gap-1.5">
										<MapPin className="h-3.5 w-3.5" />
										{user.person.addresses[0].city},{" "}
										{user.person.addresses[0].region}
									</div>
								</div>

								<p className="text-xs text-muted-foreground pt-1">
									Member since {memberSince}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Tabs Content */}
				<Tabs defaultValue="personal" className="w-full">
					<TabsList className="w-full justify-start border-b h-auto p-0 bg-transparent rounded-lg">
						<TabsTrigger
							value="personal"
							className="pt-3 rounded-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-medium text-muted-foreground hover:text-foreground transition-all">
							Personal Information
						</TabsTrigger>
						<TabsTrigger
							value="reservations"
							className="pt-3 rounded-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-medium text-muted-foreground hover:text-foreground transition-all">
							My Reservations
						</TabsTrigger>
						<TabsTrigger
							value="settings"
							className="pt-3 rounded-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-medium text-muted-foreground hover:text-foreground transition-all">
							Account Settings
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="personal"
						className="animate-in fade-in-50 duration-300">
						<PersonalCard user={user} />
					</TabsContent>
					<TabsContent
						value="reservations"
						className="animate-in fade-in-50 duration-300">
						<UserReservations />
					</TabsContent>
					<TabsContent
						value="settings"
						className="animate-in fade-in-50 duration-300">
						<Card>
							<CardContent className="py-8 text-center text-muted-foreground">
								Account settings coming soon...
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
