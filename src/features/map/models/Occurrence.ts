import type { FloodArea, Manhole, NivelAlagamento } from '@/features/map/models/MapTypes';

export type OccurrenceType = 'floodArea' | 'manhole';

export interface Occurrence {
  id: string;
  type: OccurrenceType;
  typeLabel: string;
  title: string;
  description: string;
  address: string;
  neighborhood: string;
  createdAt: string;
  timestamp: number;
  year: number;
  month: number;
  level: NivelAlagamento | null;
  latitude: number;
  longitude: number;
  searchText: string;
  floodArea?: FloodArea;
  manhole?: Manhole;
}

function getYearMonth(iso: string) {
  const date = new Date(iso);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
  };
}

function extractNeighborhood(address?: string) {
  if (!address) return 'Nao informado';

  const normalized = address.replace(/\s+/g, ' ').trim();
  const dashSplit = normalized.split('—').map((part) => part.trim()).filter(Boolean);
  const candidate = dashSplit.length > 1 ? dashSplit[1] : dashSplit[0];
  const neighborhood = candidate.split(',')[0]?.trim();

  return neighborhood || 'Nao informado';
}

export function normalizeFloodArea(floodArea: FloodArea): Occurrence {
  const firstPoint = floodArea.coordinates[0] ?? { latitude: 0, longitude: 0 };
  const { year, month } = getYearMonth(floodArea.dataHora);
  const neighborhood = extractNeighborhood(floodArea.endereco);

  return {
    id: floodArea.id,
    type: 'floodArea',
    typeLabel: 'Alagamento',
    title: 'Area de alagamento',
    description: floodArea.descricao ?? 'Sem descricao',
    address: floodArea.endereco ?? 'Nao informado',
    neighborhood,
    createdAt: floodArea.dataHora,
    timestamp: new Date(floodArea.dataHora).getTime(),
    year,
    month,
    level: floodArea.nivel,
    latitude: firstPoint.latitude,
    longitude: firstPoint.longitude,
    searchText: [
      floodArea.id,
      floodArea.descricao,
      floodArea.endereco,
      neighborhood,
      floodArea.nivel,
      'alagamento',
      'area',
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
    floodArea,
  };
}

export function normalizeManhole(manhole: Manhole): Occurrence {
  const { year, month } = getYearMonth(manhole.dataHora);
  const neighborhood = extractNeighborhood(manhole.endereco);

  return {
    id: manhole.id,
    type: 'manhole',
    typeLabel: 'Bueiro',
    title: 'Bueiro danificado',
    description: manhole.descricao ?? 'Sem descricao',
    address: manhole.endereco ?? 'Nao informado',
    neighborhood,
    createdAt: manhole.dataHora,
    timestamp: new Date(manhole.dataHora).getTime(),
    year,
    month,
    level: null,
    latitude: manhole.latitude,
    longitude: manhole.longitude,
    searchText: [
      manhole.id,
      manhole.descricao,
      manhole.endereco,
      neighborhood,
      'bueiro',
      'danificado',
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
    manhole,
  };
}

export function normalizeOccurrences(floodAreas: FloodArea[], manholes: Manhole[]) {
  return [
    ...floodAreas.map(normalizeFloodArea),
    ...manholes.map(normalizeManhole),
  ].sort((left, right) => right.timestamp - left.timestamp);
}
