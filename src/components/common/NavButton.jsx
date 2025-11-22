import styled from 'styled-components';
import { colors, shadows, borderRadius, fontSize, spacing, animation } from '../../styles/theme';

export const NavButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  padding: ${spacing.xs} ${spacing.sm};
  min-height: 40px;
  border-radius: ${borderRadius.sm};
  border: none;
  background: ${colors.primaryLighter};
  color: ${colors.primary};
  font-family: 'Jua', sans-serif;
  font-size: clamp(${fontSize.xs}, 3.5vw, ${fontSize.sm});
  box-shadow: ${shadows.sm};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: opacity ${animation.fast}, transform ${animation.fast};
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
    font-size: clamp(12px, 3.2vw, ${fontSize.xs});
  }

  @media (max-width: 375px) {
    padding: 6px ${spacing.xs};
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

