import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import confetti from 'canvas-confetti';
import { MobileContainer } from '../components/common/MobileContainer';
import { QuoteText } from '../components/common/QuoteText';
import { getResultByScore } from '../data/results';
import { createShareText, createShareUrl, copyToClipboard, shareNative } from '../utils/share';

const StyledMobileContainer = styled(MobileContainer)`
  justify-content: flex-start;
  gap: 20px;
  
  @media (max-width: 480px) {
    gap: 18px;
  }
  
  @media (max-width: 375px) {
    gap: 16px;
  }
  
  @media (max-width: 360px) {
    gap: 14px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    gap: 12px;
  }
`;

const ResultCard = styled.div`
  background: #fff;
  width: 100%;
  padding: 40px 28px;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(255, 148, 178, 0.25);
  border: 2px solid #FFB6C1;
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  position: relative;
  z-index: 5;
  box-sizing: border-box;
  transition: box-shadow 0.2s, transform 0.2s;

  &:active {
    box-shadow: 0 4px 16px rgba(255, 148, 178, 0.18);
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 36px 22px;
  }
  
  @media (max-width: 375px) {
    padding: 32px 20px;
    border-radius: 24px;
  }
  
  @media (max-width: 360px) {
    padding: 28px 18px;
    border-radius: 20px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    padding: 20px 18px;
    border-radius: 20px;
  }
`;

const ResultTitle = styled.h2`
  font-size: 32px;
  font-size: clamp(24px, 8vw, 32px); /* 반응형 폰트 */
  color: #FF5E89;
  margin-bottom: 16px;
  margin-top: 0;
  text-shadow: 2px 2px 0px #FFFFFF;
  word-break: keep-all; /* 단어 단위 줄바꿈 */
  
  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 375px) {
    font-size: 24px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 360px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

const ResultEmoji = styled.div`
  font-size: 60px;
  margin-bottom: 16px;
  margin-top: 0;
  
  @media (max-width: 480px) {
    font-size: 55px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 375px) {
    font-size: 50px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 360px) {
    font-size: 45px;
    margin-bottom: 10px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 40px;
    margin-bottom: 8px;
  }
`;

const ResultText = styled.p`
  font-size: 20px;
  font-size: clamp(16px, 5vw, 20px); /* 반응형 폰트 */
  line-height: 1.7;
  color: #333;
  margin-bottom: 18px;
  margin-top: 0;
  white-space: pre-line;
  word-break: keep-all; /* 단어 단위 줄바꿈 */
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 16px;
    line-height: 1.65;
  }
  
  @media (max-width: 375px) {
    font-size: 17px;
    margin-bottom: 14px;
    line-height: 1.6;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    margin-bottom: 12px;
    line-height: 1.55;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 15px;
    margin-bottom: 10px;
    line-height: 1.5;
  }
`;

const ScoreText = styled.div`
  font-size: 18px;
  font-size: clamp(16px, 4.5vw, 18px); /* 반응형 폰트 */
  color: #7a6a6a; /* 더 진한 색으로 대비 개선 */
  margin-bottom: 0;
  margin-top: 0;
  word-break: keep-all;
  font-weight: 500; /* 가독성 향상 */
  letter-spacing: 0.01em; /* 자간 추가 */
  
  @media (max-width: 480px) {
    font-size: 17px;
  }
  
  @media (max-width: 375px) {
    font-size: 17px;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 15px;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 0;
  margin-bottom: 0;
  
  @media (max-width: 480px) {
    gap: 9px;
  }
  
  @media (max-width: 375px) {
    gap: 8px;
  }
  
  @media (max-width: 360px) {
    gap: 7px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    gap: 6px;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  min-height: 56px; /* 터치 영역 최소 크기 상향 */
  padding: 16px 18px;
  border: none;
  border-radius: 30px;
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(90deg, #FF9A9E 0%, #FECFEF 100%)' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.variant === 'primary' ? 'white' : '#FF5E89'};
  font-size: 18px;
  font-size: clamp(16px, 4.5vw, 18px); /* 반응형 폰트 */
  font-family: 'Jua', sans-serif;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  box-shadow: 0 10px 20px rgba(255, 117, 140, 0.4);
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  border: ${props => props.variant === 'secondary' ? '2px solid #FF5E89' : 'none'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  -webkit-tap-highlight-color: transparent; /* 터치 하이라이트 제거 */
  touch-action: manipulation; /* 더블탭 줌 방지 */

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(255, 117, 140, 0.6);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  @media (max-width: 480px) {
    font-size: 17px;
    padding: 14px 16px;
  }
  
  @media (max-width: 375px) {
    font-size: 16px;
    padding: 12px 14px;
  }
  
  @media (max-width: 360px) {
    font-size: 15px;
    padding: 11px 12px;
    min-height: 48px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 15px;
    padding: 10px 16px;
    min-height: 44px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 20px;
  color: #FF5E89;
  font-family: 'Jua', sans-serif;
`;


function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const score = parseInt(searchParams.get('score')) || 0;
  const [result, setResult] = useState(null);
  const resultCardRef = useRef(null);
  const [hasTriggeredEffects, setHasTriggeredEffects] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);

  useEffect(() => {
    // 점수에 따라 결과 결정
    const selectedResult = getResultByScore(score);
    setResult(selectedResult);

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
      link.download = `애매한감정_${result.title}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
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
      return; // 공유 성공
    }

    // 네이티브 공유가 실패하거나 지원되지 않는 경우 클립보드 복사
    const textToCopy = `${shareText}\n${shareUrl}`;
    const copied = await copyToClipboard(textToCopy);

    if (copied) {
      alert('링크가 클립보드에 복사되었습니다!');
    } else {
      alert('공유 기능을 사용할 수 없습니다. 링크를 수동으로 복사해주세요.');
    }
  };

  const handleRestart = () => {
    navigate('/');
  };

  if (!result) {
    return (
      <LoadingContainer>
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
        <ActionButton 
          variant="primary" 
          onClick={handleSaveImage}
          disabled={isSavingImage}
          aria-label="결과 이미지 저장"
        >
          {isSavingImage ? '저장 중...' : '결과 이미지 저장 📸'}
        </ActionButton>
        <ActionButton 
          variant="secondary" 
          onClick={handleShare}
          aria-label="친구에게 공유하기"
        >
          친구에게 공유하기 💌
        </ActionButton>
        <ActionButton 
          variant="secondary" 
          onClick={handleRestart}
          aria-label="다시 테스트하기"
        >
          다시 테스트하기 🔄
        </ActionButton>
      </ButtonGroup>
    </StyledMobileContainer>
  );
}

export default ResultPage;

