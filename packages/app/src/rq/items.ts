
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createItem, createItemEvent, getItem, getItemEvents, getItems, updateItem } from "../api/items";
import { getItemEventsQueryKey, getItemQueryKey, getItemsQueryKey } from "./query-keys";

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

/**
 * Mutations
 */

export const useMutationCreateItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (item: any) => createItem(item),
        onSuccess: (item) => {
            queryClient.setQueryData(getItemsQueryKey(), (old: any) => [...old, item])
        }
    });
};

export const useMutationUpdateItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => updateItem(id, data),
        onSuccess: (updatedItem) => {
            queryClient.setQueryData(getItemQueryKey(updatedItem.id), updatedItem)
            queryClient.setQueryData(getItemsQueryKey(), (old: any) => [...old.map((item: any) => item.id !== updatedItem.id ? item : updatedItem)])
        }
    });
};

export const useMutationCreateItemEvent = () => {
    return useMutation({
        mutationFn: ({ id, itemEvent }: { id: string, itemEvent: any }) => createItemEvent(id, itemEvent),
    });
};