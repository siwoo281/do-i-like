/**
 * 공유 텍스트를 생성하는 함수
 * @param {Object} result - 결과 객체
 * @param {number} score - 점수
 * @returns {string} 공유 텍스트
 */
export const createShareText = (result, score) => {
  return `애매한 감정, 좋아하는 걸까? 테스트 결과: ${result.title}!\n점수: ${score}점\n\n${result.text}`;
};

/**
 * 공유 URL을 생성하는 함수
 * @returns {string} 공유 URL
 */
export const createShareUrl = () => {
  return window.location.origin + (window.location.pathname || '') + '#/';
};

/**
 * 클립보드에 텍스트를 복사하는 함수
 * @param {string} text - 복사할 텍스트
 * @returns {Promise<boolean>} 성공 여부
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 폴백: execCommand 사용
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        return success;
      } catch (error) {
        document.body.removeChild(textArea);
        throw error;
      }
    }
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    return false;
  }
};

/**
 * 네이티브 공유 API를 사용하여 공유하는 함수
 * @param {Object} shareData - 공유 데이터
 * @returns {Promise<boolean>} 성공 여부
 */
export const shareNative = async (shareData) => {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share(shareData);
    return true;
  } catch (error) {
    if (error.name === 'AbortError') {
      // 사용자가 공유를 취소한 경우
      return false;
    }
    throw error;
  }
};

