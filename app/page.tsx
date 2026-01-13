"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "./lib/stores";
import { InvoiceDto } from "./types";
import { PageLoader, ErrorDisplay, StatusBadge } from "./components/ui";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { invoiceService } from "./lib/services";

export default function DashboardPage() {
  const { stats, recentInvoices, isLoading, error, fetchAll, fetchRecentInvoices } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLast30Days, setFilterLast30Days] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      fetchRecentInvoices();
    }
  };

  // Apply date filter
  const filteredInvoices = filterLast30Days
    ? recentInvoices.filter(inv => {
      const invoiceDate = new Date(inv.dateIssued);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return invoiceDate >= thirtyDaysAgo;
    })
    : recentInvoices;

  if (isLoading) return <PageLoader />;

  if (error) {
    return <ErrorDisplay title="Error loading dashboard" message={error} onRetry={fetchAll} />;
  }

  return (
    <div className="space-y-8">
      <Header
        invoices={filteredInvoices}
        filterActive={filterLast30Days}
        onToggleFilter={() => setFilterLast30Days(!filterLast30Days)}
      />
      <StatsCards stats={stats} />
      <RecentInvoicesTable invoices={filteredInvoices} />
    </div>
  );
}

interface HeaderProps {
  invoices: InvoiceDto[];
  filterActive: boolean;
  onToggleFilter: () => void;
}

function Header({ invoices, filterActive, onToggleFilter }: HeaderProps) {
  const handleExport = () => {
    if (!invoices || invoices.length === 0) {
      alert("No data to export");
      return;
    }

    // Create CSV content
    const headers = ["Invoice ID", "Client", "Date", "Amount", "Status"];
    const rows = invoices.map(inv => [
      inv.invoiceNumber,
      inv.clientName,
      new Date(inv.dateIssued).toLocaleDateString(),
      `$${inv.amount.toFixed(2)}`,
      inv.status
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoices_report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <header className="flex flex-wrap justify-between items-end gap-4">
      <div>
        <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-1">Command Center</h2>
        <p className="text-slate-400 font-medium">Welcome back, Admin</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onToggleFilter}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors shadow-sm ${filterActive
            ? 'border-amber-500 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
            : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
        >
          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          Last 30 Days {filterActive && '✓'}
        </button>
        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-900/20 hover:bg-amber-400 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
          Export Report
        </button>
      </div>
    </header>
  );
}

function StatsCards({ stats }: { stats: any }) {
  const cards = [
    {
      title: 'Total Revenue',
      value: stats?.TotalRevenue?.ValueFormatted || '$0.00',
      change: stats?.TotalRevenue?.ChangePercentage || '+0%',
      isPositive: stats?.TotalRevenue?.IsPositive ?? true
    },
    {
      title: 'Outstanding',
      value: stats?.Outstanding?.ValueFormatted || '$0.00',
      change: stats?.Outstanding?.ChangePercentage || '+0%',
      isPositive: stats?.Outstanding?.IsPositive ?? true
    },
    {
      title: 'Monthly Growth',
      value: stats?.MonthlyGrowth?.ValueFormatted || '+0%',
      change: stats?.MonthlyGrowth?.ChangePercentage || '+0%',
      isPositive: stats?.MonthlyGrowth?.IsPositive ?? true
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
}

function StatCard({ title, value, change, isPositive }: { title: string; value: string; change: string; isPositive: boolean }) {
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-sm flex flex-col justify-between h-[200px] overflow-hidden group hover:border-amber-500/30 transition-colors">
      <div className="p-6 pb-0">
        <p className="text-sm font-semibold text-slate-400 mb-1">{title}</p>
        <div className="flex items-end gap-3 mb-2">
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-semibold text-xs border ${isPositive ? 'text-amber-500 bg-amber-900/30 border-amber-500/10' : 'text-red-500 bg-red-900/30 border-red-500/10'}`}>
            {change}
          </span>
          <span className="text-slate-500">vs last month</span>
        </div>
      </div>
      <div className="relative h-24 w-full mt-auto">
        <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 40">
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 35 C20 32 40 28 60 20 C80 12 90 8 100 5 V40 H0 Z" fill={`url(#gradient-${title})`} />
          <path d="M0 35 C20 32 40 28 60 20 C80 12 90 8 100 5" stroke="#F59E0B" strokeLinecap="round" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}

function RecentInvoicesTable({ invoices }: { invoices: InvoiceDto[] }) {
  const [search, setSearch] = useState("");

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(inv =>
    inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
    inv.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-sm overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold font-serif text-white">Recent Invoices</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 w-full sm:w-64 placeholder:text-slate-500 transition-all"
              placeholder="Search invoices..."
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-700">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No invoices found</td>
              </tr>
            ) : (
              filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-900/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300 hover:text-amber-500 cursor-pointer">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white flex items-center gap-2">
                    <div className="size-6 rounded bg-slate-700 flex items-center justify-center text-slate-200 font-bold text-xs">
                      {invoice.clientName?.substring(0, 2).toUpperCase() || 'NA'}
                    </div>
                    {invoice.clientName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{formatDate(invoice.dateIssued)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-white">{formatCurrency(invoice.amount)}</td>
                  <td className="px-6 py-4"><StatusBadge status={invoice.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded hover:bg-slate-700/50">
                      <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
