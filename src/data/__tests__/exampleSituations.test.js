import { exampleSituations, getRandomExample } from '../exampleSituations';

describe('exampleSituations', () => {
  describe('exampleSituations array', () => {
    it('should have at least one example', () => {
      expect(exampleSituations.length).toBeGreaterThan(0);
    });

    it('should contain strings with newlines', () => {
      exampleSituations.forEach(situation => {
        expect(typeof situation).toBe('string');
        expect(situation).toContain('\n');
      });
    });
  });

  describe('getRandomExample', () => {
    it('should return a string', () => {
      const example = getRandomExample();
      expect(typeof example).toBe('string');
    });

    it('should return one of the example situations', () => {
      const example = getRandomExample();
      expect(exampleSituations).toContain(example);
    });

    it('should return different examples on multiple calls (probabilistic)', () => {
      const examples = new Set();
      for (let i = 0; i < 20; i++) {
        examples.add(getRandomExample());
      }
      // With 5 examples, after 20 calls we should get at least 2 different ones
      expect(examples.size).toBeGreaterThan(1);
    });
  });
});

