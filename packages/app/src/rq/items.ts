
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createItem, createItemEvent, getItem, getItemCurrentLocation, getItemEvents, getItems, updateItem } from "../api/items";
import { getItemEventsQueryKey, getItemQueryKey, getItemsQueryKey, getItemCurrentLocationQueryKey } from "./query-keys";

/**
 * Queries
 */

export const useQueryGetItems = () => {
    return useQuery({
        queryKey: getItemsQueryKey(),
        queryFn: () => getItems(),
    });
};

export const useQueryGetItem = (id: string) => {
    return useQuery({
        queryKey: getItemQueryKey(id),
        queryFn: () => getItem(id),
    });
};

export const useQueryGetItemEvents = (id: string) => {
    return useQuery({
        queryKey: getItemEventsQueryKey(id),
        queryFn: () => getItemEvents(id),
    });
};

export const useQueryGetItemCurrentLocation = (id: string) => {
    return useQuery({
        queryKey: getItemCurrentLocationQueryKey(id),
        queryFn: () => getItemCurrentLocation(id),
    });
};

/**
 * Mutations
 */

export const useMutationCreateItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: (item: any) => createItem(item),
        onSuccess: (item) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            queryClient.setQueryData(getItemsQueryKey(), (old: any) => [...old, item])
        }
    });
};

export const useMutationUpdateItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: ({ id, data }: { id: string, data: any }) => updateItem(id, data),
        onSuccess: (updatedItem) => {
            queryClient.setQueryData(getItemQueryKey(updatedItem.id), updatedItem)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            queryClient.setQueryData(getItemsQueryKey(), (old: any) => [...old.map((item: any) => item.id !== updatedItem.id ? item : updatedItem)])
        }
    });
};

export const useMutationCreateItemEvent = () => {
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: ({ id, itemEvent }: { id: string, itemEvent: any }) => createItemEvent(id, itemEvent),
    });
};