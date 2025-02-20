"use client"

import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";

export default function Items() {
    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Items</h1>
                <Button>Add New Item</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">01</TableCell>
                        <TableCell>Product 01</TableCell>
                        <TableCell>Description 01</TableCell>
                        <TableCell className="text-right">$100.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}