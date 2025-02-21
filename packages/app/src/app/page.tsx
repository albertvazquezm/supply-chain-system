import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl mb-2">👋 Welcome to the Supply Chain App</h1>
        <p className="text-sm text-gray-600">
          This is a simple app that allows you to create and manage supply chain
          items.
        </p>
        <Link href="/items" className="mt-4">
          <Button>Check your items!</Button>
        </Link>
      </div>
    </div>
  );
}
