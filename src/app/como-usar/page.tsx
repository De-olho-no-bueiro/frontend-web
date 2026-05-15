import type { Metadata } from 'next';
import HowToUsePage from '@/features/how-to-use/views/HowToUsePage';

export const metadata: Metadata = {
  title: 'Como Usar | De Olho no Bueiro',
  description:
    'Guia de instalação e uso do aplicativo De Olho no Bueiro, com explicação das permissões, do mapa e do dashboard.',
};

export default function Page() {
  return <HowToUsePage />;
}
