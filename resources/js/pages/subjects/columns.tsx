'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';

declare module '@tanstack/react-table' {
    interface TableMeta<TData> {
        handleEditSubject: (subject: TData) => void;
        handleDeleteSubject: (subject: TData) => void;
    }
}

export type Subject = {
    name: string;
    code: string;
};

export const columns: ColumnDef<Subject>[] = [
    {
        accessorKey: 'name',
        header: 'Subject Name',
    },
    {
        accessorKey: 'code',
        header: 'Subject Code',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row, table }) => (
            <div className="flex items-center gap-2">
                <button className="cursor-pointer rounded-md bg-gray-200 p-1.5" onClick={() => table.options.meta?.handleEditSubject(row.original)}>
                    <Edit size={14} />
                </button>
                <button className="cursor-pointer rounded-md bg-gray-200 p-1.5" onClick={() => table.options.meta?.handleDeleteSubject(row.original)}>
                    <Trash size={14} />
                </button>
            </div>
        ),
    },
];
