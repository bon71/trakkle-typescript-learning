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

interface LearnPageProps {
  user?: User | null
}

export function LearnPage({ user }: LearnPageProps) {
  const { t } = useI18n()

  return (
    <div id="learn-page-container" className="container max-w-6xl mx-auto px-6 py-8">
      <div id="learn-page-header" className="mb-8">
        <h1 className="text-3xl font-bold mb-2">学習</h1>
        <p className="text-muted-foreground">
          TypeScriptの学習コンテンツを選択してください
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>学習コンテンツ</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            学習コンテンツは現在開発中です。しばらくお待ちください。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default LearnPage