// apiUtil.ts

const API_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function fetchFromAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export { fetchFromAPI };