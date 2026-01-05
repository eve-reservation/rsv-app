import { APIService } from "./api-service";
import { apiClient, type ApiResponse } from "~/lib/api-client";
import { API_ENDPOINTS } from "~/configs/endpoints";

const { RESERVATION } = API_ENDPOINTS;

class ReservationService extends APIService {
	getAllReservations = async () => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${RESERVATION.GET_ALL}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	getReservationById = async (reservationId: string) => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${RESERVATION.GET_BY_ID.replace(":id", reservationId)}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	createReservation = async (data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.postFormData(RESERVATION.CREATE, data);
			} else {
				response = await apiClient.post(RESERVATION.CREATE, data);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	updateReservation = async (reservationId: string, data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.patchFormData(
					RESERVATION.UPDATE.replace(":id", reservationId),
					data,
				);
			} else {
				response = await apiClient.patch(
					RESERVATION.UPDATE.replace(":id", reservationId),
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

	deleteReservation = async (reservationId: string) => {
		try {
			const response = await apiClient.put(RESERVATION.DELETE.replace(":id", reservationId));
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};
}

export default new ReservationService();
