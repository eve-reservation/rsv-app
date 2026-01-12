import { APIService } from "./api-service";
import { apiClient, type ApiResponse } from "~/lib/api-client";
import { API_ENDPOINTS } from "~/configs/endpoints";

const { RATE_TYPE } = API_ENDPOINTS;

class RateTypeService extends APIService {
	getAllRateTypes = async () => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${RATE_TYPE.GET_ALL}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	getRateTypeById = async (rateTypeId: string) => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${RATE_TYPE.GET_BY_ID.replace(":id", rateTypeId)}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	createRateType = async (data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.postFormData(RATE_TYPE.CREATE, data);
			} else {
				response = await apiClient.post(RATE_TYPE.CREATE, data);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	updateRateType = async (rateTypeId: string, data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.patchFormData(
					RATE_TYPE.UPDATE.replace(":id", rateTypeId),
					data,
				);
			} else {
				response = await apiClient.patch(RATE_TYPE.UPDATE.replace(":id", rateTypeId), data);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	deleteRateType = async (rateTypeId: string) => {
		try {
			const response = await apiClient.delete(RATE_TYPE.DELETE.replace(":id", rateTypeId));
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};
}

export default new RateTypeService();
