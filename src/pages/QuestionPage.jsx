import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MobileContainer = styled.div`
  width: 100%;
  max-width: 400px;
  min-height: 100vh;
  min-height: -webkit-fill-available; /* iOS Safari 대응 */
  padding: 40px 24px;
  padding: max(20px, env(safe-area-inset-top)) max(24px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom)) max(24px, env(safe-area-inset-left)); /* 안전 영역 대응 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden; /* 가로 스크롤 원천 차단 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */
  box-sizing: border-box; /* 패딩이 높이에 영향을 주지 않도록 설정 */
  background-color: #FFF0F5; /* 배경색 통일 */
  margin: 0 auto;
  
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

const Header = styled.header`
  text-align: center;
  z-index: 10;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 28px;
  font-size: clamp(20px, 7vw, 28px); /* 반응형 폰트 */
  line-height: 1.45; /* 줄 간격 약간 증가 */
  color: #FF5E89;
  margin-bottom: 10px;
  text-shadow: 2px 2px 0px #FFFFFF;
  word-break: keep-all; /* 단어 단위 줄바꿈 */
  letter-spacing: -0.01em; /* 타이틀 자간 조정 */
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
  
  @media (max-width: 375px) {
    font-size: 20px;
    line-height: 1.35;
  }
  
  @media (max-width: 360px) {
    font-size: 19px; /* 18px에서 19px로 증가 */
    line-height: 1.3;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #FF9A9E 0%, #FECFEF 100%);
  border-radius: 10px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${props => props.progress}%;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
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
  background: #fff;
  width: 100%;
  padding: 40px 20px;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(255, 148, 178, 0.25);
  border: 2px solid #FFB6C1;
  margin-bottom: 24px;
  text-align: center;
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
    margin-bottom: 20px;
  }
  
  @media (max-width: 360px) {
    padding: 24px 14px;
    border-radius: 20px;
    margin-bottom: 16px;
  }
`;

const QuestionText = styled.p`
  font-size: 24px;
  font-size: clamp(18px, 6vw, 24px); /* 반응형 폰트 */
  line-height: 1.5;
  color: #333;
  margin-bottom: 30px;
  word-break: keep-all; /* 단어 단위 줄바꿈 */
  white-space: pre-line; /* 개행 문자 적용 */
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 375px) {
    font-size: 18px;
    margin-bottom: 20px;
    line-height: 1.4;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    margin-bottom: 16px;
    line-height: 1.3;
  }
