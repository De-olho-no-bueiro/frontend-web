'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/core/contexts/auth-context';

const primaryLinks = [
  { href: '/', label: 'Início' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/#solucao', label: 'Solução' },
  { href: '/#equipe', label: 'Equipe' },
  { href: '/login', label: 'Acesso público' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const isHome = pathname === '/';
  const authLabel = isLoading
    ? 'Carregando sessao'
    : user
      ? `Conectado como ${user.name}`
      : 'Acesso publico disponivel';

  return (
    <div className="relative min-h-screen text-foreground">
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(88,184,244,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(23,54,95,0.16),transparent_22%),radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.72),transparent_42%),linear-gradient(180deg,#f6fbff_0%,#edf6fc_48%,#f8fbfd_100%)]"
      />

      <header className="sticky top-0 z-40 px-4 pt-4">
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-4 rounded-3xl border border-slate-200/70 bg-white/80 px-4 py-4 shadow-[0_18px_44px_rgba(15,23,42,0.08)] backdrop-blur-[18px] lg:grid-cols-[minmax(0,1.3fr)_auto_auto]">
          <Link href="/" className="inline-flex min-w-0 items-center gap-3" aria-label="Pagina inicial De Olho no Bueiro">
            <span className="inline-flex h-[3.3rem] w-[3.3rem] shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(220,242,255,0.94))] shadow-[inset_0_1px_0_rgba(255,255,255,0.88)]">
              <Image src="/assets/images/branding/logo-tab.svg" alt="" width={46} height={46} priority />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <strong className="text-base tracking-[-0.03em] text-slate-950">De Olho no Bueiro</strong>
              <span className="truncate text-[0.84rem] text-slate-600">
                Monitoramento urbano com leitura publica e operacional
              </span>
            </span>
          </Link>

          <nav aria-label="Navegacao principal" className="flex flex-wrap items-center justify-start gap-3 lg:justify-center">
            {primaryLinks.map((link) => {
              const isActive =
                link.href === pathname || (link.href === '/dashboard' && pathname.startsWith('/dashboard'));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'inline-flex min-h-[2.7rem] items-center justify-center rounded-full px-4 text-sm font-bold transition duration-200',
                    isActive
                      ? 'bg-sky-100/90 text-[#17365f]'
                      : 'text-[#264264] hover:-translate-y-px',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-3 max-lg:flex-col max-lg:items-stretch">
            <span className="rounded-full bg-slate-100/90 px-4 py-2.5 text-center text-[0.85rem] font-semibold text-slate-600">
              {authLabel}
            </span>
            <Link
              href={user ? '/dashboard' : '/login'}
              className={[
                'inline-flex min-h-[2.7rem] items-center justify-center rounded-full px-4 text-sm font-bold text-[#f8fdff] shadow-[0_14px_28px_rgba(23,54,95,0.2)] transition duration-200 hover:-translate-y-px',
                isHome
                  ? 'bg-[linear-gradient(135deg,#17365f_0%,#2d7cc4_100%)]'
                  : 'bg-[linear-gradient(135deg,#17365f_0%,#2d7cc4_100%)]',
              ].join(' ')}
            >
              {user ? 'Abrir painel' : 'Entrar'}
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
