import axios from 'axios';

const Weather = axios.create({
  baseURL: `${process.env.REACT_APP_WEATHER_API}`,
});

export const getWeatherData = async (query) => {
  if (query) {
    const response = await Weather.get(`?current_weather=true&latitude=${query.latitude}&longitude=${query.longitude}`);
    const data = await response.data;
    return data;
  }
};
