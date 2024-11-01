const API_URL = `${import.meta.env.VITE_API_URL}/countries/list`;

export const fetchCountries = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if(response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Failed to fetch countries');
        }
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch countries');
    }
};