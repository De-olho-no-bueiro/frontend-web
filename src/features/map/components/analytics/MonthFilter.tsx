'use client';

import { focusRingBrandClass } from '@/core/styles/focusRing';
import { MONTH_NAMES } from '@/features/map/utils/exportUtils';

interface MonthFilterProps {
  availableYears: number[];
  availableMonths: number[];
  selectedYear: number;
  selectedMonth: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

export default function MonthFilter({
  availableYears,
  availableMonths,
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: MonthFilterProps) {
  const selectClass = `w-full rounded-xl border border-slate-300/70 bg-white px-3 py-2.5 text-sm text-slate-700 ${focusRingBrandClass}`;

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex min-w-[220px] flex-col gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4">
        <label htmlFor="month-select" className="text-sm font-semibold text-slate-600">Mostrar dados do mês:</label>
        <select
          id="month-select"
          className={selectClass}
          value={selectedMonth}
          onChange={(e) => onMonthChange(Number(e.target.value))}
        >
          <option value={0}>Todos os meses</option>
          {availableMonths.map((m) => (
            <option key={m} value={m}>
              {MONTH_NAMES[m - 1]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex min-w-[160px] flex-col gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4">
        <label htmlFor="year-select" className="text-sm font-semibold text-slate-600">Ano:</label>
        <select
          id="year-select"
          className={selectClass}
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
        >
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
