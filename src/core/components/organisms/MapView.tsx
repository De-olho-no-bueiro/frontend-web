'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { FloodArea, Manhole } from '@/features/map/models/MapTypes';
import { NIVEL_COLORS } from '@/features/map/models/MapTypes';

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  floodAreas?: FloodArea[];
  manholes?: Manhole[];
  focusLocation?: { latitude: number; longitude: number; timestamp: number } | null;
  selectedOccurrenceId?: string | null;
  emptyState?: boolean;
}

const DEFAULT_CENTER: [number, number] = [-23.5505, -46.6333];
const DEFAULT_ZOOM = 13;

function createManholeIcon() {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        position: relative;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 149, 0, 0.25);
        "></div>
        <div style="
          position: relative;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #FF9500;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        "></div>
      </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function MapController({
  focusLocation,
  floodAreas,
  manholes,
}: {
  focusLocation: MapViewProps['focusLocation'];
  floodAreas: FloodArea[];
  manholes: Manhole[];
}) {
  const map = useMap();

  useEffect(() => {
    if (focusLocation) {
      map.flyTo([focusLocation.latitude, focusLocation.longitude], 16, {
        duration: 1.5,
      });
    }
  }, [focusLocation, map]);

  useEffect(() => {
    if (focusLocation || (floodAreas.length === 0 && manholes.length === 0)) return;

    const bounds = L.latLngBounds([]);

    floodAreas.forEach((floodArea) => {
      floodArea.coordinates.forEach((coordinate) => {
        bounds.extend([coordinate.latitude, coordinate.longitude]);
      });
    });

    manholes.forEach((manhole) => {
      bounds.extend([manhole.latitude, manhole.longitude]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [focusLocation, floodAreas, manholes, map]);

  return null;
}

export default function MapView({
  center,
  zoom,
  floodAreas = [],
  manholes = [],
  focusLocation,
  selectedOccurrenceId,
  emptyState = false,
}: MapViewProps) {
  useEffect(() => {
    // Leaflet exige redefinir urls padrao no Next.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  const manholeIcon = createManholeIcon();

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {emptyState && <div className="map-view-empty-state">Nenhum ponto para mostrar neste recorte.</div>}

      <MapContainer
        center={center ?? DEFAULT_CENTER}
        zoom={zoom ?? DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%' }}
        zoomControl
      >
        <MapController focusLocation={focusLocation} floodAreas={floodAreas} manholes={manholes} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {floodAreas.map((floodArea) => {
          const colors = NIVEL_COLORS[floodArea.nivel];
          const positions = floodArea.coordinates.map(
            (coordinate) => [coordinate.latitude, coordinate.longitude] as [number, number],
          );
          const isSelected = selectedOccurrenceId === floodArea.id;

          return (
            <Polygon
              key={floodArea.id}
              positions={positions}
              pathOptions={{
                fillColor: colors.fill,
                fillOpacity: isSelected ? 0.9 : 0.75,
                color: colors.stroke,
                weight: isSelected ? 4 : 2,
              }}
            >
              <Popup>
                <strong>Area de alagamento</strong>
                <div>{floodArea.endereco ?? 'Endereco nao informado'}</div>
              </Popup>
            </Polygon>
          );
        })}

        {manholes.map((manhole) => (
          <Marker key={manhole.id} position={[manhole.latitude, manhole.longitude]} icon={manholeIcon}>
            <Popup>
              <strong>{selectedOccurrenceId === manhole.id ? 'Bueiro selecionado' : 'Bueiro danificado'}</strong>
              <div>{manhole.endereco ?? 'Endereco nao informado'}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
