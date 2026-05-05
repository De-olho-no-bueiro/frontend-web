# De Olho no Bueiro Web

Portal web publico em Next.js para leitura de ocorrencias de alagamento e bueiros.

## Ambiente

Crie `.env.local` a partir de `.env.example`.

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
BACKEND_API_URL=http://localhost:3001/api
NEXT_PUBLIC_MOCK_ENABLED=false
```

Notas:

- backend Nest usa prefixo global `/api`
- em desenvolvimento local, rode backend em `3001` para nao conflitar com Next em `3000`
- frontend agora usa proxy interno do Next para evitar erro de CORS/mixed content no navegador
- leitura publica:
  - `GET /api/public/v1/flood-areas`
  - `GET /api/public/v1/manholes`
  - `GET /api/public/v1/reportes`
- login opcional para futuras acoes pessoais:
  - `POST /api/web/v1/auth/login`
- mock agora so liga se `NEXT_PUBLIC_MOCK_ENABLED=true`

## Subir projeto

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Fluxo esperado

1. subir backend
2. configurar `NEXT_PUBLIC_API_URL`
3. abrir `/`
4. navegar no portal publico
5. opcional: usar `/login` para sessao de cidadao

## Exportacao

Painel exporta tabela filtrada em CSV com confirmacao antes do download.
