import { ChevronRight } from 'lucide-react';

export type DocTopic = 'android' | 'ios' | 'mobile-app' | 'dashboard';

interface DocSidebarProps {
  activeTopic: DocTopic;
  onSelectTopic: (topic: DocTopic) => void;
  isOpenMobile?: boolean;
}

const navGroups = [
  {
    title: 'Instalação',
    items: [
      { id: 'android', label: 'Android' },
      { id: 'ios', label: 'iOS' },
    ],
  },
  {
    title: 'Funcionalidades',
    items: [
      { id: 'mobile-app', label: 'App Mobile' },
      { id: 'dashboard', label: 'Web Dashboard' },
    ],
  },
] as const;

export function DocSidebar({ activeTopic, onSelectTopic, isOpenMobile }: DocSidebarProps) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white pt-20 transition-transform duration-300 ease-in-out md:static md:w-auto md:translate-x-0 md:pt-0 md:bg-transparent
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="h-full overflow-y-auto px-4 py-6 md:px-0 md:py-8">
        <nav className="space-y-8">
          {navGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 px-3 text-sm font-bold tracking-wide text-slate-900">
                {group.title}
              </h4>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeTopic === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => onSelectTopic(item.id as DocTopic)}
                        className={`
                          group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors
                          ${isActive
                            ? 'bg-sky-50 font-medium text-sky-700'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }
                        `}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <ChevronRight size={14} className="text-sky-500" strokeWidth={3} />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
