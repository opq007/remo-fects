# Remo-Fects - Remotion 特效视频生成器

基于 Remotion 的多特效视频生成器，支持统一 API 管理、共享依赖和公共组件复用。

## 项目结构

```
remo-fects/
├── package.json              # 根目录配置（包含所有公共依赖）
├── node_modules/             # 共享依赖包（所有子项目共用）
├── api/                      # 统一 API 服务器
│   ├── server.js             # Express 服务器
│   ├── render.js             # 渲染逻辑
│   ├── effect-configs/       # 特效配置目录
│   ├── outputs/              # 输出视频目录
│   └── uploads/              # 上传文件目录
├── effects/                  # 所有特效项目目录
│   ├── shared/               # 公共组件库（复用核心）
│   │   ├── components/       # 公共组件
│   │   │   ├── Background.tsx      # 统一背景组件
│   │   │   ├── Overlay.tsx         # 遮罩组件
│   │   │   ├── AudioPlayer.tsx     # 音频播放组件
│   │   │   ├── BaseComposition.tsx # 基础组合组件（核心）
│   │   │   ├── CenterGlow.tsx      # 中心发光效果
│   │   │   ├── StarField.tsx       # 星空背景
│   │   │   ├── Watermark.tsx       # 水印组件
│   │   │   ├── Marquee.tsx         # 走马灯组件
│   │   │   ├── BlessingSymbol.tsx  # 祝福图案组件
│   │   │   ├── RadialBurst.tsx     # 中心发散粒子
│   │   │   ├── Foreground.tsx      # 前景效果
│   │   │   ├── MixedInputItem.tsx  # 混合输入渲染
│   │   │   ├── Character.tsx       # 角色系统（生肖/萌宠/超人）🆕
│   │   │   ├── SpeechBubble.tsx    # 对话气泡 🆕
│   │   │   ├── MagicEffects.tsx    # 魔法效果集合 🆕
│   │   │   ├── ConfettiBurst.tsx   # 彩带粒子爆炸 🆕
│   │   │   └── CartoonElements.tsx # 卡通元素 🆕
│   │   ├── schemas/          # 公共 Schema 定义
│   │   ├── types/            # 类型定义
│   │   │   ├── common.ts
│   │   │   ├── mixed-input.ts
│   │   │   ├── character.ts      # 角色类型 🆕
│   │   │   ├── colors.ts         # 颜色主题 🆕
│   │   │   └── cartoon.ts        # 卡通元素类型 🆕
│   │   └── utils/            # 工具函数
│   │       ├── easing.ts
│   │       ├── random.ts
│   │       ├── textStyle.ts
│   │       ├── mixed-input.ts
│   │       └── colors.ts         # 颜色工具 🆕
│   ├── text-rain-effect/     # 文字雨特效
│   ├── text-ring-effect/     # 金色文字环绕特效
│   ├── text-firework-effect/ # 文字烟花特效
│   ├── text-breakthrough-effect/ # 文字破屏特效
│   ├── tai-chi-bagua-effect/ # 太极八卦图特效
│   ├── text-tornado-effect/  # 文字龙卷风特效
│   ├── text-flood-effect/    # 文字洪水特效
│   ├── text-vortex-effect/   # 文字旋涡特效
│   ├── text-kaleidoscope-effect/ # 文字万花筒特效
│   ├── text-windmill-effect/ # 文字大风车特效
│   ├── text-vector-effect/   # 文字矢量动画特效
│   └── text-crystal-ball-effect/ # 文字水晶球特效
├── project/                  # 儿童生日祝福视频生成器 🆕
│   ├── src/
│   │   ├── components/       # 模块化分镜组件
│   │   ├── compositions/     # 主组合组件
│   │   ├── schemas/          # 参数 Schema
│   │   ├── types/            # 类型定义
│   │   └── utils/            # 工具函数
│   └── package.json
└── scripts/                  # 工具脚本
    └── install-chrome.js
```

## 特性

### 1. 依赖共享（npm workspaces）
- 所有 Remotion 相关依赖安装在根目录
- 子项目自动共享根目录的 node_modules
- 减少磁盘占用和安装时间
- 统一版本管理

### 2. 公共组件复用
- **角色系统**：生肖守护神、萌宠精灵、勇气超人三大系列
- **魔法效果**：光粒聚集、烟花绽放、气球爆炸、流星、星空背景等
- **彩带粒子**：多形状彩带爆炸效果
- **卡通元素**：气球、星星、蛋糕、火箭、独角兽、爱心、皇冠
- **对话气泡**：支持多种位置和样式

