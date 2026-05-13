import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  Apple,
  ArrowRight,
  Mail,
  MapPin,
  Play,
  Plus,
} from 'lucide-react';
import { siteContentFrameClass, uiPanelClass } from '@/core/layouts/siteContentFrame';
import {
  appFeatures,
  audiences,
  heroStats,
  metrics,
  problemCards,
  steps,
} from '@/features/home/content/homeContent';

const sectionY = 'py-12 sm:py-16 lg:py-20';

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-brand-eyebrow">{children}</p>;
}

function SectionIntro({
  id,
  title,
  intro,
  children,
  narrow,
}: {
  id?: string;
  title: string;
  intro: string;
  children: ReactNode;
  narrow?: boolean;
}) {
  const headingId = id ? `${id}-titulo` : undefined;

  return (
    <section id={id} aria-labelledby={headingId} className={`w-full border-b border-slate-200/55 ${sectionY}`}>
      <div className={siteContentFrameClass}>
        <header className={`mb-8 sm:mb-10 ${narrow ? 'max-w-2xl' : 'max-w-3xl'}`}>
          <h2 id={headingId} className="m-0 text-[clamp(1.55rem,2.6vw,2.35rem)] font-bold tracking-[-0.032em] text-brand-heading">
            {title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-brand-muted">{intro}</p>
        </header>
        {children}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="w-full min-w-0 overflow-x-hidden pb-10 pt-6 sm:pb-14 sm:pt-8">
        {/* Hero */}
        <section className={`relative w-full border-b border-slate-200/60 ${sectionY}`}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/50 via-[color:var(--background)] to-[color:var(--background)]"
          />

          <div className={siteContentFrameClass}>
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.92fr)] lg:gap-16">
              <div className="relative z-10 border-l-[3px] border-brand-accent pl-5 sm:pl-7">
                <Eyebrow>Monitoramento urbano inteligente</Eyebrow>
                <h1 className="mt-5 max-w-[14ch] text-[clamp(2.6rem,5.2vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.045em] text-foreground max-sm:max-w-none max-sm:text-[clamp(2.2rem,11vw,3.35rem)]">
                  Uma cidade mais segura começa <span className="text-brand-accent">com informação.</span>
                </h1>
                <p className="mt-5 max-w-[36rem] text-lg leading-8 text-brand-muted">
                  Mapeamos alagamentos e problemas em bueiros em tempo real com a ajuda da comunidade. Dados que
                  viram ação e protegem vidas.
                </p>

                <div className="mt-9 flex flex-wrap gap-3 max-sm:flex-col max-sm:items-stretch">
                  <Link
                    href="/dashboard"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-cta-from)] to-[var(--gradient-cta-to)] px-6 text-sm font-semibold text-[var(--brand-white)] shadow-md transition hover:opacity-[0.95]"
                  >
                    Acessar Dashboard
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <Link
                    href="/#solucao"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300/90 bg-white px-6 text-sm font-semibold text-brand-eyebrow shadow-sm transition hover:bg-sky-50/80"
                  >
                    Entender a solução
                    <Play size={18} className="ml-2" />
                  </Link>
                </div>
              </div>

              <div className="relative flex min-h-[26rem] items-center justify-center lg:min-h-[30rem]">
                <div className="absolute inset-[10%_8%_8%] rounded-full bg-sky-400/12 blur-2xl" aria-hidden />

                <div
                  className="home-hero-float-icon home-hero-float-icon--delay-1 absolute right-[2%] top-[24%] z-[2] inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-rose-500 to-red-600 p-2 text-white shadow-lg max-sm:right-0 max-sm:h-10 max-sm:w-10"
                  aria-hidden
                >
                  <AlertTriangle size={20} strokeWidth={2.5} />
                </div>
                <div
                  className="home-hero-float-icon home-hero-float-icon--delay-2 absolute bottom-[22%] left-[3%] z-[2] inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 p-2 text-white shadow-lg max-sm:left-0 max-sm:h-10 max-sm:w-10"
                  aria-hidden
                >
                  <Plus size={20} strokeWidth={2.5} />
                </div>
                <div
                  className="home-hero-float-icon home-hero-float-icon--delay-3 absolute bottom-[8%] right-[6%] z-[2] inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-sky-400 to-[var(--brand-navy-900)] p-2 text-white shadow-lg max-sm:h-10 max-sm:w-10"
                  aria-hidden
                >
                  <MapPin size={20} strokeWidth={2.5} />
                </div>

                <div className="relative z-10 aspect-[9/19.5] w-[min(100%,15.5rem)] max-sm:w-[min(100%,13rem)]">
                  <div className="relative h-full w-full rounded-[2.5rem] bg-gradient-to-b from-[#5c5c62] via-[#3a3a3d] to-[#1e1e20] p-[2.5px] shadow-2xl ring-1 ring-black/25">
                    <div className="relative h-full w-full rounded-[2.35rem] bg-zinc-950 p-[5px]">
                      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black ring-1 ring-black/70">
                        <Image
                          src="/assets/images/app-mapa-mobile.png"
                          alt="Captura do aplicativo no mapa com busca, filtros e nova ocorrência"
                          fill
                          sizes="(max-width: 980px) 220px, 280px"
                          className="object-cover object-top"
                          priority
                        />
                      </div>
                      <div
                        className="pointer-events-none absolute left-1/2 top-[10px] z-30 h-[26px] w-[min(42%,6.5rem)] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_-2px_4px_rgba(0,0,0,0.65),0_2px_8px_rgba(0,0,0,0.35)]"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute bottom-[9px] left-1/2 z-30 h-1 w-[28%] max-w-[5rem] -translate-x-1/2 rounded-full bg-white/35"
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute top-[22%] -left-[2px] z-20 h-7 w-[3px] rounded-l-sm bg-[#2a2a2d]" aria-hidden />
                  <div className="pointer-events-none absolute top-[30%] -left-[2px] z-20 h-11 w-[3px] rounded-l-sm bg-[#2a2a2d]" aria-hidden />
                  <div className="pointer-events-none absolute top-[42%] -left-[2px] z-20 h-11 w-[3px] rounded-l-sm bg-[#2a2a2d]" aria-hidden />
                  <div className="pointer-events-none absolute top-[20%] -right-[2px] z-20 h-14 w-[3px] rounded-r-sm bg-[#2a2a2d]" aria-hidden />
                </div>
              </div>
            </div>

            <div
              className={`${uiPanelClass} mt-12 overflow-hidden sm:mt-14 lg:mt-16`}
              aria-label="Principais capacidades"
            >
              <ul className="m-0 grid list-none divide-y divide-slate-100 p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {heroStats.map((item) => (
                  <li key={item.value} className="flex gap-4 px-5 py-6 sm:px-7 sm:py-7">
                    <span
                      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-brand-navy-900 ring-1 ring-sky-100/90"
                      aria-hidden
                    >
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <strong className="block text-base font-semibold tracking-tight text-brand-heading">{item.value}</strong>
                      <span className="mt-1.5 block text-sm leading-6 text-brand-muted">{item.label}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section
          id="manifesto"
          className="relative mt-0 w-full overflow-hidden py-14 text-brand-on-dark sm:py-16"
          aria-labelledby="manifesto-titulo"
        >
          <div className="pointer-events-none absolute inset-0 [background-image:var(--gradient-band-manifesto)]" aria-hidden />
          <div className="pointer-events-none absolute -right-20 -top-28 h-[20rem] w-[20rem] rounded-full bg-sky-300/20 blur-3xl" aria-hidden />
          <div
            className="pointer-events-none absolute -bottom-36 -left-12 h-[16rem] w-[16rem] rounded-full bg-[color-mix(in_srgb,var(--brand-navy-900)_35%,transparent)] blur-3xl"
            aria-hidden
          />
          <div className={`${siteContentFrameClass} relative`}>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
              <div className="max-w-2xl border-l border-white/25 pl-6 sm:pl-8">
                <Eyebrow>
                  <span className="text-sky-200/95">Manifesto</span>
                </Eyebrow>
                <h2 id="manifesto-titulo" className="mt-4 m-0 text-[clamp(1.4rem,2.9vw,1.95rem)] font-bold leading-snug tracking-[-0.02em] text-white">
                  Informação que salva vidas, conecta pessoas e transforma cidades.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-[1.05rem]">
                  Uma plataforma colaborativa que transforma relatos em soluções reais para os desafios das chuvas nas
                  cidades.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-6 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-6 sm:px-8">
                <span className="font-mono text-[clamp(2.25rem,4.5vw,3rem)] font-bold tabular-nums text-white">
                  +2.500
                </span>
                <div className="hidden h-12 w-px bg-white/25 sm:block" aria-hidden />
                <p className="m-0 max-w-[14rem] text-sm leading-snug text-white/80">
                  Pessoas e instituições somando dados para uma resposta mais rápida.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionIntro
          id="solucao"
          title="O problema é real. A solução é coletiva."
          intro="Enchentes, alagamentos e bueiros entupidos causam transtornos diários, prejuízos e até riscos à vida. A falta de informação em tempo real dificulta a resposta rápida dos órgãos competentes."
        >
          <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-3">
            {problemCards.map((item) => (
              <li key={item.title} className={uiPanelClass}>
                <article className="flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 text-brand-navy-900 ring-1 ring-sky-200/70">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-brand-heading">{item.title}</h3>
                  <p className="m-0 flex-1 text-[0.95rem] leading-7 text-brand-muted">{item.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </SectionIntro>

        <SectionIntro
          title="Como funciona?"
          intro="Três passos simples para fazer a diferença na sua cidade."
          narrow
        >
          <ol className={`${uiPanelClass} m-0 grid list-none gap-0 p-0 md:grid-cols-3`}>
            {steps.map((step, idx) => (
              <li
                key={step.number}
                className="relative border-t border-slate-100 p-7 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0"
              >
                <div className="flex flex-col gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-heading text-sm font-bold text-white shadow-md ring-4 ring-sky-100/80">
                    {step.number}
                  </span>
                  <div className="text-brand-accent [&>svg]:opacity-90">{step.icon}</div>
                  <h3 className="text-lg font-bold tracking-tight text-brand-heading">{step.title}</h3>
                  <p className="m-0 text-[0.95rem] leading-7 text-brand-muted">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 md:block" aria-hidden>
                    <ArrowRight size={20} className="text-sky-200" strokeWidth={2} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </SectionIntro>

        <section className="w-full border-b border-slate-200/55 py-8 sm:py-10 lg:py-12">
          <div className={siteContentFrameClass}>
            <header className="mb-5 max-w-2xl sm:mb-6">
              <h2 className="m-0 text-[clamp(1.55rem,2.6vw,2.35rem)] font-bold tracking-[-0.032em] text-brand-heading">
                Para quem é a plataforma?
              </h2>
              <p className="mt-2 text-base leading-relaxed text-brand-muted sm:text-[1.05rem]">
                Uma mesma base visual servindo informação pública, operação e pesquisa.
              </p>
            </header>

            <ul
              className="m-0 mt-5 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 sm:gap-3 lg:mt-6 lg:grid-cols-[minmax(15rem,21rem)_minmax(0,1fr)] lg:grid-rows-3 lg:gap-x-5 lg:gap-y-2.5"
              role="list"
            >
              {audiences.map((item, index) => {
                const isLead = index === 0;
                return (
                  <li
                    key={item.title}
                    className={[
                      'group min-h-0 rounded-2xl border border-slate-200/55 bg-gradient-to-b from-white to-slate-50/90 p-4 shadow-[var(--ui-panel-shadow)] ring-1 ring-slate-200/25 transition hover:border-sky-200/50 hover:ring-sky-100/40 sm:p-5',
                      isLead ? 'lg:col-span-1 lg:row-span-3 lg:self-start lg:p-5' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {isLead ? (
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4 lg:flex-col lg:items-stretch lg:gap-3">
                        <span
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-brand-navy-900 shadow-sm ring-1 ring-sky-100/90 transition group-hover:scale-[1.02] sm:h-12 sm:w-12"
                          aria-hidden
                        >
                          {item.icon}
                        </span>
                        <div className="min-w-0 border-l-2 border-sky-200/70 pl-3 sm:border-l-0 sm:pl-0 lg:border-l-0 lg:pl-0">
                          <h3 className="m-0 text-lg font-bold tracking-tight text-brand-heading sm:text-xl">{item.title}</h3>
                          <p className="m-0 mt-1.5 text-sm leading-relaxed text-brand-muted sm:text-[0.95rem] sm:leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 sm:min-h-0">
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-navy-900 shadow-sm ring-1 ring-slate-200/70 transition group-hover:ring-brand-accent/25 sm:h-10 sm:w-10"
                          aria-hidden
                        >
                          {item.icon}
                        </span>
                        <div className="min-w-0 py-0.5">
                          <h3 className="mb-0.5 text-[0.9375rem] font-bold leading-snug tracking-tight text-brand-heading sm:text-base">
                            {item.title}
                          </h3>
                          <p className="m-0 text-[0.8125rem] leading-snug text-brand-muted sm:text-sm sm:leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <div className={siteContentFrameClass} aria-hidden>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />
        </div>

        <section className="relative w-full overflow-hidden py-12 text-brand-on-dark sm:py-14 lg:py-16">
          <div className="pointer-events-none absolute inset-0 [background-image:var(--gradient-band-metrics)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_20%,rgba(255,255,255,0.12),transparent_55%)]" aria-hidden />
          <div className={`${siteContentFrameClass} relative`}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-0 lg:divide-x lg:divide-white/15">
              <div className="lg:w-[44%] lg:shrink-0 lg:pr-12">
                <div className="border-l-[3px] border-sky-300/80 pl-6">
                  <strong className="block font-mono text-[clamp(2.5rem,7vw,4.25rem)] font-bold leading-none tracking-[-0.04em] tabular-nums text-white">
                    {metrics[0].value}
                  </strong>
                  <span className="mt-4 block max-w-[16rem] text-base font-medium leading-snug text-white/82">{metrics[0].label}</span>
                </div>
              </div>

              <ul className="m-0 flex list-none flex-col gap-0 p-0 sm:grid sm:grid-cols-3 sm:gap-0 lg:flex-1 lg:pl-12" role="list">
                {metrics.slice(1).map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-col justify-end border-t border-white/12 py-5 first:border-t-0 first:pt-0 sm:border-l sm:border-t-0 sm:border-white/12 sm:px-5 sm:py-4 sm:first:border-l-0 sm:first:pl-0 lg:min-h-[6.5rem] lg:px-7"
                  >
                    <strong className="font-mono text-[clamp(1.35rem,2.8vw,1.85rem)] font-bold tabular-nums text-white">{item.value}</strong>
                    <span className="mt-2 block text-sm font-medium leading-snug text-brand-on-dark/78">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={`w-full border-b border-slate-200/55 ${sectionY}`}>
          <div className={siteContentFrameClass}>
            <div className="grid items-start gap-12 lg:grid-cols-[minmax(220px,0.9fr)_1fr] lg:gap-16">
              <div className="flex justify-center lg:justify-start">
                <div
                  className={`relative aspect-[0.62] w-full max-w-[15rem] overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-frame-dark)] ${uiPanelClass}`}
                >
                  <Image
                    src="/assets/images/app-mapa-mobile.png"
                    alt="Tela do aplicativo no celular com mapa, busca e filtros"
                    fill
                    sizes="(max-width: 980px) 260px, 300px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <Eyebrow>App mobile</Eyebrow>
                <h2 className="mt-4 text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold tracking-[-0.035em] text-brand-heading">
                  Leve o monitoramento no seu bolso.
                </h2>
                <p className="mt-4 text-lg leading-8 text-brand-muted">
                  Baixe nosso aplicativo e ajude a construir uma cidade mais segura e resiliente para todos.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 bg-gradient-to-br from-[var(--brand-navy-900)] to-[var(--brand-navy-700)] px-4 py-2.5 text-white shadow-md">
                    <Play size={18} fill="currentColor" />
                    <div>
                      <span className="block text-[0.62rem] uppercase tracking-wide text-white/70">Disponível no</span>
                      <strong className="text-sm">Google Play</strong>
                    </div>
                  </div>
                  <div className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 bg-gradient-to-br from-[var(--brand-navy-900)] to-[var(--brand-navy-700)] px-4 py-2.5 text-white shadow-md">
                    <Apple size={18} fill="currentColor" />
                    <div>
                      <span className="block text-[0.62rem] uppercase tracking-wide text-white/70">Disponível na</span>
                      <strong className="text-sm">App Store</strong>
                    </div>
                  </div>
                </div>

                <ul className="mt-10 divide-y divide-slate-100 border-t border-slate-100">
                  {appFeatures.map((item) => (
                    <li key={item.title} className="grid grid-cols-[auto_1fr] gap-4 py-5 first:pt-2">
                      <span className="mt-1 text-brand-accent" aria-hidden>
                        {item.icon}
                      </span>
                      <div>
                        <strong className="block font-semibold text-brand-navy-900">{item.title}</strong>
                        <p className="m-0 mt-1 text-sm leading-relaxed text-brand-muted">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer
        id="sobre"
        className="w-full border-t border-[color-mix(in_srgb,var(--brand-navy-900)_65%,black)] bg-gradient-to-b from-[var(--brand-navy-900)] to-[var(--brand-footer-deep)] text-brand-on-dark"
      >
        <div className={`${siteContentFrameClass} py-12 sm:py-14`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="flex gap-4 lg:col-span-4">
              <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/15">
                <Image src="/assets/images/branding/logo-tab.svg" alt="" width={40} height={40} />
              </div>
              <div>
                <strong className="block text-lg font-bold text-white">De Olho no Bueiro</strong>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-brand-on-dark/80">
                  Monitoramento urbano com leitura pública e operacional.
                </p>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-on-dark/50">Navegação</h3>
                <nav className="flex flex-col gap-3 text-sm" aria-label="Navegação no rodapé">
                  <Link href="/" className="text-brand-on-dark/85 transition hover:text-white">
                    Início
                  </Link>
                  <Link href="/dashboard" className="text-brand-on-dark/85 transition hover:text-white">
                    Dashboard
                  </Link>
                  <Link href="/#solucao" className="text-brand-on-dark/85 transition hover:text-white">
                    Solução
                  </Link>
                  <Link href="/#sobre" className="text-brand-on-dark/85 transition hover:text-white">
                    Sobre
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-on-dark/50">Recursos</h3>
                <ul className="flex flex-col gap-3 text-sm text-brand-on-dark/80">
                  <li>Como funciona</li>
                  <li>Perguntas frequentes</li>
                  <li>Termos de uso</li>
                  <li>Política de privacidade</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-on-dark/50">Fale conosco</h3>
                <div className="flex flex-col gap-3 text-sm text-brand-on-dark/80">
                  <span className="inline-flex items-center gap-2">
                    <Mail size={16} strokeWidth={2} />
                    dev@ianalas.tech
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} strokeWidth={2} />
                    Fortaleza - CE, Brasil
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-12 border-t border-white/10 pt-6 text-xs text-brand-on-dark/55">
            © 2026 De Olho no Bueiro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
