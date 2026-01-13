import { create } from 'zustand';
import { clientService, invoiceService } from '@/app/lib/services';
import { ClientDto, InvoiceDto } from '@/app/types';

export interface ReportData {
    totalRevenue: number;
    totalExpenses: number;
    monthlyRevenue: { month: string; revenue: number; expenses: number }[];
    revenueByClient: { name: string; value: number; percentage: number }[];
    invoicesByStatus: { status: string; count: number }[];
}

interface ReportsState {
    data: ReportData | null;
    isLoading: boolean;
    error: string | null;

    fetchReportsData: () => Promise<void>;
    clearError: () => void;
}

export const useReportsStore = create<ReportsState>((set) => ({
    data: null,
    isLoading: false,
    error: null,

    fetchReportsData: async () => {
        set({ isLoading: true, error: null });

        try {
            const { data, error } = await invoiceService.getReports();

            if (error) {
                set({ isLoading: false, error });
                return;
            }

            if (data) {
                set({
                    data: {
                        totalRevenue: data.totalRevenue,
                        totalExpenses: data.totalExpenses,
                        revenueByClient: data.revenueByClient,
                        invoicesByStatus: data.invoicesByStatus,
                        monthlyRevenue: data.monthlyRevenue
                    },
                    isLoading: false
                });
            }
        } catch (err) {
            set({ isLoading: false, error: 'Failed to load reports data' });
        }
    },

    clearError: () => set({ error: null }),
}));
