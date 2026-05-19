# Contribuindo com o De Olho no Bueiro (Frontend Web) 💙

Primeiramente, muito obrigado por dedicar seu tempo para contribuir com o projeto **De Olho no Bueiro**! Toda ajuda é bem-vinda, desde pequenas correções de digitação na documentação até o desenvolvimento de novas features complexas.

Este documento tem como objetivo guiar você pelo processo de contribuição, explicando nossos padrões de código e arquitetura.

---

## 🚀 Como começar

### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (recomendamos a versão LTS atual - v18 ou v20)
- Um gerenciador de pacotes (usamos preferencialmente `npm` ou `yarn`)
- Git

### Passo a Passo Local
1. **Faça um Fork** deste repositório para a sua conta.
2. **Clone o repositório** para a sua máquina local:
   ```bash
   git clone https://github.com/SEU_USUARIO/frontend-web.git
   ```
3. **Instale as dependências:**
   ```bash
   cd frontend-web
   npm install
   ```
4. **Crie uma branch para a sua feature ou correção:**
   ```bash
   git checkout -b feat/minha-nova-funcionalidade
   ```
5. **Rode o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:3000` no seu navegador.

---

## 💅 Padrões de Código e Linters

Para manter a consistência e a qualidade do código em todo o projeto, nós utilizamos o **ESLint** e o **Prettier**.

Antes de abrir um Pull Request, certifique-se de que o seu código está formatado e sem erros de lint:

- Para checar erros: `npm run lint`
- **Dica de DX:** Recomendamos instalar as extensões do ESLint e Prettier no seu VSCode e configurar para formatar o código ao salvar (`editor.formatOnSave: true`).

**Padrões Gerais do Frontend:**
- Usamos **TypeScript** rigorosamente. Evite ao máximo o uso de `any`.
- Utilizamos **Tailwind CSS** para a estilização. Priorize as classes utilitárias ao invés de criar arquivos CSS extras.
- Usamos a estrutura do **Next.js App Router** (`src/app`).
- Prefira componentes funcionais e React Hooks em detrimento de classes.

---

## 🏷️ Padrão de Nomenclatura de Branches

Tente manter os nomes das branches em inglês, curtos e descritivos. Usamos o seguinte padrão:
- `feat/`: para novas funcionalidades (ex: `feat/team-section`)
- `fix/`: para correção de bugs (ex: `fix/header-mobile`)
- `docs/`: para alterações na documentação (ex: `docs/update-readme`)
- `refactor/`: para refatorações de código que não adicionam funcionalidades nem corrigem bugs
- `chore/`: para atualizações de dependências e configurações estruturais (ex: `chore/update-nextjs`)

---

## 💬 Padrão de Commits (Conventional Commits)

Nós adotamos o padrão do [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/). Isso nos ajuda a entender o histórico de forma fácil e a automatizar nosso versionamento sem estresse.

O formato deve ser: `tipo: descrição curta e no imperativo`.

**Exemplos:**
- `feat: adicionar botão de doação na página inicial`
- `fix: corrigir erro de hidratação no componente do mapa`
- `docs: adicionar guia de lint no CONTRIBUTING.md`
- `style: alinhar os itens no cabeçalho`
- `refactor: extrair lógica de fetch para um hook customizado`

---

## 🤝 Abrindo um Pull Request (PR)

1. Faça o commit das suas alterações seguindo o padrão acima:
   ```bash
   git commit -m "feat: adicionar nova seção sobre o app"
   ```
2. Faça o push para a sua branch no seu fork:
   ```bash
   git push origin feat/minha-nova-funcionalidade
   ```
3. Vá até a página original do repositório no GitHub e clique no botão verde **"Compare & pull request"**.
4. Preencha a descrição do PR explicando **o que** foi feito, **por que** foi feito e inclua prints ou vídeos se a alteração for visual (Isso ajuda demais quem for revisar!).
5. Marque referências para as issues, se houver (ex: `Resolve #12`).

Seu PR será analisado pela nossa equipe o mais rápido possível. Sugestões e discussões de código são normais no Open Source, então não se preocupe se pedirmos algumas alterações de arquitetura ou estilo!

---

Mais uma vez, obrigado por contribuir com o **De Olho no Bueiro**. Vamos juntos usar a tecnologia para impactar vidas! 👁️💧
