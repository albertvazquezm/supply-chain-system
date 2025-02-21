"use client"
import { RoutedDialog } from "@/components/util/routed-dialog";
import { useQueryGetItemEvents } from "@/rq/items";
import { useParams } from "next/navigation";

export default function ViewItemEventsModal() {
    const { id } = useParams()
    const { data } = useQueryGetItemEvents(id as string)
    return (
        <RoutedDialog title="Item events">
            <div className="space-y-4">
                {data?.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="min-w-[120px]">
                            <div className="font-medium capitalize">{event.eventType}</div>
                            <div className="text-sm text-muted-foreground">
                                {new Date(event.createdAt).toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className="mt-1 text-sm text-muted-foreground flex flex-wrap gap-2">
                                {event.attributes.map((attribute) => (
                                    <div key={attribute.key} className="px-2 py-1 bg-muted rounded-full">
                                        <span className="font-medium">{attribute.key}: </span>
                                        {attribute.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                {(!data || data.length === 0) && (
                    <div className="text-center text-muted-foreground py-8">
                        No events found
                    </div>
                )}
            </div>
        </RoutedDialog>
    )
}