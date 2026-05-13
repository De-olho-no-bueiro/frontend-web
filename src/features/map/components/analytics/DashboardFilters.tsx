'use client';

import { uiPanelClass } from '@/core/layouts/siteContentFrame';
import { focusRingBrandClass } from '@/core/styles/focusRing';
import type { NivelAlagamento } from '@/features/map/models/MapTypes';

type DashboardFiltersProps = {
  availableYears: number[];
  availableMonths: number[];
  availableNeighborhoods: string[];
  selectedYear: number;
  selectedMonth: number;
  selectedType: 'all' | 'floodArea' | 'manhole';
  selectedLevel: 'all' | NivelAlagamento;
  selectedNeighborhood: string;
  searchQuery: string;
  onYearChange: (value: number) => void;
  onMonthChange: (value: number) => void;
  onTypeChange: (value: 'all' | 'floodArea' | 'manhole') => void;
  onLevelChange: (value: 'all' | NivelAlagamento) => void;
  onNeighborhoodChange: (value: string) => void;
  onSearchQueryChange: (value: string) => void;
  onClear: () => void;
};

const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const labelClass = 'text-sm font-semibold text-brand-muted';
const controlClass = `w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-sm text-brand-heading ${focusRingBrandClass}`;

export default function DashboardFilters({
  availableYears,
  availableMonths,
  availableNeighborhoods,
  selectedYear,
  selectedMonth,
  selectedType,
  selectedLevel,
  selectedNeighborhood,
  searchQuery,
  onYearChange,
  onMonthChange,
  onTypeChange,
  onLevelChange,
  onNeighborhoodChange,
  onSearchQueryChange,
  onClear,
}: DashboardFiltersProps) {
  return (
    <section className={`${uiPanelClass} p-6 sm:p-7`} aria-labelledby="titulo-filtros-dashboard">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <p className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-brand-eyebrow">Exploracao</p>
          <h2 id="titulo-filtros-dashboard" className="m-0 text-[clamp(1.35rem,2vw,1.6rem)] font-bold tracking-[-0.03em] text-brand-heading">Filtros de leitura</h2>
        </div>
        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/90 px-4 text-sm font-semibold text-brand-heading shadow-sm transition hover:bg-slate-100/90"
          onClick={onClear}
        >
          Limpar filtros
        </button>
      </div>

      <div className="grid gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-6 xl:gap-y-4">
        <div className="flex flex-col gap-2 xl:col-span-2">
          <span className={labelClass}>Busca</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Endereco, descricao, bairro, ID..."
            className={controlClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Ano</span>
          <select
            value={selectedYear}
            onChange={(event) => onYearChange(Number(event.target.value))}
            className={controlClass}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Mes</span>
          <select
            value={selectedMonth}
            onChange={(event) => onMonthChange(Number(event.target.value))}
            className={controlClass}
          >
            <option value={0}>Todos</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {MONTH_LABELS[month - 1]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Tipo</span>
          <select
            value={selectedType}
            onChange={(event) => onTypeChange(event.target.value as 'all' | 'floodArea' | 'manhole')}
            className={controlClass}
          >
            <option value="all">Todos</option>
            <option value="floodArea">Alagamentos</option>
            <option value="manhole">Bueiros</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Nivel</span>
          <select
            value={selectedLevel}
            onChange={(event) => onLevelChange(event.target.value as 'all' | NivelAlagamento)}
            className={controlClass}
          >
            <option value="all">Todos</option>
            <option value="baixo">Baixo</option>
            <option value="leve">Leve</option>
            <option value="medio">Medio</option>
            <option value="grave">Grave</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2 xl:col-span-1">
          <span className={labelClass}>Bairro</span>
          <select
            value={selectedNeighborhood}
            onChange={(event) => onNeighborhoodChange(event.target.value)}
            className={controlClass}
          >
            <option value="all">Todos</option>
            {availableNeighborhoods.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
