// fetch.ts
const BASE_URL = 'https://api.example.com'; // Replace this with your API base URL

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetchOptions {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
}

export async function fetchApi(url: string, options: FetchOptions): Promise<any> {
    const fullUrl = `${BASE_URL}${url}`;

    try {
        const response = await fetch(fullUrl, {
            ...options,
            headers: {
                ...options.headers,
                // Add any common headers here, e.g., Authorization token
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        // Handle any errors here or dispatch them using Redux for centralized error handling
        throw error;
    }
}
