import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { Tag } from "lucide-react";
import { toast } from "sonner";

interface PromoCodeModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onApply: (code: string) => void;
}

export function PromoCodeModal({ open, onOpenChange, onApply }: PromoCodeModalProps) {
	const [code, setCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!code.trim()) return;

		setIsLoading(true);
		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			if (code.toUpperCase() === "INVALID") {
				toast.error("Invalid promo code");
			} else {
				onApply(code);
				setCode("");
				onOpenChange(false);
				toast.success("Promo code applied successfully!");
			}
		}, 1000);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Tag className="w-5 h-5 text-primary" />
						Enter Promo Code
					</DialogTitle>
					<DialogDescription>
						Add a promo code to get discounts on your booking.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="code">Promo Code</Label>
						<Input
							id="code"
							placeholder="e.g., SUMMER20"
							value={code}
							onChange={(e) => setCode(e.target.value.toUpperCase())}
							className="uppercase placeholder:normal-case font-mono"
						/>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={isLoading}>
							Cancel
						</Button>
						<Button type="submit" disabled={!code.trim() || isLoading}>
							{isLoading ? "Applying..." : "Apply Code"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
