import { api } from './api';
import { ClientDto, CreateClientDto, PagedResult } from '@/app/types';

export const clientService = {
    getAll: (page = 1, pageSize = 10, search = "", orderBy?: string, isDescending?: boolean) => {
        let url = `/Clients?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`;
        if (orderBy) url += `&orderBy=${encodeURIComponent(orderBy)}&isDescending=${isDescending || false}`;
        return api.get<PagedResult<ClientDto>>(url);
    },

    getById: (id: number) => api.get<ClientDto>(`/Clients/${id}`),

    create: (client: CreateClientDto) => api.post<ClientDto>('/Clients', client),

    update: (id: number, client: Partial<ClientDto>) =>
        api.put<ClientDto>(`/Clients/${id}`, client),

    delete: (id: number) => api.delete<void>(`/Clients/${id}`),
};
