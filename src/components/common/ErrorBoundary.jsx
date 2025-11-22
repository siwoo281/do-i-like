import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fontSize, spacing, borderRadius, shadows } from '../../styles/theme';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${spacing.xl};
  text-align: center;
  background: linear-gradient(180deg, #FFF0F5 0%, #FFDEE9 100%);
`;

const ErrorTitle = styled.h1`
  font-size: ${fontSize.huge};
  color: ${colors.primary};
  margin-bottom: ${spacing.md};
  font-family: 'Jua', sans-serif;
`;

const ErrorMessage = styled.p`
  font-size: ${fontSize.lg};
  color: ${colors.textPrimary};
  margin-bottom: ${spacing.xl};
  line-height: 1.6;
`;

const ErrorButton = styled.button`
  padding: ${spacing.md} ${spacing.xl};
  background: ${colors.primary};
  color: ${colors.textWhite};
  border: none;
  border-radius: ${borderRadius.full};
  font-size: ${fontSize.lg};
  font-family: 'Jua', sans-serif;
  cursor: pointer;
  box-shadow: ${shadows.lg};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${shadows.xl};
  }

  &:active {
    transform: scale(0.95);
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>😢 오류가 발생했어요</ErrorTitle>
          <ErrorMessage>
            예상치 못한 오류가 발생했습니다.<br />
            페이지를 새로고침하거나 메인으로 돌아가주세요.
          </ErrorMessage>
          <ErrorButton onClick={this.handleReset}>
            메인으로 돌아가기
          </ErrorButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

