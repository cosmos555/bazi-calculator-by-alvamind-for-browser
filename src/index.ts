// src/index.ts - 브라우저 기본 진입점
import { BaziCalculator } from './core/bazi-calculator';
import { BrowserDateMappingLoader } from './adapters/browser/date-mapping';

export { BaziCalculator } from './core/bazi-calculator';
export { BrowserDateMappingLoader } from './adapters/browser/date-mapping';
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

// 브라우저용 팩토리 함수
export function createBaziCalculator(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender: 'male' | 'female' = 'male'
) {
  const dateMappingLoader = new BrowserDateMappingLoader();
  return new BaziCalculator(year, month, day, hour, gender, dateMappingLoader);
}
