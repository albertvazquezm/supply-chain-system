"use client"
import { RoutedDialog } from "@/components/util/routed-dialog";
import { useQueryGetItemCurrentLocation } from "@/rq/items";
import { useParams } from "next/navigation";

export default function ViewItemEventsModal() {
    const { id } = useParams()
    const { data } = useQueryGetItemCurrentLocation(id as string)
    return (
        <RoutedDialog title="Current location">
            <div className="space-y-4">
                {data && (
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-2">{data.location}</div>
                        <div className="text-muted-foreground">
                            {new Date(data.date).toLocaleDateString()}
                        </div>
                    </div>
                )}
                {(!data || data.length === 0) && (
                    <div className="text-center text-muted-foreground py-8">
                        No current location found
                    </div>
                )}
            </div>
        </RoutedDialog>
    )
}