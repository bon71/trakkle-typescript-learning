# Trakkle共通基盤設計文書

## 概要
Trakkle学習プラットフォームの15以上のコンテンツアプリを効率的に管理・統合するための共通基盤設計です。

## アーキテクチャ概要

### 全体構成
```
trakkle-ecosystem/
├── trakkle-platform/              # コアプラットフォーム
├── trakkle-shared-foundation/     # 共通基盤（NPM packages）
├── content-apps/                  # 個別コンテンツアプリ
└── trakkle-infrastructure/        # DevOps・設定
```

### 共通基盤パッケージ構成
```
trakkle-shared-foundation/
├── packages/
│   ├── ui-components/         # @trakkle/ui-components
│   ├── design-system/         # @trakkle/design-system
│   ├── auth-client/           # @trakkle/auth-client
│   ├── shared-utils/          # @trakkle/shared-utils
│   ├── api-client/            # @trakkle/api-client
│   └── themes/                # @trakkle/themes
├── tools/
│   ├── build-config/          # 共通ビルド設定
│   ├── eslint-config/         # ESLint設定
│   └── typescript-config/     # TypeScript設定
└── docs/
```

## 共通基盤パッケージ詳細

### 1. @trakkle/ui-components
**目的**: 全アプリで使用する共通UIコンポーネント
```typescript
// 提供コンポーネント
export * from './Button'
export * from './Card'
export * from './Input'
export * from './Modal'
export * from './Navigation'
export * from './ProgressBar'
export * from './CodeEditor'
export * from './LessonLayout'
```

### 2. @trakkle/design-system
**目的**: デザイントークン・テーマ管理
```typescript
// トークン例
export const colors = {
  primary: '#3178c6',      // TypeScript Blue
  secondary: '#f59e0b',    // Amber
  success: '#10b981',      // Green
  // ...
}

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  // ...
}
```

### 3. @trakkle/auth-client
**目的**: 認証機能の統一化
```typescript
// 認証API
export class AuthClient {
  login(credentials: LoginCredentials): Promise<User>
  logout(): Promise<void>
  getCurrentUser(): Promise<User | null>
  refreshToken(): Promise<string>
}

// 認証Context
export const AuthProvider: React.FC<{ children: React.ReactNode }>
export const useAuth: () => AuthContextType
```

### 4. @trakkle/shared-utils
**目的**: 共通ユーティリティ関数
```typescript
// 共通関数
export const formatDate = (date: Date): string => { /* ... */ }
export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): T => { /* ... */ }
export const cn = (...classes: string[]): string => { /* ... */ }
```

### 5. @trakkle/api-client
**目的**: API通信の統一化
```typescript
// APIクライアント
export class ApiClient {
  constructor(baseURL: string, authToken?: string)
  get<T>(endpoint: string): Promise<T>
  post<T>(endpoint: string, data: any): Promise<T>
  // ...
}
```

## 開発ワークフロー

### 1. 共通基盤の開発
```bash
# 共通基盤リポジトリで開発
cd trakkle-shared-foundation
npm run build
npm run test
npm run publish
```

### 2. コンテンツアプリでの利用
```bash
# 各コンテンツアプリで使用
npm install @trakkle/ui-components @trakkle/auth-client
```

```typescript
// コンテンツアプリでの使用例
import { Button, Card } from '@trakkle/ui-components'
import { AuthProvider, useAuth } from '@trakkle/auth-client'

function App() {
  return (
    <AuthProvider>
      <MyLearningApp />
    </AuthProvider>
  )
}
```

## バージョン管理戦略

### セマンティックバージョニング
- **Major**: Breaking changes
- **Minor**: 新機能追加
- **Patch**: バグ修正

### 互換性維持
- 最低2バージョン前まで互換性保持
- 廃止予定機能は事前に警告
- 移行ガイドの提供

## 技術スタック

### 共通基盤
- **言語**: TypeScript 5.0+
- **バンドラー**: Vite
- **テスト**: Vitest + React Testing Library
- **ドキュメント**: Storybook
- **CI/CD**: GitHub Actions

### コンテンツアプリ
- **フレームワーク**: React 18+
- **状態管理**: 各アプリの裁量（Redux, Zustand等）
- **スタイリング**: Tailwind CSS + 共通デザインシステム
- **ルーティング**: React Router

## 導入フェーズ

### Phase 1: 基盤構築 (2-3週間)
- [ ] trakkle-shared-foundation リポジトリ作成
- [ ] 基本的なUI コンポーネント開発
- [ ] 認証システム構築
- [ ] デザインシステム策定

### Phase 2: 既存アプリ統合 (1-2週間)
- [ ] TypeScript学習アプリでの共通基盤導入
- [ ] Platform側での認証統合
- [ ] 共通コンポーネントの置き換え

### Phase 3: 新規アプリ開発 (継続的)
- [ ] 新しいコンテンツアプリのテンプレート作成
- [ ] 開発ガイドライン策定
- [ ] チーム向けドキュメント整備

## 運用・保守

### モニタリング
- パッケージ使用状況の追跡
- パフォーマンスメトリクス
- エラー追跡・分析

### 更新プロセス
1. 共通基盤の機能追加・修正
2. 自動テスト実行
3. コンテンツアプリでの検証
4. バージョンアップ・リリース
5. 各アプリでの更新

## 期待される効果

### 開発効率
- 共通コンポーネントの再利用により開発時間短縮
- 統一されたAPI・認証システム
- 一貫したデザイン・UX

### 保守性
- 統一された技術スタック
- 横断的な修正・改善が容易
- 品質の標準化

### スケーラビリティ
- 新しいコンテンツアプリの迅速な立ち上げ
- チーム間の知識共有促進
- 技術負債の最小化

## 次のアクション

1. **trakkle-shared-foundation** リポジトリの作成
2. 最初のUI コンポーネントパッケージの開発
3. TypeScript学習アプリでの導入検証
4. 他のコンテンツアプリへの段階的展開