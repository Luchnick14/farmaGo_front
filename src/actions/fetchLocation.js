
export const fetchLocation = async (country) => {
    const WeatherAPI = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_APIKEY}&q=${country}&api=no`;
    const response = await fetch(WeatherAPI);
    if (response.ok){
        return response.json();
    } else {
        throw new Error('Error fetching weather');
    }
};