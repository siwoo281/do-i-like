import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MobileContainer } from '../components/common/MobileContainer';
import { CloudCard } from '../components/common/CloudCard';
import { NavButton } from '../components/common/NavButton';
import { questions } from '../data/questions';

const Header = styled.header`
  text-align: center;
  z-index: 10;
  width: 100%;
  margin-bottom: 20px;
  padding-top: 48px; /* 상단 버튼 공간 확보 */
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
    padding-top: 44px;
  }
  
  @media (max-width: 375px) {
    margin-bottom: 14px;
    padding-top: 40px;
  }
  
  @media (max-width: 360px) {
    margin-bottom: 12px;
    padding-top: 38px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 10px;
    padding-top: 36px;
  }
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
  margin-top: 12px;
  
  @media (max-width: 480px) {
    margin-top: 10px;
    height: 6px;
  }
  
  @media (max-width: 375px) {
    margin-top: 8px;
    height: 6px;
  }
  
  @media (max-width: 360px) {
    margin-top: 6px;
    height: 5px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    margin-top: 6px;
    height: 5px;
  }
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
  align-items: flex-start;
  flex: 1;
  padding-bottom: 16px;
  
  @media (max-width: 480px) {
    padding-bottom: 14px;
  }
  
  @media (max-width: 375px) {
    padding-bottom: 12px;
  }
  
  @media (max-width: 360px) {
    padding-bottom: 10px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    padding-bottom: 8px;
    align-items: center;
  }
`;


const QuestionText = styled.p`
  font-size: 24px;
  font-size: clamp(18px, 6vw, 24px); /* 반응형 폰트 */
  line-height: 1.5;
  color: #333;
  margin-bottom: 24px;
  margin-top: 0;
  word-break: keep-all; /* 단어 단위 줄바꿈 */
  white-space: pre-line; /* 개행 문자 적용 */
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 20px;
    line-height: 1.45;
  }
  
  @media (max-width: 375px) {
    font-size: 18px;
    margin-bottom: 16px;
    line-height: 1.4;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    margin-bottom: 14px;
    line-height: 1.35;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 1.3;
  }
`;

const AnswerButton = styled.button`
  width: 100%;
  min-height: 56px; /* 터치 영역 최소 크기 상향 */
  padding: 16px 18px;
  margin-bottom: 14px;
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
    padding: 14px 16px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 375px) {
    font-size: 16px;
    padding: 12px 14px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 360px) {
    font-size: 15px;
    padding: 11px 12px;
    margin-bottom: 8px;
    min-height: 48px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 15px;
    padding: 10px 16px;
    min-height: 44px;
    margin-bottom: 6px;
  }
`;


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
          <NavButton onClick={() => navigate('/')}>
            메인으로
          </NavButton>
        ) : (
          <NavButton onClick={handlePrev} disabled={isTransitioning}>
            ← 이전 질문
          </NavButton>
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

