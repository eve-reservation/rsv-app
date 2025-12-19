import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

const authRoutes: RouteConfig = [route("/login", "routes/auth/login.tsx")];

const userRoutes: RouteConfig = [
	index("routes/user/landing.tsx"),
	route("/facility/:id", "routes/user/facility.tsx"),
	route("/booking/confirmation", "routes/user/booking-confirmation.tsx"),
	route("/booking/complete", "routes/user/booking-complete.tsx"),
	route("/location-test", "routes/user/location-test.tsx"),
	route("/profile", "routes/user/profile.tsx"),
	route("/sports", "routes/user/sports.tsx"),
	route("/lifestyle", "routes/user/lifestyle.tsx"),
];

// Admin routes
const adminRoutes: RouteConfig = prefix("/admin", [
	route("/", "routes/admin/admin.tsx"),
	route("/dashboard", "routes/admin/dashboard.tsx"),
	route("/booking", "routes/admin/bookings.tsx"),
	route("/booking/:id", "routes/admin/booking.tsx"),
	route("/facility", "routes/admin/facilities.tsx"),
	route("/facility/:id", "routes/admin/facility.tsx"),
	route("/user", "routes/admin/users.tsx"),
	route("/deal", "routes/admin/deals.tsx"),
	route("/profile", "routes/admin/deals.tsx"),
]);

const kioskRoutes: RouteConfig = prefix("/scheduling", [
	route("/facility/:id", "routes/scheduling/facility.tsx"),
	route("/reservation/confirmation", "routes/scheduling/reservation-confirmation.tsx"),
]);

// Main routes
export default [
	layout("layouts/auth-layout.tsx", authRoutes),
	layout("layouts/user-layout.tsx", userRoutes),
	layout("layouts/admin-layout.tsx", adminRoutes),
	layout("layouts/scheduling-layout.tsx", kioskRoutes),
	route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
