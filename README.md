# Bazi Calculator

A comprehensive Bazi (Four Pillars) calculator for browsers and Node.js environments, built with TypeScript and designed for modern web applications.

## Features

- 🎯 **Isomorphic Design**: Works seamlessly in both browser and Node.js environments
- 🌐 **Browser Optimized**: Built for React, Vue, and other modern frameworks
- 📱 **Responsive**: Mobile-friendly design with modern UI
- 🔧 **TypeScript**: Full TypeScript support with strict type checking
- 📦 **Tree-shakable**: Optimized for modern bundlers with zero side effects
- 🚀 **Fast**: Built with esbuild for optimal performance

## Installation

```bash
npm install @alvamind/bazi-calculator
```

## Quick Start

### Browser/React Usage

```typescript
import { createBaziCalculator } from '@alvamind/bazi-calculator';

// Create a calculator instance
const calculator = createBaziCalculator(1990, 1, 1, 12, 'male');

// Calculate pillars
const pillars = calculator.calculatePillars();
console.log(pillars.year.chinese); // 甲子

// Get complete analysis
const analysis = calculator.getCompleteAnalysis();
console.log(analysis.basicAnalysis.lifeGua); // 1
```

### Node.js Usage

```typescript
import { createBaziCalculator } from '@alvamind/bazi-calculator/node';

// Create a calculator instance for Node.js
const calculator = createBaziCalculator(1990, 1, 1, 12, 'male');

// Use the same API
const pillars = calculator.calculatePillars();
```

### CDN (UMD) Usage

```html
<script src="https://unpkg.com/@alvamind/bazi-calculator"></script>
<script>
  const calculator = window.BaziCalculator.createBaziCalculator(1990, 1, 1, 12, 'male');
  const pillars = calculator.calculatePillars();
  console.log(pillars.year.chinese);
</script>
```

## API Reference

### Core Classes

#### `BaziCalculator`

Main calculator class for Bazi calculations.

```typescript
class BaziCalculator {
  constructor(
    year: number,
    month: number,
    day: number,
    hour: number,
    gender: 'male' | 'female',
    dateMappingProvider: DateMappingProvider
  )
}
```

**Methods:**

- `calculatePillars()`: Returns the four pillars (year, month, day, time)
- `calculateBasicAnalysis()`: Returns basic analysis including life gua, day master, etc.
- `getCompleteAnalysis()`: Returns complete analysis with pillars and basic analysis
- `toString()`: Returns formatted string representation

#### `PillarCalculator`

Handles pillar calculations.

#### `AnalysisCalculator`

Handles various analysis calculations like five factors, eight mansions, etc.

### Types

```typescript
interface Pillar {
  chinese: string;    // Chinese characters (e.g., "甲子")
  element: string;    // Element (e.g., "WOOD", "FIRE")
  animal: string;     // Animal sign (e.g., "Rat", "Ox")
  branch: {
    element: string;  // Branch element
  };
}

interface Pillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  time: Pillar;
}

interface BasicAnalysis {
  lifeGua: number;
  dayMaster: DayMasterAnalysis;
  nobleman: string[];
  intelligence: string;
  skyHorse: string;
  peachBlossom: string;
  fiveFactors: FiveFactors;
  eightMansions: EightMansions;
}
```

## Advanced Usage

### Custom Date Mapping Provider

```typescript
import { BaziCalculator } from '@alvamind/bazi-calculator';
import type { DateMappingProvider } from '@alvamind/bazi-calculator';

class CustomDateMappingProvider implements DateMappingProvider {
  getMapping(year: number, month: number, day: number) {
    // Custom implementation
    return { HYear: 1, EYear: 1, HMonth: 1, EMonth: 1, HDay: 1, EDay: 1 };
  }
}

const provider = new CustomDateMappingProvider();
const calculator = new BaziCalculator(1990, 1, 1, 12, 'male', provider);
```

### Error Handling

```typescript
try {
  const calculator = createBaziCalculator(1990, 1, 1, 12, 'male');
  const result = calculator.calculatePillars();
} catch (error) {
  if (error instanceof Error) {
    console.error('Calculation failed:', error.message);
  }
}
```

## Examples

### React Component

```tsx
import React, { useState } from 'react';
import { createBaziCalculator } from '@alvamind/bazi-calculator';

function BaziCalculatorComponent() {
  const [result, setResult] = useState(null);

  const calculate = () => {
    const calculator = createBaziCalculator(1990, 1, 1, 12, 'male');
    const pillars = calculator.calculatePillars();
    setResult(pillars);
  };

  return (
    <div>
      <button onClick={calculate}>Calculate Bazi</button>
      {result && (
        <div>
          <p>Year: {result.year.chinese}</p>
          <p>Month: {result.month.chinese}</p>
          <p>Day: {result.day.chinese}</p>
          <p>Time: {result.time.chinese}</p>
        </div>
      )}
    </div>
  );
}
```

### Node.js Script

```typescript
import { createBaziCalculator } from '@alvamind/bazi-calculator/node';

function analyzePerson(year: number, month: number, day: number, hour: number, gender: 'male' | 'female') {
  const calculator = createBaziCalculator(year, month, day, hour, gender);
  
  const analysis = calculator.getCompleteAnalysis();
  
  console.log('=== Bazi Analysis ===');
  console.log(`Life Gua: ${analysis.basicAnalysis.lifeGua}`);
  console.log(`Day Master: ${analysis.basicAnalysis.dayMaster.stem} (${analysis.basicAnalysis.dayMaster.element})`);
  console.log(`Five Factors:`, analysis.basicAnalysis.fiveFactors);
  
  return analysis;
}

// Usage
analyzePerson(1990, 1, 1, 12, 'male');
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Tree Shaking

The library is fully tree-shakable. Unused code will be automatically removed by modern bundlers:

```typescript
// Only imports what you use
import { createBaziCalculator } from '@alvamind/bazi-calculator';

// Unused exports are automatically removed
```

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/alvamind/bazi-calculator-by-alvamind.git
cd bazi-calculator-by-alvamind

# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

### Project Structure

```
src/
├── core/                    # Runtime-agnostic logic
│   ├── bazi-calculator.ts
│   ├── pillar-calculator.ts
│   ├── analysis-calculator.ts
│   ├── constants.ts
│   └── date-mapping-interface.ts
├── adapters/               # Runtime-specific implementations
│   ├── browser/           # Browser-specific code
│   └── node/              # Node.js-specific code
├── types.ts               # Type definitions
├── index.ts               # Browser entry point
└── node.ts                # Node.js entry point
```

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### Building

```bash
# Build for production
npm run build

# Build in watch mode
npm run dev

# Clean build artifacts
npm run clean
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes.

## Support

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/alvamind/bazi-calculator-by-alvamind/issues)
- 📖 Documentation: [GitHub Wiki](https://github.com/alvamind/bazi-calculator-by-alvamind/wiki)

## Acknowledgments

- Traditional Chinese astrology principles
- Modern web development best practices
- Open source community contributions
