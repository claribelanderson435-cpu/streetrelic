# AGENTS.md - 项目说明

## 项目概览

这是一个街潮服装批发网站，提供复古和街头风格服装的批发服务，支持定制化服务。

### 技术栈
- **框架**: React 18 + Vite
- **路由**: React Router DOM v7
- **动画**: Framer Motion
- **样式**: Tailwind CSS
- **语言**: TypeScript 5.7
- **包管理器**: pnpm
- **AI服务**: coze-coding-dev-sdk + Express

## 项目结构

```
/workspace/projects/
├── server/
│   └── llm-server.ts     # LLM API后端服务（端口5001）
├── src/
│   ├── components/          # 可复用组件
│   │   ├── ProductCard.tsx  # 产品卡片组件
│   │   ├── ProductModal.tsx # 产品详情模态框
│   │   ├── Header.tsx       # 头部导航
│   │   ├── Footer.tsx       # 页脚
│   │   ├── InquiryForm.tsx  # 询价表单
│   │   ├── FloatingChat.tsx # 浮动聊天按钮
│   │   ├── AIChatModal.tsx # AI客服弹窗（流式响应）
│   │   ├── Empty.tsx        # 空状态组件
│   │   ├── SEO.tsx          # SEO组件
│   │   └── Breadcrumb.tsx   # 面包屑导航组件
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx         # 首页
│   │   ├── Products.tsx     # 产品列表页（含分页）
│   │   ├── AboutUs.tsx      # 关于我们
│   │   ├── Wholesale.tsx    # 批发业务页
│   │   ├── OEM.tsx          # OEM服务页
│   │   ├── CustomEmbroidery.tsx  # 定制刺绣页
│   │   ├── CustomLabel.tsx       # 定制标签页
│   │   ├── CustomPackaging.tsx   # 定制包装页
│   │   ├── CustomPattern.tsx     # 定制图案页
│   │   ├── CustomPrinting.tsx    # 定制印花页
│   │   ├── CustomWash.tsx        # 定制水洗页
│   │   ├── GetQuote.tsx          # 获取报价页
│   │   ├── FAQ.tsx               # 常见问题页
│   │   ├── Pricing.tsx           # 定价页
│   │   ├── MOQPolicy.tsx         # 起订量政策页
│   │   ├── ProductionTime.tsx    # 生产时间页
│   │   ├── Shipping.tsx          # 配送信息页
│   │   ├── PaymentTerms.tsx      # 付款条款页
│   │   ├── Factory.tsx           # 工厂介绍页
│   │   └── Dashboard.tsx         # 营销推广数据看板
│   ├── mocks/
│   │   ├── productData.ts    # 产品数据模拟（56个SKU）
│   │   └── analyticsData.ts  # 推广数据模拟
│   ├── contexts/
│   │   └── authContext.ts   # 认证上下文
│   ├── hooks/
│   │   └── useTheme.ts      # 主题钩子
│   ├── lib/
│   │   └── utils.ts         # 工具函数
│   ├── App.tsx              # 主应用组件
│   └── main.tsx             # 应用入口
├── public/                  # 静态资源
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── .coze                    # 项目配置文件
```

## 核心功能

### 1. 产品展示
- **Products.tsx**: 产品列表页面，支持多维度筛选和分页
  - 产品库：56个SKU（涵盖T恤、卫衣、夹克、牛仔裤、帽子、帆布包等）
  - 每个产品至少6张图片（正面、背面、侧面、细节、模特、生活场景）
  - 分页功能：每页显示36个产品（4列x9行）
  - 按产品类别筛选（T恤、卫衣、裤子、夹克、衬衫、配饰）
  - 按分类筛选（所有标签，包括工艺标签）
  - 按颜色筛选
  - 特殊选项筛选（空白产品、可定制产品）

### 2. SEO优化
- **SEO.tsx**: 全局SEO组件
  - Meta标签优化（标题、描述、关键词）
  - Open Graph标签（社交媒体分享优化）
  - Twitter Card标签
  - 结构化数据（JSON-LD）
- **Breadcrumb.tsx**: 面包屑导航组件，提升SEO和用户体验

### 3. 产品数据管理
- **productData.ts**: 产品数据源
  - `getCategories()`: 提取所有产品分类（包括工艺标签）
  - `getColors()`: 提取所有颜色
  - 工艺标签包括：Washed（水洗）、Print（印花）、Distressed（做旧）、Pure Cotton（纯棉）、Workwear（工装）、Custom Embroidery（刺绣）、Plaid（格纹）等

### 3. 产品详情
- **ProductModal.tsx**: 产品详情模态框
  - 显示产品图片、价格、MOQ、生产时间
  - 展示产品分类和颜色
  - 显示定制选项及价格

### 4. 自定义服务页面
多个定制服务页面，介绍不同的定制服务：
- 刺绣服务
- 标签定制
- 包装定制
- 图案定制
- 印花服务
- 水洗服务

