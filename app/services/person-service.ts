import { APIService } from "./api-service";
import { apiClient, type ApiResponse } from "~/lib/api-client";
import { API_ENDPOINTS } from "~/configs/endpoints";

const { PERSON } = API_ENDPOINTS;

class PersonService extends APIService {
	getAllPersons = async () => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${PERSON.GET_ALL}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	getPersonById = async (personId: string) => {
		try {
			const response: ApiResponse<any> = await apiClient.get(
				`${PERSON.GET_BY_ID.replace(":id", personId)}${this.getQueryString()}`,
			);
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	createPerson = async (data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.postFormData(PERSON.CREATE, data);
			} else {
				response = await apiClient.post(PERSON.CREATE, data);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	updatePerson = async (personId: string, data: object | FormData) => {
		try {
			let response;
			if (data instanceof FormData) {
				response = await apiClient.patchFormData(
					PERSON.UPDATE.replace(":id", personId),
					data,
				);
			} else {
				response = await apiClient.patch(PERSON.UPDATE.replace(":id", personId), data);
			}
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};

	deletePerson = async (personId: string) => {
		try {
			const response = await apiClient.put(PERSON.DELETE.replace(":id", personId));
			return response.data;
		} catch (error: any) {
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "An error has occurred",
			);
		}
	};
}

export default new PersonService();
