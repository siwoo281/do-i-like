import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MobileContainer } from '../components/common/MobileContainer';
import { CloudCard } from '../components/common/CloudCard';
import { getRandomExample } from '../data/exampleSituations';

const StyledMobileContainer = styled(MobileContainer)`
  justify-content: center;
`;

const BgBubble = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.1) 100%);
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
  color: #a67a8f; /* 더 진한 색으로 대비 개선 */
  font-style: italic;
  margin-bottom: 16px;
  margin-top: 0;
  letter-spacing: 0.02em; /* 자간 약간 증가 */
  text-align: center;
  line-height: 1.6; /* 줄 간격 추가 */
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 375px) {
    font-size: 13px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 360px) {
    font-size: 13px; /* 12px에서 13px로 최소 크기 증가 */
    margin-bottom: 10px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 8px;
  }
`;


const Header = styled.header`
  text-align: center;
  z-index: 10;
  margin-top: 0;
  margin-bottom: 20px;
  width: 100%;
  
  @media (max-width: 480px) {
    margin-bottom: 18px;
  }
  
  @media (max-width: 375px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    margin-bottom: 14px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 12px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-size: clamp(24px, 8vw, 32px); /* 반응형 폰트 */
  line-height: 1.4; /* 줄 간격 약간 증가 */
  color: #FF5E89;
  margin-bottom: 8px;
  margin-top: 0;
  text-shadow: 2px 2px 0px #FFFFFF;
  letter-spacing: -0.01em; /* 타이틀 자간 조정 */
  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 7px;
  }
  
  @media (max-width: 375px) {
    font-size: 24px;
    margin-bottom: 6px;
    line-height: 1.35;
  }
  
  @media (max-width: 360px) {
    font-size: 22px;
    margin-bottom: 5px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 4px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px; /* 글씨 크기 키움 */
  font-size: clamp(16px, 5vw, 18px); /* 반응형 폰트 적용 */
  color: #7a6a6a; /* 더 진한 색으로 대비 개선 */
  font-weight: normal;
  line-height: 1.7;
  margin-top: 8px;
  margin-bottom: 0;
  letter-spacing: 0.01em; /* 자간 추가 */
  @media (max-width: 480px) {
    font-size: 17px;
    margin-top: 7px;
  }
  
  @media (max-width: 375px) {
    font-size: 16px;
    line-height: 1.6; /* 줄 간격 개선 */
    margin-top: 6px;
  }
  
  @media (max-width: 360px) {
    font-size: 15px;
    line-height: 1.5;
    margin-top: 5px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    margin-top: 4px;
  }
`;

const CardWrapper = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    margin-bottom: 18px;
  }
  
  @media (max-width: 375px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    margin-bottom: 14px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 12px;
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
  background: #FFE4E1;
  color: #FF5E89;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: clamp(13px, 3.5vw, 14px); /* 반응형 폰트 추가 */
  margin-bottom: 14px;
  margin-top: 0;
  font-weight: 500; /* 가독성 향상 */
  letter-spacing: 0.01em;
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 375px) {
    font-size: 13px;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 360px) {
    font-size: 13px;
    margin-bottom: 8px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 6px;
  }
`;

const CardText = styled.p`
  font-size: 24px;
  font-size: clamp(18px, 6vw, 24px); /* 반응형 폰트 */
  line-height: 1.5;
  color: #333;
  word-break: keep-all; /* 단어 단위 줄바꿈 */
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 20px;
    line-height: 1.45;
  }
  
  @media (max-width: 375px) {
    font-size: 18px;
    line-height: 1.4;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    line-height: 1.35;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 16px;
    line-height: 1.3;
  }
`;

const CtaButton = styled.button`
  width: 100%;
  min-height: 56px; /* 터치 영역 최소 크기 (44px 권장, 여유있게 56px) */
  padding: 16px 20px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(90deg, #FF9A9E 0%, #FECFEF 100%);
  color: white;
  font-size: 22px;
  font-size: clamp(18px, 5vw, 22px); /* 반응형 폰트 */
  font-family: 'Jua', sans-serif;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(255, 117, 140, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  z-index: 10;
  margin-top: 0;
  -webkit-tap-highlight-color: transparent; /* 터치 하이라이트 제거 */
  touch-action: manipulation; /* 더블탭 줌 방지 */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(255, 117, 140, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    padding: 14px 18px;
  }
  
  @media (max-width: 375px) {
    font-size: 18px;
    padding: 12px 16px;
    min-height: 52px;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    padding: 11px 14px;
    min-height: 48px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 16px;
    padding: 10px 18px;
    min-height: 44px;
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
        <EmotionText>좋아하는 감정, 애매함과 설렘 사이에서</EmotionText>
        <Title>
          자꾸 헷갈리게 하는<br />
          그 사람, 내 생각은?
        </Title>
        <Subtitle>
          내가 그 사람을 좋아하는지<br />
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

      <CtaButton onClick={handleStart}>
        테스트 시작하기 💕
      </CtaButton>
    </StyledMobileContainer>
  );
}

export default LandingPage;

