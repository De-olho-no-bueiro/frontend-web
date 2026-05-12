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

export default function ManholeInfoCard({ manhole, onFocus, selected = false }: ManholeInfoCardProps) {
  return (
    <button
      type="button"
      className={[
        'rounded-[1.5rem] border bg-white/95 p-5 text-left shadow-[0_20px_40px_rgba(45,95,158,0.1)] transition hover:-translate-y-px',
        selected ? 'border-[#29548d]/40 ring-2 ring-[#29548d]/20' : 'border-slate-200/70',
      ].join(' ')}
      onClick={onFocus}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
          <CircleDot size={20} />
        </span>
        <div>
          <h2 className="m-0 text-lg font-semibold text-slate-900">Bueiro Danificado</h2>
          <span className="text-sm text-slate-500">Ocorrência pontual</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50/80 p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">ID</span>
          <span className="mt-1 block text-sm font-semibold text-slate-800">{manhole.id}</span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Data de criação</span>
          <span className="mt-1 block text-sm font-semibold text-slate-800">{formatDate(manhole.dataHora)}</span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4 md:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Endereço</span>
          <span className="mt-1 block text-sm leading-6 text-slate-700">{manhole.endereco ?? '—'}</span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4 md:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Descrição</span>
          <span className="mt-1 block text-sm leading-6 text-slate-700">{manhole.descricao ?? '—'}</span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4">
          <div className="mb-2 flex items-center gap-2">
            <MapPinned size={16} className="text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Latitude</span>
          </div>
          <span className="font-mono text-sm text-slate-800">{manhole.latitude.toFixed(6)}</span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4">
          <div className="mb-2 flex items-center gap-2">
            <MapPinned size={16} className="text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Longitude</span>
          </div>
          <span className="font-mono text-sm text-slate-800">{manhole.longitude.toFixed(6)}</span>
        </div>
      </div>
    </button>
  );
}
