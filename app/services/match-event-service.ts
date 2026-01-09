import { APIService } from "./api-service";
import { apiClient, type ApiResponse } from "~/lib/api-client";
import { API_ENDPOINTS } from "~/configs/endpoints";

const { MATCH_EVENT } = API_ENDPOINTS;

class MatchEventService extends APIService {
	getAllMatchEvents = async () => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${MATCH_EVENT.GET_ALL}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	getMatchEventById = async (matchEventId: string) => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${MATCH_EVENT.GET_BY_ID.replace(":id", matchEventId)}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	createMatchEvent = async (data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.postFormData(MATCH_EVENT.CREATE, data);
			} else {
				response = await apiClient.post(MATCH_EVENT.CREATE, data);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	updateMatchEvent = async (matchEventId: string, data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.patchFormData(
					MATCH_EVENT.UPDATE.replace(":id", matchEventId),
					data,
				);
			} else {
				response = await apiClient.patch(
					MATCH_EVENT.UPDATE.replace(":id", matchEventId),
					data,
				);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	deleteMatchEvent = async (matchEventId: string) => {
		try {
			const response = await apiClient.delete(
				MATCH_EVENT.DELETE.replace(":id", matchEventId),
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};
}

export default new MatchEventService();
