import { useMutation, useQuery } from "@tanstack/react-query";
import matchEventService from "~/services/match-event-service";
import type { ApiQueryParams } from "~/services/api-service";
import { queryClient } from "~/lib/query-client";

export const useGetMatchEvents = (apiParams?: ApiQueryParams) => {
	return useQuery({
		queryKey: ["match-events", apiParams],
		queryFn: () => {
			return matchEventService
				.select(apiParams?.fields || "")
				.search(apiParams?.query || "")
				.paginate(apiParams?.page || 1, apiParams?.limit || 10)
				.sort(apiParams?.sort, apiParams?.order)
				.filter(apiParams?.filter || "")
				.getAllMatchEvents();
		},
	});
};

export const useGetMatchEventById = (
	matchEventId: string,
	apiParams?: ApiQueryParams,
	options?: { enabled?: boolean },
) => {
	return useQuery({
		queryKey: ["match-event-by-id", matchEventId, apiParams],
		queryFn: () => {
			return matchEventService
				.select(apiParams?.fields || "")
				.getMatchEventById(matchEventId);
		},
		enabled: options?.enabled !== undefined ? options.enabled : !!matchEventId,
	});
};

export const useCreateMatchEvent = () => {
	return useMutation({
		mutationFn: (data: object | FormData) => {
			return matchEventService.createMatchEvent(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["match-events"] });
		},
	});
};

export const useUpdateMatchEvent = () => {
	return useMutation({
		mutationFn: ({ matchEventId, data }: { matchEventId: string; data: object | FormData }) => {
			return matchEventService.updateMatchEvent(matchEventId, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["match-events"] });
			queryClient.invalidateQueries({ queryKey: ["match-event-by-id"] });
		},
	});
};

export const useDeleteMatchEvent = () => {
	return useMutation({
		mutationFn: (matchEventId: string) => {
			return matchEventService.deleteMatchEvent(matchEventId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["match-events"] });
		},
	});
};

export const useJoinMatchEvent = () => {
	return useMutation({
		mutationFn: ({ matchEventId, data }: { matchEventId: string; data: object | FormData }) => {
			return matchEventService.joinMatchEvent(matchEventId, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["match-events"] });
			queryClient.invalidateQueries({ queryKey: ["match-event-by-id"] });
		},
	});
};