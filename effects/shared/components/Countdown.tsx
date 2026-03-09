import React, { useMemo, useCallback } from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Audio,
  staticFile,
  Sequence,
  Easing,
} from 'remotion';

// ==================== 类型定义 ====================

/**
 * 倒计时类型
 * - number: 数字倒计时 (5, 4, 3, 2, 1)
 * - time: 时间倒计时 (MM:SS 格式)
 */
export type CountdownType = 'number' | 'time';

/**
 * 展示特效类型
 * - scale: 缩放脉冲
 * - rotate: 旋转
 * - bounce: 弹跳
 * - shake: 抖动
 * - glow: 发光闪烁
 * - flip3d: 3D 翻转
 * - zoomIn: 放大淡入
 * - spiral: 螺旋旋转
 * - heartbeat: 心跳效果
 * - pulse: 脉冲效果
 */
export type CountdownEffectType =
  | 'scale'
  | 'rotate'
  | 'bounce'
  | 'shake'
  | 'glow'
  | 'flip3d'
  | 'zoomIn'
  | 'spiral'
  | 'heartbeat'
  | 'pulse';

/**
 * 文字样式配置
 */
export interface CountdownTextStyle {
  /** 字体大小 */
  fontSize?: number;
  /** 字体粗细 */
  fontWeight?: number | string;
  /** 字体颜色 */
  color?: string;
  /** 描边颜色 */
  strokeColor?: string;
  /** 描边宽度 */
  strokeWidth?: number;
  /** 发光颜色 */
  glowColor?: string;
  /** 发光强度 */
  glowIntensity?: number;
  /** 3D 立体效果强度 */
  depth3D?: number;
  /** 字体族 */
  fontFamily?: string;
  /** 文字阴影 */
  textShadow?: string;
}

/**
 * 音效配置
 */
export interface CountdownAudioConfig {
  /** 是否启用音效 */
  enabled?: boolean;
  /** 每秒滴答音效源（本地路径或网络 URL） */
  tickSound?: string;
  /** 倒计时结束音效源 */
  endSound?: string;
  /** 音效音量 (0-1) */
  volume?: number;
}

/**
 * 最终文字特效配置
 */
export interface FinalTextEffect {
  /** 是否启用 */
  enabled?: boolean;
  /** 最终显示文字 */
  text?: string;
  /** 文字大小倍数 */
  scaleMultiplier?: number;
  /** 额外发光 */
  extraGlow?: boolean;
  /** 颜色变化 */
  colorChange?: string;
  /** 持续帧数 */
  durationInFrames?: number;
}

/**
 * Countdown 组件 Props
 */
export interface CountdownProps {
  // ===== 基础配置 =====
  /** 倒计时类型 */
  type?: CountdownType;
  /** 数字倒计时的起始数字 */
  startNumber?: number;
  /** 时间倒计时的总秒数 */
  totalSeconds?: number;
  /** 每个数字持续时间（帧），默认 fps */
  durationPerNumber?: number;
  /** 总持续帧数（自动计算每个数字的持续时间） */
  durationInFrames?: number;

  // ===== 展示特效 =====
  /** 特效类型 */
  effectType?: CountdownEffectType;
  /** 特效强度 (0-2) */
  effectIntensity?: number;
  /** 每个数字切换时的过渡帧数 */
  transitionFrames?: number;

  // ===== 文字样式 =====
  /** 文字样式配置 */
  textStyle?: CountdownTextStyle;

  // ===== 音效配置 =====
  /** 音效配置 */
  audio?: CountdownAudioConfig;

  // ===== 最终文字 =====
  /** 最终显示的文字效果 */
  finalText?: FinalTextEffect;

  // ===== 位置配置 =====
  /** 水平位置 (0-1)，默认 0.5 */
  x?: number;
  /** 垂直位置 (0-1)，默认 0.5 */
  y?: number;

