import { installationGuideItems, installationSupportNotes } from '@/features/how-to-use/content/howToUseContent';
import { ShieldCheck } from 'lucide-react';
export function InstallationAndroidContent() {
  const androidGuide = installationGuideItems.find((item) => item.id === 'android');

  if (!androidGuide) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Instalação no Android
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {androidGuide.summary}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">Passo a Passo</h2>
        <div className="prose prose-slate max-w-none">
          <ol className="list-decimal space-y-4 pl-5 text-slate-700 marker:font-medium marker:text-slate-400">
            {androidGuide.steps.map((step, index) => (
              <li key={index} className="pl-2 leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>
        {androidGuide.note && (
          <div className="mt-8 rounded-xl border border-sky-100 bg-sky-50/50 p-4">
            <div className="flex gap-3">
              <div className="mt-0.5 text-sky-600">
                <ShieldCheck size={20} strokeWidth={2} />
              </div>
              <p className="text-sm text-sky-900 leading-relaxed">{androidGuide.note}</p>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href="/#download-app"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            Ir para os botões de Download
          </a>
          <span className="text-sm text-slate-500">
            Você será redirecionado para a página inicial.
          </span>
        </div>
      </section>

      <section className="mt-12 border-t border-slate-200 pt-10">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">Antes do primeiro uso</h2>
        <p className="mb-8 text-slate-600">
          Algumas permissões tornam o relato mais útil para a comunidade e para a leitura operacional do sistema.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {installationSupportNotes.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <ShieldCheck size={20} strokeWidth={2} />
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
