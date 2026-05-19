import { GraduationCap, Code2 } from 'lucide-react';

export default function AcademicOriginSection() {
  return (
    <section className="w-full py-24 bg-white border-t border-slate-100">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800 mb-2">
              <GraduationCap className="w-4 h-4 mr-2" />
              Nossa Formação
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Quem Somos
            </h2>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              A equipe do <strong>De Olho no Bueiro</strong> é formada por estudantes do curso de Análise e Desenvolvimento de Sistemas (ADS). O projeto nasceu da vontade de aplicar o conhecimento de sala de aula em algo que realmente importa para a sociedade.
            </p>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              Além do nosso forte impacto social, este ecossistema também tem um objetivo técnico claro: queremos validar nosso produto no mundo real. Ele serve como nossa principal vitrine profissional para demonstrar de forma prática nossas competências e habilidades no desenvolvimento de software de ponta.
            </p>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/3] rounded-2xl bg-slate-50 border border-slate-100 p-8 flex flex-col justify-center relative overflow-hidden shadow-xl shadow-sky-900/5">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Code2 className="w-32 h-32 text-sky-900" />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Excelência Técnica</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Pesquisa Aplicada</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Vitrine Profissional</h3>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
