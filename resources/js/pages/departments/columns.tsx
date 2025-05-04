'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash } from 'lucide-react';

declare module '@tanstack/react-table' {
    interface TableMeta<TData> {
        handleEditDepartment: (department: TData) => void;
        handleDeleteDepartment: (department: TData) => void;
    }
}

export type Department = {
    department_name: string;
};

export const columns: ColumnDef<Department>[] = [
    {
        accessorKey: 'department_name',
        header: ({ column }) => {
            return (
                <Button size="default" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Department Name
                    <ArrowUpDown className="ml-0 h-4 w-4" />
                </Button>
            );
        },
    },

    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row, table }) => (
            <div className="flex items-center gap-2">
                <button
                    className="cursor-pointer rounded-md bg-gray-200 p-1.5"
                    onClick={() => table.options.meta?.handleEditDepartment(row.original)}
                >
                    <Edit size={14} />
                </button>
                <button
                    className="cursor-pointer rounded-md bg-gray-200 p-1.5"
                    onClick={() => table.options.meta?.handleDeleteDepartment(row.original)}
                >
                    <Trash size={14} />
                </button>
            </div>
        ),
    },
];
