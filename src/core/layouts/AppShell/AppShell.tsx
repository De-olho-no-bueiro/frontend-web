'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteContentFrameClass } from '@/core/layouts/siteContentFrame';

const PublicDataCallout = dynamic(() => import('@/core/layouts/AppShell/PublicDataCallout'), { ssr: false });

const headerRowClass = `${siteContentFrameClass} flex flex-col gap-4 py-3.5 md:flex-row md:items-center md:justify-start md:gap-8 md:py-3.5`;

const primaryLinks = [
  { href: '/', label: 'Início' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/como-usar', label: 'Como Usar' },
  { href: '/#sobre', label: 'Sobre' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen text-foreground">
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-[linear-gradient(168deg,var(--background)_0%,#e8f2fa_42%,#f2f8fc_100%)]"
      />

      <a
        href="#conteudo-principal"
        className="fixed left-4 top-0 z-[100] -translate-y-full rounded-b-lg bg-[var(--brand-navy-900)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-white)] shadow-lg outline-none ring-sky-400 transition-transform focus:translate-y-0 focus-visible:ring-2"
      >
        Ir para o conteúdo principal
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-[var(--ui-header-divider)] bg-white/92 backdrop-blur-md">
        <div className={headerRowClass}>
          <Link href="/" className="inline-flex min-w-0 items-center gap-3 shrink-0" aria-label="Pagina inicial De Olho no Bueiro">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white to-sky-100 ring-1 ring-slate-200/70 sm:h-12 sm:w-12">
              <Image src="/assets/images/branding/logo-tab.svg" alt="" width={44} height={44} priority />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <strong className="text-base font-semibold tracking-tight text-slate-950">De Olho no Bueiro</strong>
              <span className="truncate text-xs text-slate-600 sm:text-[0.84rem]">
                Monitoramento urbano com leitura pública e operacional
              </span>
            </span>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="flex flex-wrap items-center gap-1 border-t border-slate-100 pt-3 md:flex-1 md:justify-end md:border-t-0 md:pt-0 md:pl-2"
          >
            {primaryLinks.map((link) => {
              const isActive =
                (link.href === '/' && pathname === '/') ||
                (link.href === '/dashboard' && pathname.startsWith('/dashboard')) ||
                (link.href === '/como-usar' && pathname.startsWith('/como-usar'));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'relative px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900',
                    'after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors',
                    isActive ? 'text-[var(--brand-navy-900)] after:bg-[var(--brand-navy-900)]' : 'after:bg-transparent hover:after:bg-slate-200',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="conteudo-principal">{children}</main>

      <PublicDataCallout />
    </div>
  );
}
