import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import { useI18n } from './hooks/useI18n';
import { cn } from './lib/utils';

// Mock user data - replace with actual auth logic
const mockUser = {
  id: '1',
  name: 'ユーザー太郎',
  email: 'user@example.com',
  photoURL: undefined,
  isPremium: true
};

function App() {
  const { t } = useI18n();
  const [user, setUser] = useState<typeof mockUser | null>(mockUser);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <Router>
      <div id="app-container" className={cn(
        'min-h-screen bg-background text-foreground',
        'flex flex-col font-sans antialiased'
      )}>
        <AppHeader
          user={user}
          loading={loading}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onOpenSettings={handleOpenSettings}
        />
        
        <main className="flex-1 bg-background">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/learn" element={<LearnPage user={user} />} />
            <Route path="/progress" element={<ProgressPage user={user} />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        {/* Settings Modal */}
        {showSettings && (
          <div id="settings-modal" className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div id="settings-modal-content" className="bg-card rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
              <div id="settings-modal-header" className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold">{t('common.accountSettings')}</h2>
                <button
                  onClick={handleCloseSettings}
                  className="w-8 h-8 rounded-md bg-secondary hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  ×
                </button>
              </div>
              <div id="settings-modal-body" className="p-6 overflow-y-auto max-h-[70vh]">
                <SettingsPage />
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
