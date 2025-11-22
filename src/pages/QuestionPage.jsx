import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MobileContainer } from '../components/common/MobileContainer';
import { CloudCard } from '../components/common/CloudCard';
import { NavButton } from '../components/common/NavButton';
import { Button } from '../components/common/Button';
import { questions } from '../data/questions';
import { colors, gradients, fontSize, spacing, borderRadius, shadows, animation } from '../styles/theme';

const Header = styled.header`
  text-align: center;
  z-index: 10;
  width: 100%;
  margin-bottom: ${spacing.lg};
  padding-top: 48px;
  
  @media (max-width: 480px) {
    margin-bottom: ${spacing.md};
    padding-top: 44px;
  }
  
  @media (max-width: 375px) {
    margin-bottom: 14px;
    padding-top: 40px;
  }
  
  @media (max-width: 360px) {
    margin-bottom: ${spacing.sm};
    padding-top: 38px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 10px;
    padding-top: 36px;
  }
`;

const Title = styled.h1`
  font-size: ${fontSize.xxxl};
  font-size: clamp(20px, 7vw, ${fontSize.xxxl});
  line-height: 1.45;
  color: ${colors.primary};
  margin-bottom: 10px;
  text-shadow: 2px 2px 0px ${colors.textWhite};
  word-break: keep-all;
  letter-spacing: -0.01em;
  
  @media (max-width: 480px) {
    font-size: ${fontSize.xxl};
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.xl};
    line-height: 1.35;
  }
  
  @media (max-width: 360px) {
    font-size: 19px;
    line-height: 1.3;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  overflow: hidden;
  margin-top: ${spacing.sm};
  
  @media (max-width: 480px) {
    margin-top: 10px;
    height: 6px;
  }
  
  @media (max-width: 375px) {
    margin-top: ${spacing.xs};
    height: 6px;
  }
  
  @media (max-width: 360px) {
    margin-top: 6px;
    height: 5px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    margin-top: 6px;
    height: 5px;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${gradients.progress};
  border-radius: 10px;
  transition: width ${animation.slow} cubic-bezier(0.4, 0, 0.2, 1);
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
    background: ${gradients.shimmer};
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
  padding-bottom: ${spacing.md};
  
  @media (max-width: 480px) {
    padding-bottom: 14px;
  }
  
  @media (max-width: 375px) {
    padding-bottom: ${spacing.sm};
  }
  
  @media (max-width: 360px) {
    padding-bottom: 10px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    padding-bottom: ${spacing.xs};
    align-items: center;
  }
`;


const QuestionText = styled.p`
  font-size: ${fontSize.xxl};
  font-size: clamp(18px, 6vw, ${fontSize.xxl});
  line-height: 1.6;
  color: ${colors.textPrimary};
  margin-bottom: 26px;
  margin-top: 0;
  word-break: keep-all;
  white-space: pre-line;
  
  @media (max-width: 480px) {
    font-size: ${fontSize.xl};
    margin-bottom: 22px;
    line-height: 1.55;
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.lg};
    margin-bottom: ${spacing.lg};
    line-height: 1.5;
  }
  
  @media (max-width: 360px) {
    font-size: 17px;
    margin-bottom: ${spacing.md};
    line-height: 1.45;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: ${fontSize.md};
    margin-bottom: ${spacing.sm};
    line-height: 1.4;
  }
`;


function QuestionPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]); // 이전 답변 기록

  const handleAnswerClick = (answerScore, answerIndex) => {
    if (isTransitioning) return; // 중복 클릭 방지

    setSelectedAnswer(answerScore);
    setIsTransitioning(true);

    setTimeout(() => {
      const newScore = score + answerScore;
      const newHistory = [...answerHistory, { questionId: currentQuestion, answerIndex: answerIndex, score: answerScore }];
      setScore(newScore);
      setAnswerHistory(newHistory);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsTransitioning(false);
      } else {
        // 답변 기록을 sessionStorage에 저장
        sessionStorage.setItem('answerHistory', JSON.stringify(newHistory));
        navigate(`/result?score=${newScore}`);
      }
    }, 500);
  };

  // 이전 질문으로 이동
  const handlePrev = () => {
    if (currentQuestion === 0 || isTransitioning) return;
    const prevAnswer = answerHistory[answerHistory.length - 1];
    if (!prevAnswer) return;
    const prevQuestionIndex = currentQuestion - 1;
    const prevQuestion = questions[prevQuestionIndex];
    
    // 유효성 검증
    if (!prevQuestion || !prevQuestion.answers) {
      console.error('이전 질문을 불러올 수 없습니다.');
      return;
    }
    
    const answerIndex = prevAnswer.answerIndex;
    if (answerIndex < 0 || answerIndex >= prevQuestion.answers.length) {
      console.error('답변 인덱스가 유효하지 않습니다.');
      return;
    }
    
    const prevSelectedScore = prevQuestion.answers[answerIndex]?.score;
    
    setCurrentQuestion(prevQuestionIndex);
    setScore(score - prevAnswer.score);
    setAnswerHistory(answerHistory.slice(0, -1));
    setSelectedAnswer(prevSelectedScore || null);
  };

  // 질문 변경 시 스크롤 위치 초기화
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  // 질문이 없을 경우 에러 처리
  if (!currentQ || !currentQ.answers || currentQ.answers.length === 0) {
    return (
      <MobileContainer>
        <CloudCard>
          <QuestionText>질문을 불러올 수 없습니다.</QuestionText>
          <Button onClick={() => navigate('/')}>
            메인으로 돌아가기
          </Button>
        </CloudCard>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <Header style={{ position: 'relative', width: '100%' }}>
        {/* 좌측 상단: 질문 1에서는 메인으로, 2번 이후부터는 이전 질문 */}
        {currentQuestion === 0 ? (
          <NavButton 
            onClick={() => navigate('/')}
            aria-label="메인 페이지로 돌아가기"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/');
              }
            }}
          >
            메인으로
          </NavButton>
        ) : (
          <NavButton 
            onClick={handlePrev} 
            disabled={isTransitioning}
            aria-label="이전 질문으로 돌아가기"
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !isTransitioning) {
                e.preventDefault();
                handlePrev();
              }
            }}
          >
            ← 이전 질문
          </NavButton>
        )}
        <Title>질문 {currentQuestion + 1} / {questions.length}</Title>
        <ProgressBar 
          role="progressbar"
          aria-valuenow={currentQuestion + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-label={`질문 진행률: ${currentQuestion + 1}번째 질문`}
        >
          <ProgressFill progress={progress} />
        </ProgressBar>
      </Header>

      <CardWrapper>
        <CloudCard>
          <QuestionText 
            role="heading"
            aria-level="2"
            id={`question-${currentQuestion + 1}`}
          >
            {currentQ.text}
          </QuestionText>
          <div role="group" aria-labelledby={`question-${currentQuestion + 1}`}>
          {currentQ.answers.map((answer, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerClick(answer.score, index)}
              selected={selectedAnswer === answer.score}
              disabled={isTransitioning}
              aria-label={`답변 ${index + 1}: ${answer.text}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!isTransitioning) {
                    handleAnswerClick(answer.score, index);
                  }
                }
              }}
            >
              {answer.text}
            </Button>
          ))}
          </div>
        </CloudCard>
      </CardWrapper>

    </MobileContainer>
  );
}

export default QuestionPage;

