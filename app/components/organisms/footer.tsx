import { Link } from "react-router";

export function Footer() {
	return (
		<footer className="border-t border-border bg-card mt-auto">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h4 className="font-semibold text-foreground mb-4">Support</h4>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Help Center
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Safety Information
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Cancellation Options
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-foreground mb-4">Community</h4>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Blog
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Forum
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Events
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-foreground mb-4">Hosting</h4>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li>
								<Link
									to="/admin"
									className="hover:text-foreground transition-colors">
									List Your Space
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Resources
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Hosting Guide
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-foreground mb-4">SpaceBook</h4>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									About
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Careers
								</Link>
							</li>
							<li>
								<Link to="#" className="hover:text-foreground transition-colors">
									Privacy
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
					<p>© 2025 SpaceBook, Inc. All rights reserved.</p>
					<div className="flex items-center gap-6">
						<Link to="#" className="hover:text-foreground transition-colors">
							Terms
						</Link>
						<Link to="#" className="hover:text-foreground transition-colors">
							Privacy
						</Link>
						<Link to="#" className="hover:text-foreground transition-colors">
							Sitemap
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
