# De Olho no Bueiro Web

Portal público em Next.js para visualizar ocorrências de alagamento e bueiros, entender o projeto e acompanhar dados consolidados em mapa e dashboard.

## O que este projeto entrega

- Página inicial institucional
- Página sobre o projeto
- Guia de uso
- Dashboard público com mapa, filtros, cards, tabela e exportação CSV
- Consumo de endpoints públicos do backend via rotas internas do Next

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Leaflet e Google Maps

## Requisitos

- Node.js 20+
- npm 10+
- Backend rodando em `http://localhost:3001/api`

## Variáveis de ambiente

Crie `.env.local` a partir de `.env.example`.

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
BACKEND_API_URL=http://localhost:3001/api
NEXT_PUBLIC_MOCK_ENABLED=false
```

Notas:

- O backend Nest usa prefixo global `/api`
- `BACKEND_API_URL` é usado pelas rotas internas do Next
- `NEXT_PUBLIC_MOCK_ENABLED=true` ativa dados mockados no mapa

## Como rodar localmente

1. Instale dependências:

```bash
npm install
```

2. Configure o ambiente:

```bash
cp .env.example .env.local
```

3. Rode o projeto:

```bash
npm run dev
```

4. Abra:

```text
http://localhost:3000
```

## Fluxo de desenvolvimento esperado

1. Suba a API em `Backend`
2. Aponte `NEXT_PUBLIC_API_URL` e `BACKEND_API_URL` para a API local
3. Rode o frontend
4. Valide a home, páginas institucionais e o dashboard público

## Scripts úteis

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Estrutura resumida

```text
src/
├─ app/
├─ core/
└─ features/
   ├─ about/
   ├─ home/
   ├─ how-to-use/
   └─ map/
```

## Integração com o backend

Principais leituras públicas:

- `GET /api/public/v1/flood-areas`
- `GET /api/public/v1/manholes`
- `GET /api/public/v1/reportes`

O projeto usa rotas internas do Next para reduzir problemas de CORS e centralizar o acesso ao backend.

## Build de produção

```bash
npm run build
npm run start
```

Antes de publicar:

- confira as URLs da API
- valide o comportamento sem mocks
- teste o dashboard com dados reais

## Contribuição

Leia [CONTRIBUTING.md](./CONTRIBUTING.md) para fluxo de contribuição, checklist e boas práticas de PR.
