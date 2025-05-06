'use client';

import { Button } from '@/components/ui/button';
import { getYearLabel } from '@/helper/getYearLabel';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash } from 'lucide-react';

declare module '@tanstack/react-table' {
    interface TableMeta<TData> {
        handleEditClassSection: (classes: TData) => void;
        handleDeleteClassSection: (classes: TData) => void;
    }
}

export type Class = {
    section_name: string;
    course_name: string;
    year: string | number;
};

export const columns: ColumnDef<Class>[] = [
    {
        accessorKey: 'section_name',
        header: ({ column }) => {
            return (
                <Button size="default" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Section Name
                    <ArrowUpDown className="ml-0 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'course_name',
        header: 'Course Name',
    },

    {
        accessorKey: 'year',
        header: 'Year',
        cell: ({ row }) => {
            const year = row.getValue('year');
            return <div className="flex items-center gap-2">{getYearLabel(year as string | number)}</div>;
        },
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row, table }) => (
            <div className="flex items-center gap-2">
                <button
                    className="cursor-pointer rounded-md bg-gray-200 p-1.5"
                    onClick={() => table.options.meta?.handleEditClassSection(row.original)}
                >
                    <Edit size={14} />
                </button>
                <button
                    className="cursor-pointer rounded-md bg-gray-200 p-1.5"
                    onClick={() => table.options.meta?.handleDeleteClassSection(row.original)}
                >
                    <Trash size={14} />
                </button>
            </div>
        ),
    },
];
