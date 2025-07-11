import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Play, 
  BookOpen, 
  Trophy, 
  Users, 
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Crown
} from 'lucide-react'
import { useI18n } from '../hooks/useI18n'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { cn } from '../lib/utils'

interface User {
  id: string
  name: string
  email: string
  photoURL?: string
  isPremium: boolean
}

interface HomePageProps {
  user?: User | null
}

const phases = [
  {
    id: 1,
    title: 'TypeScript 基礎',
    description: 'TypeScriptの基本的な型システムを学びます',
    lessons: 8,
    completed: 6,
    difficulty: 'beginner',
    duration: '2-3時間',
    isPremium: false
  },
  {
    id: 2,
    title: 'オブジェクト指向',
    description: 'クラス、インターフェース、継承について学びます',
    lessons: 12,
    completed: 3,
    difficulty: 'intermediate',
    duration: '4-5時間',
    isPremium: false
  },
  {
    id: 3,
    title: 'ジェネリクス',
    description: '型の再利用とジェネリック型について学びます',
    lessons: 10,
    completed: 0,
    difficulty: 'intermediate',
    duration: '3-4時間',
    isPremium: true
  },
  {
    id: 4,
    title: 'アドバンスト型',
    description: 'conditional types、mapped types等の高度な型を学びます',
    lessons: 15,
    completed: 0,
    difficulty: 'advanced',
    duration: '6-8時間',
    isPremium: true
  }
]

const features = [
  {
    icon: <Play className="w-6 h-6" />,
    title: 'インタラクティブ学習',
    description: 'ブラウザ上で実際にTypeScriptコードを書きながら学習できます'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: '段階的カリキュラム',
    description: '基礎から応用まで、段階的に学べる構成になっています'
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: '進捗追跡',
    description: '学習の進捗を可視化し、モチベーションを維持できます'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'コミュニティ',
    description: '他の学習者と交流し、一緒に成長できます'
  }
]

const stats = [
  { label: '学習者数', value: '10,000+', icon: <Users className="w-5 h-5" /> },
  { label: 'レッスン数', value: '100+', icon: <BookOpen className="w-5 h-5" /> },
  { label: '完了率', value: '95%', icon: <CheckCircle className="w-5 h-5" /> },
  { label: '平均学習時間', value: '30時間', icon: <Clock className="w-5 h-5" /> }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'advanced':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getDifficultyLabel = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return '初級'
    case 'intermediate':
      return '中級'
    case 'advanced':
      return '上級'
    default:
      return '不明'
  }
}

export function HomePage({ user }: HomePageProps) {
  const { t } = useI18n()

  return (
    <div id="home-page-container" className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="hero-section" className="py-20 px-6">
        <div id="hero-section-container" className="container max-w-6xl mx-auto text-center">
          <div id="hero-section-content" className="space-y-6">
            <div id="hero-section-badge" className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4" />
              日本で最も人気のTypeScript学習プラットフォーム
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-foreground">TypeScript を</span>
              <br />
              <span className="text-primary">マスターしよう</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              インタラクティブな学習環境で、TypeScriptの基礎から応用まで体系的に学べます。
              コードを書きながら、実践的なスキルを身につけましょう。
            </p>
            
            <div id="hero-section-buttons" className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                asChild
              >
                <Link to="/learn">
                  <Play className="w-5 h-5 mr-2" />
                  学習を開始
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                asChild
              >
                <Link to="/progress">
                  進捗を確認
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-16 px-6 bg-muted/50">
        <div id="stats-section-container" className="container max-w-6xl mx-auto">
          <div id="stats-grid" className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} id={`stat-item-${index}`} className="text-center space-y-2">
                <div id={`stat-item-icon-container-${index}`} className="flex justify-center text-primary">
                  {stat.icon}
                </div>
                <div id={`stat-item-value-${index}`} className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div id={`stat-item-label-${index}`} className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases Section */}
      <section id="phases-section" className="py-20 px-6">
        <div id="phases-section-container" className="container max-w-6xl mx-auto">
          <div id="phases-section-header" className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">学習フェーズ</h2>
            <p className="text-muted-foreground text-lg">
              段階的に学べる4つのフェーズで、TypeScriptを完全にマスターしましょう
            </p>
          </div>
          
          <div id="phases-grid" className="grid md:grid-cols-2 gap-6">
            {phases.map((phase) => (
              <Card key={phase.id} id={`phase-card-${phase.id}`} className="hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-4">
                  <div id={`phase-card-header-${phase.id}`} className="flex items-start justify-between">
                    <div id={`phase-card-title-container-${phase.id}`} className="space-y-2">
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                      <CardDescription>{phase.description}</CardDescription>
                    </div>
                    {phase.isPremium && (
                      <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  
                  <div id={`phase-card-meta-${phase.id}`} className="flex items-center gap-4">
                    <Badge 
                      variant="outline" 
                      className={cn('text-xs', getDifficultyColor(phase.difficulty))}
                    >
                      {getDifficultyLabel(phase.difficulty)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {phase.duration}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div id={`phase-card-progress-container-${phase.id}`} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {phase.completed}/{phase.lessons} レッスン完了
                    </span>
                    <span className="font-medium">
                      {Math.round((phase.completed / phase.lessons) * 100)}%
                    </span>
                  </div>
                  
                  <div id={`phase-card-progress-bar-container-${phase.id}`} className="w-full bg-muted rounded-full h-2">
                    <div 
                      id={`phase-card-progress-bar-${phase.id}`} 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(phase.completed / phase.lessons) * 100}%` }}
                    />
                  </div>
                  
                  <div id={`phase-card-buttons-${phase.id}`} className="flex gap-2">
                    <Button 
                      className="flex-1"
                      variant={phase.completed === 0 ? "default" : "outline"}
                      asChild
                    >
                      <Link to={`/learn/phase/${phase.id}`}>
                        {phase.completed === 0 ? '開始' : '続ける'}
                      </Link>
                    </Button>
                    
                    {phase.completed === phase.lessons && (
                      <Button variant="ghost" size="sm" className="text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 px-6 bg-muted/50">
        <div id="features-section-container" className="container max-w-6xl mx-auto">
          <div id="features-section-header" className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">なぜ選ばれるのか</h2>
            <p className="text-muted-foreground text-lg">
              最新の学習技術を活用した、効率的なTypeScript学習環境
            </p>
          </div>
          
          <div id="features-grid" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} id={`feature-card-${index}`} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 space-y-4">
                  <div id={`feature-card-icon-container-${index}`} className="flex justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="py-20 px-6">
        <div id="cta-section-container" className="container max-w-4xl mx-auto text-center">
          <div id="cta-section-content" className="space-y-6">
            <h2 className="text-3xl font-bold">
              今すぐTypeScript学習を始めましょう
            </h2>
            <p className="text-muted-foreground text-lg">
              無料でアカウントを作成して、今日からTypeScriptのマスターを目指しましょう
            </p>
            
            <div id="cta-section-buttons" className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/learn">
                  <Play className="w-5 h-5 mr-2" />
                  無料で始める
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                デモを見る
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage