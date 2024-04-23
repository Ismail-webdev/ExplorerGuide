import React from 'react'
const WeatherCard = ({image,name,weather,temp}) => {
  return (
    <div className="w-96 sm:w-1/4 mt-8 sm:mt-0 flex">
    <div className="bg-gray-300 rounded-lg shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 border-b-2">Weather Forecast: {name}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={`https://openweathermap.org/img/wn/${image}.png`} className="h-8 w-8 mr-2" alt="Weather Icon" />
            <p className="text-lg text-gray-700">{weather}</p>
          </div>
          <p className="text-lg text-gray-700">{temp}°C</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default WeatherCard
