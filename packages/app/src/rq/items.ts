
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createItem, getItems } from "../api/items";
import { getItemsQueryKey } from "./query-keys";

export const useQueryGetItems = () => {
    return useQuery({
        queryKey: getItemsQueryKey(),
        queryFn: () => getItems(),
    });
};

export const useMutationCreateItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (item: any) => createItem(item),
        onSuccess: (item) => {
            queryClient.setQueryData(getItemsQueryKey(), (old: any) => [...old, item])
        }
    });
};
