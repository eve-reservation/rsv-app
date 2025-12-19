import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
	title: string;
	value: string;
	change: string;
	changeType: "positive" | "negative" | "neutral";
	icon: LucideIcon;
	className?: string; // Allow overriding styles/gradients
}

export function StatCard({
	title,
	value,
	change,
	changeType,
	icon: Icon,
	className,
}: StatCardProps) {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
				<Icon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				<p
					className={`text-xs ${
						changeType === "positive"
							? "text-green-600"
							: changeType === "negative"
								? "text-red-600"
								: "text-muted-foreground"
					}`}>
					{change} from last month
				</p>
			</CardContent>
		</Card>
	);
}
