// src/core/analysis-calculator.ts - 순수한 분석 계산 로직
import {
  NOBLEMAN_MAP,
  INTELLIGENCE_MAP,
  PEACH_BLOSSOM_MAP,
  GUA_DIRECTIONS
} from './constants';
import type { ElementType, FiveFactors, EightMansions, Pillars } from '../types';

export class AnalysisCalculator {
  public calculateLifeGua(year: number, gender: 'male' | 'female'): number {
    // 생년을 기반으로 한 간단한 괘 계산
    const baseGua = ((year - 1900) % 9) + 1;
    return gender === 'male' ? baseGua : (10 - baseGua);
  }

  public calculateDayMaster(pillar: { chinese: string; element: string }): {
    stem: string;
    nature: 'Yang' | 'Yin';
    element: ElementType;
  } {
    const stem = pillar.chinese[0];
    if (!stem) {
      throw new Error('Invalid pillar: missing stem');
    }
    const element = pillar.element as ElementType;
    const nature: 'Yang' | 'Yin' = stem.charCodeAt(0) % 2 === 0 ? 'Yin' : 'Yang';
    
    return { stem, nature, element };
  }

  public calculateNobleman(element: ElementType, _stem: string): string[] {
    return NOBLEMAN_MAP[element] || [];
  }

  public calculateIntelligence(element: ElementType): string {
    return INTELLIGENCE_MAP[element] || '';
  }

  public getSkyHorse(branch: string): string {
    // 간단한 천마 계산
    const skyHorseMap: { [key: string]: string } = {
      '子': '寅', '丑': '卯', '寅': '辰', '卯': '巳',
      '辰': '午', '巳': '未', '午': '申', '未': '酉',
      '申': '戌', '酉': '亥', '戌': '子', '亥': '丑'
    };
    return skyHorseMap[branch] || '';
  }

  public calculatePeachBlossom(element: ElementType): string {
    return PEACH_BLOSSOM_MAP[element] || '';
  }

  public calculateFiveFactors(pillars: Pillars): FiveFactors {
    const factors: FiveFactors = {
      WOOD: 0, FIRE: 0, EARTH: 0, METAL: 0, WATER: 0
    };

    // 각 기둥의 요소를 계산
    Object.values(pillars).forEach(pillar => {
      if (pillar.element in factors) {
        factors[pillar.element as keyof FiveFactors]++;
      }
      if (pillar.branch.element in factors) {
        factors[pillar.branch.element as keyof FiveFactors]++;
      }
    });

    return factors;
  }

  public calculateEightMansions(lifeGua: number): EightMansions {
    const directions = GUA_DIRECTIONS[lifeGua] || GUA_DIRECTIONS[1];
    if (!directions) {
      throw new Error(`Invalid life gua: ${lifeGua}`);
    }
    
    const group = lifeGua % 2 === 0 ? 'West' : 'East';
    
    return {
      group,
      lucky: {
        wealth: directions.lucky[0] || 'SE',
        health: directions.lucky[1] || 'E',
        romance: directions.lucky[2] || 'S',
        career: directions.lucky[3] || 'N'
      },
      unlucky: {
        obstacles: directions.unlucky[0] || 'NW',
        quarrels: directions.unlucky[1] || 'W',
        setbacks: directions.unlucky[2] || 'SW',
        totalLoss: directions.unlucky[3] || 'NE'
      }
    };
  }
}
