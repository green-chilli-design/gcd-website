"use client";

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const center = {
  lat: -36.85315287975184,
  lng: 174.72844437610172,
};

export default function LocationMap() {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Google Maps API key");
  }

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey,
        version: "weekly",
      });

      const { Map, InfoWindow } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement } =
        (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: 18,
        mapId: process.env.NEXT_PUBLIC_GCD_MAP_ID,
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // 📍 SVG Pin Icon Element
      const svgPin = document.createElement("div");
      svgPin.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="48"
          height="48"
          fill="#00A859"
          stroke="#ffffff"
          stroke-width="1.5"
        >
          <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
        </svg>
      `;

      const marker = new AdvancedMarkerElement({
        position: center,
        map,
        content: svgPin,
        title: "57L Livingstone Street, Westmere, Auckland 1022, New Zealand",
      });

      const infoWindow = new InfoWindow();
      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
      });
    };

    initMap();
  }, [apiKey]);

  return <div ref={mapRef} className="h-[388px] w-full dark:text-black"></div>;
}
