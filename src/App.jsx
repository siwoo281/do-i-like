import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/common/ErrorBoundary';
import { GlobalStyle } from './styles/GlobalStyle';

// 코드 스플리팅을 위한 lazy loading
const LandingPage = lazy(() => import('./pages/LandingPage'));
const QuestionPage = lazy(() => import('./pages/QuestionPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));

// 로딩 컴포넌트
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: "'Jua', sans-serif",
    color: '#FF5E89'
  }}>
    <div>로딩 중...</div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                >
                  <LandingPage />
                </motion.div>
              }
            />
            <Route
              path="/question"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                >
                  <QuestionPage />
                </motion.div>
              }
            />
            <Route
              path="/result"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                >
                  <ResultPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <AnimatedRoutes />
      <Analytics />
    </HashRouter>
  );
}

export default App;
