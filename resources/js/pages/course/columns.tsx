'use client';

import { Button } from '@/components/ui/button';
import { formatCourseDuration } from '@/helper/formatDuration';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash } from 'lucide-react';

declare module '@tanstack/react-table' {
    interface TableMeta<TData> {
        handleEditCourse: (course: TData) => void;
        handleDeleteCourse: (course: TData) => void;
    }
}

export type Course = {
    course_name: string;
    course_code: string;
    description: string;
    department_name: string;
};

export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: 'course_name',
        header: ({ column }) => {
            return (
                <Button size="default" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Course Name
                    <ArrowUpDown className="ml-0 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'course_code',
        header: 'Course Code',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'duration',
        header: 'Duration',
        cell: ({ row }) => {
            const duration = row.getValue('duration');
            return <span>{formatCourseDuration(Number(duration))}</span>;
        },
    },
    {
        accessorKey: 'course_level',
        header: 'Course Level',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row, table }) => (
            <div className="flex items-center gap-2">
                <button className="cursor-pointer rounded-md bg-gray-200 p-1.5" onClick={() => table.options.meta?.handleEditCourse(row.original)}>
                    <Edit size={14} />
                </button>
                <button className="cursor-pointer rounded-md bg-gray-200 p-1.5" onClick={() => table.options.meta?.handleDeleteCourse(row.original)}>
                    <Trash size={14} />
                </button>
            </div>
        ),
    },
];
