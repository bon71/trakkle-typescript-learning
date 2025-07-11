# Trakkle マイクロフロントエンド統合計画

## 概要
Trakkle学習プラットフォームにおけるマイクロフロントエンド統合の詳細計画書です。
15以上のコンテンツアプリを効率的に統合し、シームレスなユーザー体験を提供します。

## アーキテクチャ設計

### 統合方式
**Shell Application Pattern** を採用

```
┌─────────────────────────────────────────────────────┐
│                 Trakkle Platform                     │
│                  (Shell App)                        │
├─────────────────────────────────────────────────────┤
│  Header | Navigation | Authentication | Footer       │
├─────────────────────────────────────────────────────┤
│                                                     │
│    ┌─────────────────────────────────────────────┐  │
│    │        Microfrontend Container             │  │
│    │                                            │  │
│    │  ┌─────────────────────────────────────┐   │  │
│    │  │     Content App                    │   │  │
│    │  │  (TypeScript Learning)             │   │  │
│    │  │                                    │   │  │
│    │  │  - Lessons                         │   │  │
│    │  │  - Exercises                       │   │  │
│    │  │  - Progress                        │   │  │
│    │  └─────────────────────────────────────┘   │  │
│    └─────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 技術選択

#### 1. Module Federation (推奨)
**メリット:**
- Webpack 5ネイティブサポート
- ランタイムでの動的ロード
- 共有依存関係の自動最適化
- TypeScript完全サポート

**設定例:**
```javascript
// webpack.config.js (Platform側)
const ModuleFederationPlugin = require('@module-federation/webpack')

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'trakkle_platform',
      remotes: {
        typescript_learning: 'typescript_learning@http://localhost:3001/remoteEntry.js',
        python_learning: 'python_learning@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@trakkle/ui-components': { singleton: true },
      },
    }),
  ],
}
```

#### 2. Single-spa (代替案)
**メリット:**
- フレームワーク非依存
- 成熟したエコシステム
- 細かい制御が可能

## 統合パターン

### 1. ルート基盤統合
```typescript
// Platform側のルーティング
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* マイクロフロントエンド統合 */}
        <Route path="/learn/typescript/*" element={<TypeScriptLearningApp />} />
        <Route path="/learn/python/*" element={<PythonLearningApp />} />
        <Route path="/learn/react/*" element={<ReactLearningApp />} />
        
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### 2. コンテンツアプリ側実装
```typescript
// TypeScript Learning App
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// スタンドアロン実行
if (process.env.NODE_ENV === 'development') {
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

// マイクロフロントエンド統合用エクスポート
export { App as TypeScriptLearningApp }
export { routes as typeScriptRoutes }
```

## 共通機能統合

### 1. 認証状態共有
```typescript
// 共通認証Context
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  token: string | null
}

// Platform側でプロバイダー提供
<AuthProvider>
  <Router>
    <App />
  </Router>
</AuthProvider>

// コンテンツアプリ側で利用
const { user, isAuthenticated } = useAuth()
```

### 2. 共通状態管理
```typescript
// 共通状態 (Zustand)
interface GlobalState {
  user: User | null
  theme: 'light' | 'dark'
  language: 'ja' | 'en'
  notifications: Notification[]
}

// Platform側で初期化
const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  theme: 'light',
  language: 'ja',
  notifications: [],
  // actions...
}))

// コンテンツアプリ側で利用
const { user, theme } = useGlobalStore()
```

### 3. 共通ナビゲーション
```typescript
// 共通ナビゲーション API
interface NavigationAPI {
  navigate: (path: string) => void
  goBack: () => void
  getCurrentPath: () => string
}

// Platform側で実装
const navigationAPI: NavigationAPI = {
  navigate: (path) => history.push(path),
  goBack: () => history.back(),
  getCurrentPath: () => history.location.pathname,
}

// コンテンツアプリに注入
window.TrakkleAPI = { navigation: navigationAPI }
```

## 通信パターン

### 1. イベントベース通信
```typescript
// カスタムイベント定義
interface TrakkleEvents {
  'lesson-completed': { lessonId: string; score: number }
  'progress-updated': { contentId: string; progress: number }
  'navigation-request': { path: string }
}

// Platform側でイベントリスナー
window.addEventListener('trakkle:lesson-completed', (event) => {
  const { lessonId, score } = event.detail
  // 進捗更新、通知表示等
})

// コンテンツアプリ側でイベント発火
const completeLessons = (lessonId: string, score: number) => {
  window.dispatchEvent(new CustomEvent('trakkle:lesson-completed', {
    detail: { lessonId, score }
  }))
}
```

### 2. PostMessage通信
```typescript
// Platform側
window.addEventListener('message', (event) => {
  if (event.data.type === 'CONTENT_APP_READY') {
    // コンテンツアプリ初期化完了
    event.source.postMessage({
      type: 'PLATFORM_DATA',
      payload: { user, theme, language }
    })
  }
})

// コンテンツアプリ側
window.parent.postMessage({
  type: 'CONTENT_APP_READY',
  payload: { appId: 'typescript-learning' }
})
```

## 開発・デプロイ戦略

### 1. 開発環境
```bash
# Platform開発
cd trakkle-platform
npm run dev:platform    # Port 3000

# コンテンツアプリ開発
cd trakkle-typescript-learning
npm run dev:standalone  # Port 3001
npm run dev:integrated  # Module Federation mode
```

