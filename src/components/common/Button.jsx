import styled from 'styled-components';
import { colors, gradients, shadows, borderRadius, fontSize, spacing, animation } from '../../styles/theme';

export const Button = styled.button`
  width: 100%;
  min-height: 56px;
  padding: ${spacing.md} ${spacing.lg};
  border: none;
  border-radius: ${borderRadius.lg};
  background: ${props => {
    if (props.variant === 'primary') {
      return gradients.primary;
    } else if (props.variant === 'secondary') {
      return 'rgba(255, 255, 255, 0.9)';
    } else if (props.selected) {
      return gradients.primary;
    }
    return 'rgba(255, 255, 255, 0.8)';
  }};
  color: ${props => {
    if (props.variant === 'primary' || props.selected) {
      return colors.textWhite;
    }
    return props.variant === 'secondary' ? colors.primary : colors.textPrimary;
  }};
  font-size: ${fontSize.lg};
  font-size: clamp(16px, 4.5vw, ${fontSize.lg});
  font-family: 'Jua', sans-serif;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  box-shadow: ${props => {
    if (props.selected || props.variant === 'primary') {
      return shadows.xl;
    }
    return shadows.md;
  }};
  transition: transform ${animation.fast}, box-shadow ${animation.fast}, background ${animation.fast}, opacity ${animation.fast};
  border: ${props => {
    if (props.variant === 'secondary') {
      return `2px solid ${colors.primary}`;
    }
    return props.selected ? `2px solid ${colors.primary}` : '2px solid transparent';
  }};
  opacity: ${props => props.disabled ? 0.6 : 1};
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  margin-bottom: ${props => props.marginBottom || spacing.sm};

  &:hover:not(:disabled) {
    transform: scale(1.03);
    box-shadow: ${props => props.variant === 'primary' || props.selected ? shadows.xxl : shadows.xl};
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    font-size: 17px;
    padding: 14px 16px;
    margin-bottom: ${props => props.marginBottom || '11px'};
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.md};
    padding: ${spacing.sm} 14px;
    margin-bottom: ${props => props.marginBottom || spacing.xs};
    min-height: 52px;
  }
  
  @media (max-width: 360px) {
    font-size: 15px;
    padding: 11px ${spacing.sm};
    margin-bottom: ${props => props.marginBottom || '9px'};
    min-height: 48px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 15px;
    padding: 10px ${spacing.lg};
    min-height: 44px;
    margin-bottom: ${props => props.marginBottom || spacing.xs};
  }
`;

export const PrimaryButton = styled(Button)`
  background: ${gradients.primary};
  color: ${colors.textWhite};
  box-shadow: ${shadows.xl};
  border: none;
  border-radius: ${borderRadius.full};
  font-size: ${fontSize.xxl};
  font-size: clamp(18px, 5vw, ${fontSize.xxl});
  margin-bottom: 0;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: ${shadows.xxl};
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    padding: 14px 18px;
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.lg};
    padding: ${spacing.sm} ${spacing.md};
    min-height: 52px;
  }
  
  @media (max-width: 360px) {
    font-size: ${fontSize.md};
    padding: 11px 14px;
    min-height: 48px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: ${fontSize.md};
    padding: 10px ${spacing.lg};
    min-height: 44px;
  }
`;

