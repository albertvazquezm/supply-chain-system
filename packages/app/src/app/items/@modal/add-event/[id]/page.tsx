"use client"

import { ItemEventForm } from "@/components/features/items/item-event-form";
import { RoutedDialog } from "@/components/util/routed-dialog";
import { useMutationCreateItemEvent } from "@/rq/items";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddEventModal() {
    const { mutate: createItemEvent, isPending, isSuccess } = useMutationCreateItemEvent();
    const router = useRouter()
    const { id } = useParams()

    useEffect(() => {
        if (isSuccess) {
            router.back()
        }
    }, [isSuccess])

    return (
        <RoutedDialog title="Add event">
            <ItemEventForm onSubmit={(data) => {
                createItemEvent({
                    id: id as string,
                    itemEvent: data
                })
            }} />
        </RoutedDialog>
    )
}