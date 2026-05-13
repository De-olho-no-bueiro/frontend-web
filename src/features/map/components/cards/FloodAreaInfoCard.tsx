import { MapPinned, Waves } from 'lucide-react';
import type { FloodArea } from '@/features/map/models/MapTypes';
import { NIVEL_LABELS, NIVEL_COLORS } from '@/features/map/models/MapTypes';

interface FloodAreaInfoCardProps {
  floodArea: FloodArea;
  onFocus?: () => void;
  selected?: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const rowClass = 'border-b border-slate-100 py-3 last:border-b-0';

export default function FloodAreaInfoCard({ floodArea, onFocus, selected = false }: FloodAreaInfoCardProps) {
  const colors = NIVEL_COLORS[floodArea.nivel];

  return (
    <button
      type="button"
      className={[
        'rounded-2xl border bg-white/95 p-4 text-left shadow-[var(--ui-panel-shadow)] ring-1 ring-slate-200/30 transition hover:bg-slate-50/90',
        selected ? 'border-brand-eyebrow/50 ring-2 ring-brand-eyebrow/15' : 'border-slate-200/80',
      ].join(' ')}
      onClick={onFocus}
    >
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-brand-navy-900">
            <Waves size={20} />
          </span>
          <div>
            <h3 className="m-0 text-base font-semibold text-slate-900">Área de Alagamento</h3>
            <span className="text-sm text-slate-500">Ocorrência territorial</span>
          </div>
        </div>
        <span
          className="shrink-0 rounded-md px-2 py-1 text-xs font-bold uppercase tracking-[0.06em] text-white"
          style={{ backgroundColor: colors.badge }}
        >
          {NIVEL_LABELS[floodArea.nivel]}
        </span>
      </div>

      <div className="grid md:grid-cols-2">
        <div className={`${rowClass} md:border-r md:border-slate-100 md:pr-4`}>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">ID</span>
          <span className="mt-1 block text-sm font-semibold text-slate-800">{floodArea.id}</span>
        </div>

        <div className={`${rowClass} md:pl-4`}>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Data de criação</span>
          <span className="mt-1 block text-sm font-semibold text-slate-800">{formatDate(floodArea.dataHora)}</span>
        </div>

        <div className={`${rowClass} md:col-span-2`}>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Endereço</span>
          <span className="mt-1 block text-sm leading-6 text-slate-700">{floodArea.endereco ?? '—'}</span>
        </div>

        <div className={`${rowClass} md:col-span-2`}>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Descrição</span>
          <span className="mt-1 block text-sm leading-6 text-slate-700">{floodArea.descricao ?? '—'}</span>
        </div>

        <div className={`${rowClass} md:col-span-2`}>
          <div className="mb-2 flex items-center gap-2">
            <MapPinned size={16} className="text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Coordenadas ({floodArea.coordinates.length} pontos)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {floodArea.coordinates.map((c, i) => (
              <span
                key={i}
                className="rounded-md border border-slate-200/90 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-700"
              >
                P{i + 1}: {c.latitude.toFixed(4)}, {c.longitude.toFixed(4)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
