import { Info } from 'lucide-react';
import Image from 'next/image';

export default function ProjectSection() {
  return (
    <section className="w-full py-20 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex-shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">O Projeto</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              Nascido no coração da Universidade de Fortaleza (UNIFOR), somos um projeto de extensão 
              universitária voltado a atuar diretamente nas problemáticas urbanas relacionadas às águas pluviais.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              Nosso objetivo principal é mapear áreas de risco, catalogar bueiros e registrar focos de alagamento 
              na cidade de Fortaleza. Ao mesmo tempo, traduzimos esses dados hidrológicos para uma linguagem 
              acessível e pública, capacitando a comunidade a tomar decisões informadas e colaborar com o 
              poder público.
            </p>
            
            {/* Espaço para o ícone da UNIFOR */}
            <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
              <a 
                href="https://www.unifor.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-32 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center hover:border-sky-300 hover:shadow-md transition-all duration-300"
                aria-label="Acessar o site da Universidade de Fortaleza"
              >
                <Image 
                  src="/assets/images/logo-unifor.png" 
                  alt="Ícone UNIFOR" 
                  fill
                  className="object-contain p-1" 
                />
              </a>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">Apoio Institucional</span>
                <a 
                  href="https://www.unifor.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-sky-600 transition-colors"
                >
                  Universidade de Fortaleza
                </a>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-sky-900/5 aspect-square md:aspect-[4/3] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-8 text-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/40 to-slate-50/10 z-10" />
             
             {/* Abstract grid pattern to represent mapping */}
             <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
             
             <div className="relative z-20 flex flex-col items-center">
               <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-sky-200/50">
                 <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">Mapeamento em Fortaleza</h3>
               <p className="text-slate-500 text-sm max-w-xs">Identificando pontos críticos e estruturando dados para o bem-estar urbano.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
