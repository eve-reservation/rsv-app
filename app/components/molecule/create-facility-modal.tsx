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
import { useCreateFacility } from "~/hooks/use-facilities";
import { toast } from "sonner";

interface CreateFacilityModalProps {
	trigger?: React.ReactNode;
	facilityTypeId: string;
}

export function CreateFacilityModal({ trigger, facilityTypeId }: CreateFacilityModalProps) {
	const [identifier, setIdentifier] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [open, setOpen] = useState(false);
	const { mutate: createFacility, isPending } = useCreateFacility();

	const handleCreate = () => {
		if (!identifier.trim() || !displayName.trim()) return;

		createFacility(
			{
				facilityTypeId,
				identifier,
				displayName,
			},
			{
				onSuccess: () => {
					setOpen(false);
					setIdentifier("");
					setDisplayName("");
					toast.success("Facility created successfully");
				},
				onError: (error) => {
					toast.error("Failed to create facility");
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
						Add facility
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
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
