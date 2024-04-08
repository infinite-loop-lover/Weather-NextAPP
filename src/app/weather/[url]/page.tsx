import MapComponent from "@/components/Map"
import { getWeather, getForecast } from "@/app/getData";

import Panel from "@/components/Panel";

export default async function Weather({ params }: { params: { url: string } }) {

    const decodedUrl = decodeURIComponent(params.url);
    const keyValuePairs = decodedUrl.split("&");
    let tempCoord = { lat: 0, lng: 0 };
    keyValuePairs.forEach(pair => {
        const [key, value] = pair.split("=");
        if (key === "lat") {
            tempCoord.lat = parseFloat(value);
        } else if (key === "lon") {
            tempCoord.lng = parseFloat(value);
        }
    });


    const weatherData = await getWeather(tempCoord.lat, tempCoord.lng);
    const forecastData = await getForecast(tempCoord.lat, tempCoord.lng);

 

    return (
        <main className=" min-h-screen md:p-12 p-6">
            <div className="w-full">
                <p>To obtain weather data, drag and drop the marker.</p>
                <MapComponent coordinates={tempCoord} isInitial={false} />
            </div>
            <Panel weatherData={weatherData} forecastData={forecastData} />
        </main>
    )
}