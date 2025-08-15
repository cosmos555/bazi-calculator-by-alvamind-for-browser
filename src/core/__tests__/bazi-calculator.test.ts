import { describe, it, expect, beforeEach } from 'vitest';
import { BaziCalculator } from '../bazi-calculator';
import { MockDateMappingProvider } from './mock-date-mapping-provider';

describe('BaziCalculator', () => {
  let mockProvider: MockDateMappingProvider;
  let calculator: BaziCalculator;

  beforeEach(() => {
    mockProvider = new MockDateMappingProvider();
    calculator = new BaziCalculator(1990, 1, 1, 12, 'male', mockProvider);
  });

  describe('calculatePillars', () => {
    it('should calculate pillars correctly', () => {
      const pillars = calculator.calculatePillars();
      
      expect(pillars.year).toBeDefined();
      expect(pillars.month).toBeDefined();
      expect(pillars.day).toBeDefined();
      expect(pillars.time).toBeDefined();
      
      expect(pillars.year.chinese).toBe('甲子');
      expect(pillars.month.chinese).toBe('甲子');
      expect(pillars.day.chinese).toBe('甲子');
    });
  });

  describe('calculateBasicAnalysis', () => {
    it('should calculate basic analysis correctly', () => {
      const analysis = calculator.calculateBasicAnalysis();
      
      expect(analysis.lifeGua).toBeDefined();
      expect(analysis.dayMaster).toBeDefined();
      expect(analysis.nobleman).toBeDefined();
      expect(analysis.intelligence).toBeDefined();
      expect(analysis.skyHorse).toBeDefined();
      expect(analysis.peachBlossom).toBeDefined();
      expect(analysis.fiveFactors).toBeDefined();
      expect(analysis.eightMansions).toBeDefined();
    });
  });

  describe('getCompleteAnalysis', () => {
    it('should return complete analysis', () => {
      const complete = calculator.getCompleteAnalysis();
      
      expect(complete.mainPillars).toBeDefined();
      expect(complete.basicAnalysis).toBeDefined();
    });
  });

  describe('toString', () => {
    it('should return formatted string representation', () => {
      const result = calculator.toString();
      expect(result).toContain('年');
      expect(result).toContain('月');
      expect(result).toContain('日');
      expect(result).toContain('時');
    });
  });
});
