/**
 * 색상 팔레트 및 테마 상수
 */
export const colors = {
  // 메인 색상
  primary: '#FF5E89',        // 메인 핑크
  primaryLight: '#FF9A9E',   // 밝은 핑크
  primaryLighter: '#FECFEF', // 매우 밝은 핑크
  secondary: '#FFB6C1',      // 연한 핑크 (테두리)
  secondaryLight: '#FFE4E1', // 배지 배경
  
  // 텍스트 색상
  textPrimary: '#333',       // 기본 텍스트
  textSecondary: '#7a6a6a',  // 보조 텍스트
  textTertiary: '#a67a8f',   // 3차 텍스트
  textQuote: '#9a6a7f',      // 인용구 텍스트
  textWhite: '#FFFFFF',      // 흰색 텍스트
  
  // 배경 색상
  background: '#FFF0F5',      // 메인 배경
  backgroundGradient: '#FFDEE9', // 배경 그라데이션 끝
  cardBackground: '#fff',     // 카드 배경
  
  // 그림자 색상
  shadowLight: 'rgba(255, 148, 178, 0.25)',
  shadowMedium: 'rgba(255, 117, 140, 0.4)',
  shadowDark: 'rgba(255, 148, 178, 0.12)',
  shadowActive: 'rgba(255, 148, 178, 0.18)',
};

/**
 * 그라데이션
 */
export const gradients = {
  primary: 'linear-gradient(90deg, #FF9A9E 0%, #FECFEF 100%)',
  background: 'linear-gradient(180deg, #FFF0F5 0%, #FFDEE9 100%)',
  bubble: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.1) 100%)',
  progress: 'linear-gradient(90deg, #FF9A9E 0%, #FECFEF 100%)',
  shimmer: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
};

/**
 * 간격 (spacing)
 */
export const spacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '32px',
};

/**
 * 폰트 크기
 */
export const fontSize = {
  xs: '13px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
  xxxl: '28px',
  huge: '32px',
};

/**
 * border-radius
 */
export const borderRadius = {
  sm: '20px',
  md: '24px',
  lg: '30px',
  xl: '32px',
  full: '50px',
};

/**
 * 그림자
 */
export const shadows = {
  sm: '0 2px 8px rgba(255, 148, 178, 0.12)',
  md: '0 5px 15px rgba(255, 148, 178, 0.2)',
  lg: '0 8px 32px rgba(255, 148, 178, 0.25)',
  xl: '0 10px 20px rgba(255, 117, 140, 0.4)',
  xxl: '0 15px 30px rgba(255, 117, 140, 0.6)',
  active: '0 4px 16px rgba(255, 148, 178, 0.18)',
};

/**
 * 애니메이션 duration
 */
export const animation = {
  fast: '0.2s',
  normal: '0.3s',
  slow: '0.5s',
};

