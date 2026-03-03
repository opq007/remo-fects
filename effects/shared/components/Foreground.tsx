/**
 * 前景组件 (Foreground)
 * 
 * 支持图片、视频前景，可设置宽高、垂直偏移、镜头推进效果等动画
 * 在 BaseComposition 中位于水印层之前渲染
 */

import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import { isNetworkUrl, isDataUrl } from "./MixedInputItem";

/**
 * 前景动画效果类型
 */
export type ForegroundAnimationType =
  | "none"       // 无动画
  | "zoom-in"    // 镜头推进（从小到大）
  | "zoom-out"   // 镜头拉远（从大到小）
  | "fade-in"    // 淡入
  | "fade-out"   // 淡出
  | "slide-up"   // 从下往上滑入
  | "slide-down" // 从上往下滑入
  | "scale-pulse" // 缩放脉冲
  | "breath"     // 呼吸效果（缓慢缩放）
  | "rotate-zoom"; // 旋转并缩放

/**
 * 前景组件 Props
 */
export interface ForegroundProps {
  /** 前景类型：图片或视频 */
  type?: "image" | "video";
  /** 前景源文件路径（本地 public 目录、网络 URL 或 Data URL） */
  source: string;
  
  // ===== 尺寸与位置 =====
  /** 宽度（像素），默认使用视频宽度 */
  width?: number;
  /** 高度（像素），默认使用视频高度 */
  height?: number;
  /** 垂直偏移（像素），正数向下，负数向上，默认 0 */
  verticalOffset?: number;
  /** 水平偏移（像素），正数向右，负数向左，默认 0 */
  horizontalOffset?: number;
  /** 缩放比例，默认 1 */
  scale?: number;
  
  // ===== 动画配置 =====
  /** 动画类型，默认 none */
  animationType?: ForegroundAnimationType;
  /** 动画开始帧，默认 0 */
  animationStartFrame?: number;
  /** 动画持续时间（帧），默认 60（约 2.5 秒 @24fps） */
  animationDuration?: number;
  /** 动画强度系数（0-2），默认 1 */
  animationIntensity?: number;
  /** 是否使用弹簧动画，默认 true */
  useSpring?: boolean;
  /** 弹簧阻尼，默认 12 */
  springDamping?: number;
  /** 弹簧刚度，默认 100 */
  springStiffness?: number;
  
  // ===== 样式配置 =====
  /** 透明度（0-1），默认 1 */
  opacity?: number;
  /** 混合模式，默认 normal */
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  /** 对象适应方式，默认 cover */
  objectFit?: "cover" | "contain" | "fill" | "none";
  /** 是否启用，默认 true */
  enabled?: boolean;
  /** z-index 层级，默认 100 */
  zIndex?: number;
  
  // ===== 视频特有配置 =====
  /** 视频是否循环，默认 true */
  videoLoop?: boolean;
  /** 视频是否静音，默认 true */
  videoMuted?: boolean;
  
  // ===== 高级动画 =====
  /** 是否启用持续动画（如呼吸效果），默认 false */
  continuousAnimation?: boolean;
  /** 持续动画速度，默认 1 */
  continuousSpeed?: number;
}

/**
 * 前景组件
 * 
 * 支持多种动画效果的前景层组件，可设置图片或视频作为前景
 * 
 * @example
 * // 基础图片前景
 * <Foreground
 *   type="image"
 *   source="foreground.png"
 *   verticalOffset={100}
 * />
 * 
 * // 带镜头推进效果的视频前景
 * <Foreground
 *   type="video"
 *   source="overlay.mp4"
 *   animationType="zoom-in"
 *   animationDuration={90}
 * />
 * 
 * // 淡入呼吸效果
 * <Foreground
 *   type="image"
 *   source="logo.png"
 *   width={400}
 *   height={400}
 *   animationType="breath"
 *   continuousAnimation
 * />
 */