  // ===== 其他配置 =====
  /** 是否显示背景 */
  showBackground?: boolean;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 背景模糊 */
  backgroundBlur?: number;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== 默认值 ====================

const DEFAULT_TEXT_STYLE: CountdownTextStyle = {
  fontSize: 200,
  fontWeight: 900,
  color: '#FFFFFF',
  strokeColor: '#FFD76A',
  strokeWidth: 4,
  glowColor: '#FFD76A',
  glowIntensity: 1,
  depth3D: 0,
  fontFamily: 'Arial, sans-serif',
};

const DEFAULT_EFFECT_INTENSITY = 1;
const DEFAULT_TRANSITION_FRAMES = 8;

// ==================== 工具函数 ====================

/**
 * 格式化时间为 MM:SS 格式
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * 计算 3D 文字阴影
 */
const calculate3DShadow = (depth: number, color: string): string => {
  if (depth <= 0) return '';
  const shadows: string[] = [];
  for (let i = 1; i <= depth; i++) {
    shadows.push(`${i * 2}px ${i * 2}px 0 ${color}`);
  }
  return shadows.join(', ');
};

/**
 * 计算发光效果
 */
const calculateGlow = (
  glowColor: string,
  intensity: number,
  extraGlow: boolean = false
): string => {
  const baseBlur = 20 * intensity;
  const extraBlur = extraGlow ? 40 : 0;
  const blur = baseBlur + extraBlur;
  return `0 0 ${blur}px ${glowColor}, 0 0 ${blur * 2}px ${glowColor}, 0 0 ${blur * 3}px ${glowColor}`;
};

// ==================== 特效计算函数 ====================

interface EffectResult {
  transform: string;
  opacity: number;
  filter?: string;
  textShadow?: string;
  color?: string;
  glow?: string;
}

/**
 * 计算缩放脉冲特效
 */
const calculateScaleEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number
): EffectResult => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  const scale = interpolate(
    progress,
    [0, 0.3, 0.6, 1],
    [0.5 * intensity, 1.2 * intensity, 0.95, 1]
  );

  const opacity = interpolate(progress, [0, 0.2], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return {
    transform: `scale(${scale})`,
    opacity,
  };
};

/**
 * 计算旋转特效
 */
const calculateRotateEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number
): EffectResult => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const rotation = interpolate(
    progress,
    [0, 0.5, 1],
    [-180 * intensity, 20 * intensity, 0]
  );

  const scale = interpolate(progress, [0, 1], [0.3, 1]);

  return {
    transform: `rotate(${rotation}deg) scale(${scale})`,
    opacity: progress,
  };
};

/**
 * 计算弹跳特效
 */
const calculateBounceEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number
): EffectResult => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  const bounce = Math.abs(Math.sin(progress * Math.PI * 3)) * (1 - progress) * intensity;
  const translateY = -bounce * 50;
  const scale = interpolate(progress, [0, 0.5, 1], [0.5, 1.3, 1]);

  return {
    transform: `translateY(${translateY}px) scale(${scale})`,
    opacity: interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
  };
};

/**
 * 计算抖动特效
 */
const calculateShakeEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number
): EffectResult => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 300 },
  });

  const shakeX = Math.sin(frame * 0.8) * 10 * intensity * (1 - progress * 0.5);
  const shakeY = Math.cos(frame * 1.2) * 5 * intensity * (1 - progress * 0.5);

  return {
    transform: `translate(${shakeX}px, ${shakeY}px) scale(${progress})`,
    opacity: progress,
  };
};

/**
 * 计算发光闪烁特效
 */
const calculateGlowEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number,
  glowColor: string
): EffectResult => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  const pulse = Math.sin(frame * 0.3) * 0.3 + 0.7;
  const glowIntensity = intensity * pulse;

  return {
    transform: `scale(${progress})`,
    opacity: progress,
    textShadow: calculateGlow(glowColor, glowIntensity, true),
  };
};

/**
 * 计算 3D 翻转特效
 */
const calculateFlip3DEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number
): EffectResult => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const rotateY = interpolate(progress, [0, 0.5, 1], [90 * intensity, -10, 0]);

  return {
    transform: `perspective(800px) rotateY(${rotateY}deg) scale(${progress})`,
    opacity: interpolate(progress, [0, 0.3, 1], [0, 0.5, 1], {
      extrapolateRight: 'clamp',
    }),
  };
};

