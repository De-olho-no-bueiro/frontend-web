'use client';

import Link from 'next/link';
import { useAuthViewModel } from '@/features/auth/viewmodels/useAuthViewModel';

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    handleLogin,
  } = useAuthViewModel();

  return (
    <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-[min(1180px,calc(100%-2rem))] items-center gap-6 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:py-12">
      <section className="rounded-[2rem] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(236,248,255,0.92)),linear-gradient(135deg,#ffffff,#edf7ff)] p-[clamp(1.8rem,3vw,3rem)] shadow-[0_24px_54px_rgba(15,23,42,0.08)]">
        <span className="inline-flex items-center rounded-full bg-[#dff3ff] px-3 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[#1f4f80]">
          Acesso autenticado
        </span>
        <h1 className="mt-4 max-w-[12ch] text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.05em] text-[#102338] max-sm:max-w-none max-sm:text-[clamp(2.1rem,12vw,3.4rem)]">
          Entre para continuar a operacao com a mesma linguagem visual do portal.
        </h1>
        <p className="mt-5 max-w-[38rem] text-base leading-7 text-[#4b5d6b]">
          O dashboard publico segue aberto, mas a sessao permite uma experiencia mais direta para fluxos internos
          e acompanhamento recorrente.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <span className="rounded-2xl border border-sky-200/50 bg-white/70 p-4 leading-6 text-[#35506a]">
            Portal publico e autenticado no mesmo ecossistema
          </span>
          <span className="rounded-2xl border border-sky-200/50 bg-white/70 p-4 leading-6 text-[#35506a]">
            Interface mais limpa, clara e responsiva
          </span>
        </div>
      </section>

      <div className="w-full rounded-[1.6rem] border border-slate-200/70 bg-white/95 px-7 py-8 shadow-[0_24px_54px_rgba(15,23,42,0.08)] lg:justify-self-end">
        <h2 className="m-0 text-[1.65rem] font-bold tracking-[-0.03em] text-[#102338]">Entrar na plataforma</h2>
        <p className="mb-6 mt-1 text-[0.95rem] leading-6 text-slate-500">
          Use seu e-mail institucional ou de teste para abrir a sessao.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-slate-700" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-2xl border border-slate-300/70 bg-slate-50/90 px-4 py-3 text-[0.95rem] outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(88,184,244,0.18)]"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-slate-700" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full rounded-2xl border border-slate-300/70 bg-slate-50/90 px-4 py-3 text-[0.95rem] outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(88,184,244,0.18)]"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={isSubmitting}
            className="min-h-12 w-full rounded-full bg-[linear-gradient(135deg,#17365f_0%,#2d7cc4_100%)] px-4 py-3 text-[0.95rem] font-bold text-white shadow-[0_14px_28px_rgba(23,54,95,0.18)] transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="flex flex-col gap-3">
            <Link href="/" className="text-center text-[0.9rem] font-semibold text-[#29548d]">
              Voltar para portal publico
            </Link>
            <Link href="/dashboard" className="text-center text-[0.9rem] font-semibold text-[#29548d]">
              Ir direto para dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
