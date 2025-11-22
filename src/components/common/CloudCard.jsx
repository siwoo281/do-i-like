import styled from 'styled-components';

export const CloudCard = styled.div`
  background: #fff;
  width: 100%;
  padding: 40px 24px;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(255, 148, 178, 0.25);
  border: 2px solid #FFB6C1;
  text-align: center;
  position: relative;
  z-index: 5;
  transition: box-shadow 0.2s, transform 0.2s;

  &:active {
    box-shadow: 0 4px 16px rgba(255, 148, 178, 0.18);
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 36px 22px;
  }
  
  @media (max-width: 375px) {
    padding: 32px 20px;
    border-radius: 28px;
  }
  
  @media (max-width: 360px) {
    padding: 28px 18px;
    border-radius: 24px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    padding: 24px 20px;
    border-radius: 24px;
  }
`;

