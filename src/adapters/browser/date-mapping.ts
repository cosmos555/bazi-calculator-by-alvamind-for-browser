// src/adapters/browser/date-mapping.ts - 브라우저 전용 구현
import type { DateMappingProvider, DateMappingData } from '../../core/date-mapping-interface';
import type { DateMappings } from '../../types';

export class BrowserDateMappingLoader implements DateMappingProvider {
  private dateMappings: DateMappings;

  constructor(private mappingsPath: string = '/src/dates_mapping.json') {
    this.dateMappings = {} as DateMappings;
    this.loadDateMappings();
  }

  private async loadDateMappings(): Promise<void> {
    try {
      // 브라우저에서는 fetch를 사용하여 JSON 로드
      const response = await fetch(this.mappingsPath);
      if (!response.ok) {
        throw new Error(`Failed to load date mappings: ${response.statusText}`);
      }
      this.dateMappings = await response.json();
    } catch (error) {
      console.error("Failed to load date mappings:", error);
      // 에러 발생 시 빈 매핑으로 초기화
      this.dateMappings = {} as DateMappings;
    }
  }

  public getMapping(year: number, month: number, day: number) {
    if (!this.dateMappings[year] || !this.dateMappings[year][month] || !this.dateMappings[year][month][day]) {
      throw new Error(`No date mapping found for ${year}-${month}-${day}`);
    }
    return this.dateMappings[year][month][day];
  }

  public getDateMappingData(): DateMappingData {
    return { mappings: this.dateMappings };
  }
}
