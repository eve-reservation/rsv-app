import { Button } from "@/components/ui/button";
import { Menu, User, Globe, Mail, Lock, User as UserIcon, Calendar } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import qcSportsLogo from "@/assets/images/logo/qcSportsLogo.png";
import { useState } from "react";
import { SignupModal } from "./signup-modal";

export function Header() {
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const [isSignupOpen, setIsSignupOpen] = useState(searchParams.get("signUp") === "true");

	const handleOpenChange = (open: boolean) => {
		setIsSignupOpen(open);
		const newParams = new URLSearchParams(searchParams);
		if (open) {
			newParams.set("signUp", "true");
		} else {
			newParams.delete("signUp");
		}
		setSearchParams(newParams);
	};

	return (
		<header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border">
			<div className="mx-auto max-w-7xl px-4 sm:px-0">
				<div className="flex h-16 items-center justify-between">
					<Link to="/" className="flex items-center gap-3">
						<img
							src={qcSportsLogo}
							alt="QC Sports Logo"
							className="h-10 w-10 object-contain rounded-lg"
						/>
						<span className="font-serif text-xl font-semibold tracking-tight hidden sm:inline-block">
							QC Sports
						</span>
					</Link>

					<nav className="hidden md:flex items-center gap-8">
						<Link
							to="/"
							className={cn(
								"text-sm font-medium transition-colors",
								location.pathname === "/"
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}>
							Explore
						</Link>
						<Link
							to="/sports"
							className={cn(
								"text-sm font-medium transition-colors",
								location.pathname === "/sports"
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}>
							Sports
						</Link>
						<Link
							to="/experiences"
							className={cn(
								"text-sm font-medium transition-colors",
								location.pathname === "/experiences"
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}>
							Experiences
						</Link>
					</nav>

					<div className="flex items-center gap-2 ml-16">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="flex items-center gap-2 rounded-full px-3 py-2 h-auto border-border hover:shadow-md transition-shadow bg-transparent">
									<Menu className="h-4 w-4" />
									<div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
										<User className="h-4 w-4 text-muted-foreground" />
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuItem onClick={() => handleOpenChange(true)}>
									Sign up
								</DropdownMenuItem>
								<DropdownMenuItem>Log in</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link to="/profile">Profile</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>

			<SignupModal open={isSignupOpen} onOpenChange={handleOpenChange} />
		</header>
	);
}
