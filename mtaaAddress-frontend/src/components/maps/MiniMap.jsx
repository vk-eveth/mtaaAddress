import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MiniMap({ marker }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!marker || !containerRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style: "https://api.maptiler.com/maps/hybrid/style.json?key=YOUR_MAPTILER_KEY",
      center: [marker.longitude, marker.latitude],
      zoom: 16,
      pitch: 45,
      interactive: false,
      antialias: true,
    });

    new maplibregl.Marker({ color: "#E63946" })
      .setLngLat([marker.longitude, marker.latitude])
      .addTo(mapRef.current);

    return () => mapRef.current?.remove();
  }, [marker]);

  return <div ref={containerRef} className="h-40 w-full rounded-md shadow-sm" />;
}
