'use client';

import { ColumnDef } from '@tanstack/react-table';

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
        header: 'Name',
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
        cell: () => <button className="btn btn-primary">View</button>,
    },
];
