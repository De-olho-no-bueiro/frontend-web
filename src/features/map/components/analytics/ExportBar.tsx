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
    <div className="flex flex-wrap items-center gap-4 rounded-[1.3rem] border border-slate-200/70 bg-slate-50/80 px-4 py-3">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-700">Exportacao de tabela</span>
        <span className="text-xs leading-5 text-slate-500">CSV com linhas filtradas do painel. Acao pede confirmacao.</span>
      </div>
      <button
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#17365f_0%,#2d7cc4_100%)] px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(23,54,95,0.18)] transition hover:-translate-y-px"
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
