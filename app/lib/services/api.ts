// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5251/api";

// Generic HTTP client with error handling
async function httpClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<{ data: T | null; error: string | null }> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const errorText = await response.text();
            return { data: null, error: errorText || `HTTP Error: ${response.status}` };
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error instanceof Error ? error.message : 'Network error' };
    }
}

// HTTP Methods
export const api = {
    get: <T>(endpoint: string) => httpClient<T>(endpoint),

    post: <T>(endpoint: string, body: unknown) =>
        httpClient<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),

    put: <T>(endpoint: string, body: unknown) =>
        httpClient<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),

    delete: <T>(endpoint: string) =>
        httpClient<T>(endpoint, { method: 'DELETE' }),
};
