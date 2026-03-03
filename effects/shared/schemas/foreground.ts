/**
 * 前景组件 Schema 定义
 * 
 * 定义前景组件的参数 Schema，供各特效项目复用
 */

import { z } from "zod";

/**
 * 前景动画效果类型 Schema
 */
export const ForegroundAnimationTypeSchema = z.enum([
  "none",        // 无动画
  "zoom-in",     // 镜头推进
  "zoom-out",    // 镜头拉远
  "fade-in",     // 淡入
  "fade-out",    // 淡出
  "slide-up",    // 从下往上滑入
  "slide-down",  // 从上往下滑入
  "scale-pulse", // 缩放脉冲
  "breath",      // 呼吸效果
  "rotate-zoom", // 旋转并缩放
]);

/**
 * 前景类型 Schema
 */
export const ForegroundTypeSchema = z.enum(["image", "video"]);

/**
 * 前景组件 Props Schema
 */
export const ForegroundSchema = z.object({
  /** 是否启用前景 */
  foregroundEnabled: z.boolean().optional().meta({
    description: "是否启用前景",
  }),

  /** 前景类型：图片或视频 */
  foregroundType: ForegroundTypeSchema.optional().meta({
    description: "前景类型：image 或 video",
  }),

  /** 前景源文件路径 */
  foregroundSource: z.string().optional().meta({
    description: "前景源文件路径（本地 public 目录、网络 URL 或 Data URL）",
  }),

  // ===== 尺寸与位置 =====
  /** 宽度 */
  foregroundWidth: z.number().int().positive().optional().meta({
    description: "前景宽度（像素），默认使用视频宽度",
  }),

  /** 高度 */
  foregroundHeight: z.number().int().positive().optional().meta({
    description: "前景高度（像素），默认使用视频高度",
  }),

  /** 垂直偏移 */
  foregroundVerticalOffset: z.number().optional().meta({
    description: "垂直偏移（像素），正数向下，负数向上",
  }),

  /** 水平偏移 */
  foregroundHorizontalOffset: z.number().optional().meta({
    description: "水平偏移（像素），正数向右，负数向左",
  }),

  /** 缩放比例 */
  foregroundScale: z.number().min(0.1).max(3).optional().meta({
    description: "前景缩放比例",
  }),

  // ===== 动画配置 =====
  /** 动画类型 */
  foregroundAnimationType: ForegroundAnimationTypeSchema.optional().meta({
    description: "前景动画类型",
  }),

  /** 动画开始帧 */
  foregroundAnimationStartFrame: z.number().int().min(0).optional().meta({
    description: "动画开始帧",
  }),

  /** 动画持续时间 */
  foregroundAnimationDuration: z.number().int().min(1).optional().meta({
    description: "动画持续时间（帧），默认 60 帧",
  }),

  /** 动画强度系数 */
  foregroundAnimationIntensity: z.number().min(0).max(2).optional().meta({
    description: "动画强度系数（0-2）",
  }),

  /** 是否使用弹簧动画 */
  foregroundUseSpring: z.boolean().optional().meta({
    description: "是否使用弹簧动画效果",
  }),

  /** 弹簧阻尼 */
  foregroundSpringDamping: z.number().min(1).max(30).optional().meta({
    description: "弹簧阻尼系数",
  }),

  /** 弹簧刚度 */
  foregroundSpringStiffness: z.number().min(10).max(500).optional().meta({
    description: "弹簧刚度",
  }),

  // ===== 样式配置 =====
  /** 透明度 */
  foregroundOpacity: z.number().min(0).max(1).optional().meta({
    description: "前景透明度（0-1）",
  }),

  /** 混合模式 */
  foregroundMixBlendMode: z.enum([
    "normal", "multiply", "screen", "overlay", "darken", "lighten",
    "color-dodge", "color-burn", "hard-light", "soft-light", "difference",
    "exclusion", "hue", "saturation", "color", "luminosity"
  ]).optional().meta({
    description: "CSS 混合模式",
  }),

  /** 对象适应方式 */
  foregroundObjectFit: z.enum(["cover", "contain", "fill", "none"]).optional().meta({
    description: "对象适应方式",
  }),

  /** z-index 层级 */
  foregroundZIndex: z.number().int().optional().meta({
    description: "前景 z-index 层级",
  }),

  // ===== 视频特有配置 =====
  /** 视频是否循环 */
  foregroundVideoLoop: z.boolean().optional().meta({
    description: "视频前景是否循环播放",
  }),

  /** 视频是否静音 */
  foregroundVideoMuted: z.boolean().optional().meta({
    description: "视频前景是否静音",
  }),

  // ===== 持续动画 =====
  /** 是否启用持续动画 */
  foregroundContinuousAnimation: z.boolean().optional().meta({
    description: "是否启用持续动画（如呼吸效果）",
  }),

  /** 持续动画速度 */
  foregroundContinuousSpeed: z.number().min(0.1).max(5).optional().meta({
    description: "持续动画速度",
  }),
});

