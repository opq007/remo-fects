# 儿童生日祝福视频生成器 - AI 开发上下文

## 项目概述

这是一个基于 Remotion 框架的儿童生日祝福视频生成器，采用模块化分镜系统，支持角色系统、照片互动、梦想泡泡等功能。

## 核心架构

### 模块化分镜系统

视频由 10 个模块（A-J）按时间顺序组成，每个模块是一个独立的 React 组件：

```
模块时间线（120秒完整版）：
├── A: 魔法开场 (0-2s) ────────────────┐
├── B: 角色入场 (2-12s) ───────────────┤
├── C: 照片互动1 (12-25s) ─────────────┤ 可裁剪
├── D: 照片互动2 (25-38s) ─────────────┤ 可裁剪
├── E: 照片互动3 (38-50s) ─────────────┤ 可裁剪
├── F: 成长庆祝 (50-60s) ──────────────┤ 60秒版本截止
├── G: 生日歌 (60-90s) ────────────────┤
├── H: 未来祝福 (90-105s) ─────────────┤ 可裁剪
├── I: 梦想种子 (105-115s) ────────────┤ 可裁剪
└── J: 温暖收尾 (115-120s) ────────────┘
```

**重要：模块与视频版本的对应关系**

| 版本 | 模块列表 | 说明 |
|------|----------|------|
| 60s | A, B, C, D, E, F | 模块 F 结束时刚好 60 秒 |
| 90s | A, B, C, D, E, F, G, H | 模块 H 结束时刚好 90 秒 |
| 120s | A, B, C, D, E, F, G, H, I, J | 完整版 |

**注意：** 修改 `getModulesByVersion` 函数时，确保返回的模块不会超出视频总时长。

### 角色系统

三大角色系列，每个角色有独立的配色和问候语：

```typescript
// 生肖守护神（12种）
characterSeries: 'zodiac'
characterType: 'tiger' | 'rabbit' | 'dragon' | ...

// 萌宠精灵（6种）
characterSeries: 'pet'
characterType: 'bunny' | 'kitten' | 'puppy' | ...

// 勇气超人（5种）
characterSeries: 'hero'
characterType: 'astronaut' | 'superhero' | ...
```

角色配置在 `types/index.ts` 中定义：
- `ZODIAC_CHARACTERS` - 生肖角色
- `PET_CHARACTERS` - 萌宠角色
- `HERO_CHARACTERS` - 超人角色

### 颜色系统

主色调（`PRIMARY_COLORS`）：
```typescript
creamYellow: '#FFD76A'    // 奶油黄
skyBlue: '#7EC8FF'        // 天空蓝
strawberryPink: '#FF8FA3' // 草莓粉
mintGreen: '#82E6C5'      // 薄荷绿
violet: '#B892FF'         // 紫罗兰
```

风格配色（`KIDS_COLOR_THEMES`）：
- `girl_unicorn`：女孩独角兽（草莓粉 + 紫罗兰）
- `boy_rocket`：男孩火箭（天空蓝 + 薄荷绿）
- `animal`：可爱动物（薄荷绿 + 奶油黄）
- `general`：通用派对（奶油黄 + 天空蓝）

## 关键文件说明

### schemas/index.ts

包含所有 Zod Schema 定义和辅助函数：

- `KidsBirthdaySchema` - 主参数 Schema
- `getModulesByVersion(version)` - 根据版本获取模块列表
- `getDurationByVersion(version)` - 根据版本获取时长
- `getCharacterTypes(series)` - 根据系列获取可选角色类型

### types/index.ts

包含所有 TypeScript 类型定义和常量：

- 角色配置（`ZODIAC_CHARACTERS`, `PET_CHARACTERS`, `HERO_CHARACTERS`）
- 模块配置（`MODULE_CONFIGS`）
- 颜色配置（`PRIMARY_COLORS`, `KIDS_COLOR_THEMES`）
- 默认参数（`DEFAULT_KIDS_BIRTHDAY_PARAMS`）

### compositions/KidsBirthdayComposition.tsx

主组合组件，负责：

1. 解析和验证参数
2. 计算模块时间配置
3. 渲染各个模块的 Sequence
4. 处理背景、音频、水印等公共层

**关键代码段：**

