import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { MatchEventSchema } from "~/zod/matchEvent.zod";

// Create a form-specific schema that is looser for UI inputs but validates against core rules
// We omit system fields and handle complex objects (ageRange, rules) via flattened fields

// Re-defining the schema explicitly to avoid TS intersection issues with pick/extend
// We can reuse properties from the base schema shape where they align
const EventRefinedSchema = z.object({
	title: MatchEventSchema.shape.title,
	description: z.string().optional(),
	maxParticipants: z.coerce.number().int().min(1).default(10),
	minParticipants: z.coerce.number().int().min(1).optional().default(2),
	allowWaitlist: z.boolean().default(true),
	autoAccept: z.boolean().default(false),
	skillLevel: z.string().optional(),
	genderPreference: z.enum(["MIXED", "MALE", "FEMALE"]).optional(),
	requirements: z.string().optional(),
	rules: z.string().optional(),
	ageMin: z.coerce.number().min(0).optional(),
	ageMax: z.coerce.number().min(0).optional(),
});

type EventFormValues = z.infer<typeof EventRefinedSchema>;

interface CreateEventModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (data: any) => void;
	initialData?: any;
}

export function CreateEventModal({
	open: isOpen, // Renamed 'open' to 'isOpen' to match the provided snippet
	onOpenChange,
	onSave,
	initialData,
}: CreateEventModalProps) {
	// Use the explicit schema definition where titles come from MatchEventSchema.shape but optionality is adjusted for Form
	const form = useForm({
		resolver: zodResolver(EventRefinedSchema) as any,
		defaultValues: {
			title: "",
			description: "",
			maxParticipants: 10,
			minParticipants: 2,
			allowWaitlist: true,
			autoAccept: false,
			skillLevel: undefined,
			genderPreference: undefined,
			ageMin: undefined,
			ageMax: undefined,
			rules: "",
			requirements: "",
		},
	});

	// Reset form when modal opens or initialData changes
	useEffect(() => {
		if (isOpen) {
			if (initialData) {
				form.reset({
					title: initialData.title,
					description: initialData.description || "",
					maxParticipants: initialData.maxParticipants,
					minParticipants: initialData.minParticipants || 2,
					allowWaitlist: initialData.allowWaitlist,
					autoAccept: initialData.autoAccept,
					skillLevel: initialData.skillLevel || undefined,
					genderPreference: initialData.genderPreference || undefined,
					ageMin: initialData.ageRange?.min,
					ageMax: initialData.ageRange?.max,
					rules: Array.isArray(initialData.rules)
						? initialData.rules.join("\n")
						: initialData.rules || "",
					requirements: initialData.requirements || "",
				});
			} else {
				form.reset({
					title: "",
					description: "",
					maxParticipants: 10,
					minParticipants: 2,
					allowWaitlist: true,
					autoAccept: false,
					skillLevel: undefined,
					genderPreference: undefined,
					ageMin: undefined,
					ageMax: undefined,
					rules: "",
					requirements: "",
				});
			}
		}
	}, [isOpen, initialData, form]);

	const onSubmit = (data: z.infer<typeof EventRefinedSchema>) => {
		// Log the raw form data
		console.log("Form Data:", data);

		// Transform flattened form data back to nested MatchEvent structure
		const payload: Partial<typeof MatchEventSchema._type> = {
			// Using typeof MatchEventSchema._type for type inference
			...data,
			description: data.description || null,
			skillLevel: data.skillLevel || null,
			genderPreference: data.genderPreference || null,
			requirements: data.requirements || null,
			// Split rules by newline or custom separator if needed
			rules: data.rules
				? data.rules
						.split("\n")
						.map((r) => r.trim())
						.filter((r) => r.length > 0)
				: [],
			ageRange: {
				min: data.ageMin,
				max: data.ageMax,
			},
			status: "DRAFT",
			isPublic: true,
		};

		// Remove flattened fields that aren't in the payload
		delete (payload as any).ageMin;
		delete (payload as any).ageMax;

		onSave(payload);
		onOpenChange(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create Public Event</DialogTitle>
					<DialogDescription>Set up the details for your public game.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Event Title</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. Saturday Pickup Basketball"
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="maxParticipants"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Max Participants</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												value={field.value ?? ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="minParticipants"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Min Participants</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												value={field.value ?? ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="skillLevel"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Skill Level</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											value={field.value ?? undefined}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select skill level" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="ANY">Any Level</SelectItem>
												<SelectItem value="BEGINNER">Beginner</SelectItem>
												<SelectItem value="INTERMEDIATE">
													Intermediate
												</SelectItem>
												<SelectItem value="ADVANCED">Advanced</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="genderPreference"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gender Preference</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											value={field.value ?? undefined}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select gender" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="MIXED">Mixed</SelectItem>
												<SelectItem value="MALE">Male</SelectItem>
												<SelectItem value="FEMALE">Female</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="ageMin"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Min Age</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												value={field.value ?? ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="ageMax"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Max Age</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												value={field.value ?? ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="allowWaitlist"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Allow Waitlist</FormLabel>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="autoAccept"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Auto Accept Participants</FormLabel>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell people about your event..."
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="rules"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rules (one per line)</FormLabel>
									<FormControl>
										<Textarea
											placeholder="No swearing&#10;Bring your own water"
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="requirements"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Requirements</FormLabel>
									<FormControl>
										<Textarea
											placeholder="What to bring / prepare..."
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange(false)}>
								Cancel
							</Button>
							<Button type="submit">Save Event Details</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
