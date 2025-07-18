import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    ColumnDef,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

import getPaginationRange from '@/lib/pagination';
import { ArrowUpDown, CircleXIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    sortableColumns?: string[];
    defaultSort?: SortingState;
    searchableColumns?: string[];
    defaultSearch?: string;
    pageLengthOptions?: (number | 'all')[];
    defaultPageLength?: number | 'all';
    showIndex?: boolean;
    dynamicIndex?: boolean;
}

export function DataTable<TData>({
    columns,
    data,
    sortableColumns = [],
    defaultSort = [],
    searchableColumns = [],
    defaultSearch = '',
    pageLengthOptions = [5, 10, 25, 50, 100, 'all'],
    defaultPageLength = 5,
    showIndex = true,
    dynamicIndex = true,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>(defaultSort);
    const [globalFilter, setGlobalFilter] = useState(defaultSearch);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: defaultPageLength === 'all' ? data.length : defaultPageLength,
    });

    const [displayedRowIndices, setDisplayedRowIndices] = useState<Record<string, number>>({});

    const tableColumns = useMemo(() => {
        const indexColumn: ColumnDef<TData> = {
            id: 'index',
            header: () => <span className="flex justify-center">No</span>,
            cell: ({ row }) => {
                if (dynamicIndex) {
                    return (
                        <div className="flex justify-center">
                            <span>{displayedRowIndices[row.id] || row.index + 1}</span>
                        </div>
                    );
                } else {
                    const currentPage = pagination.pageIndex;
                    const pageSize = pagination.pageSize;
                    return currentPage * pageSize + row.index + 1;
                }
            },
        };

        return showIndex ? [indexColumn, ...columns] : columns;
    }, [columns, showIndex, pagination, dynamicIndex, displayedRowIndices]);

    const globalSearchFilter: FilterFn<TData> = (row, _, filterValue) => {
        return searchableColumns.some((key) => {
            const value = row.getValue(key);
            return String(value ?? '')
                .toLowerCase()
                .includes(String(filterValue).toLowerCase());
        });
    };

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: globalSearchFilter, // pass the filter function directly
        filterFns: {
            globalSearch: globalSearchFilter, // register the filter function
        } as any,
        state: {
            sorting,
            globalFilter,
            pagination,
        },
    });

    useEffect(() => {
        if (dynamicIndex) {
            const newIndices: Record<string, number> = {};
            table.getRowModel().rows.forEach((row: Row<TData>, index: number) => {
                newIndices[row.id] = index + 1;
            });
            setDisplayedRowIndices(newIndices);
        }
    }, [table.getRowModel().rows, dynamicIndex]);

    const handlePageSizeChange = (size: number | 'all') => {
        console.log(size);

        if (size === 'all') {
            table.setPageSize(data.length);
        } else {
            table.setPageSize(size);
        }
    };

    const handleClearFilters = () => {
        setGlobalFilter('');
        setSorting([]);
        table.setPageSize(5);
    };

    const currentPageSize = table.getState().pagination.pageSize;
    const isAllSelected = currentPageSize === data.length;

    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;

    const totalEntries = table.getFilteredRowModel().rows.length;

    const from = pageIndex * pageSize + 1;
    const to = Math.min(from + pageSize - 1, totalEntries);

    const pageCount = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;

    return (
        <div className="space-y-4">
            <div className="mt-4 flex items-center justify-between">
                <div className="flex w-80 items-center space-x-2">
                    <Input placeholder={`Search...`} value={globalFilter ?? ''} onChange={(event) => setGlobalFilter(event.target.value)} />
                    {globalFilter && (
                        <Button variant="destructive" size={'lg'} onClick={handleClearFilters}>
                            Clear
                            <CircleXIcon />
                        </Button>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <label htmlFor="pageLength" className="text-muted-foreground text-sm">
                        Show
                    </label>
                    <Select onValueChange={(option) => handlePageSizeChange(option === 'all' ? 'all' : Number(option))}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder={isAllSelected ? 'All' : currentPageSize} />
                        </SelectTrigger>
                        <SelectContent>
                            {pageLengthOptions.map((option) => (
                                <SelectItem key={option} value={option.toString()}>
                                    {option === 'all' ? 'All' : option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="text-muted-foreground text-sm">entries</span>
                </div>
            </div>

            <div className="rounded border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isSortable = sortableColumns.includes(header.id);
                                    const isIndexColumn = header.id === 'index';
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={
                                                        isSortable && !isIndexColumn ? 'hover:text-primary flex cursor-pointer items-center' : ''
                                                    }
                                                    onClick={isSortable && !isIndexColumn ? header.column.getToggleSortingHandler() : undefined}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {isSortable && !isIndexColumn && <ArrowUpDown className="ml-2 h-4 w-4" />}
                                                </div>
                                            )}
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
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + (showIndex ? 1 : 0)} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mb-4 flex w-full flex-col items-center justify-between gap-3 lg:flex-row">
                <div className="text-muted-foreground flex-1 text-sm">
                    <p className="text-muted-foreground text-sm">
                        Showing {from} to {to} of {totalEntries} entries
                    </p>
                </div>
                {!isAllSelected && (
                    <div className="space-x-2">
                        <Pagination>
                            <PaginationContent>
                                {/* Previous */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            table.previousPage();
                                        }}
                                        className={table.getCanPreviousPage() ? '' : 'pointer-events-none opacity-50'}
                                    />
                                </PaginationItem>

                                {getPaginationRange(currentPage, pageCount).map((page, i) => (
                                    <PaginationItem key={i}>
                                        {page === '...' ? (
                                            <PaginationEllipsis />
                                        ) : (
                                            <PaginationLink
                                                href="#"
                                                isActive={page === currentPage}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    table.setPageIndex(page - 1);
                                                }}
                                            >
                                                {page}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ))}

                                {/* Next */}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            table.nextPage();
                                        }}
                                        className={table.getCanNextPage() ? '' : 'pointer-events-none opacity-50'}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}
