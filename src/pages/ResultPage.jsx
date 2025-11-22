import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import confetti from 'canvas-confetti';

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
  justify-content: flex-start;
  gap: 24px;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden; /* 가로 스크롤 원천 차단 */
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */
  box-sizing: border-box; /* 패딩이 높이에 영향을 주지 않도록 설정 */
  background-color: #FFF0F5; /* 배경색 통일 */
  
  @media (max-width: 480px) {
    padding: 30px 20px;
    gap: 22px;
  }
  
  @media (max-width: 375px) {
    padding: 24px 20px;
    gap: 20px;
  }
  
  @media (max-width: 360px) {
    padding: 20px 16px;
    gap: 18px;
  }
  
  /* 가로 모드 대응 */
  @media (orientation: landscape) and (max-height: 500px) {
    padding: 16px 24px;
    gap: 16px;
  }
`;

const ResultCard = styled.div`
  background: #fff;
  width: 100%;
  padding: 50px 30px;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(255, 148, 178, 0.25);
  border: 2px solid #FFB6C1;
  margin-top: 20px;
  margin-bottom: 24px;
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
    padding: 45px 28px;
  }
  
  @media (max-width: 375px) {
    padding: 40px 24px;
    border-radius: 24px;
    margin-top: 16px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 360px) {
    padding: 32px 20px;
    border-radius: 20px;
    margin-top: 12px;
    margin-bottom: 16px;
  }
`;

const ResultTitle = styled.h2`
  font-size: 32px;
  font-size: clamp(24px, 8vw, 32px); /* 반응형 폰트 */
  color: #FF5E89;
  margin-bottom: 20px;
  text-shadow: 2px 2px 0px #FFFFFF;
  word-break: keep-all; /* 단어 단위 줄바꿈 */
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
  
  @media (max-width: 375px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    font-size: 22px;
    margin-bottom: 12px;
  }
`;

const ResultEmoji = styled.div`
  font-size: 60px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    font-size: 55px;
  }
  
  @media (max-width: 375px) {
    font-size: 50px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    font-size: 45px;
    margin-bottom: 12px;
  }
`;

const ResultText = styled.p`
  font-size: 20px;
  font-size: clamp(16px, 5vw, 20px); /* 반응형 폰트 */
  line-height: 1.7;
  color: #333;
  margin-bottom: 30px;
  white-space: pre-line;
  word-break: keep-all; /* 단어 단위 줄바꿈 */
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 26px;
  }
  
  @media (max-width: 375px) {
    font-size: 17px;
    margin-bottom: 24px;
    line-height: 1.65;
    padding: 0;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.6;
  }
`;

const ScoreText = styled.div`
  font-size: 18px;
  font-size: clamp(16px, 4.5vw, 18px); /* 반응형 폰트 */
  color: #887878;
  margin-bottom: 20px;
  word-break: keep-all;
  
  @media (max-width: 480px) {
    font-size: 17px;
  }
  
  @media (max-width: 375px) {
    font-size: 17px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    margin-bottom: 18px;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    gap: 11px;
  }
  
  @media (max-width: 375px) {
    gap: 10px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    gap: 8px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  min-height: 56px; /* 터치 영역 최소 크기 상향 */
  padding: 18px;
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
    padding: 16px;
  }
  
  @media (max-width: 375px) {
    font-size: 16px;
    padding: 14px;
  }
  
  @media (max-width: 360px) {
    font-size: 15px;
    padding: 12px;
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

const results = {
  innocent: {
    emoji: '🧊',
    title: '별로',
    text: '아직은 그 사람에게\n특별한 감정이 없는 것 같아요.\n\n지금은 친구로서의 마음이\n더 큰 상태예요.\n\n마음은 언제든 변할 수 있으니\n조급해하지 말고\n자연스럽게 지켜보세요.\n',
    quote: '진짜 인연은 언젠가 반드시 만난다.',
    minScore: 0,
    maxScore: 9
  },
  suspended: {
    emoji: '🤔',
    title: '애매함',
    text: '요즘 그 사람을\n자주 떠올리고 있네요.\n\n아직은 확신할 수 없지만\n평소보다 더 신경 쓰이는 건 사실!\n\n이 감정이 어떻게 자랄지\n조금 더 솔직하게\n내 마음을 들여다보세요.\n',
    quote: '모든 시작은 작은 관심에서 비롯된다.',
    minScore: 10,
    maxScore: 19
  },
  life: {
    emoji: '💘',
    title: '확실',
    text: '이미 마음이\n많이 기울어 있는 상태예요!\n\n그 사람을 생각하면 설레고\n작은 행동에도 의미를 두게 되죠.\n\n이제 내 감정을 인정하고\n조금 더 용기 내어\n다가가 보는 건 어떨까요?\n',
    quote: '용기는 사랑을 현실로 만든다.',
    minScore: 20,
    maxScore: 30
  }
};

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
    let selectedResult;
    if (score >= results.life.minScore) {
      selectedResult = results.life;
    } else if (score >= results.suspended.minScore) {
      selectedResult = results.suspended;
    } else {
      selectedResult = results.innocent;
    }
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
          return clearInterval(interval);
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
    }
  }, [score, hasTriggeredEffects]);

  const handleSaveImage = async () => {
    if (!resultCardRef.current || isSavingImage) return;

    setIsSavingImage(true);
    try {
      // 동적 import로 성능 최적화
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: null,
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = `애매한감정_${result.title}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      alert('이미지 저장에 실패했습니다.');
    } finally {
      setIsSavingImage(false);
    }
  };

  const handleShare = async () => {
    const shareText = `애매한 감정, 좋아하는 걸까? 테스트 결과: ${result.title}!\n점수: ${score}점\n\n${result.text}`;
    // 메인 페이지만 공유 (테스트를 처음부터 할 수 있도록)
    const shareUrl = window.location.origin + (window.location.pathname || '') + '#/';

    if (navigator.share) {
      try {
        await navigator.share({
          title: '애매한 감정, 좋아하는 걸까?',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('공유 실패:', error);
        }
      }
    } else {
      // 클립보드 복사로 대체
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (error) {
        console.error('클립보드 복사 실패:', error);
        alert('공유 기능을 사용할 수 없습니다.');
      }
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
    <MobileContainer>
      <ResultCard ref={resultCardRef}>
        <ResultEmoji>{result.emoji}</ResultEmoji>
        <ResultTitle>{result.title}</ResultTitle>
        <ResultText>{result.text}</ResultText>
        {result.quote && (
          <div style={{
            fontSize: '15px',
            color: '#b48a9f',
            fontStyle: 'italic',
            margin: '16px 0 8px 0',
            lineHeight: 1.5,
          }}>
            “{result.quote}”
          </div>
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
    </MobileContainer>
  );
}

export default ResultPage;

