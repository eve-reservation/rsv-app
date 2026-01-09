import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

export interface GroupMember {
	firstName: string;
	lastName: string;
	email?: string;
	phone?: string;
}

interface AddParticipantsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	participants: GroupMember[];
	onSave: (participants: GroupMember[]) => void;
}

export function AddParticipantsModal({
	open,
	onOpenChange,
	participants: initialParticipants,
	onSave,
}: AddParticipantsModalProps) {
	const [participants, setParticipants] = useState<GroupMember[]>(initialParticipants || []);
	const [newMember, setNewMember] = useState<GroupMember>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	});
	const [errors, setErrors] = useState<Partial<GroupMember>>({});

	const handleAddMember = () => {
		if (!newMember.firstName || !newMember.lastName) {
			setErrors({
				firstName: !newMember.firstName ? "First name is required" : "",
				lastName: !newMember.lastName ? "Last name is required" : "",
			});
			return;
		}

		setParticipants([...participants, newMember]);
		setNewMember({ firstName: "", lastName: "", email: "", phone: "" });
		setErrors({});
	};

	const handleRemoveMember = (index: number) => {
		const updated = [...participants];
		updated.splice(index, 1);
		setParticipants(updated);
	};

	const handleSave = () => {
		onSave(participants);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Add Participants</DialogTitle>
					<DialogDescription>
						Add details for the people joining with you.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* List of added participants */}
					{participants.length > 0 && (
						<div className="space-y-3">
							<Label>Added Participants ({participants.length})</Label>
							<div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
								{participants.map((member, idx) => (
									<div
										key={idx}
										className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border">
										<div className="text-sm">
											<p className="font-medium">
												{member.firstName} {member.lastName}
											</p>
											<div className="text-muted-foreground text-xs flex gap-2">
												{member.email && <span>{member.email}</span>}
												{member.phone && <span>{member.phone}</span>}
											</div>
										</div>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleRemoveMember(idx)}
											className="h-8 w-8 text-destructive hover:text-destructive/90">
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Add New Form */}
					<div className="space-y-4 border rounded-lg p-4 bg-muted/20">
						<div className="flex items-center gap-2 mb-2">
							<UserPlus className="h-4 w-4 text-primary" />
							<span className="text-sm font-semibold">New Participant</span>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div className="space-y-1">
								<Label htmlFor="firstName" className="text-xs">
									First Name *
								</Label>
								<Input
									id="firstName"
									value={newMember.firstName}
									onChange={(e) =>
										setNewMember({ ...newMember, firstName: e.target.value })
									}
									className={errors.firstName ? "border-destructive" : ""}
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="lastName" className="text-xs">
									Last Name *
								</Label>
								<Input
									id="lastName"
									value={newMember.lastName}
									onChange={(e) =>
										setNewMember({ ...newMember, lastName: e.target.value })
									}
									className={errors.lastName ? "border-destructive" : ""}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div className="space-y-1">
								<Label htmlFor="email" className="text-xs">
									Email (Optional)
								</Label>
								<Input
									id="email"
									type="email"
									value={newMember.email}
									onChange={(e) =>
										setNewMember({ ...newMember, email: e.target.value })
									}
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="phone" className="text-xs">
									Phone (Optional)
								</Label>
								<Input
									id="phone"
									value={newMember.phone}
									onChange={(e) =>
										setNewMember({ ...newMember, phone: e.target.value })
									}
								/>
							</div>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={handleAddMember}
							className="w-full mt-2 border-dashed">
							<Plus className="h-4 w-4 mr-2" /> Add to list
						</Button>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSave}>Save Participants</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
