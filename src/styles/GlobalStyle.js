import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Jua', sans-serif;
    background: linear-gradient(180deg, #FFF0F5 0%, #FFDEE9 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-height: -webkit-fill-available; /* iOS Safari 대응 */
    color: #4A4A4A;
    overflow-x: hidden; /* 가로 스크롤만 방지, 세로 스크롤 허용 */
    -webkit-tap-highlight-color: transparent; /* 터치 하이라이트 제거 */
    -webkit-touch-callout: none; /* 길게 누르기 메뉴 비활성화 */
    -webkit-font-smoothing: antialiased; /* 폰트 안티앨리어싱 */
    -moz-osx-font-smoothing: grayscale; /* macOS 폰트 렌더링 */
    text-rendering: optimizeLegibility; /* 텍스트 렌더링 최적화 */
    touch-action: pan-y; /* 세로 스크롤만 허용 */
  }

  #root {
    width: 100%;
    min-height: 100vh;
    min-height: -webkit-fill-available; /* iOS Safari 대응 */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
  }

  /* 모바일 화면 크기별 미디어 쿼리 */
  @media (max-width: 480px) {
    body {
      font-size: 16px;
    }
  }

  @media (max-width: 360px) {
    body {
      font-size: 14px;
    }
  }

  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    body {
      overflow-y: auto;
    }
    
    #root {
      align-items: flex-start;
      padding: 10px 0;
    }
  }
  
  /* 매우 작은 화면 대응 */
  @media (max-width: 320px) {
    body {
      font-size: 14px;
    }
  }

  /* 고해상도 화면 대응 */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }

  @keyframes bounce {
    0% { transform: translateY(0) rotate(-10deg); }
    100% { transform: translateY(-10px) rotate(10deg); }
  }
  
  @keyframes floatUp {
    0% { transform: translateY(0) scale(1); opacity: 0.6; }
    100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
  }
`;

