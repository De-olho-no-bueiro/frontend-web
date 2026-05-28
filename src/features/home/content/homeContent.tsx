import type { ReactNode } from 'react';
import {
  Bell,
  Bus,
  CircleAlert,
  CloudRain,
  Gauge,
  MapPinned,
  Map,
  MapPin,
  NotebookText,
  ShieldCheck,
  Store,
  Users,
} from 'lucide-react';

type IconContentItem = {
  value?: string;
  label?: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export const heroStats: Array<{ value: string; label: string; icon: ReactNode }> = [
  {
    value: 'Dados em tempo real',
    label: 'Informações atualizadas pela comunidade',
    icon: <ShieldCheck size={20} strokeWidth={2.2} />,
  },
  {
    value: 'Mapas inteligentes',
    label: 'Visualize hotspots e áreas de risco',
    icon: <MapPinned size={20} strokeWidth={2.2} />,
  },
  {
    value: 'Apoio à gestão pública',
    label: 'Decisões melhores com base em evidências',
    icon: <Users size={20} strokeWidth={2.2} />,
  },
];

export const problemCards: Array<IconContentItem & { tone: string }> = [
  {
    title: 'Enchentes recorrentes',
    description: 'Deficiências na drenagem urbana aumentam os riscos em dias de chuva.',
    tone: 'blue',
    icon: <CloudRain size={24} strokeWidth={2} />,
  },
  {
    title: 'Bueiros inoperantes',
    description: 'Entupimentos e danos comprometem o fluxo das águas.',
    tone: 'slate',
    icon: <CircleAlert size={24} strokeWidth={2} />,
  },
  {
    title: 'Falta de dados',
    description: 'Sem informação precisa, a prevenção e a ação são mais lentas.',
    tone: 'violet',
    icon: <Gauge size={24} strokeWidth={2} />,
  },
];

export const steps: Array<IconContentItem & { number: string }> = [
  {
    number: '1',
    title: 'Reporte',
    description: 'Informe alagamentos ou problemas em bueiros com localização, foto e detalhes da ocorrência.',
    icon: <MapPin size={40} strokeWidth={1.5} color="#2563eb" />,
  },
  {
    number: '2',
    title: 'Mapeamento',
    description: 'Os dados são validados e exibidos em mapas inteligentes, mostrando áreas críticas em tempo real.',
    icon: <Map size={40} strokeWidth={1.5} color="#2563eb" />,
  },
  {
    number: '3',
    title: 'Ação',
    description: 'Órgãos públicos recebem os alertas, planejam intervenções e a cidade se torna mais segura.',
    icon: <Store size={40} strokeWidth={1.5} color="#2563eb" />,
  },
];

export const audiences: IconContentItem[] = [
  {
    title: 'Cidadãos',
    description: 'Navegue com mais segurança, evite áreas de risco e ajude sua comunidade.',
    icon: <Users size={32} strokeWidth={1.5} color="#1e40af" />,
  },
  {
    title: 'Transporte e Logística',
    description: 'Otimize rotas, reduza atrasos e prejuízos causados por alagamentos.',
    icon: <Bus size={32} strokeWidth={1.5} color="#1e40af" />,
  },
  {
    title: 'Órgãos Públicos',
    description: 'Monitore em tempo real, planeje ações e responda com mais agilidade.',
    icon: <Store size={32} strokeWidth={1.5} color="#1e40af" />,
  },
  {
    title: 'Comunidade Científica',
    description: 'Acesse dados inéditos para pesquisas e modelos preditivos sobre o clima urbano.',
    icon: <NotebookText size={32} strokeWidth={1.5} color="#1e40af" />,
  },
];

export const metrics = [
  { value: '50+', label: 'Cidadãos ativos' },
  { value: '20+', label: 'Ocorrências registradas' },
  { value: '850+', label: 'Áreas monitoradas' },
  { value: '98%', label: 'Satisfação dos usuários' },
];

export const appFeatures: IconContentItem[] = [
  {
    title: 'Reporte rápido e fácil',
    description: 'Envie ocorrências em segundos com poucos toques.',
    icon: <ShieldCheck size={20} strokeWidth={2} color="#2563eb" />,
  },
  {
    title: 'Localização automática',
    description: 'Sua localização é detectada automaticamente pelo GPS.',
    icon: <MapPin size={20} strokeWidth={2} color="#2563eb" />,
  },
  {
    title: 'Acompanhe alertas',
    description: 'Receba notificações sobre áreas de risco próximas a você.',
    icon: <Bell size={20} strokeWidth={2} color="#2563eb" />,
  },
];
