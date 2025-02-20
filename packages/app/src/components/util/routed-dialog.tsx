"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"

export function RoutedDialog({ children, title }: { children: React.ReactNode, title: string }) {
    const router = useRouter()

    return (
        <Dialog open onOpenChange={() => router.back()}>
            <DialogContent className="max-w-screen-sm">
                <DialogTitle>{title}</DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    )
}