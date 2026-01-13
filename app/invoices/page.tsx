"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useInvoiceStore } from "../lib/stores";
import { InvoiceDto } from "../types";
import { PageLoader, ErrorDisplay, Button, SearchInput, Avatar, StatusBadge, Pagination } from "../components/ui";

export default function InvoicesPage() {
    const { invoices, isLoading, error, fetchInvoices, pagination, filters, setFilters, fetchDashboardStats, sort, setSort } = useInvoiceStore();

    useEffect(() => {
        // Initial fetch
        fetchInvoices(pagination.pageNumber);
        fetchDashboardStats();
    }, []);

    const handleSearch = (term: string) => {
        setFilters({ search: term });
        fetchInvoices(1, term, filters.status);
    };

    const handleStatusChange = (status: string) => {
        setFilters({ status });
        fetchInvoices(1, filters.search, status);
    };

    const handlePageChange = (page: number) => {
        fetchInvoices(page, filters.search, filters.status);
    };

    const handleSort = (column: string) => {
        const isDescending = sort.orderBy === column ? !sort.isDescending : false;
        setSort(column, isDescending);
        fetchInvoices(pagination.pageNumber, filters.search, filters.status, column, isDescending);
    };

    if (error) {
        return <ErrorDisplay title="Error loading invoices" message={error} onRetry={() => fetchInvoices()} />;
    }

    const { totalCount } = pagination;

    return (
        <div className="flex-1 overflow-y-auto h-full">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 min-h-full">
                <PageHeader />
                <TabsSection
                    invoiceCount={totalCount}
                    currentStatus={filters.status}
                    onStatusChange={handleStatusChange}
                    onSearch={handleSearch}
                    searchTerm={filters.search}
                />

                {isLoading && invoices.length === 0 ? (
                    <div className="flex justify-center py-20"><PageLoader /></div>
                ) : (
                    <>
                        <InvoiceTable invoices={invoices} sort={sort} onSort={handleSort} />
                        <div className="mt-auto">
                            <Pagination
                                currentPage={pagination.pageNumber}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                                totalCount={pagination.totalCount}
                            />
                        </div>
                    </>
                )}
                <PageFooter />
            </div>
        </div>
    );
}

function PageHeader() {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
                <Breadcrumb />
                <h2 className="text-3xl font-bold tracking-tight text-white">Invoices</h2>
            </div>
            <Link href="/invoices/new">
                <Button icon="add">New Invoice</Button>
            </Link>
        </div>
    );
}

function Breadcrumb() {
    return (
        <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-white font-medium">Invoices</span>
        </nav>
    );
}

interface TabsSectionProps {
    invoiceCount: number;
    currentStatus: string;
    onStatusChange: (status: string) => void;
    onSearch: (term: string) => void;
    searchTerm: string;
}

function TabsSection({ invoiceCount, currentStatus, onStatusChange, onSearch, searchTerm }: TabsSectionProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-0">
            <TabList
                invoiceCount={invoiceCount}
                currentStatus={currentStatus}
                onStatusChange={onStatusChange}
            />
            <SearchAndFilter onSearch={onSearch} searchTerm={searchTerm} />
        </div>
    );
}

function TabList({ invoiceCount, currentStatus, onStatusChange }: { invoiceCount: number, currentStatus: string, onStatusChange: (s: string) => void }) {
    return (
        <div className="flex gap-6 -mb-px overflow-x-auto w-full sm:w-auto">
            <TabButton
                label="All Invoices"
                count={currentStatus === 'All' ? invoiceCount : undefined}
                active={currentStatus === 'All'}
                onClick={() => onStatusChange('All')}
            />
            <TabButton
                label="Paid"
                active={currentStatus === 'Paid'}
                onClick={() => onStatusChange('Paid')}
            />
            <TabButton
                label="Pending"
                active={currentStatus === 'Pending'}
                onClick={() => onStatusChange('Pending')}
            />
            <TabButton
                label="Overdue"
                active={currentStatus === 'Overdue'}
                onClick={() => onStatusChange('Overdue')}
            />
        </div>
    );
}

interface TabButtonProps {
    label: string;
    count?: number;
    active?: boolean;
    onClick: () => void;
}

function TabButton({ label, count, active, onClick }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
            flex items-center gap-2 border-b-2 pb-3 pt-1 text-sm whitespace-nowrap transition-colors
            ${active
                    ? 'border-amber-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600 font-medium'}
        `}>
            <span>{label}</span>
            {count !== undefined && (
                <span className={`py-0.5 px-2 rounded-full text-xs font-bold ${active ? 'bg-amber-900/30 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                    {count}
                </span>
            )}
        </button>
    );
}

function SearchAndFilter({ onSearch, searchTerm }: { onSearch: (term: string) => void, searchTerm: string }) {
    return (
        <div className="flex items-center gap-3 w-full sm:w-auto pb-3 sm:pb-2">
            <div className="w-full sm:w-64">
                <SearchInput
                    placeholder="Search invoices..."
                    onChange={(e) => onSearch(e.target.value)}
                    defaultValue={searchTerm}
                />
            </div>
        </div>
    );
}

