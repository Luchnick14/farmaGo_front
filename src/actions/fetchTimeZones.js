
export const fetchTimeZones = async (country) => {
    const TIME_ZONES_API = `http://api.timezonedb.com/v2.1/list-time-zone?key=6G927WJR6XK4&format=json&country=${country}&fields=zoneName`;
    const response = await fetch(TIME_ZONES_API);
    if (response.ok){
        return response.json();
    } else {
        throw new Error('Error fetching time zones');
    }

}