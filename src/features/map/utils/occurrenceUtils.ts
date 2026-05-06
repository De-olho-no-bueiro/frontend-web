import type { NivelAlagamento } from '@/features/map/models/MapTypes';
import type { Occurrence, OccurrenceType } from '@/features/map/models/Occurrence';

export type DashboardFilters = {
  year: number;
  month: number;
  query: string;
  type: 'all' | OccurrenceType;
  level: 'all' | NivelAlagamento;
};

export type SortConfig = {
  key: SortKey;
  direction: 'asc' | 'desc';
};

export type SortKey = 'type' | 'nivel' | 'id' | 'dataHora' | 'endereco' | 'descricao';

export type ChartDatum = {
  label: string;
  value: number;
  color?: string;
};

export function filterOccurrences(occurrences: Occurrence[], filters: DashboardFilters) {
  const query = filters.query.trim().toLowerCase();

  return occurrences.filter((occurrence) => {
    const matchesYear = occurrence.year === filters.year;
    const matchesMonth = filters.month === 0 || occurrence.month === filters.month;
    const matchesType = filters.type === 'all' || occurrence.type === filters.type;
    const matchesLevel = filters.level === 'all' || occurrence.level === filters.level;
    const matchesQuery = !query || occurrence.searchText.includes(query);

    return matchesYear && matchesMonth && matchesType && matchesLevel && matchesQuery;
  });
}

export function sortOccurrences(occurrences: Occurrence[], sortConfig: SortConfig) {
  const items = [...occurrences];

  const valueByKey: Record<Exclude<SortKey, 'dataHora' | 'type' | 'nivel'>, (item: Occurrence) => string> = {
    id: (item) => item.id,
    endereco: (item) => item.address,
    descricao: (item) => item.description,
  };

  items.sort((left, right) => {
    const { key, direction } = sortConfig;
    const factor = direction === 'asc' ? 1 : -1;

    if (key === 'dataHora') {
      return (left.timestamp - right.timestamp) * factor;
    }

    if (key === 'type') {
      return left.typeLabel.localeCompare(right.typeLabel, 'pt-BR') * factor;
    }

    if (key === 'nivel') {
      return (left.level ?? '').localeCompare(right.level ?? '', 'pt-BR') * factor;
    }

    const leftValue = valueByKey[key](left).toLowerCase();
    const rightValue = valueByKey[key](right).toLowerCase();

    return leftValue.localeCompare(rightValue, 'pt-BR') * factor;
  });

  return items;
}

export function paginateOccurrences(occurrences: Occurrence[], currentPage: number, pageSize: number) {
  const start = (currentPage - 1) * pageSize;
  return occurrences.slice(start, start + pageSize);
}

export function buildMonthlyChartData(occurrences: Occurrence[]): ChartDatum[] {
  const grouped = new Map<string, number>();

  occurrences.forEach((occurrence) => {
    const label = new Date(occurrence.createdAt).toLocaleDateString('pt-BR', {
      month: 'short',
      year: '2-digit',
    });
    grouped.set(label, (grouped.get(label) ?? 0) + 1);
  });

  return Array.from(grouped.entries()).map(([label, value]) => ({ label, value }));
}

export function buildTypeChartData(occurrences: Occurrence[]): ChartDatum[] {
  const floodCount = occurrences.filter((item) => item.type === 'floodArea').length;
  const manholeCount = occurrences.filter((item) => item.type === 'manhole').length;

  return [
    { label: 'Alagamentos', value: floodCount, color: '#0f766e' },
    { label: 'Bueiros', value: manholeCount, color: '#f97316' },
  ].filter((item) => item.value > 0);
}

export function buildLevelChartData(occurrences: Occurrence[]): ChartDatum[] {
  const counters = new Map<string, number>([
    ['Baixo', 0],
    ['Leve', 0],
    ['Medio', 0],
    ['Grave', 0],
  ]);

  occurrences.forEach((occurrence) => {
    if (!occurrence.level) return;

    const labelMap: Record<NivelAlagamento, string> = {
      baixo: 'Baixo',
      leve: 'Leve',
      medio: 'Medio',
      grave: 'Grave',
    };

    const label = labelMap[occurrence.level];
    counters.set(label, (counters.get(label) ?? 0) + 1);
  });

  const colors: Record<string, string> = {
    Baixo: '#475569',
    Leve: '#eab308',
    Medio: '#f97316',
    Grave: '#dc2626',
  };

  return Array.from(counters.entries())
    .map(([label, value]) => ({ label, value, color: colors[label] }))
    .filter((item) => item.value > 0);
}

export function buildNeighborhoodChartData(occurrences: Occurrence[]): ChartDatum[] {
  const grouped = new Map<string, number>();

  occurrences.forEach((occurrence) => {
    grouped.set(occurrence.neighborhood, (grouped.get(occurrence.neighborhood) ?? 0) + 1);
  });

  return Array.from(grouped.entries())
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5)
    .map(([label, value]) => ({ label, value }));
}

export function getLatestUpdateLabel(occurrences: Occurrence[]) {
  if (occurrences.length === 0) return 'Sem dados';

  return new Date(occurrences[0].createdAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