function InvoiceTable({ invoices, sort, onSort }: {
    invoices: InvoiceDto[],
    sort: { orderBy: string | null, isDescending: boolean },
    onSort: (col: string) => void
}) {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const allSelected = invoices.length > 0 && selectedIds.size === invoices.length;
    const someSelected = selectedIds.size > 0 && selectedIds.size < invoices.length;

    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(invoices.map(inv => inv.id)));
        }
    };

    const handleSelectOne = (id: number) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    if (invoices.length === 0) {
        return <div className="text-center text-slate-500 py-12">No invoices found.</div>;
    }

    return (
        <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <TableHeader
                        sort={sort}
                        onSort={onSort}
                        allSelected={allSelected}
                        someSelected={someSelected}
                        onSelectAll={handleSelectAll}
                    />
                    <tbody className="divide-y divide-slate-700">
                        {invoices.map((invoice) => (
                            <InvoiceRow
                                key={invoice.id}
                                invoice={invoice}
                                selected={selectedIds.has(invoice.id)}
                                onSelect={() => handleSelectOne(invoice.id)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <TableFooter count={invoices.length} selectedCount={selectedIds.size} />
        </div>
    );
}

interface TableHeaderProps {
    sort: { orderBy: string | null, isDescending: boolean };
    onSort: (col: string) => void;
    allSelected: boolean;
    someSelected: boolean;
    onSelectAll: () => void;
}

function TableHeader({ sort, onSort, allSelected, someSelected, onSelectAll }: TableHeaderProps) {
    const columns = [
        { key: 'InvoiceNumber', label: 'Invoice ID' },
        { key: 'Client.Name', label: 'Client' }, // Using nested property for Dynamic Linq
        { key: 'DateIssued', label: 'Date Issued' },
        { key: 'Amount', label: 'Amount', align: 'right' },
        { key: 'Status', label: 'Status' },
        { key: '', label: 'Actions', disableSort: true, align: 'right' }
    ];

    return (
        <thead>
            <tr className="border-b border-slate-700 bg-slate-800">
                <th className="p-4 w-12">
                    <input
                        className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-amber-500 cursor-pointer"
                        type="checkbox"
                        checked={allSelected}
                        ref={(el) => { if (el) el.indeterminate = someSelected; }}
                        onChange={onSelectAll}
                    />
                </th>
                {columns.map((col) => (
                    <th
                        key={col.label}
                        className={`p-4 text-xs font-semibold uppercase tracking-wider text-slate-400 ${col.align === 'right' ? 'text-right' : ''} ${!col.disableSort ? 'cursor-pointer hover:text-white select-none' : ''}`}
                        onClick={() => !col.disableSort && onSort(col.key)}
                    >
                        <div className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : ''}`}>
                            {col.label}
                            {!col.disableSort && sort.orderBy === col.key && (
                                <span className="material-symbols-outlined text-[16px]">
                                    {sort.isDescending ? 'arrow_downward' : 'arrow_upward'}
                                </span>
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

interface InvoiceRowProps {
    invoice: InvoiceDto;
    selected: boolean;
    onSelect: () => void;
}

function InvoiceRow({ invoice, selected, onSelect }: InvoiceRowProps) {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <tr className={`group hover:bg-slate-700/50 transition-colors ${selected ? 'bg-amber-500/10' : ''}`}>
            <td className="p-4">
                <input
                    className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-amber-500 cursor-pointer"
                    type="checkbox"
                    checked={selected}
                    onChange={onSelect}
                />
            </td>
            <td className="p-4">
                <a className="text-sm font-semibold text-white hover:text-amber-500 transition-colors" href="#">
                    {invoice.invoiceNumber}
                </a>
            </td>
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <Avatar src={invoice.clientAvatarUrl} alt={invoice.clientName} size="sm" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{invoice.clientName}</span>
                        <span className="text-xs text-slate-500">{invoice.clientEmail}</span>
                    </div>
                </div>
            </td>
            <td className="p-4 text-sm text-slate-300 whitespace-nowrap">{formatDate(invoice.dateIssued)}</td>
            <td className="p-4 text-sm font-medium text-white text-right whitespace-nowrap">{formatCurrency(invoice.amount)}</td>
            <td className="p-4"><StatusBadge status={invoice.status} /></td>
            <td className="p-4 text-right">
                <button className="text-slate-400 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
            </td>
        </tr>
    );
}

function TableFooter({ count, selectedCount }: { count: number; selectedCount: number }) {
    return (
        <div className="flex items-center justify-between border-t border-slate-700 bg-slate-800 px-4 py-3">
            <p className="text-sm text-slate-300">
                {selectedCount > 0 ? (
                    <><span className="font-medium text-amber-400">{selectedCount}</span> selected</>
                ) : (
                    <>Showing <span className="font-medium text-white">{count}</span> results on this page</>
                )}
            </p>
        </div>
    );
}

function PageFooter() {
    return (
        <footer className="mt-auto pt-6 pb-2 text-center text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} BillTrack Pro. All rights reserved.
        </footer>
    );
}
