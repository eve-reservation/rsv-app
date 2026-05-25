import { APIService } from "./api-service";
import { apiClient, type ApiResponse } from "~/lib/api-client";
import { API_ENDPOINTS } from "~/configs/endpoints";

const { FACILITY } = API_ENDPOINTS;

class FacilityService extends APIService {
	getAllFacilities = async () => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${FACILITY.GET_ALL}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	getFacilityById = async (facilityId: string) => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${FACILITY.GET_BY_ID.replace(":id", facilityId)}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	createFacility = async (data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.postFormData(FACILITY.CREATE, data);
			} else {
				response = await apiClient.post(FACILITY.CREATE, data);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	updateFacility = async (facilityId: string, data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.patchFormData(
					FACILITY.UPDATE.replace(":id", facilityId),
					data,
				);
			} else {
				response = await apiClient.patch(FACILITY.UPDATE.replace(":id", facilityId), data);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	deleteFacility = async (facilityId: string) => {
		try {
			const response = await apiClient.delete(FACILITY.DELETE.replace(":id", facilityId));
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};
}

export default new FacilityService();
