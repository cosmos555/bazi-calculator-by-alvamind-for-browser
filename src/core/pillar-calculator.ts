// src/core/pillar-calculator.ts - 순수한 계산 로직
import {
  STEMS,
  BRANCHES,
  ANIMALS,
  ELEMENTS,
  BRANCH_ELEMENTS,
  HOUR_MAP
} from './constants';
import type { DateMappingProvider } from './date-mapping-interface';
import type { Pillar } from '../types';

export class PillarCalculator {
  constructor(
    private dateMappingProvider: DateMappingProvider
  ) { }

  private getHourBranch(hour: number): string {
    const branch = HOUR_MAP.find(([start, end]) =>
      (hour >= start && hour < end) ||
      (start === 23 && (hour >= 23 || hour < 1))
    );
    return branch ? branch[2] : '子';
  }

  private calculateHourStem(dayStem: string, branch: string): string {
    const stemOffset = (STEMS.indexOf(dayStem) * 2) % 10;
    const branchIndex = BRANCHES.indexOf(branch);
    return STEMS[(stemOffset + branchIndex) % 10];
  }

  public calculateHourPillar(year: number, month: number, day: number, hour: number): string {
    const hourBranch = this.getHourBranch(hour);
    const dayMapping = this.dateMappingProvider.getMapping(year, month, day);
    const dayStem = STEMS[dayMapping.HDay - 1];
    if (!dayStem) {
      throw new Error('Invalid day mapping');
    }
    const hourStem = this.calculateHourStem(dayStem, hourBranch);
    return hourStem + hourBranch;
  }

  public calculatePillars(year: number, month: number, day: number, hour: number): { year: Pillar, month: Pillar, day: Pillar, time: Pillar } {
    const mapping = this.dateMappingProvider.getMapping(year, month, day);

    const yearStem = STEMS[mapping.HYear - 1];
    const yearBranch = BRANCHES[mapping.EYear - 1];
    const monthStem = STEMS[mapping.HMonth - 1];
    const monthBranch = BRANCHES[mapping.EMonth - 1];
    const dayStem = STEMS[mapping.HDay - 1];
    const dayBranch = BRANCHES[mapping.EDay - 1];

    if (!yearStem || !yearBranch || !monthStem || !monthBranch || !dayStem || !dayBranch) {
      throw new Error('Invalid mapping data');
    }

    const yearPillar = yearStem + yearBranch;
    const monthPillar = monthStem + monthBranch;
    const dayPillar = dayStem + dayBranch;
    const timePillar = this.calculateHourPillar(year, month, day, hour);

    return {
      year: this.translatePillar(yearPillar),
      month: this.translatePillar(monthPillar),
      day: this.translatePillar(dayPillar),
      time: this.translatePillar(timePillar),
    };
  }

  private translatePillar(pillar: string): Pillar {
    const [stem, branch] = pillar.split('');
    
    if (!stem || !branch) {
      throw new Error('Invalid pillar format');
    }

    const element = Object.entries(ELEMENTS)
      .find(([_key, stems]) => stems.includes(stem))?.[0] || '';

    const animal = ANIMALS[BRANCHES.indexOf(branch)];

    return {
      chinese: pillar,
      element,
      animal,
      branch: {
        element: Object.entries(BRANCH_ELEMENTS)
          .find(([_key, branches]) => branches.includes(branch))?.[0] || '',
      },
    };
  }
}
