const API_URL = `${import.meta.env.VITE_API_URL}/users/list`;

export const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Error fetching users');
        } else {
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        }
    } catch (error) {
        console.error(error);
        return [];
    } 

};