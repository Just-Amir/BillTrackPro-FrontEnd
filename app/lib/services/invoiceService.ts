import { api } from './api';
import { InvoiceDto, DashboardStatsDto, PagedResult } from '@/app/types';

export const invoiceService = {
    getAll: (page = 1, pageSize = 10, search = "", status = "", orderBy?: string, isDescending?: boolean) => {
        let url = `/Invoices?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`;
        if (orderBy) url += `&orderBy=${encodeURIComponent(orderBy)}&isDescending=${isDescending || false}`;
        return api.get<PagedResult<InvoiceDto>>(url);
    },

    getById: (id: number) => api.get<InvoiceDto>(`/Invoices/${id}`),

    create: (invoice: Partial<InvoiceDto>) => api.post<InvoiceDto>('/Invoices', invoice),

    update: (id: number, invoice: Partial<InvoiceDto>) =>
        api.put<InvoiceDto>(`/Invoices/${id}`, invoice),

    delete: (id: number) => api.delete<void>(`/Invoices/${id}`),

    getDashboardStats: () => api.get<DashboardStatsDto>('/Invoices/dashboard-stats'),

    getReports: () => api.get<any>('/Invoices/reports'), // Type 'any' for now or create ReportsDto type
};
