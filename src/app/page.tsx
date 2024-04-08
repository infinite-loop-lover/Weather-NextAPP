
import { getWeather, getForecast } from "./getData";
import MapComponent from "@/components/Map";
import Panel from "@/components/Panel";

export const dynamic = "force-dynamic";

export default async function Home() {

  const weatherData = await getWeather(54.02634353916801, 19.03111796253137);
  const forecastData = await getForecast(54.02634353916801, 19.03111796253137);

  const tempCoord = { lat: 54.02634353916801, lng: 19.03111796253137 }

  return (
    <main className=" min-h-screen md:p-12 p-6">
      <div className="w-full">
        <p>To obtain weather data, drag and drop the marker.</p>
        <MapComponent coordinates={tempCoord} isInitial={true} />
      </div>
      <Panel forecastData={forecastData} weatherData={weatherData} />
    </main>
  );
}
