/**
 * Eixo horizontal único: mesma largura máxima e gutter que o header e o conteúdo principal.
 * Evita desalinhamento visual entre AppShell e páginas.
 */
export const siteContentFrameClass = 'mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8';

/** Superfície de painel/cartão (landing, dashboard, export). Usa `--ui-panel-shadow` em `globals.css`. */
export const uiPanelClass =
  'rounded-2xl border border-slate-200/60 bg-white/95 shadow-[var(--ui-panel-shadow)] ring-1 ring-slate-200/30';

/** Ritmo vertical entre secções grandes (landing / blocos de página). */
export const sectionBlockClass = 'py-12 sm:py-16';
