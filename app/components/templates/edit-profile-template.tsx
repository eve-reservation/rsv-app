import { Crown, LogOut, Camera, Save, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useNavigate } from "react-router";
import { useAuth } from "~/hooks/use-auth";
import { useUpdateUser } from "~/hooks/use-user";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function EditProfileTemplate() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { mutate: updateUser, isPending } = useUpdateUser();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		countryCode: "",
		phoneNumber: "",
		street: "",
		city: "",
		country: "",
	});

	useEffect(() => {
		if (user) {
			const person = user.metadata?.person;
			const personalInfo = person?.personalInfo;
			const contactInfo = person?.contactInfo;
			const phone =
				contactInfo?.phones?.find((p: any) => p.type === "mobile") ||
				contactInfo?.phones?.[0];
			const address = contactInfo?.address?.[0];

			setFormData({
				firstName: personalInfo?.firstName || "",
				lastName: personalInfo?.lastName || "",
				email: user.email || "", // Email is typically read-only or handled separately
				countryCode: phone?.countryCode || "",
				phoneNumber: phone?.number || "",
				street: address?.street || "",
				city: address?.city || "",
				country: address?.country || "",
			});
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		const payload = {
			metadata: {
				person: {
					personalInfo: {
						firstName: formData.firstName,
						lastName: formData.lastName,
					},
					contactInfo: {
						phones: [
							{
								type: "mobile",
								countryCode: formData.countryCode,
								number: formData.phoneNumber,
							},
						],
						address: [
							{
								street: formData.street,
								city: formData.city,
								country: formData.country,
							},
						],
					},
				},
			},
		};

		updateUser(
			{ userId: user.id, data: payload },
			{
				onSuccess: () => {
					toast.success("Profile updated successfully");
					navigate("/profile");
				},
				onError: (error) => {
					toast.error("Failed to update profile");
					console.error(error);
				},
			},
		);
	};

	if (!user) {
		return <div>Loading...</div>;
	}

	const fullName = `${formData.firstName} ${formData.lastName}`.trim();
	const firstInitial = formData.firstName ? formData.firstName.charAt(0) : "U";

	return (
		<div className="">
			<main className="container max-w-5xl mx-auto">
				{/* Profile Header Card (Visual only, removed interactions that don't make sense in edit mode) */}
				<Card className="overflow-hidden border-none shadow-lg mb-8 bg-card py-0 group">
					<div className="h-48 bg-gradient-to-r from-primary/10 via-primary/5 to-background relative">
						{/* No Logout button here, focusing on edit context */}
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
									className="absolute bottom-1 right-1 h-8 w-8 rounded-full shadow-md cursor-not-allowed opacity-50">
									<Camera className="h-4 w-4" />
								</Button>
							</div>

							{/* Profile Info Preview */}
							<div className="flex-1 pt-4 md:pt-16 space-y-2 text-center md:text-left relative">
								<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
									<h1 className="text-3xl font-bold tracking-tight text-foreground">
										{fullName || "Your Name"}
									</h1>
									<Badge
										variant="secondary"
										className="w-fit mx-auto md:mx-0 bg-primary/10 text-primary border-primary/20 gap-1 px-3 py-1">
										<Crown className="w-3.5 h-3.5" />
										Member
									</Badge>
								</div>
								<p className="text-muted-foreground text-sm">
									Update your personal details below.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Edit Form */}
				<Card>
					<CardHeader>
						<CardTitle>Edit Profile</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="firstName">First Name</Label>
									<Input
										id="firstName"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
										placeholder="First Name"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">Last Name</Label>
									<Input
										id="lastName"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
										placeholder="Last Name"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										value={formData.email}
										disabled
										className="bg-muted"
										placeholder="Email"
									/>
								</div>
								<div className="md:col-span-1"></div>

								<div className="space-y-2">
									<Label htmlFor="countryCode">Country Code</Label>
									<Input
										id="countryCode"
										name="countryCode"
										value={formData.countryCode}
										onChange={handleChange}
										placeholder="+1"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phoneNumber">Phone Number</Label>
									<Input
										id="phoneNumber"
										name="phoneNumber"
										value={formData.phoneNumber}
										onChange={handleChange}
										placeholder="1234567890"
									/>
								</div>

								<div className="space-y-2 md:col-span-2">
									<Label htmlFor="street">Street Address</Label>
									<Input
										id="street"
										name="street"
										value={formData.street}
										onChange={handleChange}
										placeholder="Street Address"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="city">City</Label>
									<Input
										id="city"
										name="city"
										value={formData.city}
										onChange={handleChange}
										placeholder="City"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="country">Country</Label>
									<Input
										id="country"
										name="country"
										value={formData.country}
										onChange={handleChange}
										placeholder="Country"
									/>
								</div>
							</div>

							<div className="flex justify-end gap-4 pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate("/profile")}
									className="gap-2">
									<X className="w-4 h-4" />
									Cancel
								</Button>
								<Button type="submit" disabled={isPending} className="gap-2">
									<Save className="w-4 h-4" />
									{isPending ? "Saving..." : "Save Changes"}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
