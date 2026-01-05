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
import { useCreateFacilityType } from "~/hooks/use-facility-types";
import { toast } from "sonner";

interface CreateFacilityTypeModalProps {
	trigger?: React.ReactNode;
}

export function CreateFacilityTypeModal({ trigger }: CreateFacilityTypeModalProps) {
	const [name, setName] = useState("");
	const [open, setOpen] = useState(false);
	const { mutate: createFacilityType, isPending } = useCreateFacilityType();

	const handleCreate = () => {
		if (!name.trim()) return;

		createFacilityType(
			{ name },
			{
				onSuccess: () => {
					setOpen(false);
					setName("");
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
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Facility Type</DialogTitle>
					<DialogDescription>
						Add a new facility type to categorize your facilities.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
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
					<Button onClick={handleCreate} disabled={!name.trim() || isPending}>
						{isPending ? "Creating..." : "Create"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
