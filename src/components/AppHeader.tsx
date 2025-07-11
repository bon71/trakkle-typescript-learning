import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  BarChart3,
  Crown,
  ChevronDown
} from 'lucide-react'
import { useI18n } from '../hooks/useI18n'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import ThemeSwitcher from './ThemeSwitcher'
import LanguageSwitcher from './LanguageSwitcher'
import { cn } from '../lib/utils'

interface UserType {
  id: string
  name: string
  email: string
  photoURL?: string
  isPremium: boolean
}

interface AppHeaderProps {
  user?: UserType | null
  loading?: boolean
  onLogin?: () => void
  onLogout?: () => void
  onOpenSettings?: () => void
}

export function AppHeader({ 
  user, 
  loading = false, 
  onLogin,
  onLogout,
  onOpenSettings
}: AppHeaderProps) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogout = () => {
    setShowUserMenu(false)
    setShowMobileMenu(false)
    onLogout?.()
  }

  const handleOpenSettings = () => {
    setShowUserMenu(false)
    setShowMobileMenu(false)
    onOpenSettings?.()
  }

  const handleDashboard = () => {
    setShowUserMenu(false)
    setShowMobileMenu(false)
    navigate('/progress')
  }

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div id="app-header-container" className="container max-w-7xl">
        <div id="app-header-content" className="flex items-center justify-between h-16">
          {/* Logo */}
          <div id="app-header-logo-container" className="flex items-center">
            <Link 
              to="/"
              className="flex items-center gap-2 text-xl font-semibold text-foreground hover:text-primary transition-colors"
            >
              <span className="text-2xl">💻</span>
              <span className="hidden sm:inline">TypeScript Learning</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div id="desktop-nav" className="hidden md:flex items-center gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
            
            {loading ? (
              <div id="loading-indicator-desktop" className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-border border-t-primary rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">
                  {t('common.loading')}
                </span>
              </div>
            ) : user ? (
              <div id="user-info-desktop" className="flex items-center gap-3">
                {/* User Info */}
                <div id="user-info-avatar-container" className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.name}
                      className="w-9 h-9 rounded-full border-2 border-border object-cover"
                    />
                  ) : (
                    <div id="user-avatar" className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {getUserInitials(user.name)}
                    </div>
                  )}
                  
                  <div id="user-name-desktop-container" className="hidden lg:block">
                    <div id="user-name-badge-container-desktop" className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {user.name}
                      </span>
                      {user.isPremium && (
                        <Badge variant="default" size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          <Crown className="w-3 h-3 mr-1" />
                          {t('common.premium')}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Menu */}
                <div id="user-menu-desktop" className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  
                  {showUserMenu && (
                    <div id="user-menu-dropdown" className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50">
                      <div id="user-menu-dropdown-content" className="py-1">
                        <button
                          onClick={handleDashboard}
                          className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center gap-2"
                        >
                          <BarChart3 className="w-4 h-4" />
                          {t('header.dashboard')}
                        </button>
                        <button
                          onClick={handleOpenSettings}
                          className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4" />
                          {t('common.settings')}
                        </button>
                        <hr className="my-1 border-border" />
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-accent flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          {t('common.logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div id="login-signup-buttons-desktop" className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogin}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  {t('common.login')}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={onLogin}
                  className="flex items-center gap-2"
                >
                  <span>✨</span>
                  {t('common.signup')}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div id="mobile-menu-button-container" className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div id="mobile-menu" className="md:hidden border-t border-border bg-card">
            <div id="mobile-menu-content" className="py-4 space-y-2">
              <div id="mobile-menu-switchers" className="flex items-center justify-between px-4 py-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
              
              {loading ? (
                <div id="loading-indicator-mobile" className="flex items-center justify-center gap-2 py-4">
                  <div className="w-5 h-5 border-2 border-border border-t-primary rounded-full animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    {t('common.loading')}
                  </span>
                </div>
              ) : user ? (
                <div id="user-info-mobile" className="space-y-2">
                  <div id="user-info-mobile-container" className="flex items-center gap-3 px-4 py-2">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-border object-cover"
                      />
                    ) : (
                      <div id="user-avatar-mobile" className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {getUserInitials(user.name)}
                      </div>
                    )}
                    <div id="user-name-email-mobile">
                      <div id="user-name-badge-container-mobile" className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {user.name}
                        </span>
                        {user.isPremium && (
                          <Badge variant="default" size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            <Crown className="w-3 h-3 mr-1" />
                            {t('common.premium')}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleDashboard}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    {t('header.dashboard')}
                  </button>
                  <button
                    onClick={handleOpenSettings}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    {t('common.settings')}
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-accent flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('common.logout')}
                  </button>
                </div>
              ) : (
                <div id="login-signup-buttons-mobile" className="space-y-2 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowMobileMenu(false)
                      onLogin?.()
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <User className="w-4 h-4" />
                    {t('common.login')}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      setShowMobileMenu(false)
                      onLogin?.()
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <span>✨</span>
                    {t('common.signup')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default AppHeader