### 3. 统一 API 管理
- 所有特效项目通过统一 API 调用
- 支持动态添加新特效项目
- 统一的任务状态查询和下载接口
- 支持组合特效（顺序拼接、叠加混合、转场合并）

### 4. 配置驱动架构
- 每个特效项目的参数定义在独立配置文件中
- 新增特效无需修改核心代码
- 自动处理参数验证和转换

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动 API 服务

```bash
npm run api
```

服务将在 http://localhost:3001 启动。

### 3. 开发特效项目

```bash
npm run dev:text-rain
```

## 公共组件使用

### 角色系统

```tsx
import { Character, SpeechBubble, CharacterWithSpeech } from '../../effects/shared';

// 单独使用角色
<Character
  series="zodiac"
  type="tiger"
  size={180}
  expression="happy"
  inline={true}
/>

// 带对话气泡的角色组合
<CharacterWithSpeech
  series="zodiac"
  type="tiger"
  speech="你好呀！"
  showSpeech={true}
/>
```

### 魔法效果

```tsx
import { 
  MagicParticles, Firework, BalloonBurst, 
  StarFieldBackground, WhiteFlashTransition 
} from '../../effects/shared';

// 魔法光粒聚集
<MagicParticles color="#B892FF" particleCount={80} />

// 烟花绽放
<Firework x={0.5} y={0.4} color="#FFD76A" />

// 气球爆炸
<BalloonBurst balloonCount={12} />

// 星空背景
<StarFieldBackground starCount={150} />

// 白闪转场
<WhiteFlashTransition durationInFrames={20} />
```

### 彩带粒子

```tsx
import { ConfettiBurst } from '../../effects/shared';

<ConfettiBurst 
  primaryColor="#FFD76A"
  level="high"
  seed={123}
/>
```

### 卡通元素

```tsx
import { CartoonElements } from '../../effects/shared';

<CartoonElements
  defaultColor="#FFD76A"
  elements={[
    { type: 'balloon', position: 'top', count: 3, color: '#FF6FAF' },
    { type: 'star', position: 'around', count: 8, color: '#FFD93D' },
    { type: 'cake', position: 'bottom', count: 1, color: '#8DECB4' }
  ]}
/>
```

## 添加新特效项目

### 步骤 1：创建项目目录

```bash
mkdir effects/your-effect
```

### 步骤 2：创建组合组件

```tsx
// effects/your-effect/src/YourComposition.tsx
import { BaseComposition, CompleteCompositionSchema } from "../../shared";

export const YourComposition: React.FC = ({ words, ...props }) => {
  return (
    <BaseComposition {...props}>
      {/* 特效内容 */}
    </BaseComposition>
  );
};
```

### 步骤 3：创建配置文件

```javascript
// api/effect-configs/your-effect.js
module.exports = {
  config: {
    id: 'your-effect',
    name: '你的特效',
    compositionId: 'YourComposition',
    path: path.join(__dirname, '../../effects/your-effect')
  },
  params: { /* 参数定义 */ },
  validate: (params) => { /* 验证逻辑 */ },
  buildRenderParams: (reqParams, commonParams) => { /* 构建参数 */ }
};
```

### 步骤 4：注册配置

```javascript
// api/effect-configs/index.js
const effectConfigs = {
  'your-effect': require('./your-effect')
};
```

## API 接口

### 获取所有项目
```bash
GET http://localhost:3001/api/projects
```

### 创建渲染任务
```bash
POST http://localhost:3001/api/render/:projectId
Content-Type: application/json

{
  "words": ["福", "禄", "寿"],
  "duration": 5
}
```

### 创建组合特效
```bash
POST http://localhost:3001/api/compose
Content-Type: application/json

{
  "mergeMode": "sequence",
  "effects": [
    { "projectId": "tai-chi-bagua-effect", "duration": 5 },
    { "projectId": "text-firework-effect", "words": ["新年快乐"], "duration": 8 }
  ]
}
```

## 常用命令

```bash
npm install              # 安装依赖
npm run api              # 启动 API 服务
npm run chrome:all       # 下载并链接 Chrome
npm run clean:all        # 清理所有 node_modules
```

## 项目地址

- GitHub: https://github.com/opq007/remo-fects
- 问题反馈: 提交 GitHub Issue
