import { Map, Droplets, BookOpen, Users } from 'lucide-react';

const impactData = [
  {
    icon: Map,
    title: 'Mapeamento Contínuo',
    description: 'Coletamos coordenadas e dados de alagamentos e bueiros usando tecnologia colaborativa.'
  },
  {
    icon: BookOpen,
    title: 'Dados Abertos',
    description: 'Disponibilizamos informações de maneira clara e transparente para toda a população.'
  },
  {
    icon: Users,
    title: 'Impacto Social',
    description: 'Apoiamos a prevenção de desastres urbanos engajando ativamente a comunidade.'
  },
  {
    icon: Droplets,
    title: 'Estudo Hidrológico',
    description: 'Analisamos o comportamento das águas pluviais para embasar soluções estruturais.'
  }
];

export default function ImpactSection() {
  return (
    <section className="w-full py-24 bg-slate-50 border-y border-slate-100">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Nosso Impacto</h2>
          <p className="text-lg text-slate-600">
            Veja como transformamos tecnologia e pesquisa acadêmica em benefícios reais para a infraestrutura da cidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactData.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-sky-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
