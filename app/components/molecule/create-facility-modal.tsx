import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCreateFacility } from "~/hooks/use-facilities";
import { toast } from "sonner";

interface CreateFacilityModalProps {
	trigger?: React.ReactNode;
	facilityTypeId: string;
	spaceType?: string;
}

const SUBTYPE_OPTIONS: Record<string, { value: string; label: string }[]> = {
	ROOM: [
		{ value: "GUEST_ROOM", label: "Guest Room - Hotel/accommodation rooms" },
		{ value: "CONFERENCE_ROOM", label: "Conference Room - Meeting/conference rooms" },
		{ value: "OFFICE", label: "Office - Office spaces" },
		{ value: "STUDIO", label: "Studio - Photography/recording studio" },
		{ value: "CLASSROOM", label: "Classroom - Training/education rooms" },
		{ value: "BALLROOM", label: "Ballroom - Event/banquet halls" },
		{ value: "SUITE", label: "Suite - Multi-room suites" },
		{ value: "OTHER", label: "Other" },
	],
	COURT: [
		{ value: "TENNIS", label: "Tennis" },
		{ value: "BASKETBALL", label: "Basketball" },
		{ value: "VOLLEYBALL", label: "Volleyball" },
		{ value: "BADMINTON", label: "Badminton" },
		{ value: "SQUASH", label: "Squash" },
		{ value: "RACQUETBALL", label: "Racquetball" },
		{ value: "PICKLEBALL", label: "Pickleball" },
		{ value: "MULTIPURPOSE", label: "Multipurpose" },
		{ value: "OTHER", label: "Other" },
	],
	DINING: [
		{ value: "FINE_DINING", label: "Fine Dining" },
		{ value: "CASUAL_DINING", label: "Casual Dining" },
		{ value: "CAFE", label: "Cafe" },
		{ value: "BAR", label: "Bar" },
		{ value: "LOUNGE", label: "Lounge" },
		{ value: "BUFFET", label: "Buffet" },
		{ value: "PRIVATE_DINING", label: "Private Dining" },
		{ value: "FOOD_COURT", label: "Food Court" },
		{ value: "OTHER", label: "Other" },
	],
	FITNESS: [
		{ value: "WEIGHT_ROOM", label: "Weight Room" },
		{ value: "CARDIO_AREA", label: "Cardio Area" },
		{ value: "YOGA_STUDIO", label: "Yoga Studio" },
		{ value: "SPIN_STUDIO", label: "Spin Studio" },
		{ value: "CROSSFIT_BOX", label: "Crossfit Box" },
		{ value: "PILATES_STUDIO", label: "Pilates Studio" },
		{ value: "MULTIPURPOSE", label: "Multipurpose" },
		{ value: "OTHER", label: "Other" },
	],
	PARKING: [
		{ value: "COVERED", label: "Covered" },
		{ value: "OPEN_LOT", label: "Open Lot" },
		{ value: "GARAGE", label: "Garage" },
		{ value: "VALET", label: "Valet" },
		{ value: "EV_CHARGING", label: "EV Charging" },
		{ value: "DISABLED", label: "Disabled" },
		{ value: "MOTORCYCLE", label: "Motorcycle" },
		{ value: "BICYCLE", label: "Bicycle" },
		{ value: "OTHER", label: "Other" },
	],
	AMENITY: [
		{ value: "SWIMMING_POOL", label: "Swimming Pool" },
		{ value: "HOT_TUB", label: "Hot Tub" },
		{ value: "SAUNA", label: "Sauna" },
		{ value: "STEAM_ROOM", label: "Steam Room" },
		{ value: "SPA", label: "Spa" },
		{ value: "LIBRARY", label: "Library" },
		{ value: "BUSINESS_CENTER", label: "Business Center" },
		{ value: "GAME_ROOM", label: "Game Room" },
		{ value: "LOUNGE", label: "Lounge" },
		{ value: "ROOFTOP", label: "Rooftop" },
		{ value: "GARDEN", label: "Garden" },
		{ value: "OTHER", label: "Other" },
	],
};

export function CreateFacilityModal({
	trigger,
	facilityTypeId,
	spaceType,
}: CreateFacilityModalProps) {
	const [identifier, setIdentifier] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [subtype, setSubtype] = useState("");
	const [open, setOpen] = useState(false);
	const { mutate: createFacility, isPending } = useCreateFacility();

	const handleCreate = () => {
		if (!identifier.trim() || !displayName.trim()) return;

		createFacility(
			{
				facilityTypeId,
				identifier,
				displayName,
				subtype: subtype || undefined,
			},
			{
				onSuccess: () => {
					setOpen(false);
					setIdentifier("");
					setDisplayName("");
					setSubtype("");
					toast.success("Facility created successfully");
				},
				onError: (error) => {
					toast.error("Failed to create facility");
					console.error(error);
				},
			},
		);
	};

	const availableSubtypes = spaceType ? SUBTYPE_OPTIONS[spaceType] : [];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger || (
					<Button variant="outline" className="cursor-pointer">
						<Plus className="mr-2 h-4 w-4" />
						Add facility
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Create Facility</DialogTitle>
					<DialogDescription>Add a new facility to this category.</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="identifier">Identifier</Label>
						<Input
							id="identifier"
							value={identifier}
							onChange={(e) => setIdentifier(e.target.value)}
							placeholder="e.g. court-1"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="displayName">Display Name</Label>
						<Input
							id="displayName"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							placeholder="e.g. Court 1"
						/>
					</div>
					{availableSubtypes && availableSubtypes.length > 0 && (
						<div className="grid gap-2">
							<Label htmlFor="subtype">Subtype</Label>
							<Select value={subtype} onValueChange={setSubtype}>
								<SelectTrigger id="subtype">
									<SelectValue placeholder="Select subtype" />
								</SelectTrigger>
								<SelectContent>
									{availableSubtypes.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
						Cancel
					</Button>
					<Button
						onClick={handleCreate}
						disabled={!identifier.trim() || !displayName.trim() || isPending}>
						{isPending ? "Creating..." : "Create"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
