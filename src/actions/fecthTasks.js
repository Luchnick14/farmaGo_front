// actions/fetchTasks.js
const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export const fetchTasks = async (user_id) => {
    const response = await fetch(`${API_URL}/list?userId=${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error fetching tasks');
    }
};
