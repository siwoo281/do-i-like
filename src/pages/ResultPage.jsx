import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import confetti from 'canvas-confetti';
import { MobileContainer } from '../components/common/MobileContainer';
import { QuoteText } from '../components/common/QuoteText';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';
import { getResultByScore } from '../data/results';
import { questions } from '../data/questions';
import { createShareText, createShareUrl, copyToClipboard, shareNative } from '../utils/share';
import { colors, shadows, borderRadius, spacing, fontSize, animation } from '../styles/theme';

const StyledMobileContainer = styled(MobileContainer)`
  justify-content: flex-start;
  gap: ${spacing.xl};
  padding-top: 30px;
  
  @media (max-width: 480px) {
    gap: 22px;
    padding-top: 26px;
  }
  
  @media (max-width: 375px) {
    gap: ${spacing.lg};
    padding-top: 22px;
  }
  
  @media (max-width: 360px) {
    gap: 18px;
    padding-top: ${spacing.lg};
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    gap: ${spacing.md};
    padding-top: ${spacing.md};
  }
`;

const ResultCard = styled.div`
  background: ${colors.cardBackground};
  width: 100%;
  padding: 40px ${spacing.xxxl};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.lg};
  border: 2px solid ${colors.secondary};
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  position: relative;
  z-index: 5;
  box-sizing: border-box;
  transition: box-shadow ${animation.fast}, transform ${animation.fast};

  &:active {
    box-shadow: ${shadows.active};
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 36px ${spacing.xl};
  }
  
  @media (max-width: 375px) {
    padding: ${spacing.xxl} 22px;
    border-radius: ${borderRadius.md};
  }
  
  @media (max-width: 360px) {
    padding: ${spacing.xxxl} ${spacing.lg};
    border-radius: ${borderRadius.md};
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    padding: ${spacing.xl} ${spacing.lg};
    border-radius: ${borderRadius.md};
  }
`;

const ResultTitle = styled.h2`
  font-size: ${fontSize.huge};
  font-size: clamp(24px, 8vw, ${fontSize.huge});
  color: ${colors.primary};
  margin-bottom: ${spacing.lg};
  margin-top: 0;
  text-shadow: 2px 2px 0px ${colors.textWhite};
  word-break: keep-all;
  
  @media (max-width: 480px) {
    font-size: ${fontSize.xxxl};
    margin-bottom: 18px;
  }
  
  @media (max-width: 375px) {
    font-size: ${fontSize.xxl};
    margin-bottom: ${spacing.md};
  }
  
  @media (max-width: 360px) {
    font-size: 22px;
    margin-bottom: 14px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: ${fontSize.xl};
    margin-bottom: ${spacing.sm};
  }
`;

const ResultEmoji = styled.div`
  font-size: 64px;
  margin-bottom: ${spacing.md};
  margin-top: 0;
  
  @media (max-width: 480px) {
    font-size: 60px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 375px) {
    font-size: 56px;
    margin-bottom: ${spacing.sm};
  }
  
  @media (max-width: 360px) {
    font-size: 52px;
    margin-bottom: 10px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 48px;
    margin-bottom: 10px;
  }
`;

const ResultText = styled.p`
  font-size: ${fontSize.xl};
  font-size: clamp(${fontSize.md}, 5vw, ${fontSize.xl});
  line-height: 1.8;
  color: ${colors.textPrimary};
  margin-bottom: 18px;
  margin-top: 0;
  white-space: pre-line;
  word-break: keep-all;
  
  @media (max-width: 480px) {
    font-size: ${fontSize.lg};
    margin-bottom: ${spacing.md};
    line-height: 1.75;
  }
  
  @media (max-width: 375px) {
    font-size: 17px;
    margin-bottom: 14px;
    line-height: 1.7;
  }
  
  @media (max-width: 360px) {
    font-size: ${fontSize.md};
    margin-bottom: ${spacing.sm};
    line-height: 1.65;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 15px;
    margin-bottom: 10px;
    line-height: 1.6;
  }
`;

