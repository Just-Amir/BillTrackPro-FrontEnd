"use client";

import { useEffect, useState } from "react";
import { useClientStore } from "../lib/stores";
import { ClientDto } from "../types";
import { PageLoader, ErrorDisplay, Button, SearchInput, Avatar, Badge, Pagination } from "../components/ui";

export default function ClientsPage() {
    const { clients, isLoading, error, fetchClients, pagination, setSearchQuery, searchQuery, sort, setSort } = useClientStore();

    useEffect(() => {
        fetchClients(pagination.pageNumber);
    }, []); // Initial load

    const handleSearch = (term: string) => {
        setSearchQuery(term);
        fetchClients(1, term);
    };

    const handleSort = (key: string) => {
        const isDescending = sort.orderBy === key ? !sort.isDescending : false;
        setSort(key, isDescending);
        fetchClients(pagination.pageNumber, searchQuery, key, isDescending);
    };

    const handlePageChange = (page: number) => {
        fetchClients(page, searchQuery);
    };

    if (error) {
        return <ErrorDisplay title="Error loading clients" message={error} onRetry={() => fetchClients()} />;
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <PageHeader />
                <div className="flex justify-between items-center">
                    <SearchSection onSearch={handleSearch} initialValue={searchQuery} />
                    <SortDropdown currentSort={sort} onSort={handleSort} />
                </div>

                {isLoading && clients.length === 0 ? (
                    <div className="flex justify-center py-20"><PageLoader /></div>
                ) : (
                    <>
                        <ClientGrid clients={clients} />
                        <div className="mt-4">
                            <Pagination
                                currentPage={pagination.pageNumber}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                                totalCount={pagination.totalCount}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function SortDropdown({ currentSort, onSort }: { currentSort: { orderBy: string | null, isDescending: boolean }, onSort: (key: string) => void }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Sort by:</span>
            <select
                className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500"
                value={currentSort.orderBy || ""}
                onChange={(e) => onSort(e.target.value)}
            >
                <option value="">Default</option>
                <option value="Name">Name</option>
                <option value="CompanyName">Company</option>
                <option value="Email">Email</option>
            </select>
            <button
                onClick={() => onSort(currentSort.orderBy || "Name")}
                className="p-2 text-slate-400 hover:text-white"
                title="Toggle Direction"
            >
                <span className="material-symbols-outlined">
                    {currentSort.isDescending ? 'arrow_downward' : 'arrow_upward'}
                </span>
            </button>
        </div>
    );
}

function PageHeader() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', companyName: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createClient, fetchClients } = useClientStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            alert('Name and Email are required');
            return;
        }
        setIsSubmitting(true);
        const success = await createClient(formData);
        setIsSubmitting(false);
        if (success) {
            setShowModal(false);
            setFormData({ name: '', email: '', companyName: '' });
            fetchClients(1);
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Client Directory</h2>
                    <p className="text-slate-400 mt-1">Manage your corporate relationships and billing details.</p>
                </div>
                <Button icon="add_circle" onClick={() => setShowModal(true)}>Add New Client</Button>
            </div>

            {/* Add Client Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-white mb-4">Add New Client</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="john@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Company</label>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Acme Corp"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Client'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

function SearchSection({ onSearch, initialValue }: { onSearch: (term: string) => void, initialValue?: string }) {
    return (
        <div className="w-full max-w-md">
            <SearchInput
                placeholder="Search by name, company, or ID..."
                defaultValue={initialValue}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}

function ClientGrid({ clients }: { clients: ClientDto[] }) {
    if (clients.length === 0) {
        return <div className="text-center text-slate-500 py-12">No clients found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clients.map((client) => (
                <ClientCard key={client.id} client={client} />
            ))}
        </div>
    );
}

function ClientCard({ client }: { client: ClientDto }) {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    const getStatusVariant = (status?: string) => {
        switch (status) {
            case 'All Paid': return 'success';
            case 'Overdue': return 'danger';
            default: return 'warning';
        }
    };

    return (
        <div className="group relative flex flex-col bg-slate-800 rounded-2xl border border-slate-700 shadow-sm hover:shadow-xl hover:shadow-black/20 hover:border-slate-600 transition-all duration-300 p-6">
            {/* Menu Button */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Avatar src={client.avatarUrl} alt={client.name} size="lg" />
                <div>
                    <h3 className="text-base font-bold text-slate-100 leading-tight">{client.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{client.companyName || "Company Inc."}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className={`w-2 h-2 rounded-full ${client.isActive !== false ? 'bg-amber-500' : 'bg-slate-600'}`} />
                        <span className={`text-xs font-semibold ${client.isActive !== false ? 'text-amber-500' : 'text-slate-500'}`}>
                            {client.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="space-y-4 mt-auto">
                <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Lifetime Value</p>
                    <p className="text-xl font-bold text-white font-mono tracking-tight">
                        {formatCurrency(client.lifetimeValue || 0)}
                    </p>
                </div>
                <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                    <span className="text-sm text-slate-400 font-medium">Outstanding</span>
                    <Badge variant={getStatusVariant(client.outstandingStatus) as 'success' | 'warning' | 'danger'}>
                        {client.outstandingStatus || 'Pending'}
                    </Badge>
                </div>
            </div>
        </div>
    );
}
