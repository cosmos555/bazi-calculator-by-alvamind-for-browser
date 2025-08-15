# Bazi Calculator by Alvamind for Browser 八字计算器

[![npm version](https://img.shields.io/npm/v/bazi-calculator-by-alvamind-for-browser.svg)](https://www.npmjs.com/package/bazi-calculator-by-alvamind-for-browser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Downloads](https://img.shields.io/npm/dm/bazi-calculator-by-alvamind-for-browser.svg)](https://www.npmjs.com/package/bazi-calculator-by-alvamind-for-browser)

A modern, accurate, and comprehensive Bazi (八字 / Four Pillars of Destiny) calculator and analyzer for **browsers and Node.js environments**.

> **Note**: This is the **browser-compatible version** of the original [bazi-calculator-by-alvamind](https://github.com/alvamind/bazi-calculator-by-alvamind) package, redesigned for isomorphic usage across different JavaScript environments.

## 📢 Disclaimer

This package is provided for educational and research purposes only. The calculations and interpretations should not be used as the sole basis for making important life decisions. Chinese Metaphysics and Bazi analysis require professional expertise and years of study.

## ✨ Features

### 🌐 **Isomorphic Architecture**
- **Browser-first design** with Node.js compatibility
- **ESM, CJS, and IIFE** bundle formats
- **Tree-shaking** support for optimized bundle sizes
- **TypeScript declarations** for full type safety

### 🔧 **Core Calculations**
- **Four Pillars (四柱)**  
  - Year Pillar (年柱)  
  - Month Pillar (月柱)  
  - Day Pillar (日柱)  
  - Hour Pillar (時柱)
- **Solar/Lunar Calendar Conversions**
- **Precise Time Calculations**

### 📊 **Analysis Components**
- **Five Elements (五行) Analysis**  
  - Element Distribution  
  - Element Relationships  
  - Element Strength Calculations
- **Day Master (日主) Analysis**  
  - Yin/Yang Nature  
  - Element Properties  
  - Stem Relationships
- **Eight Mansions (八宅) Feng Shui**  
  - Life Gua Calculation  
  - Direction Analysis  
  - Lucky/Unlucky Sectors
- **Destiny Indicators**  
  - Nobleman (貴人)  
  - Intelligence Star (文昌)  
  - Sky Horse (天馬)  
  - Peach Blossom (桃花)

### 🚀 **Technical Features**
- 🔒 **Type-safe** with TypeScript strict mode
- 📦 **ES Module Support** with CommonJS fallback
- 🏗️ **SOLID Architecture** with dependency injection
- 🔄 **Runtime-agnostic core** with environment-specific adapters
- 📝 **Comprehensive Type Definitions**
- ⚡ **Optimized Performance** with tree-shaking
- 🌍 **Browser compatibility** with modern web standards

## 🚀 Installation

### **Browser/React Applications**
```bash
# Using npm
npm install bazi-calculator-by-alvamind-for-browser

# Using yarn
yarn add bazi-calculator-by-alvamind-for-browser

# Using pnpm
pnpm add bazi-calculator-by-alvamind-for-browser
```

### **Node.js Applications**
```bash
# Using npm
npm install bazi-calculator-by-alvamind-for-browser

# Using yarn
yarn add bazi-calculator-by-alvamind-for-browser

# Using pnpm
pnpm add bazi-calculator-by-alvamind-for-browser
```

## 🎯 Quick Start

### **Browser/React Usage**
```typescript
import { createBaziCalculator } from 'bazi-calculator-by-alvamind-for-browser';

// Initialize calculator
const calculator = createBaziCalculator(
  1990,    // Year
  5,       // Month
  10,      // Day
  12,      // Hour (24-hour format)
  'male'   // Gender
);

// Get complete analysis
const analysis = calculator.getCompleteAnalysis();

// Display Chinese characters
console.log(calculator.toString()); // 庚午年辛巳月乙酉日壬午時
```

### **Node.js Usage**
```typescript
import { createBaziCalculator } from 'bazi-calculator-by-alvamind-for-browser/node';

// Initialize calculator with Node.js adapter
const calculator = createBaziCalculator(
  1990,    // Year
  5,       // Month
  10,      // Day
  12,      // Hour (24-hour format)
  'male'   // Gender
);

// Get complete analysis
const analysis = calculator.getCompleteAnalysis();
```

### **CDN Usage (IIFE)**
```html
<script src="https://unpkg.com/bazi-calculator-by-alvamind-for-browser"></script>
<script>
  const calculator = window.BaziCalculator.createBaziCalculator(1990, 5, 10, 12, 'male');
  const analysis = calculator.getCompleteAnalysis();
</script>
```

## 📖 Detailed Documentation

### **Import Patterns**

#### **Browser/React (Default)**
```typescript
import { createBaziCalculator, BaziCalculator } from 'bazi-calculator-by-alvamind-for-browser';
```

#### **Node.js Specific**
```typescript
import { createBaziCalculator, BaziCalculator } from 'bazi-calculator-by-alvamind-for-browser/node';
```

#### **Direct Class Usage**
```typescript
import { BaziCalculator, BrowserDateMappingLoader } from 'bazi-calculator-by-alvamind-for-browser';

const dateMappingLoader = new BrowserDateMappingLoader();
const calculator = new BaziCalculator(1990, 5, 10, 12, 'male', dateMappingLoader);
```

### **Basic Usage**

#### **Getting Basic Analysis**
```typescript
const basicAnalysis = calculator.calculateBasicAnalysis();
```

#### **Calculating Pillars Only**
```typescript
const pillars = calculator.calculatePillars();
```

### **Example Output**

<details>
<summary>Click to view complete analysis output</summary>

```json
{
  "mainPillars": {
    "year": {
      "chinese": "庚午",
      "element": "METAL",
      "animal": "Horse",
      "branch": { "element": "FIRE" }
    },
    "month": {
      "chinese": "辛巳",
      "element": "METAL",
      "animal": "Snake",
      "branch": { "element": "FIRE" }
    },
    "day": {
      "chinese": "乙酉",
      "element": "WOOD",
      "animal": "Rooster",
      "branch": { "element": "METAL" }
    },
    "time": {
      "chinese": "壬午",
      "element": "WATER",
      "animal": "Horse",
      "branch": { "element": "FIRE" }
    }
  },
  "basicAnalysis": {
    "lifeGua": 1,
    "dayMaster": {
      "stem": "乙",
      "nature": "Yin",
      "element": "WOOD"
    },
    "nobleman": ["子", "申"],
    "intelligence": "巳",
    "skyHorse": "卯",
    "peachBlossom": "酉",
    "fiveFactors": {
      "WOOD": 13,
      "FIRE": 38,
      "EARTH": 0,
      "METAL": 38,
      "WATER": 12
    },
    "eightMansions": {
      "group": "East",
      "lucky": {
        "wealth": "SE",
        "health": "E",
        "romance": "S",
        "career": "N"
      },
      "unlucky": {
        "obstacles": "NW",
        "quarrels": "W",
        "setbacks": "SW",
        "totalLoss": "NE"
      }
    }
  }
}
```
</details>

## 🏗️ Architecture

### **Isomorphic Structure**
```
src/
├── core/                    # Runtime-agnostic logic
│   ├── bazi-calculator.ts
│   ├── pillar-calculator.ts
│   ├── analysis-calculator.ts
│   └── constants.ts
├── adapters/               # Environment-specific implementations
│   ├── browser/           # Browser-specific (fetch API)
│   └── node/              # Node.js-specific (fs, path)
├── types.ts               # Type definitions
├── index.ts               # Browser entry point
└── node.ts                # Node.js entry point
```

### **Bundle Outputs**
- **ESM**: `dist/index.js` - Modern ES modules
- **CJS**: `dist/index.cjs` - CommonJS for Node.js
- **IIFE**: `dist/index.iife.js` - CDN and browser globals
- **Types**: `dist/*.d.ts` - TypeScript declarations

## 🔧 API Reference

### **BaziCalculator Class**

```typescript
class BaziCalculator {
  constructor(
    year: number,     // Gregorian year
    month: number,    // Month (1-12)
    day: number,      // Day (1-31)
    hour: number,     // Hour (0-23)
    gender?: GenderType, // 'male' | 'female'
    dateMappingProvider: DateMappingProvider
  )

  // Main methods
  calculatePillars(): Pillars
  calculateBasicAnalysis(): BasicAnalysis
  getCompleteAnalysis(): CompleteAnalysis
  toString(): string
}
```

### **Factory Functions**

#### **Browser Environment**
```typescript
function createBaziCalculator(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender?: 'male' | 'female'
): BaziCalculator
```

#### **Node.js Environment**
```typescript
function createBaziCalculator(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender?: 'male' | 'female'
): BaziCalculator
```

## 🌐 Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **ES2020 Features**: Arrow functions, destructuring, async/await
- **Module Systems**: ES modules, CommonJS, IIFE
- **TypeScript**: Full type support with declaration files

## 📦 Bundle Information

- **Tree-shaking**: Enabled (`sideEffects: false`)
- **Minification**: Production builds are minified
- **Source maps**: Available for debugging
- **Global name**: `window.BaziCalculator` (IIFE builds)

## 🚀 Development

### **Prerequisites**
- Node.js 16.0.0 or higher
- npm, yarn, or pnpm

### **Development Setup**

```bash
# Clone repository
git clone https://github.com/alvamind/bazi-calculator-by-alvamind-for-browser.git

# Navigate to project
cd bazi-calculator-by-alvamind-for-browser

# Install dependencies
npm install

# Run tests
npm test

# Build project
npm run build

# Development mode (watch)
npm run dev

# Linting
npm run lint

# Code formatting
npm run format
```

### **Testing**
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui
```

## 📝 Important Notes

### **Calculation Methods**
- Solar calendar based calculations
- Traditional Chinese time system (12 two-hour periods)
- Standard Stem-Branch (干支) system
- Eight Mansions Feng Shui principles

### **Limitations**
- Time zone considerations
- Lunar calendar approximations
- Regional variations in interpretations

### **Migration from Original Package**
If you're migrating from the original [bazi-calculator-by-alvamind](https://github.com/alvamind/bazi-calculator-by-alvamind):

```typescript
// Old (Node.js only)
import { BaziCalculator } from 'bazi-calculator-by-alvamind';

// New (Browser/Node.js compatible)
import { createBaziCalculator } from 'bazi-calculator-by-alvamind-for-browser';

// For Node.js specific features
import { createBaziCalculator } from 'bazi-calculator-by-alvamind-for-browser/node';
```

## 🤝 Contributing

We welcome contributions! This project is based on the original [bazi-calculator-by-alvamind](https://github.com/alvamind/bazi-calculator-by-alvamind) and has been redesigned for browser compatibility.

### **Development Guidelines**
- Follow TypeScript strict mode
- Maintain isomorphic architecture
- Add tests for new features
- Update documentation for API changes

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support & Issues

**All support requests and issues should be directed to the main repository:**

- 📧 **Email**: support@alvamind.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/alvamind/bazi-calculator-by-alvamind/issues)
- 📚 **Documentation**: [Main Repository](https://github.com/alvamind/bazi-calculator-by-alvamind)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/alvamind/bazi-calculator-by-alvamind/discussions)

## 🙏 Acknowledgements

- **Original Package**: [bazi-calculator-by-alvamind](https://github.com/alvamind/bazi-calculator-by-alvamind) by Alvamind
- Traditional Chinese Metaphysics texts and masters
- Modern Bazi research and practitioners
- Open source community contributors
- Chinese calendar conversion references

## 🌟 References

1. Chinese Metaphysics Classics
2. Modern Bazi Analysis Methods
3. Traditional Calendar Systems
4. Stem-Branch Theory
5. [Original Node.js Package](https://github.com/alvamind/bazi-calculator-by-alvamind)

---

**Made with ❤️ by Alvamind**

*This browser-compatible version is based on the original [bazi-calculator-by-alvamind](https://github.com/alvamind/bazi-calculator-by-alvamind) package, redesigned for modern web applications.*

*For professional consultations, please consult a qualified Bazi practitioner.*
