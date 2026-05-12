'use client';

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

const fieldClass =
  'flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4';
const controlClass =
  'w-full rounded-xl border border-slate-300/70 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(88,184,244,0.18)]';

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
    <section className="rounded-[1.6rem] border border-slate-200/70 bg-white/90 p-5 shadow-[0_20px_40px_rgba(45,95,158,0.1)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#1f4f80]">Exploracao</p>
          <h2 className="m-0 text-[1.55rem] tracking-[-0.03em] text-slate-900">Filtros de leitura</h2>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200/80 bg-slate-50 px-4 text-sm font-semibold text-slate-700 transition hover:-translate-y-px"
          onClick={onClear}
        >
          Limpar filtros
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <label className={`${fieldClass} xl:col-span-2`}>
          <span className="text-sm font-semibold text-slate-600">Busca</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Endereco, descricao, bairro, ID..."
            className={controlClass}
          />
        </label>

        <label className={fieldClass}>
          <span className="text-sm font-semibold text-slate-600">Ano</span>
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
        </label>

        <label className={fieldClass}>
          <span className="text-sm font-semibold text-slate-600">Mes</span>
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
        </label>

        <label className={fieldClass}>
          <span className="text-sm font-semibold text-slate-600">Tipo</span>
          <select
            value={selectedType}
            onChange={(event) => onTypeChange(event.target.value as 'all' | 'floodArea' | 'manhole')}
            className={controlClass}
          >
            <option value="all">Todos</option>
            <option value="floodArea">Alagamentos</option>
            <option value="manhole">Bueiros</option>
          </select>
        </label>

        <label className={fieldClass}>
          <span className="text-sm font-semibold text-slate-600">Nivel</span>
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
        </label>

        <label className={`${fieldClass} md:col-span-2 xl:col-span-1`}>
          <span className="text-sm font-semibold text-slate-600">Bairro</span>
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
        </label>
      </div>
    </section>
  );
}
