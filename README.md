# Libia Design System

> AI-Focused React Component Library

Uma biblioteca de componentes React moderna com design inspirado em Inteligência Artificial, construída com TypeScript, Tailwind CSS e focada em acessibilidade.

## Características

- **Design inspirado em IA**: Variantes semânticas com cores temáticas de IA
- **TypeScript First**: Tipagem completa para melhor DX
- **Acessibilidade**: Componentes seguem as melhores práticas de a11y
- **Tailwind CSS v4**: Estilização moderna e customizável com CSS-first
- **Storybook**: Documentação interativa dos componentes
- **Efeito Ripple**: Animação de ondas ao clicar

## Stack Técnica

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Storybook 8
- Vitest

## Instalação

```bash
npm install
```

## Scripts Disponíveis

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento Vite
npm run dev

# Inicia o Storybook
npm run storybook
```

### Build

```bash
# Build da aplicação
npm run build

# Build do Storybook
npm run build-storybook
```

### Testes

```bash
# Executa os testes
npm run test

# Testes com Vitest do Storybook
npx vitest --project=storybook
```

## Temas Dark e Light

A Libia Design System suporta **temas dark e light** com transições suaves e persistência automática da preferência do usuário.

### Características

- **3 modos**: Light, Dark e System (detecta preferência do SO)
- **Transições suaves**: Animações automáticas entre temas
- **Persistência**: Salva preferência no localStorage
- **Detecção automática**: Respeita `prefers-color-scheme` do navegador
- **ThemeToggle**: Componente pronto para uso

### Uso Básico

```tsx
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components';

function App() {
  return (
    <ThemeProvider>
      <div>
        <ThemeToggle /> {/* Botão para alternar temas */}
        {/* Seu conteúdo */}
      </div>
    </ThemeProvider>
  );
}
```

### Hook useThemeContext

```tsx
import { useThemeContext } from './context/ThemeContext';

function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useThemeContext();

  return (
    <div>
      <p>Tema atual: {theme}</p>
      <p>Tema resolvido: {resolvedTheme}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme('dark')}>Usar Dark</button>
      <button onClick={() => setTheme('system')}>Usar System</button>
    </div>
  );
}
```

---

## Componentes

### Button

Componente de botão profissional com **variantes semânticas** que definem o propósito do botão.

### IconButton

Componente de botão com ícone, ideal para ações compactas e toolbars. Mantém as mesmas **variantes semânticas** do Button.

### ThemeToggle

Componente para alternar entre temas dark e light. Reutiliza o IconButton com ícones de Sol/Lua.

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|---------| ----------- |
| `variant` | `Variant` | `'ghost'` | Variante semântica |
| `size` | `ComponentSize` | `'md'` | Tamanho do botão |
| `shape` | `Shape` | `'circle'` | Formato do botão |
| `showTooltip` | `boolean` | `true` | Mostra tooltip com nome do tema |
| Todas as props do IconButton | - | - | Herda todas as outras props |

#### Exemplos de Uso

```tsx
import { ThemeToggle } from './components';

