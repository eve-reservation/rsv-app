import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

const authRoutes: RouteConfig = [route("/login", "routes/auth/login.tsx")];

const userRoutes: RouteConfig = [
	route("/facility/:id", "routes/facility.tsx"),
	route("/booking/confirmation", "routes/user/booking-confirmation.tsx"),
	route("/booking/complete", "routes/user/booking-complete.tsx"),
	route("/location-test", "routes/user/location-test.tsx"),
	route("/profile", "routes/profile.tsx"),
];

// Admin routes
const adminRoutes: RouteConfig = prefix("/admin", [
	route("/", "routes/admin/admin.tsx"),
	route("/dashboard", "routes/admin/dashboard.tsx"),
	route("/booking", "routes/admin/bookings.tsx"),
	route("/booking/:id", "routes/admin/booking.tsx"),
	route("/facility", "routes/admin/facilities.tsx"),
	route("/facility/:id", "routes/admin/facility.tsx"),
]);

const kioskRoutes: RouteConfig = prefix("/kiosk", [
	route("/facility/:id", "routes/kiosk/facility.tsx"),
	route("/reservation/confirmation", "routes/kiosk/reservation-confirmation.tsx"),
]);

// Main routes
export default [
	index("routes/landing.tsx"),
	layout("layouts/auth-layout.tsx", authRoutes),
	layout("layouts/user-layout.tsx", userRoutes),
	layout("layouts/admin-layout.tsx", adminRoutes),
	layout("layouts/kiosk-layout.tsx", kioskRoutes),
] satisfies RouteConfig;
