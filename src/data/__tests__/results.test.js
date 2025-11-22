import { getResultByScore, results } from '../results';

describe('results utilities', () => {
  describe('getResultByScore', () => {
    it('should return innocent result for low scores', () => {
      const result = getResultByScore(5);
      expect(result).toEqual(results.innocent);
      expect(result.title).toBe('별로');
    });

    it('should return suspended result for medium scores', () => {
      const result = getResultByScore(15);
      expect(result).toEqual(results.suspended);
      expect(result.title).toBe('애매함');
    });

    it('should return life result for high scores', () => {
      const result = getResultByScore(25);
      expect(result).toEqual(results.life);
      expect(result.title).toBe('확실');
    });

    it('should return correct result for boundary scores', () => {
      expect(getResultByScore(0)).toEqual(results.innocent);
      expect(getResultByScore(9)).toEqual(results.innocent);
      expect(getResultByScore(10)).toEqual(results.suspended);
      expect(getResultByScore(19)).toEqual(results.suspended);
      expect(getResultByScore(20)).toEqual(results.life);
      expect(getResultByScore(30)).toEqual(results.life);
    });
  });

  describe('results data structure', () => {
    it('should have all required result types', () => {
      expect(results.innocent).toBeDefined();
      expect(results.suspended).toBeDefined();
      expect(results.life).toBeDefined();
    });

    it('should have required properties for each result', () => {
      Object.values(results).forEach(result => {
        expect(result).toHaveProperty('emoji');
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('text');
        expect(result).toHaveProperty('quote');
        expect(result).toHaveProperty('minScore');
        expect(result).toHaveProperty('maxScore');
      });
    });
  });
});

