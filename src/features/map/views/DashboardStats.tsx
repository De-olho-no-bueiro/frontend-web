'use client';

import './DashboardStats.css';

export type StatCard = {
  id: string;
  label: string;
  value: string;
  hint: string;
  tone: 'teal' | 'orange' | 'red' | 'slate';
  active?: boolean;
};

type DashboardStatsProps = {
  cards: StatCard[];
  onSelect?: (id: string) => void;
};

export default function DashboardStats({ cards, onSelect }: DashboardStatsProps) {
  return (
    <section className="dashboard-stats">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          className={`dashboard-stats__card dashboard-stats__card--${card.tone} ${card.active ? 'is-active' : ''}`}
          onClick={() => onSelect?.(card.id)}
        >
          <span className="dashboard-stats__label">{card.label}</span>
          <strong className="dashboard-stats__value">{card.value}</strong>
          <span className="dashboard-stats__hint">{card.hint}</span>
        </button>
      ))}
    </section>
  );
}
