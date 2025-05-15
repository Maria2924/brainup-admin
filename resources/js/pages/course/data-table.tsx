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

import AddCourse from '@/components/form/course/add-course';
import DeleteCourse from '@/components/form/course/delete-course';
import EditCourse from '@/components/form/course/edit-course';
import { PlusSquare } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [selectedCourse, setSelectedCourse] = React.useState<TData | null>(null);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [courseToDelete, setCourseToDelete] = React.useState<{ id: number; course_name: string } | null>(null);

    function handleEditCourse(course: TData) {
        setSelectedCourse(course);
        setEditOpen(true);
    }

    function handleDeleteCourse(course: TData) {
        setCourseToDelete(course as { id: number; course_name: string });
        setDeleteOpen(true);
    }

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
            handleEditCourse,
            handleDeleteCourse,
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search course"
                    value={table.getState().globalFilter ?? ''}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />

                <Button variant="default" size="lg" className="ml-auto" onClick={() => setOpen(true)}>
                    <PlusSquare /> Add Course
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
                                    No course results yet.
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

            <AddCourse open={open} setOpen={setOpen} />
            <EditCourse editOpen={editOpen} setEditOpen={setEditOpen} course={selectedCourse} />
            <DeleteCourse
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                courseToDelete={courseToDelete}
                setCourseToDelete={setCourseToDelete}
            />
        </div>
    );
}