function App() {
  return (
    <div>
      {/* Default (ghost, circular) */}
      <ThemeToggle />

      {/* Primary variant, large */}
      <ThemeToggle variant="primary" size="lg" />

      {/* Square shape */}
      <ThemeToggle shape="square" />

      {/* Fixed position (comum em headers) */}
      <div className="fixed top-6 right-6">
        <ThemeToggle size="lg" />
      </div>

      {/* In toolbar */}
      <header className="flex justify-between">
        <h1>My App</h1>
        <ThemeToggle variant="ghost" size="md" />
      </header>
    </div>
  );
}
```

---

### Button

Componente de botão profissional com **variantes semânticas** que definem o propósito do botão.

#### Variantes Semânticas (`variant`)

Define o propósito do botão no contexto da aplicação:

- `primary` - Ação principal/primária (azul)
- `secondary` - Ação secundária (roxo)
- `neural` - Contexto de IA/Machine Learning (verde)
- `outline` - Ação alternativa com menos peso visual
- `ghost` - Ação sutil, sem fundo
- `danger` - Ação destrutiva (vermelho)

#### Tamanhos

- `sm` - Pequeno
- `md` - Médio (padrão)
- `lg` - Grande
- `xl` - Extra grande

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|---------| ----------- |
| `label` | `string` | - | Texto do botão (obrigatório) |
| `variant` | `Variant` | `'primary'` | Variante semântica (propósito) |
| `size` | `ComponentSize` | `'md'` | Tamanho do botão |
| `loading` | `boolean` | `false` | Mostra spinner de carregamento |
| `disabled` | `boolean` | `false` | Desabilita o botão |
| `leftIcon` | `ReactNode` | - | Ícone à esquerda |
| `rightIcon` | `ReactNode` | - | Ícone à direita |
| `fullWidth` | `boolean` | `false` | Botão ocupa 100% da largura |
| `ripple` | `boolean` | `true` | Ativa efeito ripple ao clicar |
| `marginTop` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | - | Margem superior |
| `marginBottom` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | - | Margem inferior |
| `marginLeft` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | - | Margem esquerda |
| `marginRight` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | - | Margem direita |
| `margin` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | - | Margem em todos os lados |
| `marginVertical` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | - | Margem vertical (top + bottom) |
| `marginHorizontal` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | - | Margem horizontal (left + right) |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | Alinhamento do conteúdo |

#### Efeitos e Animações

- ✨ **Ripple Effect**: Ondas animadas ao clicar
- 🔆 **Hover Elevation**: Elevação suave ao passar o mouse
- 🎯 **Focus Ring**: Anel de foco para acessibilidade
- 💫 **Active Scale**: Redução de escala ao pressionar
- 🌈 **Gradient Shadows**: Sombras coloridas nos botões

#### Exemplos de Uso

```tsx
import { Button } from './components';
import { Sparkles, Rocket, Brain, Trash2, Download, ArrowRight } from 'lucide-react';

function App() {
  return (
    <div>
      {/* ========== Variantes Semânticas ========== */}

      {/* Botão primário */}
      <Button variant="primary" label="Save Changes" />

      {/* Botão de perigo */}
      <Button variant="danger" leftIcon={<Trash2 size={18} />} label="Delete Account" />

      {/* Botão AI/ML */}
      <Button variant="neural" leftIcon={<Brain size={18} />} label="Train Model" />

      {/* Botão outline */}
      <Button variant="outline" label="Cancel" />

      {/* Botão ghost */}
      <Button variant="ghost" label="Learn More" />

      {/* ========== Com Ícones ========== */}

      {/* Ícone à esquerda */}
      <Button variant="primary" leftIcon={<Download size={18} />} label="Download" />

      {/* Ícone à direita */}
      <Button variant="neural" rightIcon={<ArrowRight size={18} />} label="Continue" />

      {/* Ambos os lados */}
      <Button
        variant="primary"
        leftIcon={<Rocket size={18} />}
        rightIcon={<ArrowRight size={18} />}
        label="Launch App"
      />

      {/* ========== Estados e Tamanhos ========== */}

      {/* Loading state */}
      <Button variant="primary" loading label="Processing..." />

      {/* Disabled */}
      <Button variant="secondary" disabled label="Disabled Button" />

      {/* Tamanhos diferentes */}
      <Button variant="primary" size="sm" label="Small" />
      <Button variant="primary" size="md" label="Medium" />
      <Button variant="primary" size="lg" label="Large" />
      <Button variant="primary" size="xl" label="Extra Large" />

      {/* Full width */}
      <Button
        variant="primary"
        fullWidth
        leftIcon={<Sparkles size={20} />}
        label="Full Width Button"
      />

      {/* Sem ripple effect */}
      <Button variant="primary" ripple={false} label="No Ripple" />

      {/* ========== Margem e Alinhamento ========== */}

      {/* Margens individuais */}
      <Button variant="primary" marginTop="md" marginBottom="lg" label="Margens individuais" />

      {/* Margem em todos os lados */}
      <Button variant="secondary" margin="md" label="Margem uniforme" />

      {/* Margens vertical e horizontal */}
      <Button variant="neural" marginVertical="lg" label="Margem vertical" />
      <Button variant="primary" marginHorizontal="xl" label="Margem horizontal" />

      {/* Alinhamento de conteúdo */}
      <Button variant="primary" align="left" fullWidth label="Alinhado à esquerda" />
      <Button variant="primary" align="right" fullWidth label="Alinhado à direita" />
      <Button variant="primary" align="left" label="Alinhado sem fullWidth" />
    </div>
  );
}
```

---

### IconButton

Componente de botão circular ou quadrado com apenas um ícone, perfeito para toolbars, FABs (Floating Action Buttons) e ações compactas.

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|---------| ----------- |
| `icon` | `ReactNode` | - | Ícone a exibir (obrigatório) |
| `ariaLabel` | `string` | - | Label de acessibilidade (obrigatório) |
| `variant` | `Variant` | `'primary'` | Variante semântica (propósito) |
| `size` | `ComponentSize` | `'md'` | Tamanho do botão |
| `shape` | `Shape` | `'circle'` | Formato do botão |
| `loading` | `boolean` | `false` | Mostra spinner de carregamento |
| `disabled` | `boolean` | `false` | Desabilita o botão |
| `ripple` | `boolean` | `true` | Ativa efeito ripple ao clicar |
| `tooltip` | `string` | - | Texto do tooltip ao passar o mouse |
| `margin*` | `SpacingScale` | - | Props de margem (mesmas do Button) |

#### Tamanhos

- `sm` - 32px (ícone 16px)
- `md` - 40px (ícone 20px) - padrão
- `lg` - 48px (ícone 24px)
- `xl` - 56px (ícone 28px)

#### Formatos

- `circle` - Botão circular (padrão)
- `square` - Botão com cantos arredondados

#### Exemplos de Uso

```tsx
import { IconButton } from './components';
import { Heart, Settings, Trash2, Plus, X, Send } from 'lucide-react';