## 构建和测试命令

### 开发环境
```bash
pnpm install          # 安装依赖
# 启动后端LLM服务（端口5001）
API_PORT=5001 pnpm tsx server/llm-server.ts &
# 启动前端开发服务器（端口5000）
pnpm vite --port 5000
```

### 构建和部署
```bash
pnpm build            # 构建生产版本
pnpm start            # 启动生产环境
```

### 代码检查
```bash
pnpm lint             # ESLint 代码检查
pnpm ts-check         # TypeScript 类型检查
```

## AI客服服务架构

### 架构说明
- **后端服务**: Express + coze-coding-dev-sdk（端口5001）
- **前端**: Vite开发服务器（端口5000）+ API代理
- **通信协议**: Server-Sent Events (SSE) 实现流式响应

### API端点
- `GET /api/health` - 健康检查
- `POST /api/ai/chat` - 流式对话接口（SSE）
- `POST /api/ai/chat/sync` - 同步对话接口（非流式）

### 请求格式
```json
POST /api/ai/chat
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant..."},
    {"role": "user", "content": "Hello!"}
  ],
  "sessionId": "session-123"
}
```

### 响应格式
```
data: {"content":"Hello"}
data: {"content":" there"}
data: {"content":"!"}
data: {"done": true}
```

## 代码风格指南

### 1. 组件编写规范
- 使用函数式组件
- 使用 TypeScript 类型定义
- 使用 Hooks 管理状态
- 使用 Framer Motion 实现动画效果

### 2. 样式规范
- 使用 Tailwind CSS 工具类
- 响应式设计（移动优先）
- 使用 `className` 属性添加样式

### 3. 路由规范
- 使用 React Router DOM v7
- 路由配置在 `App.tsx` 中

### 4. 数据流
- 产品数据存储在 `src/mocks/productData.ts`
- 使用 Props 传递数据
- 使用 Context 管理全局状态（如认证）

## 常见问题

### 1. 如何添加新的产品类别？
在 `src/mocks/productData.ts` 中的 `products` 数组添加新产品，系统会自动提取新的类别标签。

### 2. 如何修改产品筛选逻辑？
修改 `src/pages/Products.tsx` 中的 `useEffect` 中的筛选逻辑。

### 3. 如何添加新的定制服务页面？
在 `src/pages/` 目录下创建新的页面组件，并在 `src/App.tsx` 中添加路由。

### 4. 产品图片如何处理？
产品图片使用外部图片 URL，存储在 `products` 数组的 `images` 字段中。目前每个产品至少有6张图片（正面、背面、侧面、细节、模特、生活场景）。

### 5. 如何修改分页每页显示的产品数量？
修改 `src/pages/Products.tsx` 中的 `productsPerPage` 常量（当前值为36，即4列x9行）。

### 6. SEO如何优化？
SEO配置在 `src/components/SEO.tsx` 中，包括：
- Meta标签（title、description、keywords）
- Open Graph标签（用于社交媒体分享）
- Twitter Card标签
- 结构化数据（JSON-LD）

### 7. 如何修改网站标题和描述？
在 `src/components/SEO.tsx` 中修改 `title`、`description` 和 `keywords` 属性。

## 安全注意事项

- 目前使用模拟数据，生产环境应替换为后端 API
- 敏感信息（如 API 密钥）应使用环境变量存储
- 用户认证功能待完善

## 环境变量

项目运行在云端沙箱环境，使用以下环境变量：

- `COZE_WORKSPACE_PATH`: 项目工作目录
- `COZE_PROJECT_DOMAIN_DEFAULT`: 对外访问域名
- `DEPLOY_RUN_PORT`: 服务监听端口（5000）
- `COZE_PROJECT_ENV`: 运行环境（DEV/PROD）

## 部署说明

### 端口规范
- Web 服务必须运行在 **5000** 端口
- 禁止使用 9000 端口（系统保留）

### 生产环境架构
- 使用单一服务器同时提供静态文件和AI API
- 启动脚本：`node scripts/start.cjs`
- 支持流式响应（SSE）和同步响应

### 日志目录
所有日志文件写入 `/app/work/logs/bypass/`
- `app.log`: 主流程 + 关键错误
- `dev.log`: 补充调试信息
- `console.log`: 浏览器控制台日志

### 更新机制
- 开发环境支持热更新（HMR）
- 代码修改后自动生效，无需重启服务

## 最后更新
- 日期: 2026-04-06
- 更新内容:
  - SEO优化：添加全局meta标签、Open Graph、Twitter Card、结构化数据
  - 产品扩展：产品库从8个扩展至56个SKU
  - 分页功能：产品页面实现分页，每页36个产品（4列x9行）
  - 图片扩展：每个产品至少6张图片（正面、背面、侧面、细节、模特、生活场景）
  - 组件新增：SEO组件、面包屑导航组件
  - 全英文化：浮标微信弹窗、产品详情弹窗文件上传区域改为英文
