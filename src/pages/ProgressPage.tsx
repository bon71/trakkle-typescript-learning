import React from 'react'
import { useI18n } from '../hooks/useI18n'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

interface User {
  id: string
  name: string
  email: string
  photoURL?: string
  isPremium: boolean
}

interface ProgressPageProps {
  user?: User | null
}

export function ProgressPage({ user }: ProgressPageProps) {
  const { t } = useI18n()

  return (
    <div id="progress-page-container" className="container max-w-6xl mx-auto px-6 py-8">
      <div id="progress-page-header" className="mb-8">
        <h1 className="text-3xl font-bold mb-2">進捗</h1>
        <p className="text-muted-foreground">
          あなたの学習進捗を確認できます
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>学習進捗</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            進捗機能は現在開発中です。しばらくお待ちください。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProgressPage