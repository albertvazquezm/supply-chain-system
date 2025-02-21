"use client"
import { ItemForm } from "@/components/features/items/item-form";
import { RoutedDialog } from "@/components/util/routed-dialog";
import { useMutationUpdateItem, useQueryGetItem } from "@/rq/items";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditItemModal() {
    const { id } = useParams()
    const { data } = useQueryGetItem(id as string)
    const { mutate: updateItem, isSuccess } = useMutationUpdateItem();
    const router = useRouter()
    useEffect(() => {
        if (isSuccess) {
            router.back()
        }
    }, [isSuccess])
    return (
        <RoutedDialog title="Edit item">
            <ItemForm initialData={data} onSubmit={(data) => {
                updateItem({
                    id: id as string,
                    data: {
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        color: data.color
                    }
                })
            }} />
        </RoutedDialog>
    )
}