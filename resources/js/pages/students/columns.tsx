'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, EyeIcon } from 'lucide-react';

export type Payment = {
    name: string;
    email: string;
    student_id_no: string;
    class: string;
    year: string;
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
    {
        accessorKey: 'student_id_no',
        header: 'Student ID No',
    },
    {
        accessorKey: 'class',
        header: 'Class',
    },
    {
        accessorKey: 'year',
        header: 'Year',
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
            </div>
        ),
    },
];
