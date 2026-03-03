# 文字水晶球特效 (Text Crystal Ball Effect)

一个炫酷的 3D 水晶球特效，支持文字、图片、祝福图案混合内容在透明水晶球内部旋转展示。

## 效果预览

水晶球内部的文字/图片随球体旋转，前方内容清晰明亮，后方内容暗淡模糊，营造出真实的立体通透感。

## 特性

- **立体水晶球**：透明玻璃质感，多层渐变实现真实光影效果
- **混合内容支持**：文字、图片、祝福图案可自由组合
- **深度透视**：前方内容更大更亮，后方更小更暗
- **三轴旋转**：支持 X/Y/Z 轴独立控制旋转速度
- **镜头推进**：支持球体逐渐接近屏幕的动画效果
- **入场动画**：缩放淡入效果

## 参数说明

### 内容配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `contentType` | string | `"text"` | 内容类型：`text` \| `image` \| `blessing` \| `mixed` |
| `words` | string[] | `[]` | 文字列表 |
| `images` | string[] | `[]` | 图片路径列表 |
| `imageWeight` | number | `0.5` | mixed 模式下图片出现权重 (0-1) |
| `blessingTypes` | string[] | `[]` | 祝福图案类型：`goldCoin` \| `moneyBag` \| `luckyBag` \| `redPacket` |
| `blessingStyle` | object | `{}` | 祝福图案样式配置 |

### 水晶球配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `ballRadius` | number | `200` | 水晶球半径 (50-400) |
| `ballColor` | string | `"#4169E1"` | 水晶球颜色 |
| `ballOpacity` | number | `0.3` | 水晶球透明度 (0-1) |
| `glowColor` | string | `"#87CEEB"` | 发光颜色 |
| `glowIntensity` | number | `1` | 发光强度 (0-2) |

### 位置配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `verticalOffset` | number | `0.5` | 垂直偏移：0=顶部，0.5=居中，1=底部 |

### 旋转动画配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `rotationSpeedX` | number | `0.2` | X 轴旋转速度 (0-2) |
| `rotationSpeedY` | number | `0.5` | Y 轴旋转速度 (0-2) |
| `rotationSpeedZ` | number | `0.1` | Z 轴旋转速度 (0-2) |
| `autoRotate` | boolean | `true` | 是否自动旋转 |

### 镜头推进配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `zoomEnabled` | boolean | `false` | 是否启用镜头推进 |
| `zoomProgress` | number | `0` | 推进进度 (0=正常，1=最近) |

### 内容数量与尺寸

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `particleCount` | number | `30` | 球面内容数量 (10-100) |
| `fontSizeRange` | [number, number] | `[30, 60]` | 字体大小范围 |
| `imageSizeRange` | [number, number] | `[40, 80]` | 图片大小范围 |
| `blessingSizeRange` | [number, number] | `[35, 70]` | 祝福图案大小范围 |

### 样式配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `textStyle` | object | `{}` | 文字样式：`color`, `effect`, `effectIntensity`, `fontWeight` |
| `perspective` | number | `1000` | 3D 透视距离 (200-2000) |
| `entranceDuration` | number | `30` | 入场动画时长（帧） |
| `seed` | number | 随机 | 随机种子 |

## 使用示例

### 基础用法

```bash
# 启动 Remotion Studio 预览
npm run dev:crystal-ball
```

### API 调用

```bash
# 渲染文字水晶球
POST http://localhost:3001/api/render/text-crystal-ball-effect
Content-Type: application/json

{
  "words": ["福", "禄", "寿", "喜", "财", "旺"],
  "ballRadius": 250,
  "rotationSpeedY": 0.8,
  "particleCount": 40
}
```

### 混合内容模式

```json
{
  "contentType": "mixed",
  "words": ["福", "禄", "寿"],
  "images": ["coin.png", "gold.png"],
  "imageWeight": 0.3,
  "blessingTypes": ["goldCoin", "redPacket"],
  "ballRadius": 280,
  "glowIntensity": 1.2
}
```

### 启用镜头推进

```json
{
  "words": ["新年快乐"],
  "zoomEnabled": true,
  "zoomProgress": 0.5,
  "ballRadius": 300
}
```

## 开发命令

```bash
# 安装依赖
npm install

# 启动 Remotion Studio
npm run start

# 渲染视频
npm run render

# 构建生产版本
npm run build
```

## 技术实现

- **球面分布**：使用斐波那契球面分布算法均匀放置内容
- **深度透视**：根据 Z 轴位置动态调整大小和透明度
- **3D 变换**：CSS `transform-style: preserve-3d` 实现立体效果
- **渲染顺序**：内容先渲染，水晶球外壳后渲染（作为遮罩）

## 文件结构

```
text-crystal-ball-effect/
├── src/
│   ├── index.ts                    # 入口文件
│   ├── Root.tsx                    # Remotion Root
│   ├── CrystalBall.tsx             # 水晶球核心组件
│   └── TextCrystalBallComposition.tsx  # 组合组件
├── public/                         # 静态资源
├── package.json
├── tsconfig.json
└── remotion.config.ts
```
