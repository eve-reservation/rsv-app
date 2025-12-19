import { API_ENDPOINTS } from "~/configs/endpoints";
import { ApiClient, type ApiResponse } from "~/lib/api-client";
import type { loginResponse } from "~/types/auth";

const { AUTH, AUTH_URL } = API_ENDPOINTS;

// Create a dedicated client for auth service
const authClient = new ApiClient(AUTH_URL);

class AuthService {
	login = async (body: any) => {
		const payload = {
			email: body.identifier,
			password: body.password,
		};
		try {
			const response: ApiResponse<loginResponse> = await authClient.post(AUTH.LOGIN, payload);
			return response.data;
		} catch (error: any) {
			console.error("Error logging in:", error);
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "Error logging in",
			);
		}
	};

	logout = async () => {
		try {
			const response = await authClient.post(AUTH.LOGOUT);
			return response.data;
		} catch (error: any) {
			console.error("Error logging out:", error);
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "Error logging out",
			);
		}
	};

	register = async (body: any) => {
		try {
			const response = await authClient.post(AUTH.REGISTER, body);
			return response.data;
		} catch (error: any) {
			console.error("Error registering:", error);
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "Error registering",
			);
		}
	};

	getCurrentUser = async () => {
		try {
			const response: ApiResponse<loginResponse> = await authClient.get(AUTH.ME);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "Error fetching current user",
			);
		}
	};
}

const authService = new AuthService();

export default authService;
