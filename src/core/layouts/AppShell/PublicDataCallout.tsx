'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

const STORAGE_KEY = 'de-olho-public-data-callout-dismissed';

export default function PublicDataCallout() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  const open = !dismissed && !pathname.startsWith('/dashboard');

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* modo privado */
    }
    setDismissed(true);
  }, []);

  if (!open) return null;

  return (
    <aside
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-4 z-50 flex w-[min(100vw-2rem,22rem)] max-w-[calc(100vw-2rem)] flex-col gap-3 rounded-2xl border border-slate-200/85 bg-white/98 p-4 shadow-[var(--ui-panel-shadow)] ring-1 ring-slate-200/35 max-sm:left-4 max-sm:right-4 max-sm:w-auto sm:right-5"
      role="complementary"
      aria-labelledby="public-data-callout-title"
    >
      <div className="flex items-start justify-between gap-2">
        <p id="public-data-callout-title" className="m-0 pr-1 text-sm font-semibold leading-snug text-brand-heading">
          Dados públicos em tempo real
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="-m-1 inline-flex shrink-0 rounded-lg p-1.5 text-brand-muted transition hover:bg-slate-100 hover:text-brand-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-sky-700)]"
          aria-label="Fechar aviso sobre dados públicos"
        >
          <X size={18} strokeWidth={2.25} aria-hidden />
        </button>
      </div>
      <p className="m-0 text-sm leading-relaxed text-brand-muted">
        Veja no painel os alagamentos e bueiros em leitura aberta, com o recorte mais recente reportado pela comunidade.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-cta-from)] to-[var(--gradient-cta-to)] px-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-[0.96]"
      >
        Abrir painel de dados
      </Link>
    </aside>
  );
}
