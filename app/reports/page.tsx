"use client";

import { useEffect, useState } from "react";
import { useReportsStore, type ReportData } from "../lib/stores";
import { PageLoader, ErrorDisplay } from "../components/ui";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';

export default function ReportsPage() {
    const { data, isLoading, error, fetchReportsData } = useReportsStore();
    const [filterLast30Days, setFilterLast30Days] = useState(false);

    useEffect(() => {
        fetchReportsData();
    }, [fetchReportsData]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    // Apply 30-day filter to monthly data
    const filteredData = filterLast30Days && data ? {
        ...data,
        monthlyRevenue: data.monthlyRevenue?.slice(-1) ?? [], // Only last month
    } : data;

    if (isLoading) return <PageLoader />;

    if (error) {
        return <ErrorDisplay title="Error loading reports" message={error} onRetry={fetchReportsData} />;
    }

    return (
        <div className="flex flex-col gap-8">
            <Header
                data={filteredData}
                filterActive={filterLast30Days}
                onToggleFilter={() => setFilterLast30Days(!filterLast30Days)}
            />

            {/* Monthly Trend Chart */}
            <section className="w-full bg-slate-800 rounded-2xl shadow-lg shadow-black/20 border border-slate-700 overflow-hidden p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-white">Revenue vs Expenses</h3>
                    <p className="text-sm text-slate-400">Monthly financial performance {filterLast30Days ? '(Last 30 Days)' : '(Last 12 Months)'}</p>
                </div>
                <div className="h-[350px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={filteredData?.monthlyRevenue ?? []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={formatCurrency} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                                formatter={(value: number) => formatCurrency(value)}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                            <Area type="monotone" dataKey="expenses" stroke="#94a3b8" fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" />
                            <Legend />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RevenueByClientChart
                    data={filteredData?.revenueByClient ?? []}
                    total={filteredData?.totalRevenue ?? 0}
                    formatCurrency={formatCurrency}
                />
                <InvoiceStatusChart data={filteredData?.invoicesByStatus ?? []} />
            </div>
        </div>
    );
}

function Header({ data, filterActive, onToggleFilter }: {
    data: ReportData | null;
    filterActive: boolean;
    onToggleFilter: () => void;
}) {
    const handleExport = () => {
        if (!data) {
            alert("No data to export");
            return;
        }

        // Create CSV content from reports data
        const lines = [
            "Financial Reports Export",
            "",
            "Summary",
            `Total Revenue,$${data.totalRevenue?.toFixed(2) ?? 0}`,
            `Total Expenses,$${data.totalExpenses?.toFixed(2) ?? 0}`,
            "",
            "Monthly Revenue",
            "Month,Revenue,Expenses"
        ];

        if (data.monthlyRevenue) {
            data.monthlyRevenue.forEach((m: any) => {
                lines.push(`${m.month},${m.revenue},${m.expenses ?? 0}`);
            });
        }

        lines.push("");
        lines.push("Revenue by Client");
        lines.push("Client,Revenue");

        if (data.revenueByClient) {
            data.revenueByClient.forEach((c: any) => {
                lines.push(`${c.clientName},${c.revenue}`);
            });
        }

        lines.push("");
        lines.push("Invoices by Status");
        lines.push("Status,Count");

        if (data.invoicesByStatus) {
            data.invoicesByStatus.forEach((s: any) => {
                lines.push(`${s.status},${s.count}`);
            });
        }

        const csvContent = lines.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `financial_report_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    return (
        <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Financial Reports</h2>
                <p className="text-slate-400 mt-2">Overview of your financial performance and analytics.</p>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onToggleFilter}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors shadow-sm ${filterActive
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400 hover:bg-amber-500/30'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                        }`}
                >
                    <span className="material-symbols-outlined text-[20px] text-slate-400">calendar_today</span>
                    <span>Last 30 Days {filterActive && '✓'}</span>
                </button>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-amber-600 transition-all shadow-sm shadow-orange-900/20"
                >
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    <span>Export Report</span>
                </button>
            </div>
        </header>
    );
}

