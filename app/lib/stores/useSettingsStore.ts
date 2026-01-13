import { create } from 'zustand';
import { api as httpClient } from '../services/api';

export interface UserProfile {
    id: number;
    fullName: string;
    title: string;
    email: string;
    phone: string;
    timezone: string;
    avatarUrl: string;
    companyName: string;
    taxId: string;
    streetAddress: string;
    city: string;
    zipCode: string;
    country: string;
    companyLogoUrl: string;
    brandColor: string;
    secondaryColor: string;
}

interface SettingsState {
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
    fetchProfile: () => Promise<void>;
    updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
    uploadFile: (file: File) => Promise<string | null>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
    profile: null,
    isLoading: false,
    error: null,

    fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await httpClient.get<any>('/settings');
            // api.get returns { data, error }, and data contains ServiceResponse with .data property
            if (response.error) {
                set({ error: response.error, isLoading: false });
                return;
            }
            // Unwrap ServiceResponse: response.data is the ServiceResponse, response.data.data is the actual profile
            const profile = response.data?.data || response.data;
            set({ profile, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch settings', isLoading: false });
        }
    },

    updateProfile: async (updates) => {
        set({ isLoading: true, error: null });
        try {
            const current = get().profile;
            if (!current) return;

            const updated = { ...current, ...updates };
            const response = await httpClient.put<any>('/settings', updated);

            if (response.error) {
                set({ error: response.error, isLoading: false });
                return;
            }
            // Unwrap ServiceResponse: response.data is the ServiceResponse, response.data.data is the actual profile
            const profile = response.data?.data || response.data;
            set({ profile, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to update settings', isLoading: false });
        }
    },

    uploadFile: async (file) => {
        set({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append('file', file);

            const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5251/api";

            const response = await fetch(`${baseUrl}/uploads`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                let errorMessage = 'Upload failed';
                try {
                    const errorJson = await response.json();
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch {
                    errorMessage = await response.text() || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            set({ isLoading: false });
            return result.data; // URL
        } catch (error: any) {
            console.error("Upload error:", error);
            set({ error: error.message || 'Failed to upload file', isLoading: false });
            return null;
        }
    }
}));
