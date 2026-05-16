import { mobileAppFeatures } from '@/features/how-to-use/content/howToUseContent';
import { Bell, Download, Map } from 'lucide-react';
import type { ReactNode } from 'react';
import Image from 'next/image';

const mobileFeatureIcons: Record<string, ReactNode> = {
  mapa: <Map size={20} strokeWidth={2.1} />,
  relato: <Download size={20} strokeWidth={2.1} />,
  acompanhamento: <Bell size={20} strokeWidth={2.1} />,
};

export function MobileAppContent() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Aplicativo Mobile
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          No celular, a experiência é pensada para consulta rápida do mapa e envio de ocorrências com contexto suficiente para apoiar o acompanhamento público.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px] xl:gap-12">
        <div className="order-2 lg:order-1 space-y-8">
          {mobileAppFeatures.map((item) => (
            <section key={item.id}>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  {mobileFeatureIcons[item.id]}
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{item.title}</h2>
              </div>
              <p className="mb-4 text-slate-600 leading-relaxed">
                {item.description}
              </p>
              <ul className="space-y-2 pl-4 text-slate-600 marker:text-slate-400 list-disc">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="pl-1 leading-relaxed">{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="order-1 lg:order-2">
          <div className="relative mx-auto flex w-full max-w-[240px] flex-col items-center justify-center rounded-2xl bg-slate-50 p-6 border border-slate-100">
            <div className="relative aspect-[9/19.5] w-full">
              <div className="relative h-full w-full rounded-[2.4rem] bg-gradient-to-b from-slate-400 via-slate-600 to-slate-800 p-[2.5px] shadow-xl ring-1 ring-black/10">
                <div className="relative h-full w-full rounded-[2.25rem] bg-slate-950 p-[5px]">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.95rem] bg-black ring-1 ring-black/70">
                    <Image
                      src="/assets/images/app-mapa-mobile.png"
                      alt="Tela do aplicativo"
                      fill
                      sizes="240px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="pointer-events-none absolute left-1/2 top-[10px] z-30 h-[26px] w-[min(42%,6.5rem)] -translate-x-1/2 rounded-full bg-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-5 border border-slate-100">
            <h3 className="mb-3 font-semibold text-slate-900">Fluxo esperado</h3>
            <ol className="list-decimal space-y-2 pl-4 text-sm text-slate-600 marker:text-slate-400">
              <li className="pl-1">Abra o mapa e confirme sua área.</li>
              <li className="pl-1">Verifique ocorrências recentes.</li>
              <li className="pl-1">Envie o relato com detalhes.</li>
              <li className="pl-1">Acompanhe pelo mapa.</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
