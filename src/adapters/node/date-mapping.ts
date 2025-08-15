// src/adapters/node/date-mapping.ts - Node.js 전용 구현
import { readFileSync } from 'fs';
import path from 'path';
import type { DateMappingProvider, DateMappingData } from '../../core/date-mapping-interface';
import type { DateMappings } from '../../types';

export class NodeDateMappingLoader implements DateMappingProvider {
  private dateMappings: DateMappings;

  constructor(private mappingsPath: string = path.join(__dirname, '../../dates_mapping.json')) {
    this.dateMappings = this.loadDateMappings();
  }

  private loadDateMappings(): DateMappings {
    try {
      return JSON.parse(readFileSync(this.mappingsPath, 'utf-8'));
    } catch (error) {
      console.error("Failed to load date mappings:", error);
      throw error;
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
