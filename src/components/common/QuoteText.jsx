import styled from 'styled-components';

export const QuoteText = styled.div`
  font-size: clamp(14px, 3.8vw, 15px);
  color: #9a6a7f;
  font-style: italic;
  margin: 10px 0 6px 0;
  line-height: 1.6;
  letter-spacing: 0.02em;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: clamp(13px, 3.5vw, 14px);
    margin: 8px 0 5px 0;
  }
  
  @media (max-width: 375px) {
    font-size: clamp(12px, 3.2vw, 13px);
    margin: 6px 0 4px 0;
    line-height: 1.55;
  }
  
  @media (max-width: 360px) {
    font-size: clamp(12px, 3vw, 13px);
    margin: 6px 0 4px 0;
    line-height: 1.5;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: clamp(11px, 2.8vw, 12px);
    margin: 4px 0 3px 0;
    line-height: 1.45;
  }
`;

