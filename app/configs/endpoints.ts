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
		GET_ALL: "/facilityType",
		GET_BY_ID: "/facilityType/:id",
		CREATE: "/facilityType",
		UPDATE: "/facilityType/:id",
		DELETE: "/facilityType/:id", // Soft delete
	},
	
	// Facility API endpoints
	FACILITY: {
		GET_ALL: "/facility",
		GET_BY_ID: "/facility/:id",
		CREATE: "/facility",
		UPDATE: "/facility/:id",
		DELETE: "/facility/:id", // Soft delete
	},
	
	// Reservation API endpoints
	RESERVATION: {
		GET_ALL: "/reservation",
		GET_BY_ID: "/reservation/:id",
		CREATE: "/reservation",
		UPDATE: "/reservation/:id",
		DELETE: "/reservation/:id", // Soft delete
	},
	
};
