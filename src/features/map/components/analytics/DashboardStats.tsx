'use client';

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

const toneClasses: Record<StatCard['tone'], string> = {
  teal: 'from-teal-50 to-cyan-50 text-teal-900',
  orange: 'from-orange-50 to-amber-50 text-orange-900',
  red: 'from-red-50 to-rose-50 text-red-900',
  slate: 'from-slate-50 to-sky-50 text-slate-900',
};

export default function DashboardStats({ cards, onSelect }: DashboardStatsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          className={[
            'rounded-[1.4rem] border border-slate-200/70 bg-gradient-to-br p-5 text-left shadow-[0_22px_44px_rgba(29,76,126,0.08)] transition hover:-translate-y-px',
            toneClasses[card.tone],
            card.active ? 'ring-2 ring-[#29548d]/25 border-[#29548d]/40' : '',
          ].join(' ')}
          onClick={() => onSelect?.(card.id)}
        >
          <span className="block text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">{card.label}</span>
          <strong className="mt-3 block text-4xl tracking-[-0.05em]">{card.value}</strong>
          <span className="mt-2 block text-sm leading-6 text-slate-600">{card.hint}</span>
        </button>
      ))}
    </section>
  );
}
