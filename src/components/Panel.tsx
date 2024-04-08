"use client"

import React, { useState, useEffect } from "react"
import { WeatherData, WeatherForecastData } from "@/app/getData"

const Panel: React.FC<{ weatherData: WeatherData, forecastData: WeatherForecastData }> = ({ weatherData, forecastData }) => {
    const [temperatureUnit, setTemperatureUnit] = useState<string>(() => {
        const storedUnit = localStorage.getItem("temperatureUnit");
        return storedUnit !== null ? storedUnit : '°C';
    });

    useEffect(() => {
        localStorage.setItem("temperatureUnit", temperatureUnit);
    }, [temperatureUnit]);

    const celsiusToFahrenheit = (celsius: number) => {
        return (celsius * 9 / 5) + 32;
    }

    const handleToggleUnit = () => {
        setTemperatureUnit(unit => unit === '°C' ? '°F' : '°C');
    }


    return (
        <section className="current-weather w-full mx-auto">
            <h2>{weatherData.name} Weather</h2>
            <div id="currentWeatherInfo">
                {weatherData !== undefined && (
                    <div className="flex md:justify-start md:gap-12 md:items-center md:flex-row flex-col">
                        <div className="flex md:justify-between gap-6 md:gap-12 md:items-center md:flex-row flex-col">
                            <div className="flex items-start gap-2">
                                <div className="text-5xl font-extrabold">
                                    {temperatureUnit === '°C' ? weatherData.main.temp.toFixed(2) : celsiusToFahrenheit(weatherData.main.temp).toFixed(2)}
                                </div>
                                <span className="text-xl">{temperatureUnit}</span>
                            </div>
                            <div>
                                <div>humidity : {weatherData.main.humidity}%</div>
                                <div>wind : {weatherData.wind.speed}m/s</div>
                            </div>
                        </div>
                        <div>
                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
                            <p className="mt-1">{weatherData.weather[0].description}</p>
                        </div>
                    </div>
                )}
                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="toggleUnit"
                        checked={temperatureUnit === '°C'}
                        onChange={handleToggleUnit}
                        className="mr-2"
                    />
                    <label htmlFor="toggleUnit">Show {temperatureUnit === '°C' ? 'Celcius' : 'Fahrenheit'}</label>
                </div>
                <h1 className="mt-6"> {weatherData.name} ForeCast Data [5 days]</h1>
                {forecastData !== undefined && (
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-6">
                        {forecastData.list.map(item => (
                            <div key={item.dt} className="bg-gray-200 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-black">{item.dt_txt}</h3>
                                <p className="text-gray-600">Temperature: {item.main.temp} °C</p>
                                <p className="text-gray-600">Weather: {item.weather[0].description}</p>
                                <p className="text-gray-600">Wind Speed: {item.wind.speed} m/s</p>
                                <p className="text-gray-600">Humidity: {item.main.humidity}%</p>
                                <p className="text-gray-600">Pressure: {item.main.pressure} hPa</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Panel
