import { useMutation, useQuery } from "@tanstack/react-query";
import facilityService from "~/services/facility-service";
import type { ApiQueryParams } from "~/services/api-service";
import { queryClient } from "~/lib/query-client";

export const useGetFacilities = (apiParams?: ApiQueryParams) => {
	return useQuery({
		queryKey: ["facilities", apiParams],
		queryFn: () => {
			return facilityService
				.select(apiParams?.fields || "")
				.search(apiParams?.query || "")
				.paginate(apiParams?.page || 1, apiParams?.limit || 10)
				.sort(apiParams?.sort, apiParams?.order)
				.filter(apiParams?.filter || "")
				.getAllFacilities();
		},
	});
};

export const useGetFacilityById = (
	facilityId: string,
	apiParams?: ApiQueryParams,
	options?: { enabled?: boolean },
) => {
	return useQuery({
		queryKey: ["facility-by-id", facilityId, apiParams],
		queryFn: () => {
			return facilityService.select(apiParams?.fields || "").getFacilityById(facilityId);
		},
		enabled: options?.enabled !== undefined ? options.enabled : !!facilityId,
	});
};

export const useCreateFacility = () => {
	return useMutation({
		mutationFn: (data: object | FormData) => {
			return facilityService.createFacility(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["facilities"] });
			queryClient.invalidateQueries({ queryKey: ["facility-types"] });
		},
	});
};

export const useUpdateFacility = () => {
	return useMutation({
		mutationFn: ({ facilityId, data }: { facilityId: string; data: object | FormData }) => {
			return facilityService.updateFacility(facilityId, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["facilities"] });
			queryClient.invalidateQueries({ queryKey: ["facility-by-id"] });
		},
	});
};

export const useDeleteFacility = () => {
	return useMutation({
		mutationFn: (facilityId: string) => {
			return facilityService.deleteFacility(facilityId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["facilities"] });
		},
	});
};
