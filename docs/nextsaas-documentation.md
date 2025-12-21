# NextSaaS Documentation

Documentacao extraida de: https://nextsaas-documentation.vercel.app/

---

## Indice

1. [Estrutura do Projeto](#estrutura-do-projeto)
2. [Como Comecar](#como-comecar)
3. [Criando Novas Paginas](#criando-novas-paginas)
4. [Customizacao](#customizacao)
5. [Animacoes](#animacoes)
6. [Melhores Praticas](#melhores-praticas)
7. [Deploy](#deploy)

---

## Estrutura do Projeto

O NextSaaS utiliza **Next.js 16.1.0** com **App Router**. A organizacao segue este padrao:

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage (/)
│   ├── globals.css         # Global styles
│   ├── [page-name]/        # Static pages
│   └── [dynamic]/[slug]/   # Dynamic pages
├── components/             # React components
│   ├── [page-name]/        # Page-specific components
│   ├── shared/             # Shared components
│   └── ui/                 # UI components
├── context/                # React contexts
├── data/                   # Static data (markdown, JSON)
├── hooks/                  # Custom hooks
├── icons/                  # Icon components
├── interface/              # TypeScript interfaces
└── utils/                  # Utility functions
```

---

## Como Comecar

### Pre-requisitos

- **Node.js** versao 20.9.0 ou superior
- **TypeScript** versao 5.1.0 ou superior
- Gerenciador de pacotes: Yarn (recomendado), npm, pnpm ou bun

### Instalacao

```bash
# Instalar dependencias (escolha um)
yarn install        # recomendado
npm install
pnpm install
bun install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
yarn dev
npm run dev
pnpm dev
bun dev
```

Acesse `http://localhost:3000` no navegador.

### Build para Producao

```bash
# Build
yarn build
npm run build

# Executar build
yarn start
npm run start
```

### Solucao de Problemas

Se encontrar problemas, delete a pasta `node_modules` e reinstale as dependencias:

```bash
rm -rf node_modules
yarn install
```

---

## Criando Novas Paginas

### Passo 1: Criar Diretorio e Arquivo

Crie um novo diretorio em `src/app/` com o nome da pagina e um arquivo `page.tsx`.

```bash
mkdir src/app/sua-pagina
touch src/app/sua-pagina/page.tsx
```

### Passo 2: Estrutura Basica da Pagina

```typescript
// src/app/sua-pagina/page.tsx
import { Metadata } from 'next';
import { Fragment } from 'react';

// Import components
import NavbarOne from '@/components/shared/header/NavbarOne';
import FooterOne from '@/components/shared/footer/FooterOne';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Titulo da Pagina - NextSaaS',
  description: 'Descricao da pagina para SEO',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  openGraph: {
    title: 'Titulo da Pagina',
    description: 'Descricao para compartilhamento social',
    type: 'website',
  },
};

const SuaPagina = () => {
  return (
    <Fragment>
      {/* Header */}
      <NavbarOne
        className="border-stroke-2 dark:border-stroke-6 bg-accent dark:bg-background-9 border"
        btnClassName="btn-primary hover:btn-white-dark dark:hover:btn-white"
      />

      {/* Main Content */}
      <main className="bg-background-2 dark:bg-background-5">
        <SuaPaginaHero />
        <SuaPaginaContent />
        {/* Adicione mais secoes conforme necessario */}
      </main>

      {/* Footer */}
      <FooterOne />
    </Fragment>
  );
};

SuaPagina.displayName = 'SuaPagina';
export default SuaPagina;
```

### Passo 3: Criar Componentes da Pagina

Crie uma pasta para os componentes especificos da pagina:

```bash
mkdir src/components/sua-pagina
```

**Exemplo de componente Hero:**

```typescript
// src/components/sua-pagina/SuaPaginaHero.tsx
import RevealAnimation from '../animation/RevealAnimation';

const SuaPaginaHero = () => {
  return (
    <section className="pt-20 pb-14 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <h1 className="text-center mb-6">Titulo da Pagina</h1>
        </RevealAnimation>
        <RevealAnimation delay={0.1}>
          <p className="text-center text-secondary dark:text-accent">
            Descricao da pagina aqui.
          </p>
        </RevealAnimation>
      </div>
    </section>
  );
};

SuaPaginaHero.displayName = 'SuaPaginaHero';
export default SuaPaginaHero;
```

---

## Customizacao

### Cores

As cores sao configuradas no arquivo `src/styles/variables.css`.

**Principais variaveis de cor:**

```css
/* ==== COLORS ==== */
--color-primary-500: #864ffe;    /* Cor primaria principal */
--color-secondary: #1a1a1c;       /* Cor secundaria */
--color-accent: #fcfcfc;          /* Cor de destaque */

/* Cores de fundo */
--color-background-1 a --color-background-11

/* Cores de borda */
--color-stroke-1 a --color-stroke-9
```

### Tipografia

No mesmo arquivo `variables.css`:

```css
/* =============== TYPOGRAPHY =============== */
--text-heading-1 a --text-heading-6    /* Tamanhos H1 a H6 */
--text-tagline-1: 1rem;                 /* Texto corporal (16px) */
--text-tagline-2 e --text-tagline-3     /* Textos menores */
```

Cada variavel possui uma variavel de `line-height` associada.

### Como Customizar

1. Abra `src/styles/variables.css`
2. Localize a variavel desejada
3. Substitua o valor pelo seu codigo de cor/tamanho
4. Salve o arquivo - as mudancas serao aplicadas imediatamente

---

## Animacoes

O componente `RevealAnimation` e usado para efeitos de entrada:

```typescript
import RevealAnimation from '../animation/RevealAnimation';

// Uso basico
<RevealAnimation delay={0.1}>
  <div>Seu conteudo</div>
</RevealAnimation>

// Com direcao e offset
<RevealAnimation delay={0.1} direction="up" offset={50}>
  <div>Seu conteudo</div>
</RevealAnimation>

// Com animacao spring
<RevealAnimation delay={0.1} useSpring duration={2}>
  <div>Seu conteudo</div>
</RevealAnimation>
```

**Propriedades disponiveis:**

| Propriedade | Tipo     | Descricao                        |
|-------------|----------|----------------------------------|
| delay       | number   | Atraso antes da animacao (s)     |
| direction   | string   | Direcao: 'up', 'down', etc       |
| offset      | number   | Distancia do deslocamento (px)   |
| useSpring   | boolean  | Usar animacao spring             |
| duration    | number   | Duracao da animacao (s)          |
| instant     | boolean  | Animacao instantanea             |

---

## Melhores Praticas

### 1. Nomenclatura de Arquivos

| Tipo        | Padrao      | Exemplo              |
|-------------|-------------|----------------------|
| Diretorios  | kebab-case  | `sua-pagina`         |
| Componentes | PascalCase  | `SuaComponente.tsx`  |
| Utilitarios | camelCase   | `suaFuncao.ts`       |

### 2. Estrutura de Componentes

- Adicionar `displayName` aos componentes
- Utilizar interfaces TypeScript para props
- Implementar tratamento de erros
- Usar `Fragment` em vez de divs desnecessarias

```typescript
interface MeuComponenteProps {
  titulo: string;
  descricao?: string;
}

const MeuComponente = ({ titulo, descricao }: MeuComponenteProps) => {
  return (
    <Fragment>
      <h2>{titulo}</h2>
      {descricao && <p>{descricao}</p>}
    </Fragment>
  );
};

MeuComponente.displayName = 'MeuComponente';
export default MeuComponente;
```

### 3. Performance

- Usar `RevealAnimation` para efeitos suaves de entrada
- Implementar lazy loading para componentes pesados
- Otimizar imagens com componente `Image` do Next.js

```typescript
import Image from 'next/image';

<Image
  src="/images/exemplo.jpg"
  alt="Descricao"
  width={800}
  height={600}
  priority  // Para imagens above the fold
/>
```

### 4. Organizacao do Codigo

- Manter componentes focados e com proposito unico
- Extrair logica reutilizavel em custom hooks
- Usar componentes compartilhados quando possivel
- Seguir a estrutura existente do projeto

---

## Deploy

### Vercel (Recomendado)

A Vercel e a plataforma serverless criada pelos desenvolvedores do Next.js. Oferece uso gratuito.

**Processo em 3 Etapas:**

#### 1. Criar Conta

- Acesse https://vercel.com/signup
- Autentique com GitHub

#### 2. Importar Repositorio

- Acesse https://vercel.com/import
- Conceda acesso aos repositorios
- Selecione o projeto Next.js

#### 3. Configurar e Deploy

A Vercel detecta automaticamente aplicacoes Next.js e aplica configuracoes otimizadas:

- Nome do projeto
- Diretorio raiz
- Comando de build (`yarn build`)
- Diretorio de saida
- Comando de desenvolvimento

O tempo de build e inferior a um minuto.

---

## Componentes Base

### Navbar

```typescript
<NavbarOne
  className="border-stroke-2 dark:border-stroke-6 bg-accent dark:bg-background-9 border"
  btnClassName="btn-primary hover:btn-white-dark dark:hover:btn-white"
/>
```

### Footer

```typescript
<FooterOne />
```

### Container Principal

```typescript
<div className="main-container">
  {/* Conteudo centralizado com max-width */}
</div>
```

---

## Suporte

- **Demo**: https://next-sass-html.vercel.app/
- **Email**: hello@pixels71.com

---

*Documentacao extraida em Dezembro 2024*
