---
source: lucide.dev
library: Lucide React
package: lucide-react
topic: Getting started and basic usage
fetched: 2026-07-28T08:54:55.875Z
official_docs: https://lucide.dev/guide/react/getting-started
---

# Getting Started with Lucide React

## Installation

```bash
# Choose your package manager
pnpm add lucide-react
yarn add lucide-react
npm install lucide-react
bun add lucide-react
```

## Basic Usage

### Importing Icons

Lucide is built with ES Modules, so it's completely tree-shakable. Each icon can be imported as a React component, which renders an inline SVG element.

```jsx
import { Camera } from 'lucide-react';

// Usage
const App = () => {
  return <Camera />;
};

export default App;
```

**Important:** Only the icons you import are included in your final bundle. The rest are tree-shaken away.

## Customization Props

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | number | 24 | Icon size in pixels |
| `color` | string | currentColor | Icon color |
| `strokeWidth` | number | 2 | Stroke width |
| `absoluteStrokeWidth` | boolean | false | Use absolute stroke width |

### Usage Example

```jsx
import { Camera } from 'lucide-react';

const App = () => {
  return (
    <Camera 
      size={48} 
      color="red" 
      strokeWidth={1} 
    />
  );
};
```

### SVG Attributes

Because icons render as SVG elements, all standard SVG attributes can also be applied as props. See [MDN SVG Presentation Attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```jsx
import { Heart } from 'lucide-react';

const App = () => {
  return (
    <Heart 
      size={32}
      fill="red"
      stroke="darkred"
      strokeWidth={2}
      className="my-icon"
    />
  );
};
```

## Features

- **Lightweight & Scalable:** Optimized SVG icons
- **Clean & Consistent:** Designed with strict design rules
- **Customizable:** Color, size, stroke width, and more
- **Tree-shakable:** Only import what you use
- **TypeScript Support:** Fully typed components
- **1,756+ Icons:** Large icon library
