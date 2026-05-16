'use client';

import { uiPanelClass } from '@/core/layouts/siteContentFrame';
import type { ChartDatum } from '@/features/map/utils/occurrenceUtils';

type DashboardChartsProps = {
  monthlyData: ChartDatum[];
  typeData: ChartDatum[];
  levelData: ChartDatum[];
  neighborhoodData: ChartDatum[];
  onTypeSelect: (type: 'all' | 'floodArea' | 'manhole') => void;
  onLevelSelect: (level: 'all' | 'baixo' | 'leve' | 'medio' | 'grave') => void;
  onNeighborhoodSelect: (value: string) => void;
};

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <article className={`${uiPanelClass} p-6 sm:p-6`}>
      <div className="mb-5">
        <h3 className="m-0 text-lg font-bold tracking-tight text-brand-heading">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-brand-muted">{subtitle}</p>
      </div>
      {children}
    </article>
  );
}

function BarChart({
  title,
  subtitle,
  data,
  tone = 'teal',
  onBarClick,
}: {
  title: string;
  subtitle: string;
  data: ChartDatum[];
  tone?: 'teal' | 'orange' | 'slate';
  onBarClick?: (label: string) => void;
}) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const toneHover: Record<'teal' | 'orange' | 'slate', string> = {
    teal: 'hover:border-teal-300',
    orange: 'hover:border-orange-300',
    slate: 'hover:border-slate-300',
  };

  return (
    <ChartCard title={title} subtitle={subtitle}>
      {data.length === 0 ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-8 text-center text-sm text-brand-muted">
          Sem dados para este recorte.
        </div>
      ) : (
        <div className="grid gap-3">
          {data.map((item) => (
            <button
              key={item.label}
              type="button"
              className={[
                'grid grid-cols-[minmax(0,1fr)_minmax(120px,1fr)_auto] items-center gap-3 rounded-xl border border-slate-200/60 bg-slate-50/70 px-4 py-3 text-left transition',
                toneHover[tone],
              ].join(' ')}
              onClick={() => onBarClick?.(item.label)}
            >
              <span className="truncate text-sm font-semibold text-brand-heading">{item.label}</span>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(item.value / maxValue) * 100}%`, background: item.color ?? 'var(--chart-series-default)' }}
                />
              </div>
              <span className="text-sm font-bold text-brand-heading">{item.value}</span>
            </button>
          ))}
        </div>
      )}
    </ChartCard>
  );
}

function DonutChart({
  title,
  subtitle,
  data,
  onSliceClick,
}: {
  title: string;
  subtitle: string;
  data: ChartDatum[];
  onSliceClick?: (label: string) => void;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const segments = data.reduce<{
    running: number;
    out: Array<ChartDatum & { path: string }>;
  }>(
    (acc, item) => {
      const start = acc.running / total;
      const nextRunning = acc.running + item.value;
      const end = nextRunning / total;

      const startAngle = start * Math.PI * 2 - Math.PI / 2;
      const endAngle = end * Math.PI * 2 - Math.PI / 2;

      const largeArcFlag = end - start > 0.5 ? 1 : 0;
      const radius = 74;
      const center = 90;
      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      return {
        running: nextRunning,
        out: [...acc.out, { ...item, path }],
      };
    },
    { running: 0, out: [] },
  ).out;

  return (
    <ChartCard title={title} subtitle={subtitle}>
      {data.length === 0 || total === 0 ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-8 text-center text-sm text-brand-muted">
          Sem dados para este recorte.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-center">
          <svg viewBox="0 0 180 180" className="mx-auto h-[180px] w-[180px]" aria-hidden="true">
            {segments.map((segment) => (
              <path key={segment.label} d={segment.path} fill={segment.color ?? 'var(--chart-series-default)'} opacity="0.92" />
            ))}
            <circle cx="90" cy="90" r="44" fill="white" />
            <text x="90" y="84" textAnchor="middle" className="fill-slate-500 text-[10px] uppercase tracking-[0.2em]">
              Total
            </text>
            <text x="90" y="104" textAnchor="middle" className="fill-slate-900 text-[18px] font-bold">
              {total}
            </text>
          </svg>

          <div className="grid gap-3">
            {data.map((item) => {
              const pct = total === 0 ? 0 : Math.round((item.value / total) * 100);
              return (
                <button
                  key={item.label}
                  type="button"
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-slate-200/60 bg-slate-50/70 px-4 py-3 text-left transition hover:border-slate-300/80"
                  onClick={() => onSliceClick?.(item.label)}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: item.color ?? 'var(--chart-series-default)' }}
                  />
                  <span className="truncate text-sm font-semibold text-brand-heading">{item.label}</span>
                  <span className="text-sm text-brand-muted">
                    {item.value} · {pct}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </ChartCard>
  );
}

export default function DashboardCharts({
  monthlyData,
  typeData,
  levelData,
  neighborhoodData,
  onTypeSelect,
  onLevelSelect,
  onNeighborhoodSelect,
}: DashboardChartsProps) {
  return (
    <section className="grid gap-5 xl:grid-cols-2" aria-label="Gráficos do recorte filtrado">
      <BarChart title="Volume por periodo" subtitle="Leitura temporal do recorte filtrado." data={monthlyData} tone="teal" />

      <DonutChart
        title="Distribuicao por tipo"
        subtitle="Clique para filtrar mapa, cards e tabela."
        data={typeData}
        onSliceClick={(label) => onTypeSelect(label === 'Bueiros' ? 'manhole' : 'floodArea')}
      />

      <BarChart
        title="Severidade dos alagamentos"
        subtitle="Ocorrencias com nivel informado."
        data={levelData}
        tone="orange"
        onBarClick={(label) => {
          const map: Record<string, 'baixo' | 'leve' | 'medio' | 'grave'> = {
            Baixo: 'baixo',
            Leve: 'leve',
            Medio: 'medio',
            Grave: 'grave',
          };
          const next = map[label];
          if (next) onLevelSelect(next);
        }}
      />

      <BarChart
        title="Top bairros"
        subtitle="Leitura geografica via endereco normalizado no front."
        data={neighborhoodData}
        tone="slate"
        onBarClick={onNeighborhoodSelect}
      />
    </section>
  );
}
