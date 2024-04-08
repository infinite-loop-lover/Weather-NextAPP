"use client"

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { usePathname, useRouter } from 'next/navigation';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent: React.FC<{ coordinates: any, isInitial: boolean }> = ({ coordinates, isInitial }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markerRef = useRef<any>(null);
    const router = useRouter()

    const [tempWeatherCoord, setTempWeatherCoord] = useState<string>(() => {
        const storedUnit = localStorage.getItem("weatherCoord");
        return storedUnit !== null ? storedUnit : 'lat=54.02634353916801&lon=19.03111796253137';
    });

    useEffect(() => {
        if (!mapRef.current && mapContainer.current) {
            mapRef.current = new maplibregl.Map({
                container: mapContainer.current,
                style: 'https://tiles.stadiamaps.com/styles/osm_bright.json',
                center: [coordinates.lng, coordinates.lat],
                zoom: 5,
            });
        }
        const fetchData = async () => {
            if (coordinates) {
                const latLngArray: [number, number] = [coordinates.lng, coordinates.lat,];
                const newMarker = new maplibregl.Marker({
                    draggable: true
                })
                    .setLngLat(latLngArray)
                    .addTo(mapRef.current!);

                markerRef.current = newMarker;
                try {
                    const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.lat}&lon=${coordinates.lng}&apiKey=0ec0e266856d439495d78fbbe5907cdc`);
                    if (isInitial) {
                        router.push(`${process.env.NEXT_PUBLIC_APP_URL}/weather/${tempWeatherCoord}`);
                    }

                } catch (error) {
                    console.error('Error fetching street:', error);
                }
            }
        }
        fetchData();

        return () => {
            if (markerRef.current) {
                markerRef.current.remove();
                markerRef.current = null;
            }
        };
    }, []);


    useEffect(() => {
        if (markerRef.current) {
            // Event listener for marker drag end
            markerRef.current.on('dragend', async () => {
                const newCoordinates = markerRef.current.getLngLat();
                try {
                    // Fetch the street name using reverse geocoding API
                    const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${newCoordinates.lat}&lon=${newCoordinates.lng}&apiKey=0ec0e266856d439495d78fbbe5907cdc`);
                    const data = await response.json();

                    const query = `lat=${newCoordinates.lat}&lon=${newCoordinates.lng}`
                    localStorage.setItem("weatherCoord", query);
                    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/weather/${query}`);

                } catch (error) {
                    console.error('Error fetching street:', error);
                }
            });
        }
    }, [markerRef.current]);

    return <div id="map" style={{ height: '55vh', width: '100%', marginTop: 20, marginBottom: 20, padding: 0 }} ref={mapContainer}></div>;
};




export default MapComponent