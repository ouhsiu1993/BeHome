# Firebase App Hosting 部署指南

本專案採用 **Next.js 全棧架構** + **Firebase App Hosting** 的現代化部署方案。

## 🚀 技術棧

### 核心技術
- **Next.js**: `14.2.0` - 全棧 React 框架 (前後端統一)
- **React**: `18.2.0` - 用戶介面框架
- **TypeScript**: `5.4.5` - 類型安全的 JavaScript
- **Tailwind CSS**: `3.4.3` - 實用優先的 CSS 框架

### 狀態管理與工具
- **Zustand**: `4.5.2` - 輕量級狀態管理
- **Axios**: `1.6.8` - HTTP 客戶端
- **Lucide React**: `0.372.0` - 現代圖標庫
- **Date-fns**: `3.6.0` - 日期處理工具

### 部署平台
- **Firebase App Hosting** - Google 的全棧應用託管服務
- **Cloud Run** - 底層容器化運行環境

## 🏗️ 專案架構

### Next.js 全棧目錄結構
```
專案根目錄/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # 後端 API Routes
│   │   │   ├── search/        # 搜尋 API
│   │   │   ├── test/          # 測試 API
│   │   │   └── health/        # 健康檢查
│   │   ├── globals.css        # 全局樣式
│   │   ├── layout.tsx         # 根佈局
│   │   └── page.tsx           # 首頁
│   ├── components/            # React 元件
│   ├── lib/                   # 工具函數與服務
│   │   └── services/          # 外部服務集成
│   ├── store/                 # 狀態管理
│   └── types/                 # TypeScript 類型定義
├── apphosting.yaml            # Firebase 部署配置
├── package.json               # 依賴管理
├── tailwind.config.js         # Tailwind 配置
├── tsconfig.json              # TypeScript 配置
└── next.config.js             # Next.js 配置
```

## ⚠️ 關鍵注意事項與配置

### 1. apphosting.yaml - 最重要的配置文件
```yaml
# Firebase App Hosting 配置
runConfig:
  runtime: nodejs18
  cpu: 1
  memory: 512Mi
  maxInstances: 10
  minInstances: 0
  concurrency: 100

# 環境變數 (頂層配置)
env:
  - variable: NODE_ENV
    value: production
  - variable: GOOGLE_API_KEY
    value: "你的_API_金鑰"
  - variable: GOOGLE_SEARCH_ENGINE_ID
    value: "你的_搜尋引擎_ID"
```

**⚠️ 重要注意事項**：
- `env` 必須是**頂層配置**，不能放在 `runConfig` 內
- 直接設置值比使用 Secret Manager 簡單（小型專案）

### 2. package.json 依賴配置
```json
{
  "dependencies": {
    "next": "14.2.0",
    "react": "18.2.0",
    "typescript": "5.4.5",
    "tailwindcss": "3.4.3",     // ⚠️ 必須放在 dependencies
    "autoprefixer": "10.4.19",  // ⚠️ 必須放在 dependencies
    "postcss": "8.4.38"         // ⚠️ 必須放在 dependencies
  },
  "devDependencies": {
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.0"
  }
}
```

**⚠️ 關鍵重點**：構建時需要的依賴（Tailwind CSS, PostCSS 等）必須放在 `dependencies` 而不是 `devDependencies`。

## 🚀 部署流程

### 前置準備
1. **創建 Firebase 專案**
   ```bash
   # 1. 前往 Firebase Console
   https://console.firebase.google.com/
   
   # 2. 創建新專案或選擇現有專案
   # 3. 啟用 App Hosting 功能
   ```

2. **設置 GitHub 倉庫**
   - 確保程式碼推送到 GitHub
   - 設置正確的分支策略（建議 main 為生產分支）

### 部署步驟

#### 方式 1：Firebase Console 部署
1. 前往 Firebase Console → App Hosting
2. 點擊「Get Started」
3. 連接 GitHub 倉庫
4. 選擇分支（通常為 `main`）
5. 設置根目錄（通常為 `/`）
6. 點擊部署

