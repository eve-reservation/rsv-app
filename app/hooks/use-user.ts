import { useMutation, useQuery } from "@tanstack/react-query";
import userService from "~/services/user-service";
import type { ApiQueryParams } from "~/services/api-service";
import { queryClient } from "~/lib/query-client";

export const useGetUsers = (apiParams?: ApiQueryParams) => {
	return useQuery({
		queryKey: ["users", apiParams],
		queryFn: () => {
			return userService
				.select(apiParams?.fields || "")
				.search(apiParams?.query || "")
				.paginate(apiParams?.page || 1, apiParams?.limit || 10)
				.sort(apiParams?.sort, apiParams?.order)
				.filter(apiParams?.filter || "")
				.getAllUsers();
		},
	});
};

export const useGetUserById = (
	userId: string,
	apiParams?: ApiQueryParams,
	options?: { enabled?: boolean },
) => {
	return useQuery({
		queryKey: ["user-by-id", userId, apiParams],
		queryFn: () => {
			return userService.select(apiParams?.fields || "").getUserById(userId);
		},
		enabled: options?.enabled !== undefined ? options.enabled : !!userId,
	});
};

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: ["current-user"],
		queryFn: () => {
			return userService.getCurrentUser();
		},
	});
};

export const useCreateUser = () => {
	return useMutation({
		mutationFn: (data: object | FormData) => {
			return userService.createUser(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: ({ userId, data }: { userId: string; data: object | FormData }) => {
			return userService.updateUser(userId, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["user-by-id"] });
			queryClient.invalidateQueries({ queryKey: ["current-user"] });
		},
	});
};

export const useDeleteUser = () => {
	return useMutation({
		mutationFn: (userId: string) => {
			return userService.deleteUser(userId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
