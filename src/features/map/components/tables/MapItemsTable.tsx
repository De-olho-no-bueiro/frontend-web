import { ArrowDown, ArrowUp, ArrowUpDown, CircleDot } from 'lucide-react';
import { uiPanelClass } from '@/core/layouts/siteContentFrame';
import type { FloodArea, Manhole } from '@/features/map/models/MapTypes';
import { NIVEL_LABELS, NIVEL_COLORS } from '@/features/map/models/MapTypes';
import type { SortConfig, SortKey } from '@/features/map/utils/occurrenceUtils';

interface MapItemsTableProps {
  floodAreas: FloodArea[];
  manholes: Manhole[];
  onFocus: (lat: number, lng: number, id: string) => void;
  sortConfig?: SortConfig;
  onSort?: (key: SortKey) => void;
  selectedId?: string | null;
  resultCount?: number;
}

type MapItem = { type: 'floodArea'; data: FloodArea } | { type: 'manhole'; data: Manhole };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MapItemsTable({
  floodAreas,
  manholes,
  onFocus,
  sortConfig,
  onSort,
  selectedId,
  resultCount,
}: MapItemsTableProps) {
  const items: MapItem[] = [
    ...floodAreas.map((floodArea) => ({ type: 'floodArea' as const, data: floodArea })),
    ...manholes.map((manhole) => ({ type: 'manhole' as const, data: manhole })),
  ];

  if (!sortConfig) {
    items.sort((left, right) => new Date(right.data.dataHora).getTime() - new Date(left.data.dataHora).getTime());
  }

  function renderSortIcon(key: SortKey) {
    if (!sortConfig || sortConfig.key !== key) return <ArrowUpDown size={14} className="text-brand-muted" />;
    return sortConfig.direction === 'asc'
      ? <ArrowUp size={14} className="text-brand-eyebrow" />
      : <ArrowDown size={14} className="text-brand-eyebrow" />;
  }

  if (items.length === 0) return null;

  const headClass = 'px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.08em] text-brand-muted';

  return (
    <div className={`${uiPanelClass} p-5 sm:p-6`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="m-0 text-xl font-bold tracking-tight text-brand-heading">Tabela de Ocorrencias</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-brand-muted">
          {resultCount ?? items.length} resultados filtrados
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200/60">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th onClick={() => onSort?.('type')} className={`${headClass} cursor-pointer`}><span className="inline-flex items-center gap-1">Tipo {renderSortIcon('type')}</span></th>
              <th onClick={() => onSort?.('nivel')} className={`${headClass} cursor-pointer`}><span className="inline-flex items-center gap-1">Nivel {renderSortIcon('nivel')}</span></th>
              <th onClick={() => onSort?.('id')} className={`${headClass} cursor-pointer`}><span className="inline-flex items-center gap-1">ID {renderSortIcon('id')}</span></th>
              <th onClick={() => onSort?.('dataHora')} className={`${headClass} cursor-pointer`}><span className="inline-flex items-center gap-1">Data de criacao {renderSortIcon('dataHora')}</span></th>
              <th onClick={() => onSort?.('endereco')} className={`${headClass} cursor-pointer`}><span className="inline-flex items-center gap-1">Endereco {renderSortIcon('endereco')}</span></th>
              <th onClick={() => onSort?.('descricao')} className={`${headClass} cursor-pointer`}><span className="inline-flex items-center gap-1">Descricao {renderSortIcon('descricao')}</span></th>
              <th className={headClass}>Detalhes / Coordenadas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {items.map((item) => {
              if (item.type === 'floodArea') {
                const floodArea = item.data;
                const colors = NIVEL_COLORS[floodArea.nivel] || NIVEL_COLORS['medio'];
                const label = NIVEL_LABELS[floodArea.nivel] || 'Desconhecido';

                return (
                  <tr
                    key={`fa-${floodArea.id}`}
                    className={[
                      'cursor-pointer transition hover:bg-sky-50/70',
                      selectedId === floodArea.id ? 'bg-sky-50/80' : '',
                    ].join(' ')}
                    onClick={() => onFocus(floodArea.coordinates[0].latitude, floodArea.coordinates[0].longitude, floodArea.id)}
                  >
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-2">
                        <span className="font-semibold text-slate-800">Area de Alagamento</span>
                        <span className="w-fit rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white" style={{ backgroundColor: colors.badge }}>
                          {label}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-700">{label}</td>
                    <td className="px-4 py-4 font-medium text-slate-800">{floodArea.id}</td>
                    <td className="px-4 py-4 text-slate-700">{formatDate(floodArea.dataHora)}</td>
                    <td className="px-4 py-4 text-slate-700">{floodArea.endereco || '—'}</td>
                    <td className="px-4 py-4 text-slate-700">{floodArea.descricao || '—'}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {floodArea.coordinates.map((coordinate, index) => (
                          <div key={index} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                            P{index + 1}: {coordinate.latitude.toFixed(4)}, {coordinate.longitude.toFixed(4)}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              }

              const manhole = item.data;

              return (
                <tr
                  key={`mh-${manhole.id}`}
                  className={[
                    'cursor-pointer transition hover:bg-orange-50/70',
                    selectedId === manhole.id ? 'bg-orange-50/70' : '',
                  ].join(' ')}
                  onClick={() => onFocus(manhole.latitude, manhole.longitude, manhole.id)}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                        <CircleDot size={16} />
                      </span>
                      <span className="font-semibold text-slate-800">Bueiro Danificado</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-400">—</td>
                  <td className="px-4 py-4 font-medium text-slate-800">{manhole.id}</td>
                  <td className="px-4 py-4 text-slate-700">{formatDate(manhole.dataHora)}</td>
                  <td className="px-4 py-4 text-slate-700">{manhole.endereco || '—'}</td>
                  <td className="px-4 py-4 text-slate-700">{manhole.descricao || '—'}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">Lat: {manhole.latitude.toFixed(6)}</div>
                      <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">Lng: {manhole.longitude.toFixed(6)}</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