const ScoreText = styled.div`
  font-size: ${fontSize.lg};
  font-size: clamp(${fontSize.md}, 4.5vw, ${fontSize.lg});
  color: ${colors.textSecondary};
  margin-bottom: 0;
  margin-top: ${spacing.sm};
  word-break: keep-all;
  font-weight: 500;
  letter-spacing: 0.01em;
  
  @media (max-width: 480px) {
    font-size: 17px;
    margin-top: 10px;
  }
  
  @media (max-width: 375px) {
    font-size: 17px;
    margin-top: ${spacing.xs};
  }
  
  @media (max-width: 360px) {
    font-size: ${fontSize.md};
    margin-top: ${spacing.xs};
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 15px;
    margin-top: 6px;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-top: 0;
  margin-bottom: 0;
  
  @media (max-width: 480px) {
    gap: 11px;
  }
  
  @media (max-width: 375px) {
    gap: 10px;
  }
  
  @media (max-width: 360px) {
    gap: 9px;
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    gap: ${spacing.xs};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: ${spacing.md};
  font-size: ${fontSize.xl};
  color: ${colors.primary};
  font-family: 'Jua', sans-serif;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${colors.secondary};
  border-top-color: ${colors.primary};
  border-radius: 50%;
  animation: spin ${animation.slow} linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    border-width: 3px;
  }
  
  @media (max-width: 375px) {
    width: 32px;
    height: 32px;
  }
`;

const AnswerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${spacing.lg};
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity ${animation.normal}, visibility ${animation.normal};
`;

const AnswerModalContent = styled.div`
  background: ${colors.cardBackground};
  border-radius: ${borderRadius.xl};
  padding: ${spacing.xl};
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${shadows.xxl};
  position: relative;
`;

const AnswerModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};
`;

const AnswerModalTitle = styled.h3`
  font-size: ${fontSize.xxl};
  color: ${colors.primary};
  margin: 0;
  font-family: 'Jua', sans-serif;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${fontSize.xxl};
  cursor: pointer;
  color: ${colors.textSecondary};
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${colors.primary};
  }
`;

const AnswerItem = styled.div`
  margin-bottom: ${spacing.lg};
  padding-bottom: ${spacing.lg};
  border-bottom: 1px solid ${colors.secondary};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const AnswerQuestion = styled.div`
  font-size: ${fontSize.md};
  color: ${colors.textPrimary};
  margin-bottom: ${spacing.sm};
  font-weight: 500;
  word-break: keep-all;
  line-height: 1.6;
`;

const AnswerText = styled.div`
  font-size: ${fontSize.sm};
  color: ${colors.textSecondary};
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.secondaryLight};
  border-radius: ${borderRadius.sm};
  word-break: keep-all;
  line-height: 1.5;
