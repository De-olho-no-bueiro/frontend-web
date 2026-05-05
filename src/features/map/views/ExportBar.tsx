'use client';

import type { FloodArea, Manhole } from '@/features/map/models/MapTypes';
import { exportDataAsCsv, MONTH_NAMES } from '@/features/map/utils/exportUtils';
import './ExportBar.css';

interface ExportBarProps {
  floodAreas: FloodArea[];
  manholes: Manhole[];
  selectedYear: number;
  selectedMonth: number;
}

const DownloadIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" height="16" 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function ExportBar({ floodAreas, manholes, selectedYear, selectedMonth }: ExportBarProps) {
  const total = floodAreas.length + manholes.length;

  if (total === 0) return null;

  const periodLabel = selectedMonth === 0
    ? `Todos de ${selectedYear}`
    : `${MONTH_NAMES[selectedMonth - 1]}/${selectedYear}`;

  const handleExport = () => {
    const confirmed = window.confirm(
      `Exportar tabela filtrada em CSV?\n\nPeriodo: ${periodLabel}\nRegistros: ${total}`,
    );

    if (!confirmed) return;

    exportDataAsCsv(floodAreas, manholes);
  };

  return (
    <div className="export-bar">
      <div className="export-bar-copy">
        <span className="export-bar-label">Exportacao de tabela</span>
        <span className="export-bar-help">CSV com linhas filtradas do painel. Acao pede confirmacao.</span>
      </div>
      <button
        className="export-bar-btn export-bar-btn--primary"
        onClick={handleExport}
        title="Exportar tabela filtrada em CSV"
      >
        <DownloadIcon />
        Exportar tabela CSV
        <span className="export-bar-divider" />
        <span>{periodLabel}</span>
        <span className="export-bar-count">{total} registros</span>
      </button>
    </div>
  );
}