`;

const AnswerButton = styled.button`
  width: 100%;
  min-height: 56px; /* 터치 영역 최소 크기 상향 */
  padding: 18px;
  margin-bottom: 16px;
  border: none;
  border-radius: 30px;
  background: ${props => props.selected 
    ? 'linear-gradient(90deg, #FF9A9E 0%, #FECFEF 100%)' 
    : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.selected ? 'white' : '#333'};
  font-size: 18px;
  font-size: clamp(16px, 4.5vw, 18px); /* 반응형 폰트 */
  font-family: 'Jua', sans-serif;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  box-shadow: ${props => props.selected 
    ? '0 10px 20px rgba(255, 117, 140, 0.4)' 
    : '0 5px 15px rgba(255, 148, 178, 0.2)'};
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s, opacity 0.2s;
  border: 2px solid ${props => props.selected ? '#FF5E89' : 'transparent'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  -webkit-tap-highlight-color: transparent; /* 터치 하이라이트 제거 */
  touch-action: manipulation; /* 더블탭 줌 방지 */

  &:hover:not(:disabled) {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(255, 117, 140, 0.5);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }
  
  @media (max-width: 480px) {
    font-size: 17px;
    padding: 16px;
  }
  
  @media (max-width: 375px) {
    font-size: 16px;
    padding: 14px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 360px) {
    font-size: 15px;
    padding: 12px;
    margin-bottom: 10px;
    min-height: 48px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 15px;
    padding: 10px 16px;
    min-height: 44px;
    margin-bottom: 8px;
  }
`;

const questions = [
  {
    text: "술자리에서 그 사람이\n당신 흑기사 해준다면?",
    answers: [
      { text: "그냥 친구라서 그런 거야", score: 0 },
      { text: "나한테 관심 있을 수도?", score: 3 },
      { text: "술 못 마시는 줄 알았나봐", score: 1 }
    ]
  },
  {
    text: "그 사람이 당신 인스타 스토리를\n거의 매일 보고 하트를 누른다면?",
    answers: [
      { text: "스토리 보는 게 취미인가봐", score: 0 },
      { text: "나 궁금한 거 아닐까?", score: 3 },
      { text: "우연의 일치일 수도", score: 1 }
    ]
  },
  {
    text: "카톡에서 그 사람이\n'읽음'만 하고 답장 안 온다면?",
    answers: [
      { text: "바빠서 못 봤겠지", score: 0 },
      { text: "답장 고민 중일 수도?", score: 3 },
      { text: "그냥 까먹었을 거야", score: 1 }
    ]
  },
  {
    text: "그 사람이 당신과 단둘이 있을 때\n자꾸 어색해하거나 긴장한다면?",
    answers: [
      { text: "그냥 어색한 사람이야", score: 0 },
      { text: "나한테 좋아해서 긴장하는 거 아닐까?", score: 3 },
      { text: "분위기 때문일 수도", score: 1 }
    ]
  },
  {
    text: "그 사람이 당신이 좋아하는\n음식이나 영화 취향 물어보고\n나중에 그걸 기억해둔다면?",
    answers: [
      { text: "그냥 대화 거리인 거야", score: 0 },
      { text: "나한테 관심 있어서 기억하는 거 아닐까?", score: 3 },
      { text: "친절해서 물어본 거야", score: 1 }
    ]
  },
  {
    text: "그 사람이 당신과 있을 때\n자꾸 눈 마주치려고 하거나\n눈치를 본다면?",
    answers: [
      { text: "그냥 우연이야", score: 0 },
      { text: "나한테 집중하려는 거 아닐까?", score: 3 },
      { text: "그냥 습관인가봐", score: 1 }
    ]
  },
  {
    text: "그 사람이 당신 생일\n기억하고 선물이나 축하해준다면?",
    answers: [
      { text: "생일 잘 기억하는 사람이야", score: 0 },
      { text: "나한테 관심 있어서 기억하는 거 아닐까?", score: 3 },
      { text: "친구라서 기억하는 거야", score: 1 }
    ]
  },
  {
    text: "그 사람이 당신과 있을 때\n다른 사람 연락 안 받는다면?",
    answers: [
      { text: "그냥 바빠서 못 받은 거야", score: 0 },
      { text: "나한테 집중하려는 거 아닐까?", score: 3 },
      { text: "우연히 못 받은 거겠지", score: 1 }
    ]
  },
  {
    text: "그 사람이 당신이 올린 게시물에\n첫 댓글이나 하트를 달아준다면?",
    answers: [
      { text: "그냥 빠르게 본 거야", score: 0 },
      { text: "나 게시물 기다렸던 거 아닐까?", score: 3 },
      { text: "우연히 봤을 거야", score: 1 }
    ]
  },
  {
    text: "그 사람이 당신과 있을 때\n자꾸 옆에 앉으려고 한다면?",
    answers: [
      { text: "그냥 편한 자리인 거야", score: 0 },
      { text: "나 옆에 있고 싶어서 그런 거 아닐까?", score: 3 },
      { text: "우연히 그런 거겠지", score: 1 }
    ]
  }
];

function QuestionPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]); // 이전 답변 기록

  const handleAnswerClick = (answerScore) => {
    if (isTransitioning) return; // 중복 클릭 방지

    setSelectedAnswer(answerScore);
    setIsTransitioning(true);

    setTimeout(() => {
      const newScore = score + answerScore;
      setScore(newScore);
      setAnswerHistory([...answerHistory, answerScore]);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsTransitioning(false);
      } else {
        navigate(`/result?score=${newScore}`);
      }
    }, 500);
  };

  // 이전 질문으로 이동
  const handlePrev = () => {
    if (currentQuestion === 0 || isTransitioning) return;
    const prevAnswer = answerHistory[answerHistory.length - 1] || 0;
    setCurrentQuestion(currentQuestion - 1);
    setScore(score - prevAnswer);
    setAnswerHistory(answerHistory.slice(0, -1));
    setSelectedAnswer(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <MobileContainer>
      <Header style={{ position: 'relative', width: '100%' }}>
        {/* 좌측 상단: 질문 1에서는 메인으로, 2번 이후부터는 이전 질문 */}
        {currentQuestion === 0 ? (
          <button
            onClick={() => navigate('/')}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              padding: '8px 16px',
              minHeight: '44px', // 터치 영역 최소 크기
              borderRadius: 20,
              border: 'none',
              background: '#FECFEF',
              color: '#FF5E89',
              fontFamily: 'Jua, sans-serif',
              fontSize: 'clamp(14px, 4vw, 15px)', // 반응형 폰트
              boxShadow: '0 2px 8px rgba(255, 148, 178, 0.12)',
              cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.2s',
              zIndex: 20,
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            메인으로
          </button>
        ) : (
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              padding: '8px 16px',
              minHeight: '44px', // 터치 영역 최소 크기
              borderRadius: 20,
              border: 'none',
              background: '#FECFEF',
              color: '#FF5E89',
              fontFamily: 'Jua, sans-serif',
              fontSize: 'clamp(14px, 4vw, 15px)', // 반응형 폰트
              boxShadow: '0 2px 8px rgba(255, 148, 178, 0.12)',
              opacity: isTransitioning ? 0.5 : 1,
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s, transform 0.2s',
              zIndex: 20,
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
            onTouchStart={(e) => {
              if (!isTransitioning) {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'scale(0.95)';
              }
            }}
            onTouchEnd={(e) => {
              if (!isTransitioning) {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            ← 이전 질문
          </button>
        )}
        <Title>질문 {currentQuestion + 1} / {questions.length}</Title>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
      </Header>

      <CardWrapper>
        <CloudCard>
          <QuestionText>{currentQ.text}</QuestionText>
          {currentQ.answers.map((answer, index) => (
            <AnswerButton
              key={index}
              onClick={() => handleAnswerClick(answer.score)}
              selected={selectedAnswer === answer.score}
              disabled={isTransitioning}
            >
              {answer.text}
            </AnswerButton>
          ))}
        </CloudCard>
      </CardWrapper>

    </MobileContainer>
  );
}

export default QuestionPage;

