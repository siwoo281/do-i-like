import styled from 'styled-components';

export const NavButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  padding: 8px 12px;
  min-height: 40px;
  border-radius: 20px;
  border: none;
  background: #FECFEF;
  color: #FF5E89;
  font-family: 'Jua', sans-serif;
  font-size: clamp(13px, 3.5vw, 14px);
  box-shadow: 0 2px 8px rgba(255, 148, 178, 0.12);
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: opacity 0.2s, transform 0.2s;
  z-index: 20;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover:not(:disabled) {
    opacity: 0.85;
    transform: scale(0.98);
  }

  &:active:not(:disabled) {
    opacity: 0.7;
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    padding: 7px 11px;
    min-height: 38px;
    font-size: clamp(12px, 3.2vw, 13px);
  }

  @media (max-width: 375px) {
    padding: 6px 10px;
    min-height: 36px;
  }

  @media (max-width: 360px) {
    padding: 6px 9px;
    min-height: 34px;
  }

  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    padding: 5px 9px;
    min-height: 32px;
  }
`;

