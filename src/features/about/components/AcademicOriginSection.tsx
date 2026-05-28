import { GraduationCap } from 'lucide-react';
import Image from 'next/image';

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
            <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-[radial-gradient(circle_at_top,#eff8ff_0%,#d8eefc_38%,#f8fbff_100%)] p-3 shadow-[0_26px_70px_rgba(14,57,94,0.12)]">
                <Image
                  src="/assets/images/arte-3d-logotipo.png"
                  alt="Ilustração do projeto De Olho no Bueiro mostrando comunidade, mapa urbano e monitoramento por celular"
                  width={768}
                  height={768}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="h-auto w-full object-cover"
                  priority={false}
                />
            </div>
          </div>  
          
        </div>
      </div>
    </section>
  );
}
