import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import getPaginationRange from '@/lib/pagination';
import {
    ColumnDef,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, CircleXIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
    columns: ColumnDef<TData, any>[];
    data: TData[];
    sortableColumns?: string[];
    defaultSort?: SortingState;
    searchableColumns?: string[];
    defaultSearch?: string;
    pageLengthOptions?: (number | 'all')[];
    defaultPageLength?: number | 'all';
    showIndex?: boolean;
    dynamicIndex?: boolean; // true => 1..n per halaman; false => pakai offset halaman
    headerTable?: boolean;
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
    headerTable = true,
}: DataTableProps<TData>) {
    // sorting, filter, pagination states
    const [sorting, setSorting] = useState<SortingState>(defaultSort);

    // input yang user ketik (didebounce)
    const [searchInput, setSearchInput] = useState(defaultSearch);

    // nilai globalFilter yang benar2 dipakai table (hasil debounce)
    const [globalFilter, setGlobalFilter] = useState(defaultSearch);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: defaultPageLength === 'all' ? data.length : Number(defaultPageLength || 5),
    });

    // Debounce 500ms: update globalFilter + reset ke halaman pertama
    useEffect(() => {
        const id = setTimeout(() => {
            setGlobalFilter(searchInput);
            // reset ke page 1 setiap kali filter berubah
            setPagination((p) => ({ ...p, pageIndex: 0 }));
        }, 500);
        return () => clearTimeout(id);
    }, [searchInput]);

    // Jika defaultPageLength = 'all' dan data berubah, pastikan ukuran halaman ikut.
    useEffect(() => {
        if (defaultPageLength === 'all') {
            setPagination((p) => ({ ...p, pageSize: data.length, pageIndex: 0 }));
        }
    }, [data.length, defaultPageLength]);

    // Kolom index (opsional)
    const tableColumns = useMemo(() => {
        if (!showIndex) return columns;

        const indexColumn: ColumnDef<TData, any> = {
            id: 'index',
            header: () => <span className="flex justify-center">No</span>,
            cell: ({ row, table }) => {
                const { pageIndex, pageSize } = table.getState().pagination;
                const number = dynamicIndex ? row.index + 1 : pageIndex * pageSize + row.index + 1;
                return (
                    <div className="flex justify-center">
                        <span>{number}</span>
                    </div>
                );
            },
            enableSorting: false,
        };

        return [indexColumn, ...columns];
    }, [columns, showIndex, dynamicIndex]);

    // Global search filter (hanya cek kolom yg diizinkan)
    const globalSearchFilter: FilterFn<TData> = useCallback(
        (row, _columnId, filterValue) => {
            if (!filterValue) return true;
            if (!searchableColumns?.length) return true;
            const needle = String(filterValue).toLowerCase();
            return searchableColumns.some((key) => {
                const val = row.getValue<any>(key);
                return String(val ?? '')
                    .toLowerCase()
                    .includes(needle);
            });
        },
        [searchableColumns],
    );

    const table = useReactTable({
        data,
        columns: tableColumns,
        state: {
            sorting,
            globalFilter,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // pakai filter function kustom untuk global filter
        globalFilterFn: globalSearchFilter,
        // Jangan auto reset halaman ketika aksi lain (biar kita yang kontrol)
        autoResetPageIndex: false,
    });

    const handlePageSizeChange = (size: number | 'all') => {
        if (size === 'all') {
            table.setPageSize(data.length);
        } else {
            table.setPageSize(size);
        }
        table.setPageIndex(0);
    };

    const handleClearFilters = () => {
        setSearchInput('');
        setSorting([]);
        handlePageSizeChange(typeof defaultPageLength === 'number' ? defaultPageLength : 5);
    };

    const { pageIndex, pageSize } = table.getState().pagination;
    const totalEntries = table.getFilteredRowModel().rows.length;

    const from = totalEntries === 0 ? 0 : pageIndex * pageSize + 1;
    const to = totalEntries === 0 ? 0 : Math.min(from + pageSize - 1, totalEntries);

    const pageCount = table.getPageCount();
    const currentPage = pageIndex + 1;

    const currentPageSize = pageSize;
    const isAllSelected = currentPageSize === data.length;

    return (
        <div className="space-y-4">
            {/* Top bar: search + page size */}
            {headerTable ? (
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex w-80 items-center space-x-2">
                        <Input placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        {searchInput && (
                            <Button variant="destructive" size="lg" onClick={handleClearFilters}>
                                Clear
                                <CircleXIcon className="ml-1 h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <label htmlFor="pageLength" className="text-muted-foreground text-sm">
                            Show
                        </label>
                        <Select
                            value={isAllSelected ? 'all' : String(currentPageSize)}
                            onValueChange={(option) => handlePageSizeChange(option === 'all' ? 'all' : Number(option))}
                        >
                            <SelectTrigger className="w-[90px]">
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
            ) : null}

            {/* Table */}
            <div className="rounded border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isIndexColumn = header.column.id === 'index';
                                    const isSortable = sortableColumns.includes(header.column.id as string);
                                    const canSort = isSortable && !isIndexColumn;

                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={canSort ? 'hover:text-primary flex cursor-pointer items-center' : ''}
                                                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                                    role={canSort ? 'button' : undefined}
                                                    aria-sort={
                                                        canSort
                                                            ? header.column.getIsSorted() === 'asc'
                                                                ? 'ascending'
                                                                : header.column.getIsSorted() === 'desc'
                                                                  ? 'descending'
                                                                  : 'none'
                                                            : undefined
                                                    }
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {canSort && <ArrowUpDown className="ml-2 h-4 w-4" />}
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
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

            {/* Footer: showing range + pagination */}
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
