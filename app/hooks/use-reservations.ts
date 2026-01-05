import { useMutation, useQuery } from "@tanstack/react-query";
import reservationService from "~/services/reservation-service";
import type { ApiQueryParams } from "~/services/api-service";
import { queryClient } from "~/lib/query-client";

export const useGetReservations = (apiParams?: ApiQueryParams) => {
	return useQuery({
		queryKey: ["reservations", apiParams],
		queryFn: () => {
			return reservationService
				.select(apiParams?.fields || "")
				.search(apiParams?.query || "")
				.paginate(apiParams?.page || 1, apiParams?.limit || 10)
				.sort(apiParams?.sort, apiParams?.order)
				.filter(apiParams?.filter || "")
				.getAllReservations();
		},
	});
};

export const useGetReservationById = (
	reservationId: string,
	apiParams?: ApiQueryParams,
	options?: { enabled?: boolean },
) => {
	return useQuery({
		queryKey: ["reservation-by-id", reservationId, apiParams],
		queryFn: () => {
			return reservationService
				.select(apiParams?.fields || "")
				.getReservationById(reservationId);
		},
		enabled: options?.enabled !== undefined ? options.enabled : !!reservationId,
	});
};

export const useCreateReservation = () => {
	return useMutation({
		mutationFn: (data: object | FormData) => {
			return reservationService.createReservation(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reservations"] });
		},
	});
};

export const useUpdateReservation = () => {
	return useMutation({
		mutationFn: ({
			reservationId,
			data,
		}: {
			reservationId: string;
			data: object | FormData;
		}) => {
			return reservationService.updateReservation(reservationId, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reservations"] });
			queryClient.invalidateQueries({ queryKey: ["reservation-by-id"] });
		},
	});
};

export const useDeleteReservation = () => {
	return useMutation({
		mutationFn: (reservationId: string) => {
			return reservationService.deleteReservation(reservationId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reservations"] });
		},
	});
};
