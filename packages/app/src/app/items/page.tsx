"use client"

import { useQueryGetItems } from "@/rq/items";
import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import Link from "next/link";

export default function Items() {
    const { data, isLoading, error } = useQueryGetItems();
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Items</h1>
                <Link href="/items/new">
                    <Button>Add New Item</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell className="text-right">{item.price}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/items/edit/${item.id}`}>
                                        <Button variant="outline">Edit</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}