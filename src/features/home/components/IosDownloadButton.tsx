'use client';

import { useState } from 'react';
import { Apple, X, Share } from 'lucide-react';
import Link from 'next/link';

export function IosDownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="group inline-flex min-h-16 items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 px-7 py-3 text-white shadow-[0_8px_30px_-4px_rgba(0,0,0,0.3)] transition-all hover:cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_40px_-4px_rgba(0,0,0,0.4)] active:scale-[0.98]"
      >
        <div className="rounded-full bg-white/10 p-2 transition-transform group-hover:scale-110">
          <Apple size={26} fill="currentColor" />
        </div>
        <div className="text-left">
          <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Web App (PWA)</span>
          <strong className="block text-lg font-bold tracking-tight">Baixar para iOS</strong>
        </div>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          
          <div
            className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title-ios"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 id="modal-title-ios" className="text-lg font-bold leading-6 text-slate-900">
                  Como instalar no iPhone (iOS)
                </h3>
                <span className="mb-2 inline-block rounded-full bg-rose-100 px-2.5 py-0.5 text-[0.725rem] font-bold uppercase tracking-wider text-rose-700">
                  Sistema em fase de testes
                </span>
              </div>
              <button
                type="button"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                onClick={() => setIsModalOpen(false)}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-2 space-y-4 text-sm text-slate-600">
              <p>
                No momento, o aplicativo para iOS funciona como um <strong>Web App (PWA)</strong>. Siga os passos abaixo no navegador Safari do seu iPhone:
              </p>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Abra este site no navegador <strong>Safari</strong> do seu iPhone.</li>
                <li>
                  Toque no ícone de <strong>Compartilhar</strong> (um quadrado com uma seta para cima <Share size={14} className="inline mb-1" />) na barra inferior.
                </li>
                <li>Role o menu para baixo e selecione <strong>"Adicionar à Tela de Início"</strong> (Add to Home Screen).</li>
                <li>Toque em <strong>"Adicionar"</strong> no canto superior direito.</li>
              </ol>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4">
              <Link
                href="/como-usar"
                className="text-sm font-semibold text-sky-600 transition hover:text-sky-700 hover:underline hover:underline-offset-2"
                onClick={() => setIsModalOpen(false)}
              >
                Saiba mais sobre a instalação
              </Link>

              <div className="flex w-full justify-end gap-3 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 hover:cursor-pointer hover:bg-slate-100"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <a
                  href="https://bueiro-mobile.ianalas.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 hover:cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  Acessar Web App
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