export const Foreground: React.FC<ForegroundProps> = ({
  type = "image",
  source,
  width,
  height,
  verticalOffset = 0,
  horizontalOffset = 0,
  scale = 1,
  animationType = "none",
  animationStartFrame = 0,
  animationDuration = 60,
  animationIntensity = 1,
  useSpring = true,
  springDamping = 12,
  springStiffness = 100,
  opacity = 1,
  mixBlendMode = "normal",
  objectFit = "cover",
  enabled = true,
  zIndex = 100,
  videoLoop = true,
  videoMuted = true,
  continuousAnimation = false,
  continuousSpeed = 1,
}) => {
  const { width: videoWidth, height: videoHeight, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // 如果禁用或无源文件，不渲染
  if (!enabled || !source) return null;

  // 计算实际尺寸
  const actualWidth = width ?? videoWidth;
  const actualHeight = height ?? videoHeight;

  // 计算动画进度和变换
  const animatedStyle = useMemo(() => {
    const relativeFrame = frame - animationStartFrame;
    const progress = Math.min(1, Math.max(0, relativeFrame / animationDuration));
    
    let transform = "";
    let animatedOpacity = opacity;
    let animatedScale = scale;

    // 入场动画
    if (relativeFrame >= 0 && animationType !== "none") {
      // 计算动画进度（支持弹簧动画）
      let animationProgress = progress;
      
      if (useSpring && progress < 1) {
        const { fps: configFps } = { fps };
        animationProgress = spring({
          frame: relativeFrame,
          fps: configFps,
          config: {
            damping: springDamping,
            stiffness: springStiffness,
          },
        });
      }

      const intensity = animationIntensity;

      switch (animationType) {
        case "zoom-in":
          // 从 0.5 缩放到 1
          animatedScale = scale * interpolate(animationProgress, [0, 1], [0.5, 1]);
          break;

        case "zoom-out":
          // 从 1.5 缩放到 1
          animatedScale = scale * interpolate(animationProgress, [0, 1], [1.5, 1]);
          break;

        case "fade-in":
          // 从 0 到目标透明度
          animatedOpacity = interpolate(animationProgress, [0, 1], [0, opacity]);
          break;

        case "fade-out":
          // 从目标透明度到 0
          animatedOpacity = interpolate(animationProgress, [0, 1], [opacity, 0]);
          break;

        case "slide-up":
          // 从下往上滑入
          const slideUpY = interpolate(animationProgress, [0, 1], [videoHeight * 0.3, 0]);
          transform = `translateY(${slideUpY}px)`;
          break;

        case "slide-down":
          // 从上往下滑入
          const slideDownY = interpolate(animationProgress, [0, 1], [-videoHeight * 0.3, 0]);
          transform = `translateY(${slideDownY}px)`;
          break;

        case "scale-pulse":
          // 缩放脉冲：从小到大再到小
          const pulseProgress = animationProgress < 0.5
            ? interpolate(animationProgress, [0, 0.5], [0.8, 1.2 * intensity])
            : interpolate(animationProgress, [0.5, 1], [1.2 * intensity, 1]);
          animatedScale = scale * pulseProgress;
          break;

        case "rotate-zoom":
          // 旋转并缩放
          const rotateAngle = interpolate(animationProgress, [0, 1], [-180, 0]);
          animatedScale = scale * interpolate(animationProgress, [0, 1], [0.5, 1]);
          transform = `rotate(${rotateAngle}deg)`;
          break;

        case "breath":
          // 呼吸效果会持续，这里只做入场淡入
          animatedOpacity = interpolate(animationProgress, [0, 1], [0, opacity]);
          break;

        default:
          break;
      }
    }

    // 持续动画（如呼吸效果）
    if (continuousAnimation && relativeFrame >= 0) {
      const time = frame / fps;
      
      if (animationType === "breath" || continuousAnimation) {
        // 呼吸效果：缓慢的缩放变化
        const breathScale = 1 + Math.sin(time * continuousSpeed * 2) * 0.05 * animationIntensity;
        animatedScale *= breathScale;
      }
    }

    // 构建最终变换
    const finalTransform = `translate(-50%, -50%) translateY(${verticalOffset}px) translateX(${horizontalOffset}px) scale(${animatedScale}) ${transform}`;

    return {
      transform: finalTransform,
      opacity: animatedOpacity,
    };
  }, [
    frame, animationStartFrame, animationDuration, animationType, animationIntensity,
    useSpring, springDamping, springStiffness, scale, opacity, verticalOffset, horizontalOffset,
    continuousAnimation, continuousSpeed, fps, videoHeight
  ]);

  // 渲染图片前景
  const renderImage = () => {
    const imgSrc = isNetworkUrl(source) || isDataUrl(source) ? source : staticFile(source);
    
    return (
      <Img
        src={imgSrc}
        style={{
          width: actualWidth,
          height: actualHeight,
          objectFit,
        }}
      />
    );
  };

  // 渲染视频前景
  const renderVideo = () => {
    const videoSrc = isNetworkUrl(source) || isDataUrl(source) ? source : staticFile(source);
    
    return (
      <Video
        src={videoSrc}
        style={{
          width: actualWidth,
          height: actualHeight,
          objectFit,
        }}
        loop={videoLoop}
        muted={videoMuted}
      />
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: actualWidth,
        height: actualHeight,
        mixBlendMode,
        zIndex,
        pointerEvents: "none",
        ...animatedStyle,
      }}
    >
      {type === "image" ? renderImage() : renderVideo()}
    </div>
  );
};

export default Foreground;
