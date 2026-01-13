export interface ClientDto {
    id: number;
    name: string;
    email: string;
    // Extended properties for UI
    companyName?: string;
    avatarUrl?: string;
    isActive?: boolean;
    lifetimeValue?: number;
    outstandingStatus?: 'All Paid' | 'Pending' | 'Overdue' | 'Archived';
}

export interface CreateClientDto {
    name: string;
    email: string;
}

export interface InvoiceDto {
    id: number;
    invoiceNumber: string;
    amount: number;
    dateIssued: string; // ISO string
    status: string; // "Paid", "Pending", "Overdue"
    clientId: number;
    clientName: string;
    clientEmail: string;
    clientAvatarUrl?: string; // Optional for UI
}

export interface DashboardStatsDto {
    totalRevenue: number;
    outstandingAmount: number;
    totalInvoices: number;
    monthlyRevenue: MetricItem[];
    invoiceStatusDistribution: MetricItem[];
}

export interface MetricItem {
    label: string;
    value: number;
}

export interface PagedResult<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
