import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import WeatherCard from './WeatherCard';
import axios from 'axios';

const HeroSection = () => {
  const [weather, setWeather] = useState([]);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=New%20Delhi&units=metric&appid=${apiKey}`);
      setWeather(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen flex">
      <section className="bg-cover bg-center py-16 sm:py-32 w-full bg object-cover">
        <div className="container mx-auto text-white">
          <div className="flex flex-col items-center justify-between sm:flex-row sm:items-start">
            <div className="w-full sm:w-1/2 sm:text-left">
              <h1 className="text-3xl sm:text-5xl font-medium mb-4 sm:mb-6 font-poppins">Welcome to Explorer Guide</h1>
              <p className="text-lg sm:text-xl mb-6 sm:mb-12">Explore ancient temples, majestic palaces, vibrant cultures, and breathtaking landscapes.</p>
              <div className="text-center">
                <HashLink to="#discover" smooth>
                  <button className="bg-indigo-800 text-white py-3 px-8 rounded-full hover:bg-indigo-700">Discover</button>
                </HashLink>
              </div>
            </div>
          {weather && Object.keys(weather).length > 0 && (
              <WeatherCard image={weather.weather[0].icon} name={weather.name} temp={weather.main.temp} weather={weather.weather[0].main} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
