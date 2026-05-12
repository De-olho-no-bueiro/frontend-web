import Image from 'next/image';
import Link from 'next/link';
import {
  AlertTriangle,
  Apple,
  ArrowRight,
  CheckCheck,
  Mail,
  MapPin,
  Play,
  Plus,
} from 'lucide-react';
import {
  appFeatures,
  audiences,
  heroStats,
  metrics,
  problemCards,
  steps,
} from '@/features/home/content/homeContent';

const sectionTitleClass = 'm-0 text-[clamp(2rem,3vw,2.8rem)] tracking-[-0.04em] text-[#143454]';
const sectionTextClass = 'mt-[0.55rem] text-base leading-7 text-[#678]';

export default function HomePage() {
  return (
    <main className="mx-auto w-[min(1220px,calc(100%-2rem))] py-6 pb-12 max-sm:w-[min(1220px,calc(100%-1rem))] max-sm:pt-4">
      <section className="relative grid items-center gap-6 overflow-hidden rounded-[2rem] border border-sky-200/60 bg-[radial-gradient(circle_at_78%_15%,rgba(114,184,255,0.18),transparent_25%),radial-gradient(circle_at_92%_42%,rgba(119,128,255,0.14),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,249,255,0.94))] px-8 py-8 shadow-[0_28px_60px_rgba(30,83,142,0.12)] lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] max-sm:rounded-3xl max-sm:px-5 max-sm:py-5">
        <div className="pointer-events-none absolute inset-auto -right-[5%] -bottom-[18%] h-96 w-96 bg-[radial-gradient(circle,rgba(76,174,232,0.18),transparent_70%)]" />

        <div className="relative z-10">
          <span className="inline-flex items-center rounded-full bg-sky-100/95 px-3 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[#24649e]">
            Monitoramento urbano inteligente
          </span>
          <h1 className="mt-4 max-w-[10ch] text-[clamp(3rem,5vw,4.7rem)] leading-[0.95] tracking-[-0.06em] text-[#102338] max-sm:max-w-none max-sm:text-[clamp(2.4rem,12vw,3.6rem)]">
            Uma cidade mais segura começa <span className="text-[#1f72c9]">com informação.</span>
          </h1>
          <p className="mt-4 max-w-[36rem] text-[1.03rem] leading-7 text-[#5a6c7a]">
            Mapeamos alagamentos e problemas em bueiros em tempo real com a ajuda da comunidade. Dados que
            viram ação e protegem vidas.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 max-sm:flex-col max-sm:items-stretch">
            <Link
              href="/dashboard"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#155191_0%,#2975c9_100%)] px-5 text-sm font-bold text-[#f8fdff] shadow-[0_18px_32px_rgba(27,93,161,0.22)] transition hover:-translate-y-px"
            >
              Acessar Dashboard
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              href="/#solucao"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#285f96]/20 bg-white/90 px-5 text-sm font-bold text-[#21548d] transition hover:-translate-y-px"
            >
              Entender a solução
              <Play size={18} className="ml-2" />
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {heroStats.map((item) => (
              <article key={item.value} className="rounded-[1.25rem] border border-sky-200/40 bg-white/80 p-4">
                <div className="mb-3 text-[#21548d]">{item.icon}</div>
                <strong className="block text-[0.92rem] text-[#21548d]">{item.value}</strong>
                <span className="mt-1 block text-[0.85rem] leading-6 text-[#637789]">{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[34rem] items-center justify-center max-lg:min-h-[28rem]">
          <div className="absolute inset-[14%_12%_12%] rounded-full bg-[radial-gradient(circle,rgba(102,181,255,0.2),transparent_56%),radial-gradient(circle_at_70%_40%,rgba(131,102,255,0.14),transparent_24%)] blur-[2px]" />

          <div className="absolute right-[4%] top-[28%] z-[2] inline-flex min-h-[4.6rem] min-w-[4.6rem] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,#ff6c63,#ea4335)] p-3 text-white shadow-[0_18px_32px_rgba(26,66,111,0.2)] max-sm:right-0 max-sm:min-h-[3.6rem] max-sm:min-w-[3.6rem]">
            <AlertTriangle size={24} strokeWidth={2.5} />
          </div>
          <div className="absolute bottom-[26%] left-[6%] z-[2] inline-flex min-h-[4.6rem] min-w-[4.6rem] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,#ffc24d,#f59e0b)] p-3 text-white shadow-[0_18px_32px_rgba(26,66,111,0.2)] max-sm:left-0 max-sm:min-h-[3.6rem] max-sm:min-w-[3.6rem]">
            <Plus size={24} strokeWidth={2.5} />
          </div>
          <div className="absolute bottom-[12%] right-[10%] z-[2] inline-flex min-h-[4.6rem] min-w-[4.6rem] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,#7a78ff,#5b52dc)] p-3 text-white shadow-[0_18px_32px_rgba(26,66,111,0.2)] max-sm:min-h-[3.6rem] max-sm:min-w-[3.6rem]">
            <MapPin size={24} strokeWidth={2.5} />
          </div>

          <div className="relative z-10 aspect-[0.56] w-[min(100%,23rem)] rounded-[3.2rem] bg-[linear-gradient(180deg,#111827_0%,#1f2937_100%)] p-4 shadow-[0_32px_60px_rgba(19,54,95,0.26)] max-sm:w-[min(100%,18rem)]">
            <div className="absolute left-1/2 top-4 z-20 h-[1.35rem] w-[32%] -translate-x-1/2 rounded-full bg-[#111827]" />
            <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-[linear-gradient(180deg,#e8f5ff_0%,#cfe8ff_100%)]">
              <Image
                src="/assets/images/showcase/de-olho.png"
                alt="Aplicativo De Olho no Bueiro em destaque"
                fill
                sizes="(max-width: 980px) 280px, 360px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-[linear-gradient(135deg,#114d8f_0%,#246fbd_100%)] px-6 py-5 text-[#eff8ff] shadow-[0_22px_40px_rgba(24,81,141,0.2)] max-lg:flex-col max-lg:items-start">
        <div className="flex items-start gap-4">
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <CheckCheck size={24} strokeWidth={2} />
          </div>
          <div>
            <strong className="mb-1 block text-base">Informação que salva vidas, conecta pessoas e transforma cidades.</strong>
            <p className="m-0 text-sm text-[#eff8ff]/80">
              Uma plataforma colaborativa que transforma relatos em soluções reais para os desafios das chuvas.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="flex">
            <span className="ml-[-0.4rem] h-8 w-8 rounded-full border-2 border-white bg-[linear-gradient(135deg,#ffb48f,#f97316)] first:ml-0" />
            <span className="ml-[-0.4rem] h-8 w-8 rounded-full border-2 border-white bg-[linear-gradient(135deg,#fcd34d,#f59e0b)]" />
            <span className="ml-[-0.4rem] h-8 w-8 rounded-full border-2 border-white bg-[linear-gradient(135deg,#93c5fd,#3b82f6)]" />
            <span className="ml-[-0.4rem] h-8 w-8 rounded-full border-2 border-white bg-[linear-gradient(135deg,#c4b5fd,#8b5cf6)]" />
          </div>
          <div className="flex flex-col">
            <strong>+2.500</strong>
            <span className="text-[0.86rem] text-[#eff8ff]/80">cidadãos ativos</span>
          </div>
        </div>
      </section>

      <section id="solucao" className="mt-9">
        <div className="mb-5 text-center">
          <h2 className={sectionTitleClass}>O problema é real. A solução é coletiva.</h2>
          <p className={`mx-auto max-w-3xl ${sectionTextClass}`}>
            Enchentes, alagamentos e bueiros entupidos causam transtornos diários, prejuízos e até riscos à vida.
            A falta de informação em tempo real dificulta a resposta rápida dos órgãos competentes.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {problemCards.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-sky-200/50 bg-white/90 p-6 shadow-[0_22px_44px_rgba(29,76,126,0.08)]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#dbeafe,#60a5fa)] text-[#17365f]">
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#17365f]">{item.title}</h3>
              <p className="m-0 leading-7 text-[#637789]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-9 rounded-[1.8rem] border border-sky-200/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(243,250,255,0.94))] p-7 max-sm:p-5">
        <div className="mb-5 text-center">
          <h2 className={sectionTitleClass}>Como funciona?</h2>
          <p className={sectionTextClass}>Três passos simples para fazer a diferença na sua cidade.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center gap-4 max-md:flex-col">
              <article className="flex-1 rounded-3xl border border-sky-200/50 bg-white/95 p-6 text-center shadow-[0_22px_44px_rgba(29,76,126,0.08)]">
                <div className="mb-4 text-[#2563eb]">{step.icon}</div>
                <div className="mx-auto mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d8ebff,#77b7ff)] font-extrabold text-[#1d4f82]">
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#17365f]">{step.title}</h3>
                <p className="m-0 leading-7 text-[#637789]">{step.description}</p>
              </article>
              {idx < steps.length - 1 && (
                <div className="hidden md:block">
                  <ArrowRight size={24} color="#94a3b8" strokeWidth={2} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <div className="mb-5 text-center">
          <h2 className={sectionTitleClass}>Para quem é a plataforma?</h2>
          <p className={sectionTextClass}>Uma mesma base visual servindo informação pública, operação e pesquisa.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-sky-200/50 bg-white/95 p-5 text-center shadow-[0_22px_44px_rgba(29,76,126,0.08)]"
            >
              <div className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d8ecff,#8cc6ff)]">
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#17365f]">{item.title}</h3>
              <p className="m-0 leading-7 text-[#637789]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7 grid gap-4 rounded-3xl bg-[linear-gradient(135deg,#155191_0%,#246fbd_100%)] p-5 text-[#eff8ff] md:grid-cols-4">
        {metrics.map((item) => (
          <article key={item.label} className="px-4 py-3 text-center">
            <strong className="block text-[clamp(1.5rem,2.4vw,2rem)]">{item.value}</strong>
            <span className="text-sm text-[#eff8ff]/80">{item.label}</span>
          </article>
        ))}
      </section>

      <section className="mt-9 grid gap-6 rounded-[1.8rem] border border-sky-200/50 bg-white/95 p-6 shadow-[0_22px_44px_rgba(29,76,126,0.08)] lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] max-sm:p-5">
        <div className="flex items-end justify-center">
          <div className="relative aspect-[0.62] w-[min(100%,18rem)] overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#1c4d84,#0d243f)] shadow-[0_28px_52px_rgba(18,51,88,0.24)]">
            <Image
              src="/assets/images/showcase/de-olho.png"
              alt="Tela do aplicativo no celular"
              fill
              sizes="(max-width: 980px) 280px, 320px"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <span className="inline-flex items-center rounded-full bg-sky-100/95 px-3 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[#24649e]">
            App mobile
          </span>
          <h2 className="mt-4 text-[clamp(2rem,3vw,2.8rem)] tracking-[-0.04em] text-[#143454]">
            Leve o monitoramento no seu bolso.
          </h2>
          <p className="mt-3 text-base leading-7 text-[#678]">
            Baixe nosso aplicativo e ajude a construir uma cidade mais segura e resiliente para todos.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="inline-flex min-h-[2.9rem] items-center gap-3 rounded-2xl bg-[#111827] px-4 text-white">
              <Play size={20} fill="currentColor" />
              <div>
                <span className="block text-[0.72rem]">Disponível no</span>
                <strong className="text-sm">Google Play</strong>
              </div>
            </div>
            <div className="inline-flex min-h-[2.9rem] items-center gap-3 rounded-2xl bg-[#111827] px-4 text-white">
              <Apple size={20} fill="currentColor" />
              <div>
                <span className="block text-[0.72rem]">Disponível na</span>
                <strong className="text-sm">App Store</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {appFeatures.map((item) => (
              <article key={item.title} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3">
                <div className="mt-1 text-[#2563eb]">{item.icon}</div>
                <div>
                  <strong className="block text-[#17365f]">{item.title}</strong>
                  <p className="m-0 leading-7 text-[#637789]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="equipe"
        className="mt-8 mb-4 grid gap-6 rounded-[1.6rem] bg-[linear-gradient(180deg,#15385f,#102c4a)] p-6 text-[#eff8ff] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
      >
        <div className="flex items-start gap-4">
          <div className="inline-flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-2xl bg-white/12">
            <Image src="/assets/images/branding/logo-tab.svg" alt="" width={42} height={42} />
          </div>
          <div>
            <strong className="mb-1 block text-[1.05rem]">De Olho no Bueiro</strong>
            <p className="m-0 leading-7 text-[#eff8ff]/75">Monitoramento urbano com leitura pública e operacional.</p>
            <div className="mt-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-white/60" />
              <span className="h-3 w-3 rounded-full bg-white/45" />
              <span className="h-3 w-3 rounded-full bg-white/35" />
              <span className="h-3 w-3 rounded-full bg-white/25" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Navegação</h3>
            <div className="grid">
              <Link href="/" className="leading-8 text-[#eff8ff]/75">Início</Link>
              <Link href="/dashboard" className="leading-8 text-[#eff8ff]/75">Dashboard</Link>
              <Link href="/#solucao" className="leading-8 text-[#eff8ff]/75">Solução</Link>
              <Link href="/#equipe" className="leading-8 text-[#eff8ff]/75">Equipe</Link>
              <Link href="/login" className="leading-8 text-[#eff8ff]/75">Acesso público</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Recursos</h3>
            <div className="grid">
              <span className="leading-8 text-[#eff8ff]/75">Como funciona</span>
              <span className="leading-8 text-[#eff8ff]/75">Perguntas frequentes</span>
              <span className="leading-8 text-[#eff8ff]/75">Termos de uso</span>
              <span className="leading-8 text-[#eff8ff]/75">Política de privacidade</span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Fale conosco</h3>
            <div className="grid gap-2">
              <span className="inline-flex items-center gap-2 leading-7 text-[#eff8ff]/75">
                <Mail size={16} strokeWidth={2} />
                dev@ianalas.tech
              </span>
              <span className="inline-flex items-center gap-2 leading-7 text-[#eff8ff]/75">
                <MapPin size={16} strokeWidth={2} />
                Fortaleza - CE, Brasil
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 lg:col-span-2">
          <p className="m-0 text-sm text-[#eff8ff]/65">© 2026 De Olho no Bueiro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
