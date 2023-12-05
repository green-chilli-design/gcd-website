"use client";

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const center = {
  lat: -36.849530258746896,
  lng: 174.75714348593007,
};

export default function LocationMap() {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;
      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: 18,
        mapId: process.env.NEXT_PUBLIC_GCD_MAP_ID,
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // custom marker
      const greenCircle = document.createElement("div");
      greenCircle.className = "bg-green rounded-full w-5 h-5";

      const marker = new AdvancedMarkerElement({
        position: center,
        map,
        content: greenCircle,
      });
    };

    initMap();
  }, []);

  return <div ref={mapRef} className="w-full h-96"></div>;
}
