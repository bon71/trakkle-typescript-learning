import { useState, useEffect } from 'react'

type Language = 'ja' | 'en'

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  ja: {
    'common.loading': '読み込み中...',
    'common.login': 'ログイン',
    'common.logout': 'ログアウト',
    'common.signup': 'サインアップ',
    'common.user': 'ユーザー',
    'common.premium': 'プレミアム',
    'common.settings': '設定',
    'common.accountSettings': 'アカウント設定',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.delete': '削除',
    'common.edit': '編集',
    'common.back': '戻る',
    'common.next': '次へ',
    'common.previous': '前へ',
    'common.close': '閉じる',
    'common.open': '開く',
    'common.yes': 'はい',
    'common.no': 'いいえ',
    'common.ok': 'OK',
    'common.error': 'エラー',
    'common.success': '成功',
    'common.warning': '警告',
    'common.info': '情報',
    'common.search': '検索',
    'common.filter': 'フィルター',
    'common.sort': 'ソート',
    'common.clear': 'クリア',
    'common.reset': 'リセット',
    'common.apply': '適用',
    'common.confirm': '確認',
    'common.submit': '送信',
    
    'header.dashboard': 'ダッシュボード',
    'header.learn': '学習',
    'header.exercises': '演習',
    'header.progress': '進捗',
    'header.settings': '設定',
    
    'nav.home': 'ホーム',
    'nav.phases': 'フェーズ',
    'nav.exercises': '演習',
    'nav.progress': '進捗',
    'nav.settings': '設定',
    
    'lesson.start': 'レッスンを開始',
    'lesson.continue': 'レッスンを続ける',
    'lesson.complete': 'レッスンを完了',
    'lesson.retry': 'もう一度試す',
    'lesson.next': '次のレッスン',
    'lesson.previous': '前のレッスン',
    'lesson.hint': 'ヒント',
    'lesson.solution': '解答',
    'lesson.explanation': '解説',
    'lesson.difficulty': '難易度',
    'lesson.duration': '所要時間',
    'lesson.completed': '完了済み',
    'lesson.locked': 'ロック中',
    'lesson.premium': 'プレミアム',
    
    'editor.run': '実行',
    'editor.reset': 'リセット',
    'editor.format': 'フォーマット',
    'editor.copy': 'コピー',
    'editor.paste': '貼り付け',
    'editor.undo': '元に戻す',
    'editor.redo': 'やり直し',
    'editor.fullscreen': 'フルスクリーン',
    'editor.theme': 'テーマ',
    'editor.fontSize': 'フォントサイズ',
    'editor.wordWrap': 'ワードラップ',
    'editor.lineNumbers': '行番号',
    'editor.minimap': 'ミニマップ',
    
    'progress.completed': '完了',
    'progress.inProgress': '進行中',
    'progress.notStarted': '未開始',
    'progress.total': '合計',
    'progress.percentage': '進捗率',
    'progress.streak': '連続学習',
    'progress.points': 'ポイント',
    'progress.level': 'レベル',
    'progress.badge': 'バッジ',
    'progress.achievement': '達成',
    
    'auth.welcome': 'ようこそ',
    'auth.signIn': 'サインイン',
    'auth.signUp': 'サインアップ',
    'auth.signOut': 'サインアウト',
    'auth.email': 'メールアドレス',
    'auth.password': 'パスワード',
    'auth.confirmPassword': 'パスワード確認',
    'auth.forgotPassword': 'パスワードを忘れた方',
    'auth.resetPassword': 'パスワードリセット',
    'auth.createAccount': 'アカウント作成',
    'auth.alreadyHaveAccount': 'すでにアカウントをお持ちの方',
    'auth.dontHaveAccount': 'アカウントをお持ちでない方',
    'auth.agreeTerms': '利用規約に同意する',
    'auth.privacyPolicy': 'プライバシーポリシー',
    'auth.termsOfService': '利用規約',
    
    'error.generic': 'エラーが発生しました',
    'error.network': 'ネットワークエラー',
    'error.timeout': 'タイムアウト',
    'error.unauthorized': '認証エラー',
    'error.forbidden': 'アクセス権限がありません',
    'error.notFound': '見つかりません',
    'error.serverError': 'サーバーエラー',
    'error.validationError': '入力エラー',
    'error.tryAgain': 'もう一度お試しください',
    
    'success.saved': '保存しました',
    'success.updated': '更新しました',
    'success.deleted': '削除しました',
    'success.created': '作成しました',
    'success.completed': '完了しました',
    'success.sent': '送信しました',
    'success.copied': 'コピーしました',
    
    'app.title': 'TypeScript Learning',
    'app.description': 'TypeScript を学習する',
    'app.version': 'バージョン',
    'app.copyright': '© 2024 TypeScript Learning. All rights reserved.',
    'app.madeWith': 'Made with ❤️ in Japan',
    
    'theme.light': 'ライト',
    'theme.dark': 'ダーク',
    'theme.system': 'システム',
    
    'language.ja': '日本語',
    'language.en': 'English'
  },
  
  en: {
    'common.loading': 'Loading...',
    'common.login': 'Login',
    'common.logout': 'Logout',
    'common.signup': 'Sign Up',
    'common.user': 'User',
    'common.premium': 'Premium',
    'common.settings': 'Settings',
    'common.accountSettings': 'Account Settings',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Info',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.clear': 'Clear',
    'common.reset': 'Reset',
    'common.apply': 'Apply',
    'common.confirm': 'Confirm',
    'common.submit': 'Submit',
    
    'header.dashboard': 'Dashboard',
    'header.learn': 'Learn',
    'header.exercises': 'Exercises',
    'header.progress': 'Progress',
    'header.settings': 'Settings',
    
    'nav.home': 'Home',
    'nav.phases': 'Phases',
    'nav.exercises': 'Exercises',
    'nav.progress': 'Progress',
    'nav.settings': 'Settings',
    
    'lesson.start': 'Start Lesson',
    'lesson.continue': 'Continue Lesson',
    'lesson.complete': 'Complete Lesson',
    'lesson.retry': 'Retry',
    'lesson.next': 'Next Lesson',
    'lesson.previous': 'Previous Lesson',
    'lesson.hint': 'Hint',
    'lesson.solution': 'Solution',
    'lesson.explanation': 'Explanation',
    'lesson.difficulty': 'Difficulty',
    'lesson.duration': 'Duration',
    'lesson.completed': 'Completed',
    'lesson.locked': 'Locked',
    'lesson.premium': 'Premium',
    
    'editor.run': 'Run',
    'editor.reset': 'Reset',
    'editor.format': 'Format',
    'editor.copy': 'Copy',
    'editor.paste': 'Paste',
    'editor.undo': 'Undo',
    'editor.redo': 'Redo',
    'editor.fullscreen': 'Fullscreen',
    'editor.theme': 'Theme',
    'editor.fontSize': 'Font Size',
    'editor.wordWrap': 'Word Wrap',
    'editor.lineNumbers': 'Line Numbers',
    'editor.minimap': 'Minimap',
    
    'progress.completed': 'Completed',
    'progress.inProgress': 'In Progress',
    'progress.notStarted': 'Not Started',
    'progress.total': 'Total',
    'progress.percentage': 'Progress',
    'progress.streak': 'Streak',
    'progress.points': 'Points',
    'progress.level': 'Level',
    'progress.badge': 'Badge',
    'progress.achievement': 'Achievement',
    
    'auth.welcome': 'Welcome',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.signOut': 'Sign Out',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.resetPassword': 'Reset Password',
    'auth.createAccount': 'Create Account',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.agreeTerms': 'I agree to the Terms of Service',
    'auth.privacyPolicy': 'Privacy Policy',
    'auth.termsOfService': 'Terms of Service',
    
    'error.generic': 'An error occurred',
    'error.network': 'Network error',
    'error.timeout': 'Request timeout',
    'error.unauthorized': 'Unauthorized',
    'error.forbidden': 'Access denied',
    'error.notFound': 'Not found',
    'error.serverError': 'Server error',
    'error.validationError': 'Validation error',
    'error.tryAgain': 'Please try again',
    
    'success.saved': 'Saved',
    'success.updated': 'Updated',
    'success.deleted': 'Deleted',
    'success.created': 'Created',
    'success.completed': 'Completed',
    'success.sent': 'Sent',
    'success.copied': 'Copied',
    
    'app.title': 'TypeScript Learning',
    'app.description': 'Learn TypeScript',
    'app.version': 'Version',
    'app.copyright': '© 2024 TypeScript Learning. All rights reserved.',
    'app.madeWith': 'Made with ❤️ in Japan',
    
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
    
    'language.ja': '日本語',
    'language.en': 'English'
  }
}

export function useI18n() {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language')
    return (stored as Language) || 'ja'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }
    
    return value || fallback || key
  }

  const toggleLanguage = () => {
    setLanguage(current => current === 'ja' ? 'en' : 'ja')
  }

  const setLang = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  return {
    language,
    t,
    toggleLanguage,
    setLanguage: setLang
  }
}