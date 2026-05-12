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

export default function FloodAreaInfoCard({ floodArea, onFocus, selected = false }: FloodAreaInfoCardProps) {
  const colors = NIVEL_COLORS[floodArea.nivel];

  return (
    <button
      type="button"
      className={[
        'rounded-[1.5rem] border bg-white/95 p-5 text-left shadow-[0_20px_40px_rgba(45,95,158,0.1)] transition hover:-translate-y-px',
        selected ? 'border-[#29548d]/40 ring-2 ring-[#29548d]/20' : 'border-slate-200/70',
      ].join(' ')}
      onClick={onFocus}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-[#17365f]">
            <Waves size={22} />
          </span>
          <div>
            <h2 className="m-0 text-lg font-semibold text-slate-900">Área de Alagamento</h2>
            <span className="text-sm text-slate-500">Ocorrência territorial</span>
          </div>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white"
          style={{ backgroundColor: colors.badge }}
        >
          {NIVEL_LABELS[floodArea.nivel]}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50/80 p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">ID</span>
          <span className="mt-1 block text-sm font-semibold text-slate-800">{floodArea.id}</span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Data de criação</span>
          <span className="mt-1 block text-sm font-semibold text-slate-800">{formatDate(floodArea.dataHora)}</span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4 md:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Endereço</span>
          <span className="mt-1 block text-sm leading-6 text-slate-700">{floodArea.endereco ?? '—'}</span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4 md:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Descrição</span>
          <span className="mt-1 block text-sm leading-6 text-slate-700">{floodArea.descricao ?? '—'}</span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4 md:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <MapPinned size={16} className="text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Coordenadas ({floodArea.coordinates.length} pontos)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {floodArea.coordinates.map((c, i) => (
              <span key={i} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80">
                P{i + 1}: {c.latitude.toFixed(4)}, {c.longitude.toFixed(4)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
