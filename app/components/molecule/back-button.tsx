import { useNavigate } from "react-router";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
	fallbackPath?: string;
	variant?: "ghost" | "outline" | "default" | "secondary" | "destructive" | "link";
	size?: "default" | "sm" | "lg" | "icon";
	className?: string;
	showText?: boolean;
	text?: string;
}

export function BackButton({
	fallbackPath = "/",
	variant = "ghost",
	size = "icon",
	className = "cursor-pointer !px-0 hover:bg-transparent text-gray-600",
	showText = false,
	text = "Back",
}: BackButtonProps) {
	const navigate = useNavigate();

	const handleBackClick = () => {
		// Check if there's history to go back to
		if (window.history.state && window.history.state.idx > 0) {
			navigate(-1);
		} else {
			// Fallback to specified path
			navigate(fallbackPath);
		}
	};

	return (
		<Button
			variant={variant}
			size={showText && size === "icon" ? "default" : size}
			onClick={handleBackClick}
			className={`${className} ${showText ? "gap-2" : ""}`}>
			<ChevronLeft className="h-4 w-4" />
			{showText && <span>{text}</span>}
		</Button>
	);
}
