'use client'

import { QueryClientProvider } from "@tanstack/react-query"
import { client } from "@/rq/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}