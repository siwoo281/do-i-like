import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MobileContainer = styled.div`
  width: 100%;
  height: 100%; /* vh 대신 %를 사용하여 부모 높이에 맞춤 */
  max-width: 400px;
  max-width: 100vw; /* 대형 화면에서 좌우 여백 과다 방지 */
  padding: 40px 24px;
  padding: max(20px, env(safe-area-inset-top)) max(24px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom)) max(24px, env(safe-area-inset-left)); /* 안전 영역 대응 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden; /* 가로 스크롤 원천 차단 */
  box-sizing: border-box; /* 패딩이 높이에 영향을 주지 않도록 설정 */
  background-color: #FFF0F5; /* 배경색 통일 */
  
  @media (max-width: 480px) {
    padding: 30px 20px;
  }
  
  @media (max-width: 375px) {
    padding: 20px 16px;
  }
  
  @media (max-width: 360px) {
    padding: 16px 12px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    padding: 16px 24px;
    height: auto;
    min-height: 100vh;
  }
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
  color: #b48a9f;
  font-style: italic;
  margin-bottom: 18px;
  letter-spacing: 0.01em;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 14px;
  }
  
  @media (max-width: 375px) {
    font-size: 13px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 360px) {
    font-size: 12px;
    margin-bottom: 12px;
  }
`;


const Header = styled.header`
  text-align: center;
  z-index: 10;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    margin-top: 18px;
  }
  
  @media (max-width: 375px) {
    margin-top: 16px;
  }
  
  @media (max-width: 360px) {
    margin-top: 12px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-size: clamp(24px, 8vw, 32px); /* 반응형 폰트 */
  line-height: 1.35;
  color: #FF5E89;
  margin-bottom: 10px;
  text-shadow: 2px 2px 0px #FFFFFF;
  @media (max-width: 480px) {
    font-size: 28px;
  }
  
  @media (max-width: 375px) {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  @media (max-width: 360px) {
    font-size: 22px;
    margin-bottom: 6px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px; /* 글씨 크기 키움 */
  font-size: clamp(16px, 5vw, 18px); /* 반응형 폰트 적용 */
  color: #887878;
  font-weight: normal;
  line-height: 1.7;
  margin-top: 10px; /* 위쪽 여백 추가 */
  @media (max-width: 480px) {
    font-size: 17px;
  }
  
  @media (max-width: 375px) {
    font-size: 16px;
    line-height: 1.5;
  }
  
  @media (max-width: 360px) {
    font-size: 15px;
    line-height: 1.4;
  }
`;

const CardWrapper = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1; /* 남은 공간을 모두 차지하여 카드를 중앙에 위치시킴 */
`;

const CloudCard = styled.div`
  background: #fff; /* 선명한 흰색 배경 */
  width: 100%;
  padding: 40px 20px;
  border-radius: 32px; /* 다른 페이지와 통일 */
  box-shadow: 0 8px 32px rgba(255, 148, 178, 0.25); /* 은은한 그림자 */
  border: 2px solid #FFB6C1; /* 얇은 핑크 테두리 */
  text-align: center;
  animation: float 3s ease-in-out infinite;
  position: relative;
  z-index: 5;
  transition: box-shadow 0.2s, transform 0.2s;

  &:active {
    box-shadow: 0 4px 16px rgba(255, 148, 178, 0.18);
    transform: scale(0.98);
  }
  
  @media (max-width: 480px) {
    padding: 35px 18px;
  }
  
  @media (max-width: 375px) {
    padding: 30px 16px;
    border-radius: 24px;
  }
  
  @media (max-width: 360px) {
    padding: 24px 14px;
    border-radius: 20px;
  }
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
  font-size: 14px;
  margin-bottom: 16px;
`;

const CardText = styled.p`
  font-size: 24px;
  font-size: clamp(18px, 6vw, 24px); /* 반응형 폰트 */
  line-height: 1.5;
  color: #333;
  word-break: keep-all; /* 단어 단위 줄바꿈 */
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
  
  @media (max-width: 375px) {
    font-size: 18px;
    line-height: 1.4;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    line-height: 1.3;
  }
`;

const CtaButton = styled.button`
  width: 100%;
  min-height: 56px; /* 터치 영역 최소 크기 (44px 권장, 여유있게 56px) */
  padding: 20px;
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
    padding: 18px;
  }
  
  @media (max-width: 375px) {
    font-size: 18px;
    padding: 16px;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    padding: 14px;
    min-height: 48px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 16px;
    padding: 12px 20px;
    min-height: 44px;
  }
`;


import { useMemo } from 'react';

const exampleSituations = [
  '카톡 답장은 느린데\n내 사소한 말은 다 기억하는 그 사람.\n이거... 혹시 좋아하는 걸까?',
  '사람 많은 술자리에서\n유독 나만 챙겨주는 것 같은 느낌.\n나만의 착각일까?',
  '내가 올린 인스타 스토리에\n빠짐없이 하트 누르는 그 사람.\n그냥 습관일까, 시그널일까?',
  '단둘이 있으면 어색한데,\n자꾸만 시선이 가는 그 사람.\n내 마음, 나도 헷갈려.',
  '다른 사람에겐 무뚝뚝한데\n나한테만 웃어주는 그 사람.\n이거... 그린라이트인가?',
];

function LandingPage() {
  const navigate = useNavigate();
  // 첫 렌더링마다 예시 상황을 랜덤으로 선택
  const randomExample = useMemo(() => {
    return exampleSituations[Math.floor(Math.random() * exampleSituations.length)];
  }, []);

  const handleStart = () => {
    navigate('/question');
  };

  return (
    <MobileContainer>
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
        <CloudCard>
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
        </CloudCard>
      </CardWrapper>

      <CtaButton onClick={handleStart}>
        테스트 시작하기 💕
      </CtaButton>
    </MobileContainer>
  );
}

export default LandingPage;

