import { CircleDot, MapPinned } from 'lucide-react';
import type { Manhole } from '@/features/map/models/MapTypes';

interface ManholeInfoCardProps {
  manhole: Manhole;
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

export default function ManholeInfoCard({ manhole, onFocus, selected = false }: ManholeInfoCardProps) {
  return (
    <button
      type="button"
      className={[
        'rounded-2xl border bg-white/95 p-4 text-left shadow-[var(--ui-panel-shadow)] ring-1 ring-slate-200/30 transition hover:bg-slate-50/90',
        selected ? 'border-brand-eyebrow/50 ring-2 ring-brand-eyebrow/15' : 'border-slate-200/80',
      ].join(' ')}
      onClick={onFocus}
    >
      <div className="mb-3 flex items-center gap-3 border-b border-slate-100 pb-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
          <CircleDot size={18} />
        </span>
        <div>
          <h3 className="m-0 text-base font-semibold text-slate-900">Bueiro Danificado</h3>
          <span className="text-sm text-slate-500">Ocorrência pontual</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <div className={`${rowClass} md:border-r md:border-slate-100 md:pr-4`}>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">ID</span>
          <span className="mt-1 block text-sm font-semibold text-slate-800">{manhole.id}</span>
        </div>

        <div className={`${rowClass} md:pl-4`}>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Data de criação</span>
          <span className="mt-1 block text-sm font-semibold text-slate-800">{formatDate(manhole.dataHora)}</span>
        </div>

        <div className={`${rowClass} md:col-span-2`}>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Endereço</span>
          <span className="mt-1 block text-sm leading-6 text-slate-700">{manhole.endereco ?? '—'}</span>
        </div>

        <div className={`${rowClass} md:col-span-2`}>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Descrição</span>
          <span className="mt-1 block text-sm leading-6 text-slate-700">{manhole.descricao ?? '—'}</span>
        </div>

        <div className={`${rowClass} md:border-r md:border-slate-100 md:pr-4`}>
          <div className="mb-1 flex items-center gap-2">
            <MapPinned size={16} className="text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Latitude</span>
          </div>
          <span className="font-mono text-sm text-slate-800">{manhole.latitude.toFixed(6)}</span>
        </div>

        <div className={`${rowClass} md:pl-4`}>
          <div className="mb-1 flex items-center gap-2">
            <MapPinned size={16} className="text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Longitude</span>
          </div>
          <span className="font-mono text-sm text-slate-800">{manhole.longitude.toFixed(6)}</span>
        </div>
      </div>
    </button>
  );
}