`;


function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // 점수 범위 검증 (0-36)
  const rawScore = parseInt(searchParams.get('score')) || 0;
  const score = Math.max(0, Math.min(36, isNaN(rawScore) ? 0 : rawScore));
  const [result, setResult] = useState(null);
  const resultCardRef = useRef(null);
  const [hasTriggeredEffects, setHasTriggeredEffects] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });

  // 페이지 진입 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCloseModal = () => {
    setShowAnswerModal(false);
  };

  // 모달 ESC 키 지원
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showAnswerModal) {
        handleCloseModal();
      }
    };
    
    if (showAnswerModal) {
      document.addEventListener('keydown', handleEscape);
      // 모달 열릴 때 body 스크롤 잠금
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [showAnswerModal]);

  useEffect(() => {
    // 점수에 따라 결과 결정
    const selectedResult = getResultByScore(score);
    setResult(selectedResult);
    
    // 답변 기록 불러오기
    const savedHistory = sessionStorage.getItem('answerHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        // 배열인지 확인
        if (Array.isArray(parsed)) {
          setAnswerHistory(parsed);
        } else {
          setAnswerHistory([]);
        }
      } catch (e) {
        console.error('답변 기록 불러오기 실패:', e);
        setAnswerHistory([]);
      }
    } else {
      setAnswerHistory([]);
    }

    // 효과는 한 번만 실행
    if (!hasTriggeredEffects) {
      setHasTriggeredEffects(true);
      
      // 폭죽 효과
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      // 진동 효과 (모바일)
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }

      // cleanup 함수로 interval 정리
      return () => {
        clearInterval(interval);
      };
    }
  }, [score, hasTriggeredEffects]);

  const showToast = (message) => {
    setToast({ show: true, message });
  };

  const hideToast = () => {
    setToast({ show: false, message: '' });
  };

  const handleSaveImage = async () => {
    if (!resultCardRef.current || isSavingImage || !result) return;

    setIsSavingImage(true);
    try {
      // 동적 import로 성능 최적화
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const link = document.createElement('a');
      // 파일명 정제 (특수문자 제거)
      const sanitizedTitle = result.title.replace(/[^a-zA-Z0-9가-힣]/g, '_');
      link.download = `애매한감정_${sanitizedTitle}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('이미지가 저장되었습니다! 📸');
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      showToast('이미지 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSavingImage(false);
    }
  };

  const handleShare = async () => {
    if (!result) return;

    const shareText = createShareText(result, score);
    const shareUrl = createShareUrl();

    // 네이티브 공유 API 시도
    const shared = await shareNative({
      title: '애매한 감정, 좋아하는 걸까?',
      text: shareText,
      url: shareUrl
    });

    if (shared) {
      showToast('공유되었습니다! 💌');
      return; // 공유 성공
    }

    // 네이티브 공유가 실패하거나 지원되지 않는 경우 클립보드 복사
    const textToCopy = `${shareText}\n${shareUrl}`;
    const copied = await copyToClipboard(textToCopy);

    if (copied) {
      showToast('링크가 클립보드에 복사되었습니다! 💌');
    } else {
      showToast('공유 기능을 사용할 수 없습니다. 링크를 수동으로 복사해주세요.');
    }
  };

  const handleRestart = () => {
    sessionStorage.removeItem('answerHistory');
    navigate('/');
  };

  const handleShowAnswers = () => {
    setShowAnswerModal(true);
  };

  if (!result) {
    return (
      <LoadingContainer>
        <Spinner />
        <div>로딩 중...</div>
      </LoadingContainer>
    );
  }

  return (
    <StyledMobileContainer>
      <ResultCard ref={resultCardRef}>
        <ResultEmoji>{result.emoji}</ResultEmoji>
        <ResultTitle>{result.title}</ResultTitle>
        <ResultText>{result.text}</ResultText>
        {result.quote && (
          <QuoteText>
            "{result.quote}"
          </QuoteText>
        )}
        <ScoreText>내 생각 점수: {score}점</ScoreText>
      </ResultCard>

      <ButtonGroup>
        <Button 
          variant="primary" 
          onClick={handleSaveImage}
          disabled={isSavingImage}
          aria-label="결과 이미지 저장"
        >
          {isSavingImage ? '저장 중...' : '결과 이미지 저장 📸'}
        </Button>
        {answerHistory.length > 0 && (
          <Button 
            variant="secondary" 
            onClick={handleShowAnswers}
            aria-label="내 답변 보기"
          >
            내 답변 보기 📝
          </Button>
        )}
        <Button 
          variant="secondary" 
          onClick={handleShare}
          aria-label="친구에게 공유하기"
        >
          친구에게 공유하기 💌
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleRestart}
          aria-label="다시 테스트하기"
        >
          다시 테스트하기 🔄
        </Button>
      </ButtonGroup>

      <AnswerModal show={showAnswerModal} onClick={handleCloseModal}>
        <AnswerModalContent onClick={(e) => e.stopPropagation()}>
          <AnswerModalHeader>
            <AnswerModalTitle>내 답변</AnswerModalTitle>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
          </AnswerModalHeader>
          {answerHistory.map((answer, index) => {
            const question = questions[answer.questionId];
            const selectedAnswer = question?.answers[answer.answerIndex];
            return (
              <AnswerItem key={index}>
                <AnswerQuestion>
                  질문 {answer.questionId + 1}. {question?.text.replace(/\n/g, ' ')}
                </AnswerQuestion>
                <AnswerText>
                  {selectedAnswer?.text || '답변 없음'}
                </AnswerText>
              </AnswerItem>
            );
          })}
        </AnswerModalContent>
      </AnswerModal>

      <Toast 
        message={toast.message} 
        show={toast.show} 
        onClose={hideToast}
      />
    </StyledMobileContainer>
  );
}

export default ResultPage;

