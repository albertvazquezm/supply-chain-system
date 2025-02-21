"use client"

import { ItemForm } from "@/components/features/items/item-form";
import { RoutedDialog } from "@/components/util/routed-dialog";
import { useMutationCreateItem } from "@/rq/items";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewItemModal() {
    const { mutate: createItem, isSuccess } = useMutationCreateItem();
    const router = useRouter()

    useEffect(() => {
        if (isSuccess) {
            router.back()
        }
    }, [isSuccess])

    return (
        <RoutedDialog title="Create item">
            <ItemForm onSubmit={(data) => {
                createItem({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    color: data.color
                })
            }} />
        </RoutedDialog>
    )
}