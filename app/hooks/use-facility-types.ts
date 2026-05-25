import { useMutation, useQuery } from "@tanstack/react-query";
import facilityTypeService from "~/services/facility-type-service";
import type { ApiQueryParams } from "~/services/api-service";
import { queryClient } from "~/lib/query-client";

export const useGetFacilityTypes = (apiParams?: ApiQueryParams) => {
	return useQuery({
		queryKey: ["facility-types", apiParams],
		queryFn: () => {
			return facilityTypeService
				.select(apiParams?.fields || "")
				.search(apiParams?.query || "")
				.paginate(apiParams?.page || 1, apiParams?.limit || 10)
				.sort(apiParams?.sort, apiParams?.order)
				.filter(apiParams?.filter || "")
				.getAllFacilityTypes();
		},
	});
};

export const useGetFacilityTypeById = (facilityTypeId: string, apiParams?: ApiQueryParams) => {
	return useQuery({
		queryKey: ["facility-type-by-id", facilityTypeId, apiParams],
		queryFn: () => {
			return facilityTypeService
				.select(apiParams?.fields || "")
				.getFacilityTypeById(facilityTypeId);
		},
		enabled: !!facilityTypeId,
	});
};

export const useCreateFacilityType = () => {
	return useMutation({
		mutationFn: (data: object | FormData) => {
			return facilityTypeService.createFacilityType(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["facility-types"] });
		},
	});
};

export const useUpdateFacilityType = () => {
	return useMutation({
		mutationFn: ({
			facilityTypeId,
			data,
		}: {
			facilityTypeId: string;
			data: object | FormData;
		}) => {
			return facilityTypeService.updateFacilityType(facilityTypeId, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["facility-types"] });
		},
	});
};

export const useDeleteFacilityType = () => {
	return useMutation({
		mutationFn: (facilityTypeId: string) => {
			return facilityTypeService.deleteFacilityType(facilityTypeId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["facility-types"] });
		},
	});
};