#### 方式 2：GitHub Actions 自動部署
```yaml
# .github/workflows/deploy.yml
name: 自動部署到 Firebase App Hosting

on:
  push:
    branches: [ main ]

jobs:
  deploy-app:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: '${{ secrets.FIREBASE_PROJECT_ID }}'
          channelId: live
```

## 🔧 常見問題與解決方案

### 問題 1：TypeScript 編譯錯誤
**錯誤**：`Module has no exported member 'SomeType'`
**解決**：確保所有使用的類型都正確導出
```typescript
// types/search.ts
export interface GoogleSearchResponse { ... }
export interface GoogleSearchItem { ... }
```

### 問題 2：Tailwind CSS 構建失敗
**錯誤**：`Cannot find module 'tailwindcss'`
**解決**：將 CSS 相關依賴移到 `dependencies`
```json
{
  "dependencies": {
    "tailwindcss": "3.4.3",
    "autoprefixer": "10.4.19",
    "postcss": "8.4.38"
  }
}
```

### 問題 3：環境變數無法讀取
**錯誤**：`process.env.VARIABLE_NAME` 為 undefined
**解決**：檢查 `apphosting.yaml` 格式
```yaml
# ❌ 錯誤：env 在 runConfig 內
runConfig:
  env: ...

# ✅ 正確：env 為頂層配置
runConfig: ...
env: ...
```

### 問題 4：API Routes 404 錯誤
**檢查事項**：
- 檔案路徑：`src/app/api/endpoint/route.ts`
- 導出函數：`export async function GET() {}`
- Next.js 版本：確保使用 App Router（Next.js 13+）

## 📈 性能優化建議

### 1. 資源配置
```yaml
# apphosting.yaml
runConfig:
  cpu: 1              # 小型應用：1，中型：2
  memory: 512Mi       # 小型應用：512Mi，中型：1024Mi
  minInstances: 0     # 開發環境：0，生產環境：1
  maxInstances: 10    # 根據預期流量調整
  concurrency: 100    # 每個實例處理的並發請求數
```

### 2. Next.js 優化
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 產生靜態資源
  output: 'standalone',
  
  // 圖片優化
  images: {
    domains: ['example.com']
  },
  
  // 環境變數
  env: {
    CUSTOM_VARIABLE: process.env.CUSTOM_VARIABLE,
  }
}
```

## 🔒 安全性考慮

### 環境變數管理
```yaml
# 方案 1：直接設置（簡單）
env:
  - variable: API_KEY
    value: "實際金鑰值"

# 方案 2：Secret Manager（安全）
env:
  - variable: API_KEY
    secret: mySecretName
```

### API Route 安全
```typescript
// src/app/api/example/route.ts
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // 1. 請求頻率限制
  // 2. 輸入驗證
  // 3. 錯誤處理
  // 4. 日誌記錄
}
```

## 📋 部署檢查清單

### 部署前檢查
- [ ] 所有依賴正確分類（dependencies vs devDependencies）
- [ ] apphosting.yaml 配置正確
- [ ] 環境變數已設置
- [ ] TypeScript 編譯無錯誤
- [ ] 本地構建測試通過

### 部署後驗證
- [ ] 應用程式可正常訪問
- [ ] API Routes 回應正常
- [ ] 環境變數正確讀取
- [ ] 外部服務集成正常
- [ ] 錯誤處理機制運作

## 🎯 最佳實踐

### 1. 專案結構
- 使用 Next.js App Router
- 分離業務邏輯到 `/lib` 目錄
- 統一錯誤處理機制
- 類型安全的 API 設計

### 2. 開發流程
- 使用 TypeScript 確保類型安全
- 實施 ESLint + Prettier 程式碼規範
- Git 分支策略：`dev` → `main`
- 環境分離：開發 / 測試 / 生產

### 3. 監控與維護
- 使用 Firebase Console 監控應用狀態
- 定期檢查 Cloud Run 日誌
- 設置適當的資源限制
- 實施健康檢查端點

---

## 📚 相關資源

- [Firebase App Hosting 官方文檔](https://firebase.google.com/docs/app-hosting)
- [Next.js 官方文檔](https://nextjs.org/docs)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)

---

**版本**：v1.0  
**更新日期**：2025-09-06  
**適用專案**：Next.js + Firebase App Hosting 全棧應用
