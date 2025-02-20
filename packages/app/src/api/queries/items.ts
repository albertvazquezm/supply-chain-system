
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../endpoints/items";

export const useQueryGetItems = () => {
    return useQuery({
        queryKey: ['items'],
        queryFn: () => getItems(),
    });
};
