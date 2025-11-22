/**
 * @jest-environment jsdom
 */

import { createShareText, createShareUrl, copyToClipboard, shareNative } from '../share';

describe('share utilities', () => {
  describe('createShareText', () => {
    it('should create share text with result and score', () => {
      const result = {
        title: '테스트',
        text: '테스트 결과입니다.'
      };
      const score = 15;
      const shareText = createShareText(result, score);
      
      expect(shareText).toContain('애매한 감정, 좋아하는 걸까?');
      expect(shareText).toContain('테스트');
      expect(shareText).toContain('15점');
      expect(shareText).toContain('테스트 결과입니다.');
    });
  });

  describe('createShareUrl', () => {
    it('should create share URL', () => {
      // Mock window.location
      delete window.location;
      window.location = {
        origin: 'https://example.com',
        pathname: '/test'
      };
      
      const url = createShareUrl();
      expect(url).toBe('https://example.com/test#/');
    });
  });

  describe('copyToClipboard', () => {
    beforeEach(() => {
      // Mock navigator.clipboard
      global.navigator.clipboard = {
        writeText: jest.fn().mockResolvedValue(undefined)
      };
    });

    it('should copy text to clipboard using navigator.clipboard', async () => {
      const text = 'test text';
      const result = await copyToClipboard(text);
      
      expect(result).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
    });

    it('should fallback to execCommand if clipboard API fails', async () => {
      // Mock clipboard API failure
      global.navigator.clipboard = undefined;
      document.execCommand = jest.fn().mockReturnValue(true);
      
      const text = 'test text';
      const result = await copyToClipboard(text);
      
      expect(result).toBe(true);
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });
  });

  describe('shareNative', () => {
    beforeEach(() => {
      global.navigator.share = jest.fn();
    });

    it('should share using native API if available', async () => {
      global.navigator.share.mockResolvedValue(undefined);
      
      const shareData = { title: 'Test', text: 'Test text', url: 'https://test.com' };
      const result = await shareNative(shareData);
      
      expect(result).toBe(true);
      expect(navigator.share).toHaveBeenCalledWith(shareData);
    });

    it('should return false if share API is not available', async () => {
      global.navigator.share = undefined;
      
      const shareData = { title: 'Test', text: 'Test text', url: 'https://test.com' };
      const result = await shareNative(shareData);
      
      expect(result).toBe(false);
    });

    it('should return false if user aborts share', async () => {
      const abortError = new Error('User aborted');
      abortError.name = 'AbortError';
      global.navigator.share.mockRejectedValue(abortError);
      
      const shareData = { title: 'Test', text: 'Test text', url: 'https://test.com' };
      const result = await shareNative(shareData);
      
      expect(result).toBe(false);
    });
  });
});

