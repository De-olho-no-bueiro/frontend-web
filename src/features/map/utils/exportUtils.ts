import type { FloodArea, Manhole } from '@/features/map/models/MapTypes';

export interface MonthGroup {
  key: string;        // ex: "2026-03"
  label: string;      // ex: "Março/2026"
  floodAreas: FloodArea[];
  manholes: Manhole[];
}

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function monthKey(iso: string): string {
  const d = new Date(iso);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function monthLabel(key: string): string {
  const [year, month] = key.split('-');
  return `${MONTH_NAMES[parseInt(month) - 1]}/${year}`;
}

export function groupByMonth(floodAreas: FloodArea[], manholes: Manhole[]): MonthGroup[] {
  const map = new Map<string, MonthGroup>();

  for (const fa of floodAreas) {
    const key = monthKey(fa.dataHora);
    if (!map.has(key)) map.set(key, { key, label: monthLabel(key), floodAreas: [], manholes: [] });
    map.get(key)!.floodAreas.push(fa);
  }

  for (const m of manholes) {
    const key = monthKey(m.dataHora);
    if (!map.has(key)) map.set(key, { key, label: monthLabel(key), floodAreas: [], manholes: [] });
    map.get(key)!.manholes.push(m);
  }

  // Ordem cronológica decrescente
  return Array.from(map.values()).sort((a, b) => b.key.localeCompare(a.key));
}

function escapeCsvValue(value: string | number | null | undefined) {
  const normalized = value == null ? '' : String(value);
  return `"${normalized.replace(/"/g, '""')}"`;
}

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function toCsvRows(floodAreas: FloodArea[], manholes: Manhole[]) {
  const header = [
    'tipo',
    'id',
    'nivel',
    'data_criacao',
    'endereco',
    'descricao',
    'latitude',
    'longitude',
    'coordenadas_area',
  ];

  const floodRows = floodAreas.map((floodArea) => [
    'alagamento',
    floodArea.id,
    floodArea.nivel,
    floodArea.dataHora,
    floodArea.endereco ?? '',
    floodArea.descricao ?? '',
    floodArea.coordinates[0]?.latitude ?? '',
    floodArea.coordinates[0]?.longitude ?? '',
    floodArea.coordinates
      .map((coordinate) => `${coordinate.latitude},${coordinate.longitude}`)
      .join(' | '),
  ]);

  const manholeRows = manholes.map((manhole) => [
    'bueiro',
    manhole.id,
    '',
    manhole.dataHora,
    manhole.endereco ?? '',
    manhole.descricao ?? '',
    manhole.latitude,
    manhole.longitude,
    '',
  ]);

  return [header, ...floodRows, ...manholeRows]
    .map((row) => row.map((value) => escapeCsvValue(value)).join(','))
    .join('\n');
}

export function exportMonthAsCsv(group: MonthGroup): void {
  const csv = toCsvRows(group.floodAreas, group.manholes);
  downloadCsv(csv, `donb-${group.key}.csv`);
}

export function exportDataAsCsv(floodAreas: FloodArea[], manholes: Manhole[]): void {
  const csv = toCsvRows(floodAreas, manholes);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadCsv(csv, `donb-tabela-${dateStr}.csv`);
}
