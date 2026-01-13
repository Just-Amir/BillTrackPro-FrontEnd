import { create } from 'zustand';
import { ClientDto, CreateClientDto, PagedResult } from '@/app/types';
import { clientService } from '@/app/lib/services';

interface ClientState {
    // Data
    clients: ClientDto[];
    selectedClient: ClientDto | null;
    pagination: {
        pageNumber: number;
        pageSize: number;
        totalCount: number;
        totalPages: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };

    // Filters & Sort
    searchQuery: string;
    sort: {
        orderBy: string | null;
        isDescending: boolean;
    };

    // Loading states
    isLoading: boolean;

    // Error state
    error: string | null;

    // Actions
    fetchClients: (page?: number, search?: string, orderBy?: string | null, isDescending?: boolean) => Promise<void>;
    fetchClientById: (id: number) => Promise<void>;
    createClient: (client: CreateClientDto) => Promise<boolean>;
    updateClient: (id: number, client: Partial<ClientDto>) => Promise<boolean>;
    deleteClient: (id: number) => Promise<boolean>;
    setSelectedClient: (client: ClientDto | null) => void;
    setSearchQuery: (query: string) => void;
    setSort: (orderBy: string, isDescending: boolean) => void;
    clearError: () => void;
}

export const useClientStore = create<ClientState>((set, get) => ({
    // Initial state
    clients: [],
    selectedClient: null,
    pagination: {
        pageNumber: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    },
    searchQuery: "",
    sort: {
        orderBy: null,
        isDescending: false
    },
    isLoading: false,
    error: null,

    // Fetch clients
    fetchClients: async (page = 1, search?: string, orderBy?: string | null, isDescending?: boolean) => {
        set({ isLoading: true, error: null });

        const pageSize = get().pagination.pageSize;
        // Use args or state fallback
        const currentSearch = search !== undefined ? search : get().searchQuery;
        const currentOrderBy = orderBy !== undefined ? orderBy : get().sort.orderBy;
        const currentIsDescending = isDescending !== undefined ? isDescending : get().sort.isDescending;

        // Note: service getAll signature: (page, pageSize, search, orderBy, isDescending)
        const { data, error } = await clientService.getAll(page, pageSize, currentSearch, currentOrderBy || undefined, currentIsDescending);

        if (data) {
            const paged = data as unknown as PagedResult<ClientDto>;

            set({
                clients: paged.items,
                pagination: {
                    pageNumber: paged.pageNumber,
                    pageSize: paged.pageSize,
                    totalCount: paged.totalCount,
                    totalPages: paged.totalPages,
                    hasPreviousPage: paged.hasPreviousPage,
                    hasNextPage: paged.hasNextPage
                },
                searchQuery: currentSearch,
                sort: { orderBy: currentOrderBy, isDescending: currentIsDescending },
                isLoading: false
            });
        } else {
            set({
                clients: [],
                isLoading: false,
                error
            });
        }
    },

    // Fetch single client
    fetchClientById: async (id: number) => {
        set({ isLoading: true, error: null });
        const { data, error } = await clientService.getById(id);
        set({
            selectedClient: data,
            isLoading: false,
            error
        });
    },

    // Create client
    createClient: async (client) => {
        set({ isLoading: true, error: null });
        const { data, error } = await clientService.create(client);
        if (data) {
            // Refresh list to show new item
            await get().fetchClients(1, get().searchQuery);
            set({ isLoading: false });
            return true;
        }
        set({ isLoading: false, error });
        return false;
    },

    // Update client
    updateClient: async (id, client) => {
        set({ isLoading: true, error: null });
        const { data, error } = await clientService.update(id, client);
        if (data) {
            set((state) => ({
                clients: state.clients.map((c) => c.id === id ? data : c),
                selectedClient: state.selectedClient?.id === id ? data : state.selectedClient,
                isLoading: false,
            }));
            return true;
        }
        set({ isLoading: false, error });
        return false;
    },

    // Delete client
    deleteClient: async (id) => {
        set({ isLoading: true, error: null });
        const { error } = await clientService.delete(id);
        if (!error) {
            // Refresh current page
            await get().fetchClients(get().pagination.pageNumber, get().searchQuery);
            set({ isLoading: false });
            return true;
        }
        set({ isLoading: false, error });
        return false;
    },

    // Utility actions
    setSelectedClient: (client) => set({ selectedClient: client }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSort: (orderBy, isDescending) => set({ sort: { orderBy, isDescending } }),
    clearError: () => set({ error: null }),
}));
