export const API_ENDPOINTS = {
	AUTH_URL: import.meta.env.VITE_AUTH_URL || "http://localhost:3000/api",
	BASE_URL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api",

	// Auth API endpoints
	AUTH: {
		LOGIN: "/auth/login",
		LOGOUT: "/auth/logout",
		REGISTER: "/auth/register",
		ME: "/auth/me",
	},

	// User API endpoints
	USER: {
		GET_ALL: "/user",
		GET_BY_ID: "/user/:id",
		GET_CURRENT: "/user/current",
		CREATE: "/user",
		UPDATE: "/user/:id",
		DELETE: "/user/:id", // Soft delete
	},

	// Person API endpoints
	PERSON: {
		GET_ALL: "/person",
		GET_BY_ID: "/person/:id",
		CREATE: "/person",
		UPDATE: "/person/:id",
		DELETE: "/person/:id", // Soft delete
	},

	// Facility Type API endpoints
	FACILITY_TYPE: {
		GET_ALL: "/facility-type",
		GET_BY_ID: "/facility-type/:id",
		CREATE: "/facility-type",
		UPDATE: "/facility-type/:id",
		DELETE: "/facility-type/:id", // Soft delete
	},
};
