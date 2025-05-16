"use client";

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

// ✅ Updated coordinates for 57L Livingstone Street, Westmere, Auckland
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

      const { AdvancedMarkerElement, PinElement } =
        (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: 18,
        mapId: process.env.NEXT_PUBLIC_GCD_MAP_ID,
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // Customise the pin
      const greenCircle = document.createElement("span");
      greenCircle.className = "material-icons-outlined icon-24 text-green";
      greenCircle.innerText = "circle";
      const customPin = new PinElement({
        background: "transparent",
        borderColor: "transparent",
        glyph: greenCircle,
      });

      const marker = new AdvancedMarkerElement({
        position: center,
        map,
        content: customPin.element,
        title:
          "57L Livingstone Street, Westmere, Auckland 1022, New Zealand",
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
