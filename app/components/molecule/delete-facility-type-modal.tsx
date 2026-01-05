import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteFacilityType } from "~/hooks/use-facility-types";
import { toast } from "sonner";

interface DeleteFacilityTypeModalProps {
	trigger?: React.ReactNode;
	facilityTypeId: string;
	typeName: string;
}

export function DeleteFacilityTypeModal({
	trigger,
	facilityTypeId,
	typeName,
}: DeleteFacilityTypeModalProps) {
	const [open, setOpen] = useState(false);
	const { mutate: deleteFacilityType, isPending } = useDeleteFacilityType();

	const handleDelete = () => {
		deleteFacilityType(facilityTypeId, {
			onSuccess: () => {
				setOpen(false);
				toast.success("Facility type deleted successfully");
			},
			onError: (error) => {
				toast.error("Failed to delete facility type");
				console.error(error);
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger || (
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer">
						<Trash2 className="h-4 w-4" />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Delete Facility Type</DialogTitle>
					<DialogDescription className="pt-2 space-y-2">
						<p>
							Are you sure you want to delete{" "}
							<span className="font-semibold text-foreground">"{typeName}"</span>?
						</p>
						<p className="text-xs text-destructive font-medium">
							Warning: This will also delete all facilities associated with this type.
							This action cannot be undone.
						</p>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={handleDelete} disabled={isPending} className="cursor-pointer">
						{isPending ? "Deleting..." : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
