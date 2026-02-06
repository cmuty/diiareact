import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import GradientBackground from './components/GradientBackground';
import TabBar from './components/TabBar';
import HomeView from './views/HomeView';
import DocumentsView from './views/DocumentsView';
import ServicesView from './views/ServicesView';
import MenuView from './views/MenuView';
import AuthView from './views/AuthView';
import SignatureView from './views/SignatureView';
import PinCodeView from './views/PinCodeView';
import InstallGuide from './components/InstallGuide';

function MainApp() {
  const [currentTab, setCurrentTab] = useState('documents');
  const { isAuthenticated, isLoading, hasSignature, hasPinCode, isPinVerified } = useAuth();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is running in standalone mode (home screen)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');

      setIsStandalone(isStandaloneMode);
      console.log('[App] Is Standalone:', isStandaloneMode);
    };

    checkStandalone();

    // Listen for changes
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkStandalone);
  }, []);

  // Debug logging
  console.log('[App] State:', { isAuthenticated, isLoading, hasSignature, hasPinCode, isPinVerified, isStandalone });

  if (!isStandalone) {
    return <InstallGuide />;
  }

  if (!isStandalone) {
    return <InstallGuide />;
  }

  if (isLoading) {
    return (
      <GradientBackground>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontSize: '24px'
        }}>
          Завантаження...
        </div>
      </GradientBackground>
    );
  }

  if (!isAuthenticated) {
    return (
      <GradientBackground>
        <AuthView />
      </GradientBackground>
    );
  }

  // Show signature view if authenticated but no signature
  if (!hasSignature) {
    return (
      <GradientBackground>
        <SignatureView />
      </GradientBackground>
    );
  }

  // Show PIN setup if authenticated, has signature, but no PIN
  // if (!hasPinCode) {
  //   return <PinCodeView mode="setup" />;
  // }

  // Show PIN entry if authenticated, has PIN, but not verified
  // if (!isPinVerified) {
  //   return <PinCodeView mode="entry" />;
  // }

  const renderView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView />;
      case 'documents':
        return <DocumentsView />;
      case 'services':
        return <ServicesView />;
      case 'menu':
        return <MenuView />;
      default:
        return <DocumentsView />;
    }
  };

  return (
    <GradientBackground>
      {renderView()}
      <TabBar currentTab={currentTab} onTabChange={setCurrentTab} />
    </GradientBackground>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
