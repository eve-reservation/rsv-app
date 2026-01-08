import { Crown, LogOut, Camera, Mail, Phone, MapPin, SquarePen } from "lucide-react";
import UserReservations from "~/components/organisms/user-reservations";
import PersonalCard from "~/components/organisms/personal-card";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "~/hooks/use-auth";
import { useGetReservations } from "~/hooks/use-reservations";

interface ProfileTemplateProps {
	isReadOnly?: boolean;
	handleLogout?: () => void;
}

export default function ProfileTemplate({ handleLogout }: ProfileTemplateProps) {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab") || "personal";
	const { user } = useAuth();

	const { data, isLoading } = useGetReservations({
		fields: "id, status, totals, user, bookingPeriod, facility.id, facility.displayName, facility.images",
		filter: `user.userId:${user?.id}`,
	});

	const handleTabChange = (value: string) => {
		setSearchParams((prev) => {
			prev.set("tab", value);
			return prev;
		});
	};

	if (!user) {
		return <div>Loading profile...</div>;
	}

	const firstName = user.metadata?.person?.personalInfo?.firstName || "User";
	const lastName = user.metadata?.person?.personalInfo?.lastName || "";
	const fullName = `${firstName} ${lastName}`.trim();
	const firstInitial = firstName.charAt(0);

	const contactInfo = user.metadata?.person?.contactInfo;
	const phoneObj = contactInfo?.phones?.[0];
	const phone = phoneObj ? `${phoneObj.countryCode} ${phoneObj.number}` : "No phone";

	const addressObj = contactInfo?.address?.[0];
	const addressString = addressObj ? `${addressObj.city}, ${addressObj.country}` : "No address";

	const vipLevelDisplay = "Member";
	const memberSince = "2024";

	const displayUser = {
		fullName,
		email: user.email,
		phone,
		location: addressString,
		memberSince,
		vipLevelDisplay,
		firstInitial,
	};

	return (
		<div className="">
			<main className="container max-w-5xl mx-auto">
				{/* Profile Header Card */}
				<Card className="overflow-hidden border-none shadow-lg mb-8 bg-card py-0 group">
					{/* ... (keep existing header content) */}
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
										<AvatarImage src="" alt={displayUser.fullName} />
										<AvatarFallback className="text-4xl bg-primary/10 text-primary font-light">
											{displayUser.firstInitial}
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
							<div className="flex-1 pt-4 md:pt-16 space-y-2 text-center md:text-left relative">
								<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
									<h1 className="text-3xl font-bold tracking-tight text-foreground">
										{displayUser.fullName}
									</h1>
									<Badge
										variant="secondary"
										className="w-fit mx-auto md:mx-0 bg-primary/10 text-primary border-primary/20 gap-1 px-3 py-1">
										<Crown className="w-3.5 h-3.5" />
										{displayUser.vipLevelDisplay}
									</Badge>
								</div>

								<div className="flex flex-wrap items-center justify-center md:justify-start gap-y-1 gap-x-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-1.5">
										<Mail className="h-3.5 w-3.5" />
										{displayUser.email}
									</div>
									<div className="flex items-center gap-1.5">
										<Phone className="h-3.5 w-3.5" />
										{displayUser.phone}
									</div>
									<div className="flex items-center gap-1.5">
										<MapPin className="h-3.5 w-3.5" />
										{displayUser.location}
									</div>
								</div>

								{/* <p className="text-xs text-muted-foreground pt-1">
									Member since {memberSince}
								</p> */}

								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigate("/profile/edit")}
									className="absolute right-0 top-16 hidden group-hover:block cursor-pointer hover:text-primary">
									<SquarePen className="size-4" />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Tabs Content */}
				<Tabs
					defaultValue="personal"
					value={activeTab}
					onValueChange={handleTabChange}
					className="w-full">
					<TabsList className="w-full justify-start border-b h-auto p-0 bg-transparent rounded-lg">
						<TabsTrigger
							value="personal"
							className="pt-3 rounded-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer">
							Personal Information
						</TabsTrigger>
						<TabsTrigger
							value="reservations"
							className="pt-3 rounded-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer">
							My Reservations
						</TabsTrigger>
						<TabsTrigger
							value="settings"
							className="pt-3 rounded-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer">
							Account Settings
						</TabsTrigger>
					</TabsList>

					<TabsContent value="personal" className="animate-in fade-in-50 duration-300">
						<PersonalCard user={displayUser} />
					</TabsContent>
					<TabsContent
						value="reservations"
						className="animate-in fade-in-50 duration-300">
						<UserReservations reservations={data?.reservations} />
					</TabsContent>
					<TabsContent value="settings" className="animate-in fade-in-50 duration-300">
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