/**
 * 计算放大淡入特效
 */
const calculateZoomInEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number
): EffectResult => {
  const progress = interpolate(frame, [0, transitionFrames], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const scale = interpolate(progress, [0, 1], [3 * intensity, 1]);

  return {
    transform: `scale(${scale})`,
    opacity: 1 - progress,
  };
};

/**
 * 计算螺旋旋转特效
 */
const calculateSpiralEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number
): EffectResult => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const rotation = progress * 360 * intensity;
  const scale = interpolate(progress, [0, 1], [0, 1]);

  return {
    transform: `rotate(${rotation}deg) scale(${scale})`,
    opacity: progress,
  };
};

/**
 * 计算心跳特效
 */
const calculateHeartbeatEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number
): EffectResult => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 150 },
  });

  const heartbeat = 1 + Math.sin(frame * 0.5) * 0.1 * intensity;
  const scale = progress * heartbeat;

  return {
    transform: `scale(${scale})`,
    opacity: progress,
  };
};

/**
 * 计算脉冲特效
 */
const calculatePulseEffect = (
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number
): EffectResult => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const pulse = 1 + Math.sin(frame * 0.4) * 0.15 * intensity;

  return {
    transform: `scale(${progress * pulse})`,
    opacity: progress,
  };
};

/**
 * 根据特效类型获取效果
 */
const getEffect = (
  effectType: CountdownEffectType,
  frame: number,
  fps: number,
  intensity: number,
  transitionFrames: number,
  glowColor?: string
): EffectResult => {
  const safeIntensity = Math.max(0.1, Math.min(2, intensity));

  switch (effectType) {
    case 'scale':
      return calculateScaleEffect(frame, fps, safeIntensity, transitionFrames);
    case 'rotate':
      return calculateRotateEffect(frame, fps, safeIntensity, transitionFrames);
    case 'bounce':
      return calculateBounceEffect(frame, fps, safeIntensity, transitionFrames);
    case 'shake':
      return calculateShakeEffect(frame, fps, safeIntensity, transitionFrames);
    case 'glow':
      return calculateGlowEffect(
        frame,
        fps,
        safeIntensity,
        transitionFrames,
        glowColor || '#FFD76A'
      );
    case 'flip3d':
      return calculateFlip3DEffect(frame, fps, safeIntensity, transitionFrames);
    case 'zoomIn':
      return calculateZoomInEffect(frame, fps, safeIntensity, transitionFrames);
    case 'spiral':
      return calculateSpiralEffect(frame, fps, safeIntensity, transitionFrames);
    case 'heartbeat':
      return calculateHeartbeatEffect(frame, fps, safeIntensity, transitionFrames);
    case 'pulse':
      return calculatePulseEffect(frame, fps, safeIntensity, transitionFrames);
    default:
      return { transform: 'scale(1)', opacity: 1 };
  }
};

// ==================== 主组件 ====================

/**
 * 倒计时组件
 *
 * 支持数字倒计时和时间倒计时两种模式，提供丰富的展示特效。
 *
 * @example
 * ```tsx
 * // 数字倒计时（5, 4, 3, 2, 1, Go!）
 * <Countdown
 *   type="number"
 *   startNumber={5}
 *   effectType="bounce"
 *   textStyle={{ fontSize: 150, color: '#FFD76A' }}
 *   finalText={{ enabled: true, text: 'Go!' }}
 * />
 *
 * // 时间倒计时
 * <Countdown
 *   type="time"
 *   totalSeconds={10}
 *   effectType="scale"
 * />
 * ```
 */