function App() {
  return (
    <div>
      {/* ========== Variantes ========== */}

      {/* Primary action */}
      <IconButton icon={<Heart size={20} />} ariaLabel="Like" variant="primary" />

      {/* Settings */}
      <IconButton icon={<Settings size={20} />} ariaLabel="Settings" variant="secondary" />

      {/* Danger action */}
      <IconButton icon={<Trash2 size={20} />} ariaLabel="Delete" variant="danger" />

      {/* AI/ML action */}
      <IconButton icon={<Send size={20} />} ariaLabel="Send to AI" variant="neural" />

      {/* ========== Formatos ========== */}

      {/* Circular (default) */}
      <IconButton icon={<Heart size={20} />} ariaLabel="Like" shape="circle" />

      {/* Square */}
      <IconButton icon={<Plus size={20} />} ariaLabel="Add" shape="square" />

      {/* ========== Tamanhos ========== */}

      <IconButton icon={<Heart size={16} />} ariaLabel="Like" size="sm" />
      <IconButton icon={<Heart size={20} />} ariaLabel="Like" size="md" />
      <IconButton icon={<Heart size={24} />} ariaLabel="Like" size="lg" />
      <IconButton icon={<Heart size={28} />} ariaLabel="Like" size="xl" />

      {/* ========== Com Tooltip ========== */}

      <IconButton
        icon={<Heart size={20} />}
        ariaLabel="Like"
        tooltip="Add to favorites"
      />

      {/* ========== Estados ========== */}

      {/* Loading */}
      <IconButton icon={<Send size={20} />} ariaLabel="Send" loading />

      {/* Disabled */}
      <IconButton icon={<Settings size={20} />} ariaLabel="Settings" disabled />

      {/* ========== Casos de Uso Comuns ========== */}

      {/* Toolbar */}
      <div className="flex gap-2">
        <IconButton icon={<Plus size={20} />} ariaLabel="Add" variant="ghost" shape="square" />
        <IconButton icon={<X size={20} />} ariaLabel="Close" variant="ghost" shape="square" />
      </div>

      {/* Floating Action Button (FAB) */}
      <IconButton icon={<Plus size={24} />} ariaLabel="Add new" variant="primary" size="lg" />
    </div>
  );
}
```

## Design Tokens

A biblioteca utiliza um sistema centralizado de **Design Tokens** para garantir consistência e reutilização.

### O que são Design Tokens?

Design tokens são valores primitivos (espaçamentos, cores, tamanhos) definidos centralmente e reutilizados em todos os componentes.

### Tokens Disponíveis

#### Spacing Scale
Escala de espaçamento para margens, paddings, etc.

| Token | Valor Tailwind | Pixels |
|-------|----------------|--------|
| `none` | 0 | 0px |
| `xs` | 1 | 4px |
| `sm` | 2 | 8px |
| `md` | 4 | 16px |
| `lg` | 6 | 24px |
| `xl` | 8 | 32px |
| `2xl` | 12 | 48px |

#### Component Size
Tamanhos para componentes interativos (buttons, inputs, etc.)

| Token | Descrição |
|-------|-----------|
| `sm` | Pequeno |
| `md` | Médio (padrão) |
| `lg` | Grande |
| `xl` | Extra grande |

#### Variant
Variantes semânticas para componentes (define o propósito da ação)

| Token | Descrição |
|-------|-----------|
| `primary` | Ação principal/primária |
| `secondary` | Ação secundária |
| `outline` | Ação alternativa com menos peso visual |
| `ghost` | Ação sutil, sem fundo |
| `danger` | Ação destrutiva |
| `neural` | Contexto de IA/Machine Learning |

#### Shape
Formatos/formas para componentes

| Token | Descrição |
|-------|-----------|
| `circle` | Formato circular |
| `square` | Formato quadrado com cantos arredondados |

#### Theme
Modos de tema para o design system

| Token | Descrição |
|-------|-----------|
| `light` | Tema claro |
| `dark` | Tema escuro |
| `system` | Detecta automaticamente a preferência do sistema operacional |

### Como Usar em Novos Componentes

```typescript
import { SpacingScale, marginClasses } from '../../tokens';

