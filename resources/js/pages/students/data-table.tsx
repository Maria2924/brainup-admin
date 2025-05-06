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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getYearLabel } from '@/helper/getYearLabel';
import { PlusSquare } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

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
    });

    const classesOptions = React.useMemo(() => {
        return [...new Set(data.map((row) => row.class))];
    }, [data]);

    const yearLevelOptions = React.useMemo(() => {
        return [...new Set(data.map((row) => row.year))];
    }, [data]);

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search students"
                    value={table.getState().globalFilter ?? ''}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />

                <Select
                    onValueChange={(value) => table.getColumn('class')?.setFilterValue(value === '__all__' ? undefined : value)}
                    value={(table.getColumn('class')?.getFilterValue() as string) || '__all__'}
                >
                    <SelectTrigger className="ml-2 w-[150px]">
                        <SelectValue placeholder="Filter class..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__all__">All Class</SelectItem>
                        {classesOptions.map((classes) => (
                            <SelectItem key={classes} value={classes}>
                                {classes}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value) => table.getColumn('year')?.setFilterValue(value === '__all__' ? undefined : value)}
                    value={(table.getColumn('year')?.getFilterValue() as string) || '__all__'}
                >
                    <SelectTrigger className="ml-2 w-[150px]">
                        <SelectValue placeholder="Filter year level..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__all__">All Year Level</SelectItem>
                        {yearLevelOptions.map((year) => (
                            <SelectItem key={year} value={year}>
                                {getYearLabel(year)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button variant="default" size="lg" className="ml-auto">
                    <PlusSquare /> Add Student
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
                                    No students results yet.
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
        </div>
    );
}