export const Countdown: React.FC<CountdownProps> = ({
  // 基础配置
  type = 'number',
  startNumber = 5,
  totalSeconds = 10,
  durationPerNumber,
  durationInFrames,

  // 展示特效
  effectType = 'scale',
  effectIntensity = DEFAULT_EFFECT_INTENSITY,
  transitionFrames = DEFAULT_TRANSITION_FRAMES,

  // 文字样式
  textStyle = {},

  // 音效配置
  audio,

  // 最终文字
  finalText,

  // 位置配置
  x = 0.5,
  y = 0.5,

  // 其他配置
  showBackground = false,
  backgroundColor,
  backgroundBlur,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 合并文字样式
  const mergedTextStyle = { ...DEFAULT_TEXT_STYLE, ...textStyle };

  // 计算每个数字的持续时间
  const effectiveDurationPerNumber = useMemo(() => {
    if (durationPerNumber) return durationPerNumber;
    if (durationInFrames) {
      const count = type === 'number' ? startNumber : totalSeconds;
      return Math.floor(durationInFrames / count);
    }
    return fps; // 默认 1 秒
  }, [durationPerNumber, durationInFrames, type, startNumber, totalSeconds, fps]);

  // 计算当前显示的数字
  const currentDisplay = useMemo(() => {
    const currentNumberIndex = Math.floor(frame / effectiveDurationPerNumber);

    if (type === 'number') {
      const number = startNumber - currentNumberIndex;
      if (number > 0) return number.toString();
      // 显示最终文字
      if (finalText?.enabled) {
        return finalText.text || 'Go!';
      }
      return null;
    } else {
      // 时间倒计时
      const remainingSeconds = totalSeconds - currentNumberIndex;
      if (remainingSeconds >= 0) {
        return formatTime(remainingSeconds);
      }
      if (finalText?.enabled) {
        return finalText.text || 'Go!';
      }
      return null;
    }
  }, [frame, effectiveDurationPerNumber, type, startNumber, totalSeconds, finalText]);

  // 当前数字内的帧数
  const frameInNumber = frame % effectiveDurationPerNumber;

  // 判断是否是最后一个数字（显示最终文字）
  const isFinalPhase = useMemo(() => {
    const maxIndex = type === 'number' ? startNumber : totalSeconds;
    return Math.floor(frame / effectiveDurationPerNumber) >= maxIndex;
  }, [frame, effectiveDurationPerNumber, type, startNumber, totalSeconds]);

  // 计算特效
  const effect = getEffect(
    effectType,
    frameInNumber,
    fps,
    effectIntensity,
    transitionFrames,
    mergedTextStyle.glowColor
  );

  // 计算最终文字特效
  const finalEffect = useMemo((): EffectResult | null => {
    if (!isFinalPhase || !finalText?.enabled) return null;

    const finalFrame = frame - (type === 'number' ? startNumber : totalSeconds) * effectiveDurationPerNumber;
    const progress = spring({
      frame: finalFrame,
      fps,
      config: { damping: 10, stiffness: 150 },
    });

    const scale = (finalText.scaleMultiplier || 1.5) * progress;

    return {
      transform: `scale(${scale})`,
      opacity: progress,
      color: finalText.colorChange || mergedTextStyle.color,
      textShadow: finalText.extraGlow
        ? calculateGlow(mergedTextStyle.glowColor || '#FFD76A', 2, true)
        : undefined,
      glow: finalText.extraGlow
        ? calculateGlow(mergedTextStyle.glowColor || '#FFD76A', 2, true)
        : undefined,
    };
  }, [isFinalPhase, finalText, frame, type, startNumber, totalSeconds, effectiveDurationPerNumber, fps, mergedTextStyle]);

  // 计算文字阴影
  const textShadow = useMemo(() => {
    const shadows: string[] = [];

    // 描边效果（通过多层阴影模拟）
    if (mergedTextStyle.strokeWidth && mergedTextStyle.strokeColor) {
      const sw = mergedTextStyle.strokeWidth;
      const sc = mergedTextStyle.strokeColor;
      shadows.push(
        `${sw}px 0 0 ${sc}`,
        `-${sw}px 0 0 ${sc}`,
        `0 ${sw}px 0 ${sc}`,
        `0 -${sw}px 0 ${sc}`,
        `${sw}px ${sw}px 0 ${sc}`,
        `-${sw}px ${sw}px 0 ${sc}`,
        `${sw}px -${sw}px 0 ${sc}`,
        `-${sw}px -${sw}px 0 ${sc}`
      );
    }

    // 3D 效果
    if (mergedTextStyle.depth3D && mergedTextStyle.depth3D > 0) {
      shadows.push(
        calculate3DShadow(mergedTextStyle.depth3D, mergedTextStyle.strokeColor || '#333')
      );
    }

    // 发光效果
    if (mergedTextStyle.glowColor && mergedTextStyle.glowIntensity) {
      shadows.push(
        calculateGlow(mergedTextStyle.glowColor, mergedTextStyle.glowIntensity)
      );
    }

    // 自定义阴影
    if (mergedTextStyle.textShadow) {
      shadows.push(mergedTextStyle.textShadow);
    }

    return shadows.join(', ') || undefined;
  }, [mergedTextStyle]);

  // 音效播放逻辑
  // 计算当前是第几个数字（从0开始）
  const currentNumberIndex = useMemo(() => {
    return Math.floor(frame / effectiveDurationPerNumber);
  }, [frame, effectiveDurationPerNumber]);

  // 计算总共有多少个数字要显示
  const totalNumbers = type === 'number' ? startNumber : totalSeconds;

  // 渲染所有数字的滴答音效
  const renderTickSounds = () => {
    if (!audio?.enabled || !audio?.tickSound) return null;

    const sounds: React.ReactNode[] = [];
    for (let i = 0; i < totalNumbers; i++) {
      const startFrame = i * effectiveDurationPerNumber;
      sounds.push(
        <Sequence
          key={`tick-${i}`}
          from={startFrame}
          durationInFrames={effectiveDurationPerNumber}
        >
          <Audio
            src={audio.tickSound.startsWith('http') ? audio.tickSound : staticFile(audio.tickSound)}
            volume={audio.volume ?? 0.5}
          />
        </Sequence>
      );
    }
    return sounds;
  };

  // 渲染结束音效
  const renderEndSound = () => {
    if (!audio?.enabled || !audio?.endSound) return null;

    const endStartFrame = totalNumbers * effectiveDurationPerNumber;
    return (
      <Sequence
        from={endStartFrame}
        durationInFrames={fps * 2}
      >
        <Audio
          src={audio.endSound.startsWith('http') ? audio.endSound : staticFile(audio.endSound)}
          volume={audio.volume ?? 0.5}
        />
      </Sequence>
    );
  };

  if (!currentDisplay) return null;

  // 应用最终特效或普通特效
  const activeEffect = isFinalPhase && finalEffect ? finalEffect : effect;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      {/* 背景 */}
      {showBackground && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: backgroundColor || 'rgba(0, 0, 0, 0.5)',
            backdropFilter: backgroundBlur ? `blur(${backgroundBlur}px)` : undefined,
          }}
        />
      )}

      {/* 倒计时数字 */}
      <div
        style={{
          position: 'absolute',
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          transform: `translate(-50%, -50%) ${activeEffect.transform}`,
          opacity: activeEffect.opacity,
          fontSize: mergedTextStyle.fontSize,
          fontWeight: mergedTextStyle.fontWeight,
          fontFamily: mergedTextStyle.fontFamily,
          color: activeEffect.color || mergedTextStyle.color,
          textShadow: activeEffect.glow || activeEffect.textShadow || textShadow,
          filter: activeEffect.filter,
          textAlign: 'center',
          WebkitTextStroke: mergedTextStyle.strokeWidth
            ? `${mergedTextStyle.strokeWidth}px ${mergedTextStyle.strokeColor}`
            : undefined,
          letterSpacing: type === 'time' ? '0.1em' : 'normal',
        }}
      >
        {currentDisplay}
      </div>

      {/* 滴答音效 - 每个数字播放一次 */}
      {renderTickSounds()}

      {/* 结束音效 */}
      {renderEndSound()}
    </AbsoluteFill>
  );
};

export default Countdown;
