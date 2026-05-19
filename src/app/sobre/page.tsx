import type { Metadata } from 'next';
import AboutPage from '@/features/about/views/AboutPage';

export const metadata: Metadata = {
  title: 'Sobre | De Olho no Bueiro',
  description: 'Conheça o projeto de extensão universitária da UNIFOR focado no mapeamento de inundações em Fortaleza.',
};

export default function Sobre() {
  return <AboutPage />;
}
