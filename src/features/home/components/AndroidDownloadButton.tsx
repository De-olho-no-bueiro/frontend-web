'use client';

import { useState } from 'react';
import { Download, X } from 'lucide-react';
import Link from 'next/link';

export function AndroidDownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="group inline-flex min-h-16 items-center gap-4 rounded-2xl border border-sky-400/40 bg-gradient-to-br from-sky-500 to-sky-600 px-7 py-3 text-white shadow-[0_8px_30px_-4px_rgba(14,165,233,0.4)] transition-all hover:cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_40px_-4px_rgba(14,165,233,0.5)] active:scale-[0.98]"
      >
        <div className="rounded-full bg-white/20 p-2 transition-transform group-hover:scale-110">
          <Download size={26} className="text-white" />
        </div>
        <div className="text-left">
          <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-sky-100">Instalação Direta</span>
          <strong className="block text-lg font-bold tracking-tight">Baixar para Android</strong>
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
            aria-labelledby="modal-title"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 id="modal-title" className="text-lg font-bold leading-6 text-slate-900">
                  Como instalar o aplicativo
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
                Você está prestes a baixar o arquivo <strong>APK</strong> do aplicativo De Olho no Bueiro. 
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Clique no botão abaixo para baixar o arquivo.</li>
                <li>Abra o arquivo baixado através das notificações ou do seu gerenciador de arquivos.</li>
                <li>
                  Seu celular pode perguntar se você deseja permitir a instalação de aplicativos de <strong>Fontes Desconhecidas</strong>. Permita a instalação para continuar.
                </li>
                <li>Aguarde a instalação terminar e abra o aplicativo!</li>
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
                  className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 hover:cursor-pointer hover:bg-slate-100"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <a
                  href="/downloads/de-olho-no-bueiro.apk"
                  download="DeOlhoNoBueiro.apk"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-sky-600 px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  <Download size={16} />
                  Baixar APK
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
