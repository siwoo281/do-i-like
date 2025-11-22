import styled from 'styled-components';

export const MobileContainer = styled.div`
  width: 100%;
  max-width: 400px;
  min-height: 100vh;
  min-height: -webkit-fill-available; /* iOS Safari 대응 */
  padding: 40px 24px;
  padding: max(20px, env(safe-area-inset-top)) max(20px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom)) max(20px, env(safe-area-inset-left)); /* 안전 영역 대응 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden; /* 가로 스크롤 원천 차단 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */
  box-sizing: border-box; /* 패딩이 높이에 영향을 주지 않도록 설정 */
  background-color: #FFF0F5; /* 배경색 통일 */
  margin: 0 auto;
  
  @media (max-width: 480px) {
    padding: 30px 20px;
  }
  
  @media (max-width: 375px) {
    padding: 20px 18px;
  }
  
  @media (max-width: 360px) {
    padding: 18px 16px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    padding: 16px 18px;
    height: auto;
    min-height: 100vh;
  }
`;

