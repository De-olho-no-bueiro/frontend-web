import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Bell,
  Download,
  Filter,
  Map,
  MapPinned,
  ShieldCheck,
  Smartphone,
  SquareChartGantt,
  TriangleAlert,
} from 'lucide-react';
import { siteContentFrameClass, uiPanelClass } from '@/core/layouts/siteContentFrame';

const sectionY = 'py-12 sm:py-16 lg:py-20';

const installSteps = [
  {
    number: '01',
    title: 'Instale o app',
    description:
      'Baixe o aplicativo no celular para registrar alagamentos, bueiros entupidos e acompanhar atualizações sem depender do navegador.',
    icon: <Download size={20} strokeWidth={2.2} />,
  },
  {
    number: '02',
    title: 'Ative permissões',
    description:
      'Permita localização e notificações para enviar ocorrências com contexto mais preciso e receber alertas importantes da sua região.',
    icon: <Bell size={20} strokeWidth={2.2} />,
  },
  {
    number: '03',
    title: 'Acesse o mapa',
    description:
      'Abra a tela principal para visualizar ocorrências em tempo real, áreas críticas e o histórico recente do que acontece perto de você.',
    icon: <Map size={20} strokeWidth={2.2} />,
  },
  {
    number: '04',
    title: 'Envie seu primeiro relato',
    description:
      'Informe o tipo de problema, a localização e detalhes úteis. O registro passa a alimentar a leitura pública e o painel operacional.',
    icon: <TriangleAlert size={20} strokeWidth={2.2} />,
  },
];

const appAreas = [
  {
    title: 'Mapa em tempo real',
    description: 'Mostra alagamentos e pontos de atenção com leitura rápida para quem está circulando pela cidade.',
    icon: <MapPinned size={22} strokeWidth={2.1} />,
  },
  {
    title: 'Filtros e busca',
    description: 'Ajuda a localizar bairros, ruas e tipos de ocorrência sem navegar manualmente por todo o mapa.',
    icon: <Filter size={22} strokeWidth={2.1} />,
  },
  {
    title: 'Registro de ocorrências',
    description: 'Centraliza o envio de novos relatos para que a comunidade alimente a plataforma com dados acionáveis.',
    icon: <Smartphone size={22} strokeWidth={2.1} />,
  },
  {
    title: 'Dashboard operacional',
    description: 'Consolida indicadores, exportações e leitura técnica para apoiar equipes públicas e monitoramento diário.',
    icon: <SquareChartGantt size={22} strokeWidth={2.1} />,
  },
];

const permissionNotes = [
  {
    title: 'Localização',
    description: 'Usada para posicionar o relato no mapa com menos erro e acelerar a triagem.',
  },
  {
    title: 'Notificações',
    description: 'Usadas para avisos de risco, mudanças de status e lembretes sobre áreas monitoradas.',
  },
  {
    title: 'Conexão de dados',
    description: 'Necessária para sincronizar ocorrências, filtros e indicadores com a base pública.',
  },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-brand-eyebrow">{children}</p>;
}

