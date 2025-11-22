import { getResultByScore, results } from '../results';

describe('results utilities', () => {
  describe('getResultByScore', () => {
    it('should return innocent result for low scores', () => {
      const result = getResultByScore(5);
      expect(result).toEqual(results.innocent);
      expect(result.title).toBe('지금은 친구');
    });

    it('should return suspended result for medium-low scores', () => {
      const result = getResultByScore(13);
      expect(result).toEqual(results.suspended);
      expect(result.title).toBe('설렘의 시작');
    });

    it('should return life result for medium-high scores', () => {
      const result = getResultByScore(22);
      expect(result).toEqual(results.life);
      expect(result.title).toBe('확실한 마음');
    });

    it('should return intense result for high scores', () => {
      const result = getResultByScore(30);
      expect(result).toEqual(results.intense);
      expect(result.title).toBe('완전 빠졌어');
    });

    it('should return correct result for boundary scores', () => {
      expect(getResultByScore(0)).toEqual(results.innocent);
      expect(getResultByScore(8)).toEqual(results.innocent);
      expect(getResultByScore(9)).toEqual(results.suspended);
      expect(getResultByScore(17)).toEqual(results.suspended);
      expect(getResultByScore(18)).toEqual(results.life);
      expect(getResultByScore(26)).toEqual(results.life);
      expect(getResultByScore(27)).toEqual(results.intense);
      expect(getResultByScore(36)).toEqual(results.intense);
    });
  });

  describe('results data structure', () => {
    it('should have all required result types', () => {
      expect(results.innocent).toBeDefined();
      expect(results.suspended).toBeDefined();
      expect(results.life).toBeDefined();
      expect(results.intense).toBeDefined();
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

