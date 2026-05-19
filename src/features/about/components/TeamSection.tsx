"use client";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const teamMembers = [
  {
    name: 'Laldiane Pinheiro',
    role: 'Orientadora do Projeto',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQGTY51mzyuGIg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691280671445?e=1780531200&v=beta&t=DgSUQWj9vtfgoh9GNJ62AaRspl3SxD7wstGvYlF2_RY', // Ex: '/assets/images/foto1.png' ou 'https://media.licdn.com/dms/image/...'
    linkedin: 'https://www.linkedin.com/in/laldiane-pinheiro-aa43b429/',
    github: '#'
  },
  {
    name: 'Ian Alas',
    role: 'Líder do Projeto / DEV',
    image: '/assets/images/Perfil-ian.png',
    linkedin: 'https://www.linkedin.com/in/ian-alas/',
    github: 'https://github.com/Ianalas',
    imageClassName: 'scale-[2] -translate-x-6 translate-y-20' // O translate-x mexe na horizontal, translate-y na vertical
  },
  {
    name: 'Saul Santos',
    role: 'Desenvolvedor Web',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQE06D1X_LmYFg/profile-displayphoto-crop_800_800/B4EZsS4oKiGUAI-/0/1765548393716?e=1780531200&v=beta&t=6ylcTvtra2xD35voQME_GKKyWCSstirEpkl0zxlraxo',
    linkedin: 'https://www.linkedin.com/in/saul-santos-142372246/',
    github: 'https://github.com/SaulSantos1'
  },
  {
    name: 'Rodrigo Braga',
    role: 'Desenvolvedor',
    image: 'https://avatars.githubusercontent.com/u/123033425?v=4',
    linkedin: '#',
    github: 'https://github.com/RodrigoBragaDev'
  },
  {
    name: 'Pedro Antônio',
    role: 'DevOps',
    image: 'https://avatars.githubusercontent.com/u/133423641?v=4',
    linkedin: 'https://www.linkedin.com/in/pedrooaj/',
    github: 'https://github.com/PedroL3m0z'
  },
  {
    name: 'João Pedro',
    role: 'Comunicação',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQHuTnZXrFlpFA/profile-displayphoto-crop_800_800/B4EZw1uB.WHgAI-/0/1770427785620?e=1780531200&v=beta&t=-w42k7bdCB7yvelmvFGEf92__r-oHYtBvyDmy31W-Ek',
    linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-pedro-campos-fernandes-40b9a0356/',
    github: 'https://github.com/jP30devs'
  },
  {
    name: 'Isabella Mendes',
    role: 'Data Engineering',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQHJgQQtKu5uSQ/profile-displayphoto-shrink_800_800/B4DZaPf2FWG0Ag-/0/1746164212563?e=1780531200&v=beta&t=CeKQAJ-t7h4ooujqIQt2OPzVU3nUFzH9NRVmdCkxIAc',
    linkedin: 'https://www.linkedin.com/in/isabellamm/',
    github: 'https://github.com/ismendins/'
  }
];

export default function TeamSection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Nossa Equipe</h2>
          <p className="text-lg text-slate-600">
            Conheça as pessoas por trás do desenvolvimento e pesquisa do projeto De Olho no Bueiro.
          </p>
        </div>
        
        {/* Equipe Completa: Distribuída harmoniosamente usando Flexbox com wrap */}
        <div className="flex flex-wrap justify-center gap-10">
          {teamMembers.map((member, index) => (
            <MemberCard key={`member-${index}`} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Subcomponente de Card da Equipe
function MemberCard({ member }: { member: any }) {
  // Tamanho do avatar uniforme para todos
  const sizeClass = 'w-44 h-44 md:w-48 md:h-48';
  
  return (
    <div className="group flex flex-col items-center text-center max-w-[240px]">
      <div className={`relative ${sizeClass} mb-6 overflow-hidden rounded-full bg-slate-50 ring-4 ring-white shadow-xl shadow-slate-200/50 group-hover:ring-sky-100 group-hover:-translate-y-2 group-hover:shadow-sky-100 transition-all duration-300`}>
        
        {/* Fallback avatar when no image is provided */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-300 group-hover:bg-sky-50 group-hover:text-sky-300 transition-colors z-0">
          <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>

        {/* Imagem flexível para links locais ou remotos */}
        {member.image && (
          <div className="absolute inset-0 z-10 group-hover:scale-105 transition-transform duration-500">
            <img 
              src={member.image} 
              alt={member.name}
              className={`w-full h-full object-cover ${member.imageClassName || ''}`}
              loading="lazy"
              onError={(e) => {
                // Em caso de quebra de link da imagem, o fallback abaixo aparecerá
                const parent = e.currentTarget.parentElement;
                if (parent) parent.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
        {member.name}
      </h3>
      <p className="text-sky-600 font-medium text-sm mt-1 mb-4">{member.role}</p>
      
      <div className="flex gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-50 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors shadow-sm" aria-label={`LinkedIn de ${member.name}`}>
            <LinkedinIcon className="w-4 h-4" />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-50 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors shadow-sm" aria-label={`GitHub de ${member.name}`}>
            <GithubIcon className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