function SectionIntro({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className={`w-full border-b border-slate-200/55 ${sectionY}`}>
      <div className={siteContentFrameClass}>
        <header className="mb-8 max-w-3xl sm:mb-10">
          <h2 className="m-0 text-[clamp(1.55rem,2.6vw,2.35rem)] font-bold tracking-[-0.032em] text-brand-heading">
            {title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-brand-muted">{intro}</p>
        </header>
        {children}
      </div>
    </section>
  );
}

export default function HowToUsePage() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden pb-10 pt-6 sm:pb-14 sm:pt-8">
      <section className={`relative w-full border-b border-slate-200/60 ${sectionY}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/55 via-[color:var(--background)] to-[color:var(--background)]"
        />

        <div className={siteContentFrameClass}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-center lg:gap-16">
            <div className="border-l-[3px] border-brand-accent pl-5 sm:pl-7">
              <Eyebrow>Como usar</Eyebrow>
              <h1 className="mt-5 max-w-[14ch] text-[clamp(2.3rem,4.8vw,4rem)] font-bold leading-[0.98] tracking-[-0.045em] text-foreground max-sm:max-w-none">
                Entenda a instalação e o uso do app sem adivinhação.
              </h1>
              <p className="mt-5 max-w-[38rem] text-lg leading-8 text-brand-muted">
                Esta página resume o fluxo de instalação, as permissões necessárias e o que cada área do De Olho no
                Bueiro faz na prática.
              </p>

              <div className="mt-9 flex flex-wrap gap-3 max-sm:flex-col max-sm:items-stretch">
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-cta-from)] to-[var(--gradient-cta-to)] px-6 text-sm font-semibold text-[var(--brand-white)] shadow-md transition hover:opacity-[0.95]"
                >
                  Ver Dashboard
                </Link>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300/90 bg-white px-6 text-sm font-semibold text-brand-eyebrow shadow-sm transition hover:bg-sky-50/80"
                >
                  Voltar para Início
                </Link>
              </div>
            </div>

            <div className={`${uiPanelClass} overflow-hidden`}>
              <div className="grid gap-px bg-slate-100 md:grid-cols-2">
                {installSteps.map((step) => (
                  <article key={step.number} className="bg-white p-6 sm:p-7">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-heading text-sm font-bold text-white shadow-md ring-4 ring-sky-100/80">
                        {step.number}
                      </span>
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-brand-navy-900 ring-1 ring-sky-100/90">
                        {step.icon}
                      </div>
                      <h2 className="m-0 text-lg font-bold tracking-tight text-brand-heading">{step.title}</h2>
                    </div>
                    <p className="m-0 text-[0.95rem] leading-7 text-brand-muted">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionIntro
        title="Fluxo de instalação"
        intro="Antes do primeiro relato, estas são as decisões e permissões que garantem funcionamento correto no celular."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {permissionNotes.map((item) => (
            <article key={item.title} className={`${uiPanelClass} p-6 sm:p-7`}>
              <div className="mb-3 flex items-center gap-3">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 text-brand-navy-900 ring-1 ring-sky-200/70">
                  <ShieldCheck size={20} strokeWidth={2.1} />
                </div>
                <h3 className="m-0 text-lg font-bold tracking-tight text-brand-heading">{item.title}</h3>
              </div>
              <p className="m-0 text-[0.95rem] leading-7 text-brand-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </SectionIntro>

      <SectionIntro
        title="O que cada área faz"
        intro="Depois da instalação, estas são as partes principais da plataforma que você vai usar no dia a dia."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {appAreas.map((item) => (
            <article key={item.title} className={`${uiPanelClass} p-6 sm:p-7`}>
              <div className="mb-4 flex items-center gap-4">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 text-brand-navy-900 ring-1 ring-sky-200/70">
                  {item.icon}
                </div>
                <h3 className="m-0 text-lg font-bold tracking-tight text-brand-heading">{item.title}</h3>
              </div>
              <p className="m-0 text-[0.95rem] leading-7 text-brand-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </SectionIntro>

      <SectionIntro
        title="Do celular à ação"
        intro="O valor da plataforma está em transformar um relato simples em leitura pública e apoio operacional."
      >
        <ol className={`${uiPanelClass} m-0 grid list-none gap-0 p-0 md:grid-cols-4`}>
          {[
            'Usuário instala o app e habilita permissões básicas.',
            'Ocorrência é registrada com localização, tipo e detalhes.',
            'Relato entra no mapa público para consulta e acompanhamento.',
            'Dashboard consolida os dados para leitura técnica e resposta.',
          ].map((item, index) => (
            <li
              key={item}
              className="border-t border-slate-100 p-6 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0 sm:p-7"
            >
              <strong className="block text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">
                Etapa {index + 1}
              </strong>
              <p className="m-0 mt-3 text-[0.95rem] leading-7 text-brand-muted">{item}</p>
            </li>
          ))}
        </ol>
      </SectionIntro>
    </div>
  );
}
