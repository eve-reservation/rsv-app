import { APIService } from "./api-service";
import { apiClient, type ApiResponse } from "~/lib/api-client";
import { API_ENDPOINTS } from "~/configs/endpoints";

const { FACILITY_TYPE } = API_ENDPOINTS;

class FacilityTypeService extends APIService {
	getAllFacilityTypes = async () => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${FACILITY_TYPE.GET_ALL}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	getFacilityTypeById = async (facilityTypeId: string) => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${FACILITY_TYPE.GET_BY_ID.replace(":id", facilityTypeId)}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	createFacilityType = async (data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.postFormData(FACILITY_TYPE.CREATE, data);
			} else {
				response = await apiClient.post(FACILITY_TYPE.CREATE, data);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	updateFacilityType = async (facilityTypeId: string, data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.patchFormData(
					FACILITY_TYPE.UPDATE.replace(":id", facilityTypeId),
					data,
				);
			} else {
				response = await apiClient.patch(
					FACILITY_TYPE.UPDATE.replace(":id", facilityTypeId),
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

	deleteFacilityType = async (facilityTypeId: string) => {
		try {
			const response = await apiClient.put(
				FACILITY_TYPE.DELETE.replace(":id", facilityTypeId),
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};
}

export default new FacilityTypeService();