### 2. ステージング環境
```yaml
# docker-compose.yml
version: '3.8'
services:
  platform:
    build: ./trakkle-platform
    ports:
      - "3000:3000"
    environment:
      - CONTENT_APPS_BASE_URL=http://localhost:3000
      
  typescript-learning:
    build: ./trakkle-typescript-learning
    ports:
      - "3001:3001"
    environment:
      - PLATFORM_URL=http://localhost:3000
```

### 3. 本番環境
```yaml
# kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: trakkle-platform
spec:
  replicas: 3
  selector:
    matchLabels:
      app: trakkle-platform
  template:
    metadata:
      labels:
        app: trakkle-platform
    spec:
      containers:
      - name: platform
        image: trakkle-platform:latest
        ports:
        - containerPort: 3000
        env:
        - name: CONTENT_APPS_BASE_URL
          value: "https://apps.trakkle.com"
```

## パフォーマンス最適化

### 1. 遅延ロード
```typescript
// 動的インポート
const TypeScriptLearningApp = lazy(() => 
  import('typescript_learning/App').catch(() => ({
    default: () => <div>TypeScript Learning アプリを読み込めませんでした</div>
  }))
)

// サスペンス
<Suspense fallback={<LoadingSpinner />}>
  <TypeScriptLearningApp />
</Suspense>
```

### 2. 共有依存関係最適化
```javascript
// webpack.config.js
shared: {
  react: { 
    singleton: true,
    requiredVersion: '^18.0.0',
    eager: true
  },
  'react-dom': { 
    singleton: true,
    requiredVersion: '^18.0.0',
    eager: true
  },
  '@trakkle/ui-components': { 
    singleton: true,
    eager: false
  },
}
```

### 3. プリロード戦略
```typescript
// コンテンツアプリのプリロード
const preloadContentApp = (appName: string) => {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = `/${appName}/remoteEntry.js`
  document.head.appendChild(link)
}

// ユーザーの学習傾向に基づいてプリロード
useEffect(() => {
  if (user?.interests?.includes('typescript')) {
    preloadContentApp('typescript-learning')
  }
}, [user])
```

## 品質保証

### 1. エラーハンドリング
```typescript
// エラーバウンダリー
class MicrofrontendErrorBoundary extends React.Component {
  state = { hasError: false, error: null }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Microfrontend error:', error, errorInfo)
    // エラー監視サービスに送信
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>コンテンツの読み込みに失敗しました</h2>
          <button onClick={() => window.location.reload()}>
            ページを再読み込み
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}
```

### 2. 統合テスト
```typescript
// Platform + コンテンツアプリ統合テスト
describe('TypeScript Learning Integration', () => {
  it('should load TypeScript learning app', async () => {
    render(<Platform />)
    
    // TypeScript学習ページに遷移
    fireEvent.click(screen.getByText('TypeScript学習'))
    
    // コンテンツアプリが読み込まれることを確認
    await waitFor(() => {
      expect(screen.getByText('TypeScript レッスン')).toBeInTheDocument()
    })
  })
  
  it('should share authentication state', async () => {
    const { user } = renderWithAuth(<Platform />)
    
    // コンテンツアプリ内で認証状態を確認
    fireEvent.click(screen.getByText('TypeScript学習'))
    
    await waitFor(() => {
      expect(screen.getByText(`こんにちは、${user.name}さん`)).toBeInTheDocument()
    })
  })
})
```

## 実装スケジュール

### Phase 1: 基盤構築 (2-3週間)
- [ ] Platform側 Module Federation設定
- [ ] 共通認証システム実装
- [ ] 基本的な通信パターン実装
- [ ] エラーハンドリング機能

### Phase 2: 統合実装 (2-3週間)
- [ ] TypeScript Learning アプリ統合
- [ ] 認証状態共有機能
- [ ] ナビゲーション統合
- [ ] 共通UI/UX調整

### Phase 3: 最適化・テスト (1-2週間)
- [ ] パフォーマンス最適化
- [ ] 統合テスト実装
- [ ] エラーハンドリング強化
- [ ] 監視・ログ機能

### Phase 4: 本番展開 (1週間)
- [ ] 本番環境設定
- [ ] 段階的ロールアウト
- [ ] 監視・アラート設定
- [ ] ドキュメント整備

## 想定される課題と対策

### 1. バージョン互換性
**課題**: 共通依存関係のバージョン競合
**対策**: 
- 定期的な依存関係更新
- 互換性マトリックス管理
- 段階的アップグレード

### 2. パフォーマンス
**課題**: 初期ロード時間の増加
**対策**:
- 効率的な Code Splitting
- 共有依存関係の最適化
- CDN活用

### 3. 開発体験
**課題**: 複雑な開発・デバッグ環境
**対策**:
- 開発ツール整備
- 詳細なドキュメント作成
- チーム間コミュニケーション強化

## 成功指標

### 技術指標
- 初期ロード時間: < 3秒
- コンテンツアプリ切り替え: < 1秒
- エラー発生率: < 0.1%
- テストカバレッジ: > 80%

### 開発効率指標
- 新規コンテンツアプリ立ち上げ: < 1週間
- 共通機能更新の影響範囲: 最小限
- 開発者オンボーディング: < 3日

## 次のアクション

1. **Platform側 Module Federation設定** の実装開始
2. **共通基盤パッケージ** の並行開発
3. **TypeScript Learning アプリ** での統合検証
4. **他コンテンツアプリ** への段階的展開