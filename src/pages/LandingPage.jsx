import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MobileContainer } from '../components/common/MobileContainer';
import { CloudCard } from '../components/common/CloudCard';
import { PrimaryButton } from '../components/common/Button';
import { getRandomExample } from '../data/exampleSituations';
import { colors, gradients, fontSize, spacing, borderRadius, animation } from '../styles/theme';

const StyledMobileContainer = styled(MobileContainer)`
  justify-content: center;
`;

const BgBubble = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${gradients.bubble};
  opacity: 0.6;
  animation: floatUp 10s infinite linear;
  z-index: 0;
  
  &.b1 {
    width: 80px;
    height: 80px;
    left: 10%;
    bottom: -50px;
    animation-duration: 7s;
  }
  
  &.b2 {
    width: 120px;
    height: 120px;
    right: 10%;
    bottom: -80px;
    animation-duration: 9s;
    animation-delay: 2s;
  }
  
  &.b3 {
    width: 50px;
    height: 50px;
    left: 50%;
    bottom: -30px;
    animation-duration: 5s;
    animation-delay: 1s;
  }
`;


const EmotionText = styled.div`
  font-size: 15px;
  color: ${colors.textTertiary};
  font-style: italic;
  margin-bottom: ${spacing.md};
  margin-top: 0;
  letter-spacing: 0.02em;
  text-align: center;
  line-height: 1.7;
  @media (max-width: 480px) {
    font-size: ${fontSize.sm};
    margin-bottom: 14px;
    line-height: 1.65;
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.xs};
    margin-bottom: ${spacing.sm};
    line-height: 1.6;
  }
  
  @media (max-width: 360px) {
    font-size: ${fontSize.xs};
    margin-bottom: 10px;
    line-height: 1.55;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: ${spacing.xs};
    line-height: 1.5;
  }
`;


const Header = styled.header`
  text-align: center;
  z-index: 10;
  margin-top: 0;
  margin-bottom: ${spacing.lg};
  width: 100%;
  
  @media (max-width: 480px) {
    margin-bottom: 18px;
  }
  
  @media (max-width: 375px) {
    margin-bottom: ${spacing.md};
  }
  
  @media (max-width: 360px) {
    margin-bottom: 14px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: ${spacing.sm};
  }
`;

const Title = styled.h1`
  font-size: ${fontSize.huge};
  font-size: clamp(24px, 8vw, ${fontSize.huge});
  line-height: 1.4;
  color: ${colors.primary};
  margin-bottom: ${spacing.xs};
  margin-top: 0;
  text-shadow: 2px 2px 0px ${colors.textWhite};
  letter-spacing: -0.01em;
  @media (max-width: 480px) {
    font-size: ${fontSize.xxxl};
    margin-bottom: 7px;
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.xxl};
    margin-bottom: 6px;
    line-height: 1.35;
  }
  
  @media (max-width: 360px) {
    font-size: 22px;
    margin-bottom: 5px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 4px;
  }
`;

const Subtitle = styled.p`
  font-size: ${fontSize.lg};
  font-size: clamp(${fontSize.md}, 5vw, ${fontSize.lg});
  color: ${colors.textSecondary};
  font-weight: normal;
  line-height: 1.75;
  margin-top: ${spacing.xs};
  margin-bottom: 0;
  letter-spacing: 0.01em;
  @media (max-width: 480px) {
    font-size: 17px;
    margin-top: 7px;
    line-height: 1.7;
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.md};
    line-height: 1.65;
    margin-top: 6px;
  }
  
  @media (max-width: 360px) {
    font-size: 15px;
    line-height: 1.6;
    margin-top: 5px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    margin-top: 4px;
    line-height: 1.55;
  }
`;

const CardWrapper = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: ${spacing.lg};
  
  @media (max-width: 480px) {
    margin-bottom: 18px;
  }
  
  @media (max-width: 375px) {
    margin-bottom: ${spacing.md};
  }
  
  @media (max-width: 360px) {
    margin-bottom: 14px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: ${spacing.sm};
    flex: 0;
  }
`;

const AnimatedCloudCard = styled(CloudCard)`
  animation: float 3s ease-in-out infinite;
`;

const DecoIcon = styled.div`
  position: absolute;
  font-size: 40px;
  animation: bounce 2s infinite alternate;
  
  &.icon-left {
    left: -10px;
    top: -20px;
    transform: rotate(-15deg);
    animation-delay: 0.5s;
  }
  
  &.icon-right {
    right: -10px;
    bottom: -20px;
    transform: rotate(15deg);
  }
`;

const Badge = styled.span`
  display: inline-block;
  background: ${colors.secondaryLight};
  color: ${colors.primary};
  padding: 6px ${spacing.sm};
  border-radius: ${borderRadius.sm};
  font-size: clamp(${fontSize.xs}, 3.5vw, ${fontSize.sm});
  margin-bottom: 14px;
  margin-top: 0;
  font-weight: 500;
  letter-spacing: 0.01em;
  
  @media (max-width: 480px) {
    margin-bottom: ${spacing.sm};
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.xs};
    padding: 5px ${spacing.xs};
    margin-bottom: 10px;
  }
  
  @media (max-width: 360px) {
    font-size: ${fontSize.xs};
    margin-bottom: ${spacing.xs};
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 6px;
  }
`;

const CardText = styled.p`
  font-size: ${fontSize.xxl};
  font-size: clamp(17px, 6vw, ${fontSize.xxl});
  line-height: 1.7;
  color: ${colors.textPrimary};
  word-break: keep-all;
  margin: 0;
  white-space: pre-line;
  
  @media (max-width: 480px) {
    font-size: 19px;
    line-height: 1.65;
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.lg};
    line-height: 1.6;
  }
  
  @media (max-width: 360px) {
    font-size: 17px;
    line-height: 1.55;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 17px;
    line-height: 1.5;
  }
`;


function LandingPage() {
  const navigate = useNavigate();
  // 첫 렌더링마다 예시 상황을 랜덤으로 선택
  const randomExample = useMemo(() => {
    return getRandomExample();
  }, []);

  const handleStart = () => {
    navigate('/question');
  };

  return (
    <StyledMobileContainer>
      <BgBubble className="b1" />
      <BgBubble className="b2" />
      <BgBubble className="b3" />

      <Header>
        <EmotionText>애매한 감정, 설렘과 혼란 사이에서</EmotionText>
        <Title>
          나도 모르게<br />
          자꾸 신경 쓰이는 그 사람
        </Title>
        <Subtitle>
          내 마음이 뭔지<br />
          확인해보는 테스트
        </Subtitle>
      </Header>

      <CardWrapper>
        <AnimatedCloudCard>
          <DecoIcon className="icon-left">⚖️</DecoIcon>
          <DecoIcon className="icon-right">💖</DecoIcon>

          <Badge>혹시, 내 얘기?</Badge>
          <CardText>
            {randomExample.split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </CardText>
        </AnimatedCloudCard>
      </CardWrapper>

      <PrimaryButton onClick={handleStart}>
        테스트 시작하기 💕
      </PrimaryButton>
    </StyledMobileContainer>
  );
}

export default LandingPage;

