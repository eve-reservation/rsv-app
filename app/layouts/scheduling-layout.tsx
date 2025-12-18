import React from "react";
import { Outlet } from "react-router";

export default function SchedulingLayout() {
	return (
		<main className="min-h-screen flex flex-col bg-background">
			<Outlet />
		</main>
	);
}
