// src/components/LocationMap.jsx
import { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function LocationMap({ marker, setMarker, viewport, setViewport }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const fallbackView = {
    latitude: -3.3869,
    longitude: 36.683,
    zoom: 14,
  };

  const initialViewport = {
    latitude: viewport?.latitude ?? fallbackView.latitude,
    longitude: viewport?.longitude ?? fallbackView.longitude,
    zoom: viewport?.zoom ?? fallbackView.zoom,
  };

  useEffect(() => {
    if (mapRef.current) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const userLat = pos.coords.latitude;
      const userLng = pos.coords.longitude;

      mapRef.current = new maplibregl.Map({
        container: mapContainerRef.current,
        style: 'https://api.maptiler.com/maps/hybrid/style.json?key=FTt3I8LiVKKxpo6LXCtJ',
        center: [userLng, userLat],
        zoom: 16,
        pitch: 60,
        bearing: -10,
        antialias: true,
      });

      setViewport({ latitude: userLat, longitude: userLng, zoom: 16 });
      setMarker({ latitude: userLat, longitude: userLng });

      mapRef.current._marker = new maplibregl.Marker({ color: '#E63946' })
        .setLngLat([userLng, userLat])
        .addTo(mapRef.current);

      mapRef.current.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');
      mapRef.current.addControl(new maplibregl.FullscreenControl(), 'top-right');
      mapRef.current.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-right');
      mapRef.current.addControl(new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showAccuracyCircle: false,
      }), 'top-left');

      mapRef.current.on('click', (e) => {
        const coords = {
          latitude: e.lngLat.lat,
          longitude: e.lngLat.lng,
        };

        setMarker(coords);
        setViewport({ latitude: coords.latitude, longitude: coords.longitude, zoom: 16 });

        if (mapRef.current._marker) {
          mapRef.current._marker.setLngLat(e.lngLat);
        } else {
          mapRef.current._marker = new maplibregl.Marker({ color: '#E63946' })
            .setLngLat(e.lngLat)
            .addTo(mapRef.current);
        }

        mapRef.current.flyTo({ center: [coords.longitude, coords.latitude], zoom: 16, essential: true });
      });
    }, () => {
      alert('Geolocation not available');
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || !marker) return;

    const lngLat = [marker.longitude, marker.latitude];
    mapRef.current.flyTo({ center: lngLat, zoom: 16 });

    if (!mapRef.current._marker) {
      mapRef.current._marker = new maplibregl.Marker({ color: '#E63946' })
        .setLngLat(lngLat)
        .addTo(mapRef.current);
    } else {
      mapRef.current._marker.setLngLat(lngLat);
    }
  }, [marker]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-lg shadow-md border border-gray-300"
    />
  );
}