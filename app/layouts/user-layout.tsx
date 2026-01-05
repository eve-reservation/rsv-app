import { Footer } from "react-day-picker";
import { Outlet } from "react-router";
import { Header } from "~/components/organisms/header";

export default function UserLayout() {
	return (
		<main className="min-h-screen flex flex-col bg-background">
			<Header />
			<div className="mx-auto max-w-7xl py-6 w-full">
				<Outlet />
			</div>
			<Footer />
		</main>
	);
}