interface MyComponentProps {
  margin?: SpacingScale;
}

export function MyComponent({ margin }: MyComponentProps) {
  return (
    <div className={cn(
      'my-component',
      margin && marginClasses.all[margin]
    )}>
      Content
    </div>
  );
}
```

📖 **Documentação completa**: Veja `src/tokens/README.md` para mais detalhes.

## Customização do Tema (Tailwind v4)

O tema é configurado usando a nova sintaxe CSS-first do Tailwind v4 no arquivo `src/index.css`:

```css
@theme {
  /* Cores das variantes */
  --color-ai-primary-600: #0284c7;
  --color-ai-primary-700: #0369a1;
  --color-ai-primary-800: #075985;

  --color-ai-accent-600: #9333ea;
  --color-ai-accent-700: #7e22ce;
  --color-ai-accent-800: #6b21a8;

  --color-ai-neural-600: #059669;
  --color-ai-neural-700: #047857;
  --color-ai-neural-800: #065f46;

  /* Sombras customizadas */
  --shadow-ai-glow: 0 0 20px rgb(102 126 234 / 0.4);

  /* Animações */
  --animate-ripple: ripple 0.6s linear;
  --animate-shimmer: shimmer 2s linear infinite;
}
```

**Características do Tailwind v4:**
- ✅ Configuração CSS-first (sem `tailwind.config.js`)
- ✅ CSS variables nativas
- ✅ Performance otimizada
- ✅ Detecção automática de conteúdo
- ✅ Melhor tree-shaking

## Estrutura do Projeto

```
libia/
├── src/
│   ├── components/       # Componentes da biblioteca
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── IconButton/
│   │   │   ├── IconButton.tsx
│   │   │   ├── IconButton.stories.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── tokens/          # Design tokens
│   │   ├── spacing.ts
│   │   ├── classes.ts
│   │   ├── index.ts
│   │   └── README.md
│   ├── lib/             # Utilitários
│   │   └── utils.ts
│   ├── App.tsx          # App demo
│   └── index.css        # Estilos globais + Tailwind v4 config
├── .storybook/          # Configuração Storybook
├── public/
└── ...
```

## Roadmap

- [ ] Adicionar mais componentes (Input, Card, Modal, etc.)
- [ ] Temas dark/light mode
- [ ] Mais variantes e customizações
- [ ] Publicar no npm
- [ ] Adicionar testes unitários
- [ ] Animações avançadas
- [ ] Documentação expandida

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

MIT
