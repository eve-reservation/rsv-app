import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
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

import { SignupModal } from "./signup-modal";
import { useAuth } from "~/hooks/use-auth";

export function Header() {
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();

	const { user, logout } = useAuth();

	// Derived state
	const action = searchParams.get("action");
	const isSignupOpen = action === "signup" || action === "signin";
	const mode = action === "signin" ? "login" : "signup";

	// Helper to update the 'action' query param
	const setAction = (newAction: "signup" | "signin" | null) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			if (newAction) params.set("action", newAction);
			else params.delete("action");
			return params;
		});
	};

	return (
		<header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border">
			<div className="mx-auto max-w-7xl px-4 sm:px-0">
				<div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
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
							to="/lifestyle"
							className={cn(
								"text-sm font-medium transition-colors",
								location.pathname === "/lifestyle"
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}>
							Lifestyle
						</Link>
					</nav>

					<div className="flex items-center gap-2 ml-16">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className={cn(
										"flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 h-auto border-border hover:shadow-md transition-all duration-150",
										user ? "bg-primary/30 hover:bg-primary/20" : "text-muted-foreground",
									)}>
									<Menu className="h-4 w-4" />
									<div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
										<User className="h-4 w-4 text-muted-foreground" />
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								{!user ? (
									<>
										<DropdownMenuItem onClick={() => setAction("signup")}>
											Sign up
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => setAction("signin")}>
											Log in
										</DropdownMenuItem>
									</>
								) : (
									<DropdownMenuItem onClick={() => logout()}>
										Log out
									</DropdownMenuItem>
								)}
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link to="/profile">Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link to="/settings">Settings</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>

			<SignupModal
				open={isSignupOpen}
				onOpenChange={(open) => !open && setAction(null)}
				mode={mode}
				onModeChange={(newMode) => setAction(newMode === "login" ? "signin" : "signup")}
			/>
		</header>
	);
}