function RevenueExpensesChart({ revenue, expenses, formatCurrency }: { revenue: number; expenses: number; formatCurrency: (val: number) => string }) {
    return (
        <section className="w-full bg-slate-800 rounded-2xl shadow-lg shadow-black/20 border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-white">Revenue vs Expenses</h3>
                    <p className="text-sm text-slate-400">Comparison of income and operational costs</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 mr-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-amber-500"></span>
                            <span className="text-slate-300 font-medium">Revenue: {formatCurrency(revenue)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-slate-400"></span>
                            <span className="text-slate-300">Expenses: {formatCurrency(expenses)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 relative h-[320px] w-full">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 320">
                    <defs>
                        <linearGradient id="gradientRevenue" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="gradientExpenses" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.0" />
                        </linearGradient>
                    </defs>
                    <g className="stroke-slate-700/50" strokeDasharray="4,4">
                        <line x1="0" x2="1000" y1="280" y2="280" />
                        <line x1="0" x2="1000" y1="140" y2="140" />
                        <line x1="0" x2="1000" y1="0" y2="0" />
                    </g>
                    <path d="M0,220 C100,210 250,200 500,190 C750,180 900,160 1000,180 L1000,320 L0,320 Z" fill="url(#gradientExpenses)" />
                    <path className="stroke-slate-400" d="M0,220 C100,210 250,200 500,190 C750,180 900,160 1000,180" fill="none" strokeWidth="2" />
                    <path d="M0,200 C150,120 450,80 1000,40 L1000,320 L0,320 Z" fill="url(#gradientRevenue)" />
                    <path d="M0,200 C150,120 450,80 1000,40" fill="none" stroke="#f59e0b" strokeWidth="3" />
                </svg>
            </div>
        </section>
    );
}

function RevenueByClientChart({ data, total, formatCurrency }: { data: { name: string; value: number; percentage: number }[]; total: number; formatCurrency: (val: number) => string }) {
    const colors = ['bg-slate-900', 'bg-amber-500', 'bg-slate-500', 'bg-slate-400', 'bg-slate-600'];

    return (
        <div className="bg-slate-800 rounded-2xl shadow-lg shadow-black/20 border border-slate-700 p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Revenue by Client</h3>
                    <p className="text-sm text-slate-400">Top performing accounts</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8 flex-1 justify-center">
                <div className="relative size-48 flex-shrink-0">
                    <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                        <circle className="stroke-slate-800" cx="50" cy="50" fill="transparent" r="40" strokeWidth="12" />
                        {data.length === 0 && (
                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#334155" strokeWidth="12" />
                        )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs text-slate-500 font-medium">Total</span>
                        <span className="text-xl font-bold text-white">{formatCurrency(total)}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-[200px]">
                    {data.length === 0 ? (
                        <p className="text-sm text-slate-500">No data available</p>
                    ) : (
                        data.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className={`size-3 rounded-full ${colors[i % colors.length]}`}></span>
                                    <span className="text-slate-300 font-medium truncate max-w-[120px]">{item.name}</span>
                                </div>
                                <span className="text-slate-500 font-medium">{item.percentage.toFixed(0)}%</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function InvoiceStatusChart({ data }: { data: { status: string; count: number }[] }) {
    const colors: Record<string, string> = {
        'Paid': 'bg-slate-900',
        'Pending': 'bg-amber-500',
        'Overdue': 'bg-red-500'
    };

    const total = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="bg-slate-800 rounded-2xl shadow-lg shadow-black/20 border border-slate-700 p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Invoice Status</h3>
                    <p className="text-sm text-slate-400">Current invoice pipeline</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8 flex-1 justify-center">
                <div className="relative size-48 flex-shrink-0">
                    <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                        <circle className="stroke-slate-800" cx="50" cy="50" fill="transparent" r="40" strokeWidth="12" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs text-slate-500 font-medium">Invoices</span>
                        <span className="text-xl font-bold text-white">{total}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-[200px]">
                    {data.length === 0 ? (
                        <p className="text-sm text-slate-500">No data available</p>
                    ) : (
                        data.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className={`size-3 rounded-full ${colors[item.status] || 'bg-slate-600'} border border-slate-600`}></span>
                                    <span className="text-slate-300 font-medium">{item.status}</span>
                                </div>
                                <span className="text-slate-500 font-medium">{item.count}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
