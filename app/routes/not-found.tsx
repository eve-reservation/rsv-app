import { Link } from "react-router-dom";
import { Header } from "~/components/organisms/header";
import { Button } from "~/components/ui/button";
import notfoundGif from "@/assets/404.gif";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
			<main className="flex-1 flex gap-24 justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-24">
				<div className="max-w-2xl w-full">
					<p className="text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
						Error 404
					</p>
					<h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-6 text-foreground">
						We can't seem to find the page you're looking for.
					</h1>
					<div className="mt-8">
						<Button asChild size="lg" className="rounded-full px-8">
							<Link to="/">Return Home</Link>
						</Button>
					</div>
				</div>
				<div className="">
					<img
						src={notfoundGif}
						alt="404 not found"
						className="max-w-[300px] w-full mix-blend-multiply transition-all duration-500"
					/>
				</div>
			</main>
		</div>
	);
}
