import styled from 'styled-components';
import { colors, shadows, borderRadius, spacing, animation } from '../../styles/theme';

export const CloudCard = styled.div`
  background: ${colors.cardBackground};
  width: 100%;
  padding: 40px ${spacing.xl};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.lg};
  border: 2px solid ${colors.secondary};
  text-align: center;
  position: relative;
  z-index: 5;
  transition: box-shadow ${animation.fast}, transform ${animation.fast};

  &:active {
    box-shadow: ${shadows.active};
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 36px 22px;
  }
  
  @media (max-width: 375px) {
    padding: ${spacing.xxl} ${spacing.lg};
    border-radius: ${borderRadius.md};
  }
  
  @media (max-width: 360px) {
    padding: ${spacing.xxxl} 18px;
    border-radius: ${borderRadius.md};
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    padding: ${spacing.xl} ${spacing.lg};
    border-radius: ${borderRadius.md};
  }
`;

