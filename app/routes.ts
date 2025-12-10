import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

// PPP Office routes
const userRoutes: RouteConfig = [
	route("/facility/:id", "routes/facility-details.tsx"),
	route("/booking/confirmation", "routes/user/booking-confirmation.tsx"),
	route("/booking/complete", "routes/user/booking-complete.tsx"),
];

// Admin routes
const adminRoutes: RouteConfig = prefix("/admin", [
	route("/", "routes/admin/admin.tsx"),
	route("/dashboard", "routes/admin/dashboard.tsx"),
	route("/booking", "routes/admin/bookings.tsx"),
	route("/facility", "routes/admin/facilities.tsx"),
]);

const authRoutes: RouteConfig = [route("/login", "routes/auth/login.tsx")];

// Main routes
export default [
	index("routes/landing.tsx"),
	layout("layouts/auth-layout.tsx", authRoutes),
	layout("layouts/user-layout.tsx", userRoutes),
	layout("layouts/admin-layout.tsx", adminRoutes),
] satisfies RouteConfig;
