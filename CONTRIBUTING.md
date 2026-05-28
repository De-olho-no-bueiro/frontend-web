# Contribuindo com o portal web

Este projeto aceita contribuições em UI, acessibilidade, performance, SEO, observabilidade, integração com API e documentação.

## Antes de abrir um PR

- Verifique se já existe issue relacionada
- Se a mudança alterar navegação, visual ou conteúdo, descreva o impacto
- Prefira PRs pequenos e objetivos

## Como rodar localmente

1. Instale dependências:

```bash
npm install
```

2. Configure ambiente:

```bash
cp .env.example .env.local
```

3. Garanta que a API esteja disponível em `http://localhost:3001/api`

4. Rode o projeto:

```bash
npm run dev
```

## Fluxo recomendado

1. Faça fork do repositório
2. Crie uma branch:

```bash
git checkout -b feat/melhoria-no-dashboard
```

3. Implemente
4. Valide localmente
5. Abra o PR com contexto e passos para teste

## Checklist de validação

Antes de enviar:

```bash
npm run lint
npm run build
```

Também valide manualmente:

- home
- página sobre
- guia de uso
- dashboard
- responsividade mobile e desktop

## Padrões esperados

- Preserve consistência visual entre páginas
- Evite duplicação de componentes
- Mantenha acessibilidade básica: foco visível, contraste e semântica
- Não adicione dependências pesadas sem necessidade clara
- Prefira correções incrementais em vez de refactors extensos sem contexto

## Quando atualizar documentação

Atualize o `README.md` se houver mudança em:

- setup local
- variáveis de ambiente
- fluxo de execução
- páginas públicas
- integração com backend

## O que ajuda bastante em um PR

- screenshots antes/depois
- descrição do problema
- solução adotada
- riscos conhecidos
- passos exatos para testar
