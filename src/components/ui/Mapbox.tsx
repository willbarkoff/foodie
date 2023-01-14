import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactVisibilitySensor from 'react-visibility-sensor';

import "./Mapbox.styl"

console.log(process)

mapboxgl.accessToken = process.env.MAPBOX_PK!;

const Mapbox: React.FC<{ minHeight: number | string, startLng: number, startLat: number, startZoom: number, marker: [number, number] | null }>
    = ({ minHeight, startLng, startLat, startZoom, marker }) => {
        const container = React.useRef(null);
        const map = React.useRef<mapboxgl.Map | null>(null);
        const [lng, setLng] = React.useState(startLng);
        const [lat, setLat] = React.useState(startLat);
        const [zoom, setZoom] = React.useState(startZoom);
        const [isVisible, setVisible] = React.useState(false);

        useEffect(() => {
            if (!isVisible || map.current) return;
            if (!container.current) throw new Error("No map container");
            map.current = new mapboxgl.Map({
                container: container.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom
            });

            if (marker) {
                const markerIcon = document.createElement('div');
                markerIcon.className = 'marker';
                const markerContainer = document.createElement('div');
                markerContainer.appendChild(markerIcon)
                new mapboxgl.Marker(markerContainer).setLngLat(marker).addTo(map.current);
            }
        })

        useEffect(() => {
            if (isVisible && map.current) {
                map.current.on('move', () => {
                    setLng(map.current!.getCenter().lng);
                    setLat(map.current!.getCenter().lat);
                    setZoom(map.current!.getZoom());
                });
            }
        });

        return <ReactVisibilitySensor partialVisibility onChange={(isVisible: boolean) => setVisible(isVisible)}>
            <div ref={container} className="map-container" style={{ minHeight }} />
        </ReactVisibilitySensor>
    }

export { Mapbox };