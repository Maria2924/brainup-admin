'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Subject = {
    name: string;
    code: string;
};

export const columns: ColumnDef<Subject>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: () => <div className="flex gap-2">Actions</div>,
    },
];
