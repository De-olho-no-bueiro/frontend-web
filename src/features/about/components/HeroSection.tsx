export default function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden flex items-center justify-center bg-gradient-to-b from-sky-50/50 to-white">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-sky-400/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800">
          <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-2 animate-pulse"></span>
          Projeto de Extensão Universitária - UNIFOR
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Democratizando o acesso a <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-500">dados hidrológicos</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
          O projeto De Olho no Bueiro mapeia inundações em Fortaleza e promove o acesso aberto à informação para a construção de cidades mais resilientes e seguras.
        </p>
      </div>
    </section>
  );
}
