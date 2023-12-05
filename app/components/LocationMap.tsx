"use client";

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const center = {
  lat: -36.84942242650752,
  lng: 174.75708412460006,
};

export default function LocationMap() {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
      });
      const { Map, InfoWindow } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } =
        (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;
      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: 18,
        mapId: process.env.NEXT_PUBLIC_GCD_MAP_ID,
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
      const infoWindow = new InfoWindow();

      // Customise the pin
      const greenCircle = document.createElement("span");
      greenCircle.className = "material-symbols-outlined icon-24 text-green";
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
          "WHATEVER Building 2.4/18 Sale Street, Auckland CBD, Auckland 1010, New Zealand",
      });

      const infoWindowOptions: google.maps.InfoWindowOptions = {};

      marker.addListener("click", () => {
        console.log("ran");
        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
      });
    };

    initMap();
  }, []);

  return <div ref={mapRef} className="w-full h-96"></div>;
}
