'use client';

import type { NivelAlagamento } from '@/features/map/models/MapTypes';
import './DashboardFilters.css';

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

const MONTH_LABELS = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

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
    <section className="dashboard-filters">
      <div className="dashboard-filters__header">
        <div>
          <p className="dashboard-filters__eyebrow">Exploracao</p>
          <h2 className="dashboard-filters__title">Filtros de leitura</h2>
        </div>
        <button type="button" className="dashboard-filters__clear" onClick={onClear}>
          Limpar filtros
        </button>
      </div>

      <div className="dashboard-filters__grid">
        <label className="dashboard-filters__field dashboard-filters__field--search">
          <span>Busca</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Endereco, descricao, bairro, ID..."
          />
        </label>

        <label className="dashboard-filters__field">
          <span>Ano</span>
          <select value={selectedYear} onChange={(event) => onYearChange(Number(event.target.value))}>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label className="dashboard-filters__field">
          <span>Mes</span>
          <select value={selectedMonth} onChange={(event) => onMonthChange(Number(event.target.value))}>
            <option value={0}>Todos</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {MONTH_LABELS[month - 1]}
              </option>
            ))}
          </select>
        </label>

        <label className="dashboard-filters__field">
          <span>Tipo</span>
          <select value={selectedType} onChange={(event) => onTypeChange(event.target.value as 'all' | 'floodArea' | 'manhole')}>
            <option value="all">Todos</option>
            <option value="floodArea">Alagamentos</option>
            <option value="manhole">Bueiros</option>
          </select>
        </label>

        <label className="dashboard-filters__field">
          <span>Nivel</span>
          <select value={selectedLevel} onChange={(event) => onLevelChange(event.target.value as 'all' | NivelAlagamento)}>
            <option value="all">Todos</option>
            <option value="baixo">Baixo</option>
            <option value="leve">Leve</option>
            <option value="medio">Medio</option>
            <option value="grave">Grave</option>
          </select>
        </label>

        <label className="dashboard-filters__field">
          <span>Bairro</span>
          <select value={selectedNeighborhood} onChange={(event) => onNeighborhoodChange(event.target.value)}>
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
