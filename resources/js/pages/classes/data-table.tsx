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

// Extend TableMeta to include handleEditSection
declare module '@tanstack/react-table' {
    interface TableMeta<TData> {
        handleEditClassSection: (section: TData) => void;
        handleDeleteClassSection: (section: TData) => void;
    }
}

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AddClassSection from '@/components/form/classes/add-class-section';
import DeleteClassSection from '@/components/form/classes/delete-class-section';
import EditClassSection from '@/components/form/classes/edit-class-section';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusSquare } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    courses: any[];
}

export function DataTable<TData, TValue>({ columns, data, courses }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [selectedSection, setSelectedSection] = React.useState<TData | null>(null);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [classSectionToDelete, setClassSectionToDelete] = React.useState<{ id: number; section_name: string } | null>(null);

    function handleEditClassSection(section: TData) {
        setSelectedSection(section);
        setEditOpen(true);
    }
    function handleDeleteClassSection(section: TData) {
        // Implement delete functionality here
        setClassSectionToDelete(section as { id: number; section_name: string });
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
            handleEditClassSection,
            handleDeleteClassSection,
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search class"
                    value={table.getState().globalFilter ?? ''}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />

                <Select
                    onValueChange={(value) => {
                        table.getColumn('course_name')?.setFilterValue(value === '__all__' ? undefined : value);
                    }}
                >
                    <SelectTrigger className="ml-2 w-80">
                        <SelectValue placeholder="Filter by course..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__all__">All Courses</SelectItem>
                        {courses?.map((course) => (
                            <SelectItem key={course.id} value={course.course_name}>
                                {course.course_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button variant="default" size="lg" className="ml-auto" onClick={() => setOpen(true)}>
                    <PlusSquare /> Add Class Section
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
                                    No class results yet.
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

            <AddClassSection open={open} setOpen={setOpen} courses={courses} />
            <EditClassSection editOpen={editOpen} setEditOpen={setEditOpen} courses={courses} section={selectedSection} />
            <DeleteClassSection
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                classSectionToDelete={classSectionToDelete}
                setClassSectionToDelete={setClassSectionToDelete}
            />
        </div>
    );
}
