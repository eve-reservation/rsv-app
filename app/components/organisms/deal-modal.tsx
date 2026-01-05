import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { type Deal } from "~/lib/data";
import { Badge } from "~/components/ui/badge";
import { Calendar, Tag, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

interface DealModalProps {
	deal: Deal | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function DealModal({ deal, open, onOpenChange }: DealModalProps) {
	const [copied, setCopied] = useState(false);

	if (!deal) return null;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(deal.code);
		setCopied(true);
		toast.success("Promo code copied to clipboard!");
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-3xl p-0 overflow-hidden gap-0 grid md:grid-cols-2 border-none">
				<div className="relative aspect-video w-full md:aspect-auto md:h-full overflow-hidden">
					<img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
					<div className="absolute top-4 left-4 md:right-auto md:left-4">
						<Badge
							variant="destructive"
							className="font-bold shadow-lg text-base px-3 py-1">
							{deal.discount}
						</Badge>
					</div>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/10 md:to-transparent" />
				</div>

				<div className="p-6 space-y-6 flex flex-col justify-center bg-background">
					<DialogHeader className="space-y-4 text-left">
						<DialogTitle className="text-2xl font-serif font-bold leading-tight">
							{deal.title}
						</DialogTitle>
						<DialogDescription className="text-base text-muted-foreground">
							{deal.description}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-2">
						<div className="space-y-2">
							<span className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
								Promo Code
							</span>
							<div className="flex items-center gap-2">
								<div className="flex-1 bg-muted/50 border border-dashed border-primary/30 rounded-md p-3 flex items-center gap-3 font-mono font-bold text-lg text-primary select-all">
									<Tag className="w-5 h-5 text-muted-foreground" />
									{deal.code}
								</div>
								<Button
									size="icon"
									variant="outline"
									className="h-14 w-14 shrink-0 hover:bg-muted cursor-pointer"
									onClick={copyToClipboard}>
									{copied ? (
										<Check className="w-5 h-5 text-green-600" />
									) : (
										<Copy className="w-5 h-5" />
									)}
								</Button>
							</div>
						</div>

						<div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
							<span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								Valid until
							</span>
							<span className="font-semibold text-sm">{deal.validUntil}</span>
						</div>
					</div>

					<div className="pt-2 mt-auto">
						<Button
							className="w-full font-semibold"
							size="lg"
							onClick={() => onOpenChange(false)}>
							Close
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
