
import React from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import { AvatarProvider } from './contexts/AvatarContext';
import AvatarCompanion from './components/AvatarCompanion';
import { GamificationProvider, useGamification } from './contexts/GamificationContext';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationContainer from './components/NotificationContainer';
import ConfettiEffect from './components/ConfettiEffect';

const AppContent: React.FC = () => {
    const { userProfile, isLoading } = useGamification();

    if (isLoading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <div style={{
            width: '5rem', 
            height: '5rem',
            borderRadius: '50%',
            border: '4px solid rgba(138, 43, 226, 0.2)',
            borderTopColor: 'var(--color-primary)',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
    }

    if (!userProfile) {
      return <Onboarding />;
    }

    return (
        <>
            <Header />
            <main style={{ flexGrow: 1, padding: '2rem 0' }}>
              <div className="container">
                <Dashboard />
              </div>
            </main>
            <AvatarCompanion />
        </>
    );
}


const App: React.FC = () => {
  return (
    <NotificationProvider>
      <GamificationProvider>
        <AvatarProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppContent />
            <Footer />
          </div>
          <NotificationContainer />
          <ConfettiEffect />
        </AvatarProvider>
      </GamificationProvider>
    </NotificationProvider>
  );
};

export default App;