```typescript
// 模块时间配置
const moduleTimings = useMemo(() => {
  const timings: Record<string, { from: number; durationInFrames: number }> = {};
  timings.A = { from: 0, durationInFrames: 2 * fps };
  timings.B = { from: 2 * fps, durationInFrames: 10 * fps };
  // ... 其他模块
  return timings;
}, [fps]);

// 渲染模块
{modules.includes('A') && (
  <Sequence from={moduleTimings.A.from} durationInFrames={moduleTimings.A.durationInFrames}>
    <ModuleA_MagicOpening {...moduleProps} />
  </Sequence>
)}
```

### components/Modules.tsx

模块组件聚合文件，导出所有模块组件：

- `ModuleA_MagicOpening` - 魔法开场
- `ModuleB_CharacterEntrance` - 角色入场
- `ModuleC_PhotoInteraction1` - 照片互动1
- ... 等

## 开发规范

### 动画帧计算注意事项

1. **spring() 函数的 frame 参数必须 >= 0**

```typescript
// ❌ 错误：frame 可能为负数
const progress = spring({ frame: frame - 15, fps, ... });

// ✅ 正确：确保 frame >= 0
const progress = spring({ frame: Math.max(frame - 15, 0), fps, ... });
```

2. **interpolate() 需要设置 extrapolateRight: 'clamp'**

```typescript
// ❌ 可能超出范围
const opacity = interpolate(progress, [0, 1], [0, 1]);

// ✅ 确保值在范围内
const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
```

3. **HSL 颜色的 hue 值必须 >= 0**

```typescript
// ❌ hue 可能为负数
const hue = parseInt(color.slice(1), 16) % 360 + offset;

// ✅ 确保 hue >= 0
const hue = (parseInt(color.slice(1), 16) % 360 + offset + 360) % 360;
```

### Sequence 组件使用

```typescript
// 正确使用 Sequence
<Sequence 
  from={startTime}           // 开始帧
  durationInFrames={duration} // 持续帧数
  name="模块名称"             // 用于调试
>
  <ModuleComponent {...props} />
</Sequence>
```

**注意：** `from` + `durationInFrames` 不应超过视频总帧数，否则会报错。

### 组件结构规范

模块组件应该接收统一的 props 结构：

```typescript
interface ModuleProps {
  name: string;
  age?: number;
  theme: ColorTheme;
  characterConfig: CharacterConfig;
  animationSpeed: 'slow' | 'normal' | 'fast';
  confettiLevel: 'low' | 'medium' | 'high';
  // ... 其他通用参数
}
```

## 常见问题

### 1. 预览时某时间段报错

检查该时间段的模块组件：
- spring() 是否接收负数 frame
- interpolate() 是否缺少 clamp
- HSL 颜色计算是否产生负数

### 2. 修改视频版本后模块超时

检查 `getModulesByVersion` 返回的模块列表是否与视频时长匹配。

### 3. 角色显示异常

检查 `characterSeries` 和 `characterType` 是否匹配：
- zodiac 系列 → 使用 ZodiacType
- pet 系列 → 使用 PetType
- hero 系列 → 使用 HeroType

## 依赖关系

```
project/
├── 依赖 effects/shared/
│   ├── components/     # BaseComposition 等
│   ├── schemas/        # CompleteCompositionSchema 等
│   └── utils/          # 公共工具函数
│
└── 被依赖
    └── api/            # 通过 effect-configs 调用
```

## 扩展指南

### 添加新模块

1. 创建组件：`components/NewModule.tsx`
2. 导出组件：`components/Modules.tsx` 中添加导出
3. 配置时间：`compositions/KidsBirthdayComposition.tsx` 中添加 timing
4. 添加 Sequence：在组件中添加渲染逻辑

### 添加新角色

1. 定义配置：`types/index.ts` 中添加角色配置
2. 更新类型：`types/index.ts` 中添加类型定义
3. 更新 Schema：`schemas/index.ts` 中更新枚举

### 添加新风格

1. 定义配色：`types/index.ts` 中的 `KIDS_COLOR_THEMES`
2. 更新 Schema：`schemas/index.ts` 中的 `KidsSubStyleSchema`
3. 更新类型：`types/index.ts` 中的 `KidsSubStyle`
