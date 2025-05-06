'use client';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AddSubject from '@/components/form/subjects/add-subject';
import DeleteSubject from '@/components/form/subjects/delete-subject';
import EditSubject from '@/components/form/subjects/edit-subject';
import { PlusSquare } from 'lucide-react';

interface DataTableProps<TData extends { id: number; name: string; code: string } = { id: number; name: string; code: string }, TValue = any> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData extends { id: number; name: string; code: string }, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [subject, setSubject] = React.useState<{
        id: number;
        name: string;
        code: string;
    } | null>(null);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [deleteSubject, setDeleteSubject] = React.useState<{
        id: number;
        name: string;
        code: string;
    } | null>(null);

    const handleEditSubject = (subject: { id: number; name: string; code: string }) => {
        setEditOpen(true);
        setSubject(subject);
    };

    const handleDeleteSubject = (subject: { id: number; name: string; code: string }) => {
        setDeleteOpen(true);
        setDeleteSubject(subject);
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        meta: {
            handleEditSubject,
            handleDeleteSubject,
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search subject"
                    value={table.getState().globalFilter ?? ''}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />

                <Button variant="default" size="lg" className="ml-auto" onClick={() => setOpen(true)}>
                    <PlusSquare /> Add Subject
                </Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-ml px-2.5 py-2 font-medium">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-4 py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No subjects results yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>

            <AddSubject open={open} setOpen={setOpen} />
            <EditSubject editOpen={editOpen} setEditOpen={setEditOpen} subject={subject} />
            <DeleteSubject
                setDeleteOpen={setDeleteOpen}
                deleteOpen={deleteOpen}
                setSubjectToDelete={setDeleteSubject}
                subjectToDelete={deleteSubject}
            />
        </div>
    );
}
