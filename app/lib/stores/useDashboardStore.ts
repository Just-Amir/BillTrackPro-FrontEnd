import { create } from 'zustand';
import { DashboardStatsDto, InvoiceDto, PagedResult } from '@/app/types';
import { invoiceService } from '@/app/lib/services';

interface DashboardState {
    // Data
    stats: DashboardStatsDto | null;
    recentInvoices: InvoiceDto[];

    // Loading states
    isLoading: boolean;
    isLoadingInvoices: boolean;

    // Error state
    error: string | null;

    // Actions
    fetchDashboardStats: () => Promise<void>;
    fetchRecentInvoices: () => Promise<void>;
    fetchAll: () => Promise<void>;
    clearError: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    // Initial state
    stats: null,
    recentInvoices: [],
    isLoading: false,
    isLoadingInvoices: false,
    error: null,

    // Fetch dashboard stats
    fetchDashboardStats: async () => {
        set({ isLoading: true, error: null });
        const { data, error } = await invoiceService.getDashboardStats();
        set({
            stats: data,
            isLoading: false,
            error
        });
    },

    // Fetch recent invoices (last 6)
    fetchRecentInvoices: async () => {
        set({ isLoadingInvoices: true });
        const { data, error } = await invoiceService.getAll();

        let recent: InvoiceDto[] = [];
        if (data) {
            const paged = data as unknown as PagedResult<InvoiceDto>;
            recent = paged.items.slice(0, 6);
        }

        set({
            recentInvoices: recent,
            isLoadingInvoices: false,
            error: error ?? null
        });
    },

    // Fetch all data at once
    fetchAll: async () => {
        set({ isLoading: true, isLoadingInvoices: true, error: null });

        const [statsResult, invoicesResult] = await Promise.all([
            invoiceService.getDashboardStats(),
            invoiceService.getAll()
        ]);

        let recent: InvoiceDto[] = [];
        if (invoicesResult.data) {
            const paged = invoicesResult.data as unknown as PagedResult<InvoiceDto>;
            recent = paged.items.slice(0, 6);
        }

        set({
            stats: statsResult.data,
            recentInvoices: recent,
            isLoading: false,
            isLoadingInvoices: false,
            error: statsResult.error ?? invoicesResult.error ?? null
        });
    },

    clearError: () => set({ error: null }),
}));
