'use client';

import { uiPanelClass } from '@/core/layouts/siteContentFrame';

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

const toneBorder: Record<StatCard['tone'], string> = {
  teal: 'border-l-teal-600',
  orange: 'border-l-orange-600',
  red: 'border-l-red-600',
  slate: 'border-l-slate-500',
};

export default function DashboardStats({ cards, onSelect }: DashboardStatsProps) {
  return (
    <section className={`${uiPanelClass} overflow-hidden`} aria-label="Resumo do recorte">
      <ul className="m-0 grid list-none divide-y divide-slate-100 p-0 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
        {cards.map((card) => (
          <li key={card.id} className="min-w-0">
            <button
              type="button"
              className={[
                'flex w-full gap-4 border-l-[3px] bg-white/80 px-5 py-5 text-left transition hover:bg-sky-50/45',
                toneBorder[card.tone],
                card.active ? 'bg-sky-50/70 ring-1 ring-inset ring-brand-eyebrow/20' : '',
              ].join(' ')}
              onClick={() => onSelect?.(card.id)}
            >
              <span className="block min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-brand-muted">{card.label}</span>
                <strong className="mt-2 block text-3xl font-bold tracking-[-0.04em] tabular-nums text-brand-heading">{card.value}</strong>
                <span className="mt-1.5 block text-sm leading-6 text-brand-muted">{card.hint}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
