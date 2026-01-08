import { useMutation, useQuery } from "@tanstack/react-query";
import rateTypeService from "~/services/rate-type-service";
import type { ApiQueryParams } from "~/services/api-service";
import { queryClient } from "~/lib/query-client";

export const useGetRateTypes = (apiParams?: ApiQueryParams) => {
	return useQuery({
		queryKey: ["rate-types", apiParams],
		queryFn: () => {
			return rateTypeService
				.select(apiParams?.fields || "")
				.search(apiParams?.query || "")
				.paginate(apiParams?.page || 1, apiParams?.limit || 10)
				.sort(apiParams?.sort, apiParams?.order)
				.filter(apiParams?.filter || "")
				.getAllRateTypes();
		},
	});
};

export const useGetRateTypeById = (rateTypeId: string, apiParams?: ApiQueryParams) => {
	return useQuery({
		queryKey: ["rate-type-by-id", rateTypeId, apiParams],
		queryFn: () => {
			return rateTypeService.select(apiParams?.fields || "").getRateTypeById(rateTypeId);
		},
		enabled: !!rateTypeId,
	});
};

export const useCreateRateType = () => {
	return useMutation({
		mutationFn: (data: object | FormData) => {
			return rateTypeService.createRateType(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rate-types"] });
		},
	});
};

export const useUpdateRateType = () => {
	return useMutation({
		mutationFn: ({ rateTypeId, data }: { rateTypeId: string; data: object | FormData }) => {
			return rateTypeService.updateRateType(rateTypeId, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rate-types"] });
		},
	});
};

export const useDeleteRateType = () => {
	return useMutation({
		mutationFn: (rateTypeId: string) => {
			return rateTypeService.deleteRateType(rateTypeId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rate-types"] });
		},
	});
};
