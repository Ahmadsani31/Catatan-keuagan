import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type Organization = {
    id: number;
    name: string;
};

export type Payment = {
    id: string
    name: string
    type: string
    organization_id: number
    organization: Organization[]
}

export const columns: ColumnDef<Payment>[] = [
    {
        header: "No",
        enableHiding: false,
        cell: ({ row, table }) => {
            const pageIndex = table.getState().pagination.pageIndex
            const pageSize = table.getState().pagination.pageSize
            const filteredRows = table.getFilteredRowModel().rows

            const currentRowIndex = filteredRows.findIndex(r => r.id === row.id)

            return pageIndex * pageSize + currentRowIndex + 1
        },
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown size={8} />
                </Button>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: 'Action',
        cell: ({ row }) => {
            const categories = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert(categories.id)}><SquarePen />Edit</DropdownMenuItem>
                        <DropdownMenuItem><Trash2 />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
