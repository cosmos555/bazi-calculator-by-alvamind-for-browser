// src/core/date-mapping-interface.ts - 런타임 불가지론적인 인터페이스
import type { DateMappings, GenderType, CompleteAnalysis, BasicAnalysis, Pillars } from '../types';

export interface DateMappingProvider {
  getMapping(year: number, month: number, day: number): {
    HYear: number;
    EYear: number;
    HMonth: number;
    EMonth: number;
    HDay: number;
    EDay: number;
  };
}

export interface DateMappingData {
  readonly mappings: DateMappings;
}

// Re-export types for convenience
export type { GenderType, CompleteAnalysis, BasicAnalysis, Pillars };
