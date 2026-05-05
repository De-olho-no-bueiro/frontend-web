'use client';

import type { ChartDatum } from '@/features/map/utils/occurrenceUtils';
import './DashboardCharts.css';

type DashboardChartsProps = {
  monthlyData: ChartDatum[];
  typeData: ChartDatum[];
  levelData: ChartDatum[];
  neighborhoodData: ChartDatum[];
  onTypeSelect: (type: 'all' | 'floodArea' | 'manhole') => void;
  onLevelSelect: (level: 'all' | 'baixo' | 'leve' | 'medio' | 'grave') => void;
  onNeighborhoodSelect: (value: string) => void;
};

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

  return (
    <article className="dashboard-chart-card">
      <div className="dashboard-chart-card__header">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="dashboard-chart-card__empty">Sem dados para este recorte.</div>
      ) : (
        <div className="dashboard-bars">
          {data.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`dashboard-bars__item dashboard-bars__item--${tone}`}
              onClick={() => onBarClick?.(item.label)}
            >
              <span className="dashboard-bars__label">{item.label}</span>
              <div className="dashboard-bars__track">
                <div
                  className="dashboard-bars__fill"
                  style={{ width: `${(item.value / maxValue) * 100}%`, background: item.color }}
                />
              </div>
              <span className="dashboard-bars__value">{item.value}</span>
            </button>
          ))}
        </div>
      )}
    </article>
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
  let accumulated = 0;

  const segments = data.map((item) => {
    const start = accumulated / total;
    accumulated += item.value;
    const end = accumulated / total;

    const startAngle = start * Math.PI * 2 - Math.PI / 2;
    const endAngle = end * Math.PI * 2 - Math.PI / 2;

    const largeArcFlag = end - start > 0.5 ? 1 : 0;
    const radius = 74;
    const center = 90;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    return {
      ...item,
      path: `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
    };
  });

  return (
    <article className="dashboard-chart-card">
      <div className="dashboard-chart-card__header">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      {data.length === 0 || total === 0 ? (
        <div className="dashboard-chart-card__empty">Sem dados para este recorte.</div>
      ) : (
        <div className="dashboard-donut">
          <svg viewBox="0 0 180 180" className="dashboard-donut__svg" aria-hidden="true">
            {segments.map((segment) => (
              <path key={segment.label} d={segment.path} fill={segment.color ?? '#0f766e'} opacity="0.92" />
            ))}
            <circle cx="90" cy="90" r="44" fill="#fff" />
            <text x="90" y="84" textAnchor="middle" className="dashboard-donut__total-label">
              Total
            </text>
            <text x="90" y="104" textAnchor="middle" className="dashboard-donut__total-value">
              {total}
            </text>
          </svg>

          <div className="dashboard-donut__legend">
            {data.map((item) => {
              const pct = total === 0 ? 0 : Math.round((item.value / total) * 100);
              return (
                <button
                  key={item.label}
                  type="button"
                  className="dashboard-donut__legend-item"
                  onClick={() => onSliceClick?.(item.label)}
                >
                  <span className="dashboard-donut__legend-dot" style={{ background: item.color ?? '#0f766e' }} />
                  <span className="dashboard-donut__legend-label">{item.label}</span>
                  <span className="dashboard-donut__legend-value">{item.value} · {pct}%</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </article>
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
    <section className="dashboard-charts">
      <BarChart
        title="Volume por periodo"
        subtitle="Leitura temporal do recorte filtrado."
        data={monthlyData}
        tone="teal"
      />

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
