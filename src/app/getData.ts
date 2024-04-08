import { cache } from "react";

interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface Wind {
    speed: number;
    deg: number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface WeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

interface List {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
}

interface CityCoord {
    lat: number;
    lon: number;
}

interface City {
    id: number;
    name: string;
    coord: CityCoord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface WeatherForecastData {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}


export const getWeather = cache(
    async (lat: number, lon: number): Promise<WeatherData> => {
        try {
            const response = await fetch(
                `${process.env.NEXT_APP_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.NEXT_APP_API_KEY}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                next: { revalidate: 3600 }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            // Handle the error here, for example:
            console.error("Error fetching detail:", error);
            throw error; // re-throwing the error to propagate it to the caller
        }
    }
);

export const getForecast = cache(
    async (lat: number, lon: number): Promise<WeatherForecastData> => {
        try {
            const response = await fetch(
                `${process.env.NEXT_APP_API_URL}/forecast/?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.NEXT_APP_API_KEY}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                next: { revalidate: 3600 }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            // Handle the error here, for example:
            console.error("Error fetching detail:", error);
            throw error; // re-throwing the error to propagate it to the caller
        }
    }
);