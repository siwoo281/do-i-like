# Vercel 배포 가이드

## 📋 사전 준비
- ✅ Git 저장소 초기화 완료
- ✅ 첫 커밋 완료

## 🚀 배포 단계

### 1. GitHub 저장소 생성
1. https://github.com 접속
2. 우측 상단 "+" → "New repository"
3. 저장소 이름: `do-i-like`
4. **Public** 선택 (중요!)
5. "Create repository" 클릭

### 2. GitHub에 코드 푸시

GitHub에서 저장소를 만든 후, 아래 명령어를 실행하세요:

```bash
cd /Users/siu/Documents/파이썬/do-i-like
git remote add origin https://github.com/YOUR_USERNAME/do-i-like.git
git branch -M main
git push -u origin main
```

**YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경하세요!**

### 3. Vercel 배포

#### 방법 A: 웹사이트에서 배포 (추천)

1. https://vercel.com 접속
2. "Sign Up" → GitHub 계정으로 로그인
3. "Add New..." → "Project" 클릭
4. "Import Git Repository"에서 `do-i-like` 선택
5. 프로젝트 설정:
   - **Project Name**: `do-i-like` (자동으로 설정됨)
   - **Framework Preset**: Vite (자동 감지됨)
   - **Root Directory**: `./` (그대로)
   - **Build Command**: `npm run build` (자동 감지됨)
   - **Output Directory**: `dist` (자동 감지됨)
6. "Deploy" 클릭

#### 방법 B: Vercel CLI로 배포

```bash
npm install -g vercel
cd /Users/siu/Documents/파이썬/do-i-like
vercel
```

처음 실행 시:
- "Set up and deploy" 선택
- GitHub 계정 연동
- 프로젝트 이름: `do-i-like`

### 4. 배포 완료! 🎉

배포 후 URL:
- **프로덕션 URL**: `https://do-i-like.vercel.app`
- 이후 코드를 푸시하면 자동으로 재배포됩니다!

## 📝 참고사항

- Vercel은 완전 무료입니다
- GitHub에 코드를 푸시하면 자동으로 재배포됩니다
- 커스텀 도메인도 무료로 설정 가능합니다
- 프로젝트 설정은 `vercel.json`에 저장되어 있습니다

## 🔧 문제 해결

### 배포가 안 될 때
1. GitHub 저장소가 **Public**인지 확인
2. `package.json`의 `name`이 `do-i-like`인지 확인
3. `vercel.json` 파일이 있는지 확인

### 도메인 변경
Vercel 대시보드 → Project Settings → Domains에서 변경 가능

