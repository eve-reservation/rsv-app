import { useState } from "react";
import { deals, type Deal } from "~/lib/data";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Plus, Pencil, Trash2, Calendar, Tag, Search, MoreHorizontal } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { toast } from "sonner";

export default function AdminDeals() {
	const [dealList, setDealList] = useState<Deal[]>(deals);
	const [searchQuery, setSearchQuery] = useState("");

	// Dialog Interaction State
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [currentDeal, setCurrentDeal] = useState<Deal | null>(null);

	// Filtered Deals
	const filteredDeals = dealList.filter(
		(deal) =>
			deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			deal.code.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// Handlers
	const handleAddNew = () => {
		setCurrentDeal(null);
		setIsDialogOpen(true);
	};

	const handleEdit = (deal: Deal) => {
		setCurrentDeal(deal);
		setIsDialogOpen(true);
	};

	const handleDeleteClick = (deal: Deal) => {
		setCurrentDeal(deal);
		setIsDeleteDialogOpen(true);
	};

	const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const newDeal: Deal = {
			id: currentDeal?.id || `deal-${Date.now()}`,
			title: formData.get("title") as string,
			description: formData.get("description") as string,
			code: formData.get("code") as string,
			discount: formData.get("discount") as string,
			validUntil: formData.get("validUntil") as string,
			image:
				(formData.get("image") as string) ||
				"https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000", // Default placeholder
		};

		if (currentDeal) {
			setDealList(dealList.map((d) => (d.id === currentDeal.id ? newDeal : d)));
			toast.success("Deal updated successfully");
		} else {
			setDealList([...dealList, newDeal]);
			toast.success("Deal created successfully");
		}
		setIsDialogOpen(false);
	};

	const handleConfirmDelete = () => {
		if (currentDeal) {
			setDealList(dealList.filter((d) => d.id !== currentDeal.id));
			toast.success("Deal deleted successfully");
			setIsDeleteDialogOpen(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Deals & Promos</h1>
					<p className="text-muted-foreground">
						Manage ongoing promotions and discounts.
					</p>
				</div>
				<Button onClick={handleAddNew} className="self-start md:self-auto gap-2">
					<Plus className="h-4 w-4" /> Add New Deal
				</Button>
			</div>

			{/* Search */}
			<div className="relative max-w-sm">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search deals..."
					className="pl-9"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* Deals Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredDeals.map((deal) => (
					<Card key={deal.id} className="overflow-hidden flex flex-col group py-0">
						<div className="relative aspect-video overflow-hidden">
							<img
								src={deal.image}
								alt={deal.title}
								className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute top-2 right-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="secondary"
											size="icon"
											className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-none">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuItem onClick={() => handleEdit(deal)}>
											<Pencil className="mr-2 h-4 w-4" /> Edit
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											className="text-destructive focus:text-destructive"
											onClick={() => handleDeleteClick(deal)}>
											<Trash2 className="mr-2 h-4 w-4" /> Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<div className="absolute bottom-2 left-2">
								<Badge
									variant="secondary"
									className="font-bold bg-white/90 text-black shadow-sm">
									{deal.discount}
								</Badge>
							</div>
						</div>
						<CardHeader className="p-4 pb-2">
							<CardTitle className="line-clamp-1 text-lg">{deal.title}</CardTitle>
							<CardDescription className="line-clamp-2 min-h-[2.5rem]">
								{deal.description}
							</CardDescription>
						</CardHeader>
						<CardContent className="p-4 pt-2 space-y-3 flex-1">
							<div className="flex items-center gap-2 text-sm">
								<Tag className="h-4 w-4 text-primary" />
								<span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs font-semibold">
									{deal.code}
								</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Calendar className="h-4 w-4" />
								<span>Valid until {deal.validUntil}</span>
							</div>
						</CardContent>
					</Card>
				))}
				{filteredDeals.length === 0 && (
					<div className="col-span-full text-center py-12 text-muted-foreground">
						No deals found matching your search.
					</div>
				)}
			</div>

			{/* Create/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>{currentDeal ? "Edit Deal" : "Create New Deal"}</DialogTitle>
						<DialogDescription>
							{currentDeal
								? "Make changes to the existing promotion."
								: "Add a new promotion to your list."}
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSave} className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								name="title"
								defaultValue={currentDeal?.title}
								required
								placeholder="e.g. Summer Sale"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								name="description"
								defaultValue={currentDeal?.description}
								required
								placeholder="Describe the promo..."
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="code">Promo Code</Label>
								<Input
									id="code"
									name="code"
									defaultValue={currentDeal?.code}
									required
									placeholder="SUMMER20"
									className="uppercase"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="discount">Discount Label</Label>
								<Input
									id="discount"
									name="discount"
									defaultValue={currentDeal?.discount}
									required
									placeholder="20% OFF"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="validUntil">Valid Until</Label>
							<Input
								id="validUntil"
								name="validUntil"
								defaultValue={currentDeal?.validUntil}
								required
								placeholder="December 31, 2024"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="image">Image URL</Label>
							<Input
								id="image"
								name="image"
								defaultValue={currentDeal?.image}
								placeholder="https://..."
							/>
						</div>
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsDialogOpen(false)}>
								Cancel
							</Button>
							<Button type="submit">Save Changes</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation */}
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the promo
							deal "{currentDeal?.title}".
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
