'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Cog, Edit, EyeIcon, Trash } from 'lucide-react';

export type Payment = {
    name: string;
    email: string;
    department: string;
    status: string;
};

export const columns: ColumnDef<Payment>[] = [
    
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button size="default" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-0 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    // {
    //     accessorKey: 'department',
    //     header: 'Department',
    // },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            const color = status === 'active' ? 'text-green-500' : 'text-red-500';
            return <span className={`font-medium ${color}`}>{status}</span>;
        },
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: () => (
            <div className="flex items-center gap-2">
                <button className="cursor-pointer rounded-md bg-gray-200 p-1.5">
                    <EyeIcon size={14} />
                </button>
                <button className="cursor-pointer rounded-md bg-gray-200 p-1.5">
                    <Edit size={14} />
                </button>
                <button className="cursor-pointer rounded-md bg-gray-200 p-1.5">
                    <Cog size={14} />
                </button>
                <button className="cursor-pointer rounded-md bg-gray-200 p-1.5">
                    <Trash size={14} />
                </button>
            </div>
        ),
    },
];
