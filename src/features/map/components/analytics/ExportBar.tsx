'use client';

import { Download } from 'lucide-react';
import type { FloodArea, Manhole } from '@/features/map/models/MapTypes';
import { exportDataAsCsv, MONTH_NAMES } from '@/features/map/utils/exportUtils';

interface ExportBarProps {
  floodAreas: FloodArea[];
  manholes: Manhole[];
  selectedYear: number;
  selectedMonth: number;
}

export default function ExportBar({ floodAreas, manholes, selectedYear, selectedMonth }: ExportBarProps) {
  const total = floodAreas.length + manholes.length;

  if (total === 0) return null;

  const periodLabel = selectedMonth === 0 ? `Todos de ${selectedYear}` : `${MONTH_NAMES[selectedMonth - 1]}/${selectedYear}`;

  const handleExport = () => {
    const confirmed = window.confirm(`Exportar tabela filtrada em CSV?\n\nPeriodo: ${periodLabel}\nRegistros: ${total}`);
    if (!confirmed) return;
    exportDataAsCsv(floodAreas, manholes);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200/60 bg-slate-50/90 px-5 py-4 shadow-[var(--ui-panel-shadow)] ring-1 ring-slate-200/30">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-brand-heading">Exportacao de tabela</span>
        <span className="text-xs leading-5 text-brand-muted">CSV com linhas filtradas do painel. Acao pede confirmacao.</span>
      </div>
      <button
        className="inline-flex min-h-11 items-center gap-2 rounded-xl [background-image:var(--gradient-cta)] px-4 text-sm font-semibold text-[var(--brand-white)] shadow-[0_10px_22px_color-mix(in_srgb,var(--brand-navy-900)_16%,transparent)] transition hover:opacity-[0.96]"
        onClick={handleExport}
        title="Exportar tabela filtrada em CSV"
      >
        <Download size={16} strokeWidth={2} />
        <span>Exportar tabela CSV</span>
        <span className="h-4 w-px bg-white/30" />
        <span>{periodLabel}</span>
        <span className="rounded-full bg-white/15 px-2 py-1 text-xs">{total} registros</span>
      </button>
    </div>
  );
}
