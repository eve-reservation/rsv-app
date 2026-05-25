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
import { useCreateFacilityType } from "~/hooks/use-facility-types";
import { toast } from "sonner";

interface CreateFacilityTypeModalProps {
	trigger?: React.ReactNode;
}

const FACILITY_TYPE_OPTIONS = [
	{
		value: "ROOM",
		label: "Room - Indoor enclosed spaces (hotel rooms, conference rooms, offices)",
	},
	{ value: "COURT", label: "Court - Sports/recreation courts (tennis, basketball, etc.)" },
	{ value: "DINING", label: "Dining - Food & beverage spaces (restaurant, cafe, bar)" },
	{ value: "FITNESS", label: "Fitness - Gym and fitness facilities" },
	{ value: "PARKING", label: "Parking - Parking spaces/lots" },
	{ value: "AMENITY", label: "Amenity - Pool, spa, lounge, etc." },
	{ value: "OUTDOOR", label: "Outdoor - Outdoor spaces (garden, terrace, etc.)" },
	{ value: "OTHER", label: "Other" },
];

export function CreateFacilityTypeModal({ trigger }: CreateFacilityTypeModalProps) {
	const [name, setName] = useState("");
	const [facilityType, setFacilityType] = useState("");
	const [open, setOpen] = useState(false);
	const { mutate: createFacilityType, isPending } = useCreateFacilityType();

	const handleCreate = () => {
		if (!name.trim() || !facilityType) return;

		createFacilityType(
			{ name, spaceType: facilityType },
			{
				onSuccess: () => {
					setOpen(false);
					setName("");
					setFacilityType("");
					toast.success("Facility type created successfully");
				},
				onError: (error) => {
					toast.error("Failed to create facility type");
					console.error(error);
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger || (
					<Button variant="outline" className="cursor-pointer">
						<Plus className="mr-2 h-4 w-4" />
						Add facility type
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Create Facility Type</DialogTitle>
					<DialogDescription>
						Add a new facility type to categorize your facilities.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="facilityType">Facility Type</Label>
						<Select value={facilityType} onValueChange={setFacilityType}>
							<SelectTrigger id="facilityType" className="w-full">
								<SelectValue placeholder="Select facility type" />
							</SelectTrigger>
							<SelectContent>
								{FACILITY_TYPE_OPTIONS.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="e.g. Sports Court"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
						Cancel
					</Button>
					<Button
						className="cursor-pointer"
						onClick={handleCreate}
						disabled={!name.trim() || !facilityType || isPending}>
						{isPending ? "Creating..." : "Create"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