/**
 * 前景动画效果类型
 */
export type ForegroundAnimationType = z.infer<typeof ForegroundAnimationTypeSchema>;

/**
 * 前景类型
 */
export type ForegroundType = z.infer<typeof ForegroundTypeSchema>;

/**
 * 前景组件 Props（从 Schema 推导）
 */
export type ForegroundProps = z.infer<typeof ForegroundSchema>;

/**
 * 前景组件渲染 Props（用于组件内部使用）
 */
export interface ForegroundComponentProps {
  /** 前景类型：图片或视频 */
  type?: "image" | "video";
  /** 前景源文件路径 */
  source: string;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 垂直偏移 */
  verticalOffset?: number;
  /** 水平偏移 */
  horizontalOffset?: number;
  /** 缩放比例 */
  scale?: number;
  /** 动画类型 */
  animationType?: ForegroundAnimationType;
  /** 动画开始帧 */
  animationStartFrame?: number;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 动画强度系数 */
  animationIntensity?: number;
  /** 是否使用弹簧动画 */
  useSpring?: boolean;
  /** 弹簧阻尼 */
  springDamping?: number;
  /** 弹簧刚度 */
  springStiffness?: number;
  /** 透明度 */
  opacity?: number;
  /** 混合模式 */
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  /** 对象适应方式 */
  objectFit?: "cover" | "contain" | "fill" | "none";
  /** 是否启用 */
  enabled?: boolean;
  /** z-index 层级 */
  zIndex?: number;
  /** 视频是否循环 */
  videoLoop?: boolean;
  /** 视频是否静音 */
  videoMuted?: boolean;
  /** 是否启用持续动画 */
  continuousAnimation?: boolean;
  /** 持续动画速度 */
  continuousSpeed?: number;
}

/**
 * 从 Schema Props 提取组件 Props
 */
export function extractForegroundProps(props: ForegroundProps): ForegroundComponentProps | null {
  if (!props.foregroundEnabled || !props.foregroundSource) {
    return null;
  }

  return {
    type: props.foregroundType ?? "image",
    source: props.foregroundSource,
    width: props.foregroundWidth,
    height: props.foregroundHeight,
    verticalOffset: props.foregroundVerticalOffset ?? 0,
    horizontalOffset: props.foregroundHorizontalOffset ?? 0,
    scale: props.foregroundScale ?? 1,
    animationType: props.foregroundAnimationType ?? "none",
    animationStartFrame: props.foregroundAnimationStartFrame ?? 0,
    animationDuration: props.foregroundAnimationDuration ?? 60,
    animationIntensity: props.foregroundAnimationIntensity ?? 1,
    useSpring: props.foregroundUseSpring ?? true,
    springDamping: props.foregroundSpringDamping ?? 12,
    springStiffness: props.foregroundSpringStiffness ?? 100,
    opacity: props.foregroundOpacity ?? 1,
    mixBlendMode: props.foregroundMixBlendMode ?? "normal",
    objectFit: props.foregroundObjectFit ?? "cover",
    enabled: props.foregroundEnabled,
    zIndex: props.foregroundZIndex ?? 100,
    videoLoop: props.foregroundVideoLoop ?? true,
    videoMuted: props.foregroundVideoMuted ?? true,
    continuousAnimation: props.foregroundContinuousAnimation ?? false,
    continuousSpeed: props.foregroundContinuousSpeed ?? 1,
  };
}
