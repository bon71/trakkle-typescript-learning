import React from 'react'
import { useI18n } from '../hooks/useI18n'
import { useTheme } from '../hooks/useTheme'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Sun, Moon, Monitor, Languages, User, Crown } from 'lucide-react'

export function SettingsPage() {
  const { t, language, toggleLanguage } = useI18n()
  const { theme, toggleTheme } = useTheme()

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      case 'system':
        return <Monitor className="w-4 h-4" />
      default:
        return <Sun className="w-4 h-4" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return t('theme.light')
      case 'dark':
        return t('theme.dark')
      case 'system':
        return t('theme.system')
      default:
        return t('theme.light')
    }
  }

  return (
    <div id="settings-page-container" className="space-y-6">
      <div id="settings-page-header">
        <h1 className="text-2xl font-bold mb-2">{t('common.settings')}</h1>
        <p className="text-muted-foreground">
          アプリケーションの設定を変更できます
        </p>
      </div>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            外観
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div id="appearance-theme-setting" className="flex items-center justify-between">
            <div id="appearance-theme-text">
              <p className="font-medium">テーマ</p>
              <p className="text-sm text-muted-foreground">
                アプリケーションの外観を変更します
              </p>
            </div>
            <Button
              variant="outline"
              onClick={toggleTheme}
              className="flex items-center gap-2"
            >
              {getThemeIcon()}
              {getThemeLabel()}
            </Button>
          </div>
          
          <div id="appearance-language-setting" className="flex items-center justify-between">
            <div id="appearance-language-text">
              <p className="font-medium">言語</p>
              <p className="text-sm text-muted-foreground">
                アプリケーションの言語を変更します
              </p>
            </div>
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Languages className="w-4 h-4" />
              {language === 'ja' ? '日本語' : 'English'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            アカウント
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div id="account-plan-setting" className="flex items-center justify-between">
            <div id="account-plan-text">
              <p className="font-medium">プラン</p>
              <p className="text-sm text-muted-foreground">
                現在のプランを確認・変更できます
              </p>
            </div>
            <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
          
          <div id="account-profile-setting" className="flex items-center justify-between">
            <div id="account-profile-text">
              <p className="font-medium">プロフィール</p>
              <p className="text-sm text-muted-foreground">
                プロフィール情報を編集します
              </p>
            </div>
            <Button variant="outline">
              編集
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            学習設定
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div id="learning-editor-setting" className="flex items-center justify-between">
            <div id="learning-editor-text">
              <p className="font-medium">エディタ設定</p>
              <p className="text-sm text-muted-foreground">
                コードエディタの設定を変更します
              </p>
            </div>
            <Button variant="outline">
              設定
            </Button>
          </div>
          
          <div id="learning-notification-setting" className="flex items-center justify-between">
            <div id="learning-notification-text">
              <p className="font-medium">通知</p>
              <p className="text-sm text-muted-foreground">
                学習リマインダーやアップデート通知を設定します
              </p>
            </div>
            <Button variant="outline">
              設定
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">危険な操作</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">アカウント削除</p>
              <p className="text-sm text-muted-foreground">
                アカウントとすべてのデータを削除します（この操作は取り消せません）
              </p>
            </div>
            <Button variant="destructive">
              削除
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage