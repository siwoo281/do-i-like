import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, shadows, animation } from '../../styles/theme';

const ToastContainer = styled.div`
  position: fixed;
  bottom: ${spacing.xl};
  left: 50%;
  transform: translateX(-50%) translateY(${props => props.show ? '0' : '100px'});
  background: ${colors.textPrimary};
  color: ${colors.textWhite};
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.xl};
  z-index: 1000;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity ${animation.normal}, transform ${animation.normal};
  font-size: ${fontSize.md};
  font-family: 'Jua', sans-serif;
  max-width: 90%;
  text-align: center;
  word-break: keep-all;
  
  @media (max-width: 480px) {
    font-size: ${fontSize.sm};
    padding: ${spacing.sm} ${spacing.md};
    bottom: ${spacing.lg};
  }
`;

export const Toast = ({ message, show, duration = 2000, onClose }) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!message) return null;

  return (
    <ToastContainer show={show}>
      {message}
    </ToastContainer>
  );
};

