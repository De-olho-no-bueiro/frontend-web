import { dashboardFeatures } from '@/features/how-to-use/content/howToUseContent';
import { FileSpreadsheet, MapPinned, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';

const dashboardFeatureIcons: Record<string, ReactNode> = {
  'visao-geral': <MapPinned size={20} strokeWidth={2.1} />,
  filtros: <ShieldCheck size={20} strokeWidth={2.1} />,
  gestao: <FileSpreadsheet size={20} strokeWidth={2.1} />,
};

export function DashboardContent() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Dashboard Web
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          O painel web foi desenhado para leitura operacional: cruzar ocorrências, filtrar recortes, inspecionar registros e exportar dados para compartilhamento.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3 mb-12">
        {dashboardFeatures.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              {dashboardFeatureIcons[item.id]}
            </div>
            <h3 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-slate-600">{item.description}</p>
            <ul className="space-y-2 pl-4 text-sm text-slate-600 marker:text-slate-400 list-disc">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="pl-1 leading-relaxed">{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-5 bg-white">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">Navegação principal do painel</h3>
          <p className="mt-1 text-sm text-slate-600">
            A interface favorece leitura sequencial: entender o panorama, refinar o recorte e descer ao detalhe.
          </p>
        </div>
        <ol className="grid divide-y md:divide-y-0 md:divide-x divide-slate-200 md:grid-cols-3">
          {[
            'Consulte o cabeçalho e os cards para entender o recorte ativo e a base disponível.',
            'Ajuste filtros, busca e bairro para atualizar mapa, gráficos, tabela e cards em conjunto.',
            'Use cards, tabela e exportação CSV para aprofundar a leitura e compartilhar resultados.',
          ].map((step, index) => (
            <li key={step} className="px-6 py-5">
              <strong className="block text-xs font-bold uppercase tracking-widest text-sky-600 mb-2">
                Etapa {index + 1}
              </strong>
              <p className="text-sm leading-relaxed text-slate-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
