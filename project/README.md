# 儿童生日祝福视频生成器

基于 Remotion 框架的儿童生日祝福视频生成器，支持模块化分镜、角色系统、照片互动等功能。

## 快速开始

```bash
# 安装依赖（在根目录执行）
npm install

# 启动 Remotion Studio 预览
npm run dev

# 或指定端口
npm run dev:kids-birthday

# 渲染视频
npm run render:kids-birthday
```

## 功能特性

### 🎬 模块化分镜系统

视频由多个模块按时间顺序组成，支持 60 秒、90 秒、120 秒三种版本：

| 模块 | 名称 | 时间范围 | 说明 |
|------|------|----------|------|
| A | 魔法开场 | 0-2秒 | 黑屏 → 魔法光粒聚集 → 角色声音 |
| B | 角色入场 | 2-12秒 | 角色冲入画面 → 名字发光弹跳 → 气球爆开彩带 |
| C | 照片互动1 | 12-25秒 | 角色挥魔法棒 → 照片飞出 |
| D | 照片互动2 | 25-38秒 | 照片飞入 → 拥抱动作 → 爱心飘出 |
| E | 照片互动3 | 38-50秒 | 照片旋转入场 → 年龄气球上升 |
| F | 成长庆祝 | 50-60秒 | 烟花绽放 → 名字炸开（60秒截止点）|
| G | 生日歌 | 60-90秒 | 蛋糕升起 → 生日歌 → 许愿 |
| H | 未来祝福 | 90-105秒 | 角色飞到夜空 → 流星划过 |
| I | 梦想种子 | 105-115秒 | 梦想泡泡 → 职业图标 |
| J | 温暖收尾 | 115-120秒 | 角色挥手 → LOGO浮现 |

### 🐯 角色系统

支持三大角色系列：

- **生肖守护神系列**（12生肖）：rat, ox, tiger, rabbit, dragon, snake, horse, goat, monkey, rooster, dog, pig
- **萌宠精灵系列**：bunny, kitten, puppy, bear, fox, panda
- **勇气超人系列**：superhero, astronaut, knight, wizard, pirate

### 🎨 风格模板

- `girl_unicorn`：女孩独角兽风格（草莓粉 + 紫罗兰）
- `boy_rocket`：男孩火箭风格（天空蓝 + 薄荷绿）
- `animal`：可爱动物风格（薄荷绿 + 奶油黄）
- `general`：通用派对风格（奶油黄 + 天空蓝）

### 📐 屏幕方向

- `portrait`：竖屏（720x1280，适合抖音、快手）
- `landscape`：横屏（1280x720，适合微信视频号、B站）

## 项目结构

```
project/src/
├── index.ts                    # 入口文件
├── Root.tsx                    # Remotion Root 组件
├── components/                 # 组件目录
│   ├── Character.tsx           # 角色组件
│   ├── BouncingName.tsx        # 弹跳名字组件
│   ├── ConfettiBurst.tsx       # 彩带烟花组件
│   ├── BirthdaySong.tsx        # 生日歌组件
│   ├── DreamBubbles.tsx        # 梦想泡泡组件
│   ├── MagicEffects.tsx        # 魔法效果组件
│   ├── PhotoInteraction.tsx    # 照片互动组件
│   ├── Modules.tsx             # 模块聚合组件
│   └── ...
├── compositions/               # 组合组件目录
│   ├── KidsBirthdayComposition.tsx  # 儿童生日祝福主组合
│   └── index.ts
├── schemas/                    # Zod Schema 定义
│   ├── index.ts                # 主 Schema 和辅助函数
│   └── ...
├── types/                      # TypeScript 类型定义
│   ├── index.ts                # 类型、常量、默认配置
│   └── ...
└── utils/                      # 工具函数
    ├── colors.ts               # 颜色工具
    ├── easing.ts               # 缓动函数
    └── index.ts
```

## 主要参数说明

### 基本参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | '小明' | 主角名字 |
| age | number | 6 | 年龄 |
| message | string | '愿你每天开心成长' | 祝福语 |
| videoVersion | '60s' \| '90s' \| '120s' | '120s' | 视频版本 |

### 角色参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| characterSeries | 'zodiac' \| 'pet' \| 'hero' | 'zodiac' | 角色系列 |
| characterType | string | 'tiger' | 角色类型 |

### 照片参数

```typescript
photos: [
  {
    src: '照片URL或路径',
    caption: '照片标题',
    memory: '角色说的回忆文案'
  }
]
```

### 梦想参数

```typescript
dreams: ['astronaut', 'artist', 'racer']  // 最多5个
```

可用值：astronaut, artist, racer, doctor, teacher, scientist, musician, athlete, chef, pilot

## 开发指南

### 添加新模块

1. 在 `components/` 创建新组件
2. 在 `Modules.tsx` 中添加导出
3. 在 `KidsBirthdayComposition.tsx` 中配置时间

### 添加新角色

1. 在 `types/index.ts` 的角色配置中添加新角色
2. 更新 `schemas/index.ts` 的类型枚举

### 添加新风格

1. 在 `types/index.ts` 的 `KIDS_COLOR_THEMES` 中添加配色
2. 更新 `KidsSubStyleSchema` 枚举

## 依赖关系

本项目依赖根目录的共享模块：

- `effects/shared/components` - 公共组件（BaseComposition 等）
- `effects/shared/schemas` - 公共 Schema
- `effects/shared/utils` - 公共工具函数

## 相关文档

- [AGENTS.md](./AGENTS.md) - AI 开发上下文文档
- [根目录 README](../README.md) - 项目总览
