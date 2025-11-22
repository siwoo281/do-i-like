#!/bin/bash
# 배포를 위한 Git 명령어들

cd /Users/siu/Documents/파이썬/do-i-like

echo "📦 변경사항 확인 중..."
git status

echo ""
echo "📝 변경사항 스테이징 중..."
git add -A

echo ""
echo "💾 커밋 중..."
git commit -m "feat: UI 가독성 개선 및 모바일 최적화 완료

- 텍스트 최소 크기 증가 (12px -> 13px)
- 색상 대비 개선으로 가독성 향상
- 줄 간격 및 자간 최적화
- 반응형 폰트 추가
- 모든 페이지 모바일 레이아웃 개선"

echo ""
echo "🚀 GitHub에 푸시 중..."
git push origin main

echo ""
echo "✅ 푸시 완료! 이제 Vercel에서 배포하세요."

