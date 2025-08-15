// src/core/__tests__/mock-date-mapping-provider.ts - 테스트용 Mock 구현
import type { DateMappingProvider } from '../date-mapping-interface';

export class MockDateMappingProvider implements DateMappingProvider {
  getMapping(_year: number, _month: number, _day: number) {
    return {
      HYear: 1, // 甲
      EYear: 1, // 子
      HMonth: 1, // 甲
      EMonth: 1, // 子
      HDay: 1, // 甲
      EDay: 1, // 子
    };
  }
}
