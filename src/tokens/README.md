# Design Tokens

Sistema centralizado de tokens de design para garantir consistência e reutilização em todos os componentes da Libia Design System.

## 📋 Índice

- [O que são Design Tokens?](#o-que-são-design-tokens)
- [Tokens Disponíveis](#tokens-disponíveis)
- [Como Usar](#como-usar)
- [Exemplos](#exemplos)

## O que são Design Tokens?

Design tokens são os valores primitivos do design system (cores, espaçamentos, tipografia, etc.) definidos de forma centralizada e reutilizável. Eles garantem:

- ✅ **Consistência** - Mesmos valores em toda a aplicação
- ✅ **Manutenibilidade** - Mudanças centralizadas
- ✅ **Type Safety** - TypeScript garante uso correto
- ✅ **Reutilização** - Fácil usar em novos componentes

## Tokens Disponíveis

### Spacing Scale

Escala de espaçamento usada para margens, paddings e outros espaços.

#### Tipo: `SpacingScale`

```typescript
type SpacingScale = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
```

#### Valores

| Token | Tailwind | Rem   | Pixels |
|-------|----------|-------|--------|
| `none` | 0       | 0     | 0px    |
| `xs`   | 1       | 0.25  | 4px    |
| `sm`   | 2       | 0.5   | 8px    |
| `md`   | 4       | 1     | 16px   |
| `lg`   | 6       | 1.5   | 24px   |
| `xl`   | 8       | 2     | 32px   |
| `2xl`  | 12      | 3     | 48px   |

### Component Size

Escala de tamanhos para componentes (buttons, inputs, etc.).

#### Tipo: `ComponentSize`

```typescript
type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';
```

### Text Alignment

Tipos de alinhamento de texto.

#### Tipo: `TextAlign`

```typescript
type TextAlign = 'left' | 'center' | 'right';
```

### Variant

Variantes semânticas para componentes (define o propósito da ação).

#### Tipo: `Variant`

```typescript
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'neural';
```

#### Valores

| Token | Descrição |
|-------|-----------|
| `primary` | Ação principal/primária |
| `secondary` | Ação secundária |
| `outline` | Ação alternativa com menos peso visual |
| `ghost` | Ação sutil, sem fundo |
| `danger` | Ação destrutiva |
| `neural` | Contexto de IA/Machine Learning |

### Shape

Formatos/formas para componentes.

#### Tipo: `Shape`

```typescript
type Shape = 'circle' | 'square';
```

#### Valores

| Token | Descrição |
|-------|-----------|
| `circle` | Formato circular (bordas totalmente arredondadas) |
| `square` | Formato quadrado com cantos arredondados |

## Como Usar

### 1. Importar Tokens

```typescript
import {
  SpacingScale,
  TextAlign,
  marginClasses,
  paddingClasses,
  textAlignClasses
} from '../../tokens';
```

### 2. Usar em Props de Interface

```typescript
interface MyComponentProps {
  marginTop?: SpacingScale;
  marginBottom?: SpacingScale;
  padding?: SpacingScale;
  textAlign?: TextAlign;
}
```

### 3. Aplicar Classes CSS

```typescript
import { cn } from '../../lib/utils';
import { marginClasses, textAlignClasses } from '../../tokens';

function MyComponent({ marginTop, textAlign = 'center' }: MyComponentProps) {
  return (
    <div className={cn(
      marginTop && marginClasses.top[marginTop],
      textAlignClasses[textAlign]
    )}>
      Content
    </div>
  );
}
```

## Exemplos

### Exemplo 1: Componente com Margin

```typescript
import { SpacingScale, marginClasses } from '../../tokens';

interface CardProps {
  margin?: SpacingScale;
  marginVertical?: SpacingScale;
}

export function Card({ margin, marginVertical }: CardProps) {
  return (
    <div className={cn(
      'rounded-lg border p-4',
      margin && marginClasses.all[margin],
      marginVertical && marginClasses.vertical[marginVertical]
    )}>
      Card content
    </div>
  );
}

// Uso
<Card margin="md" />
<Card marginVertical="lg" />
```

### Exemplo 2: Componente com Padding

```typescript
import { SpacingScale, paddingClasses } from '../../tokens';

interface ContainerProps {
  padding?: SpacingScale;
}

export function Container({ padding = 'md' }: ContainerProps) {
  return (
    <div className={cn(
      'container',
      paddingClasses.all[padding]
    )}>
      Content
    </div>
  );
}

// Uso
<Container padding="lg" />
```

### Exemplo 3: Hierarquia de Prioridade

```typescript
// margin > marginVertical/marginHorizontal > marginTop/marginBottom

<MyComponent
  margin="md"          // Aplica m-4
  marginTop="xl"       // IGNORADO (margin tem prioridade)
/>

<MyComponent
  marginVertical="lg"  // Aplica my-6
  marginTop="xs"       // IGNORADO (marginVertical tem prioridade)
/>

<MyComponent
  marginTop="sm"       // Aplica mt-2
  marginBottom="lg"    // Aplica mb-6
/>
```

## Utilitários Disponíveis

### marginClasses

```typescript
marginClasses.top        // mt-*
marginClasses.bottom     // mb-*
marginClasses.left       // ml-*
marginClasses.right      // mr-*
marginClasses.all        // m-*
marginClasses.vertical   // my-*
marginClasses.horizontal // mx-*
```

### paddingClasses

```typescript
paddingClasses.top        // pt-*
paddingClasses.bottom     // pb-*
paddingClasses.left       // pl-*
paddingClasses.right      // pr-*
paddingClasses.all        // p-*
paddingClasses.vertical   // py-*
paddingClasses.horizontal // px-*
```

### textAlignClasses

```typescript
textAlignClasses.left    // 'text-left justify-start'
textAlignClasses.center  // 'text-center justify-center'
textAlignClasses.right   // 'text-right justify-end'
```

## Factory Functions

Para criar novos utilitários de classe:

```typescript
import { createMarginClasses, createPaddingClasses } from '../../tokens';

// Criar classes customizadas
const customSpacing = createMarginClasses('space');
// Resultado: { none: 'space-0', xs: 'space-1', ... }
```

## Expandindo o Sistema

Para adicionar novos tokens:

1. Adicione o tipo em `spacing.ts`
2. Crie factory function em `classes.ts` se necessário
3. Exporte em `index.ts`
4. Use em seus componentes!

```typescript
// spacing.ts
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export const borderRadiusValues = {
  none: '0',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  full: 'full',
} as const;

// classes.ts
export const borderRadiusClasses: Record<BorderRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};
```
