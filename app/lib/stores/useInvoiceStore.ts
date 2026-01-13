import { create } from 'zustand';
import { InvoiceDto, DashboardStatsDto, PagedResult } from '@/app/types';
import { invoiceService } from '@/app/lib/services';

interface InvoiceState {
    // Data
    invoices: InvoiceDto[];
    dashboardStats: DashboardStatsDto | null;
    selectedInvoice: InvoiceDto | null;
    pagination: {
        pageNumber: number;
        pageSize: number;
        totalCount: number;
        totalPages: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };

    // Filters & Sort
    filters: {
        search: string;
        status: string; // "All", "Paid", "Pending", "Overdue"
    };
    sort: {
        orderBy: string | null;
        isDescending: boolean;
    };

    // Loading states
    isLoading: boolean;
    isLoadingStats: boolean;

    // Error state
    error: string | null;

    // Actions
    fetchInvoices: (page?: number, search?: string, status?: string, orderBy?: string | null, isDescending?: boolean) => Promise<void>;
    fetchDashboardStats: () => Promise<void>;
    fetchInvoiceById: (id: number) => Promise<void>;
    createInvoice: (invoice: Partial<InvoiceDto>) => Promise<boolean>;
    updateInvoice: (id: number, invoice: Partial<InvoiceDto>) => Promise<boolean>;
    deleteInvoice: (id: number) => Promise<boolean>;
    setSelectedInvoice: (invoice: InvoiceDto | null) => void;
    setFilters: (filters: Partial<{ search: string; status: string }>) => void;
    setSort: (orderBy: string, isDescending: boolean) => void;
    clearError: () => void;
}

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
    // Initial state
    invoices: [],
    dashboardStats: null,
    selectedInvoice: null,
    pagination: {
        pageNumber: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    },
    filters: {
        search: "",
        status: "All"
    },
    sort: {
        orderBy: null,
        isDescending: false
    },
    isLoading: false,
    isLoadingStats: false,
    error: null,

    // Fetch all invoices
    fetchInvoices: async (page = 1, searchOverride?: string, statusOverride?: string, orderByOverride?: string | null, isDescendingOverride?: boolean) => {
        set({ isLoading: true, error: null });
        const { pageSize } = get().pagination;

        // Use passed parameters if provided, otherwise fall back to store state
        const search = searchOverride !== undefined ? searchOverride : get().filters.search;
        const status = statusOverride !== undefined ? statusOverride : get().filters.status;
        const orderBy = orderByOverride !== undefined ? orderByOverride : get().sort.orderBy;
        const isDescending = isDescendingOverride !== undefined ? isDescendingOverride : get().sort.isDescending;

        // Note: invoiceService needs update to call GetPagedInvoicesAsync
        const { data, error } = await invoiceService.getAll(
            page,
            pageSize,
            search,
            status === "All" ? "" : status,
            orderBy || undefined,
            isDescending
        );

        if (data) {
            const paged = data as unknown as PagedResult<InvoiceDto>;
            set({
                invoices: paged.items,
                pagination: {
                    pageNumber: paged.pageNumber,
                    pageSize: paged.pageSize,
                    totalCount: paged.totalCount,
                    totalPages: paged.totalPages,
                    hasPreviousPage: paged.hasPreviousPage,
                    hasNextPage: paged.hasNextPage
                },
                isLoading: false,
                error
            });
        } else {
            set({ invoices: [], isLoading: false, error });
        }
    },

    // Fetch dashboard stats
    fetchDashboardStats: async () => {
        set({ isLoadingStats: true });
        const { data, error } = await invoiceService.getDashboardStats();
        set({
            dashboardStats: data,
            isLoadingStats: false,
            error: error ?? get().error
        });
    },

    // Fetch single invoice
    fetchInvoiceById: async (id: number) => {
        set({ isLoading: true, error: null });
        const { data, error } = await invoiceService.getById(id);
        set({
            selectedInvoice: data,
            isLoading: false,
            error
        });
    },

    // Create invoice
    createInvoice: async (invoice) => {
        set({ isLoading: true, error: null });
        const { data, error } = await invoiceService.create(invoice);
        if (data) {
            // Refresh list
            await get().fetchInvoices(1);
            // Update stats too
            get().fetchDashboardStats();
            set({ isLoading: false });
            return true;
        }
        set({ isLoading: false, error });
        return false;
    },

    // Update invoice
    updateInvoice: async (id, invoice) => {
        set({ isLoading: true, error: null });
        const { data, error } = await invoiceService.update(id, invoice);
        if (data) {
            set((state) => ({
                invoices: state.invoices.map((inv) =>
                    inv.id === id ? data : inv
                ),
                selectedInvoice: state.selectedInvoice?.id === id ? data : state.selectedInvoice,
                isLoading: false,
            }));
            // Update stats
            get().fetchDashboardStats();
            return true;
        }
        set({ isLoading: false, error });
        return false;
    },

    // Delete invoice
    deleteInvoice: async (id) => {
        set({ isLoading: true, error: null });
        const { error } = await invoiceService.delete(id);
        if (!error) {
            // Refresh
            await get().fetchInvoices(get().pagination.pageNumber);
            // Update stats
            get().fetchDashboardStats();
            set({ isLoading: false });
            return true;
        }
        set({ isLoading: false, error });
        return false;
    },

    // Utility actions
    setSelectedInvoice: (invoice) => set({ selectedInvoice: invoice }),
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
    })),
    setSort: (orderBy, isDescending) => set({ sort: { orderBy, isDescending } }),
    clearError: () => set({ error: null }),
}));
