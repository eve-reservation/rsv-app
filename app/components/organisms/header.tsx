import { Button } from "@/components/ui/button";
import { Menu, User, Globe } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<Link to="/" className="flex items-center gap-2">
						<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
							<span className="text-primary-foreground font-bold text-sm">S</span>
						</div>
						<span className="font-serif text-xl font-semibold tracking-tight">
							SpaceBook
						</span>
					</Link>

					<nav className="hidden md:flex items-center gap-8">
						<Link
							to="/"
							className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
							Explore
						</Link>
						<Link
							to="/admin"
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
							List Your Space
						</Link>
					</nav>

					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" className="hidden sm:flex">
							<Globe className="h-4 w-4" />
						</Button>

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
								<DropdownMenuItem>Sign up</DropdownMenuItem>
								<DropdownMenuItem>Log in</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link to="/admin">List your space</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>Help Center</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
