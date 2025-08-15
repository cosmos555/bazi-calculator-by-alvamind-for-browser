// src/node.ts - Node.js 전용 진입점
import { BaziCalculator } from './core/bazi-calculator';
import { NodeDateMappingLoader } from './adapters/node/date-mapping';

export { BaziCalculator } from './core/bazi-calculator';
export { NodeDateMappingLoader } from './adapters/node/date-mapping';
export type {
  ElementType,
  GenderType,
  CompleteAnalysis,
  BasicAnalysis,
  Pillars,
  Pillar,
  FiveFactors,
  EightMansions,
  DayMasterAnalysis,
  DateMappings,
  DateMapping
} from './types';

// Node.js용 팩토리 함수
export function createBaziCalculator(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender: 'male' | 'female' = 'male'
) {
  const dateMappingLoader = new NodeDateMappingLoader();
  return new BaziCalculator(year, month, day, hour, gender, dateMappingLoader);
}
