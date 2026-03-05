import React, { ReactNode, useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { Background, Overlay, RadialBurst } from './index';
import { BackgroundType } from '../schemas';
import { 
  Character, 
  CharacterWithSpeech, 
  getCharacterConfig,
  ConfettiBurst,
  MagicParticles,
  MagicWand,
  MagicCircle,
  Firework,
  BalloonBurst,
  WhiteFlashTransition,
  ShootingStar,
} from './index';
import { SubtitleList, SubtitleItem } from './Subtitle';
import { 
  CharacterSeries,
  ZodiacType,
  PetType,
  HeroType,
} from '../types/character';

// ==================== 类型定义 ====================

/**
 * 角色配置
 */
export interface StoryCharacterConfig {
  /** 角色系列 */
  series: CharacterSeries;
  /** 角色类型 */
  type: ZodiacType | PetType | HeroType;
  /** 位置 */
  position?: 'center' | 'left' | 'right';
  /** 表情 */
  expression?: 'happy' | 'excited' | 'waving' | 'hugging';
  /** 大小 */
  size?: number;
  /** 是否动画 */
  animate?: boolean;
  /** 对话内容 */
  speech?: string;
  /** 是否显示对话 */
  showSpeech?: boolean;
  /** 是否内联布局 */
  inline?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 彩带效果配置
 */
export interface StoryConfettiConfig {
  /** 是否启用 */
  enabled: boolean;
  /** 密度级别 */
  level?: 'low' | 'medium' | 'high';
  /** 主颜色 */
  primaryColor?: string;
  /** 次颜色 */
  secondaryColor?: string;
  /** 触发帧 */
  triggerFrame?: number;
}

/**
 * 魔法粒子配置
 */
export interface StoryMagicParticlesConfig {
  /** 是否启用 */
  enabled: boolean;
  /** 粒子数量 */
  particleCount?: number;
  /** 颜色 */
  color?: string;
  /** 目标X（比例） */
  targetX?: number;
  /** 目标Y（比例） */
  targetY?: number;
  /** 持续帧数 */
  durationInFrames?: number;
}

/**
 * 魔法棒配置
 */
export interface StoryMagicWandConfig {
  /** 是否启用 */
  enabled: boolean;
  /** X位置（比例） */
  x?: number;
  /** Y位置（比例） */
  y?: number;
  /** 旋转角度 */
  rotation?: number;
  /** 是否施法中 */
  casting?: boolean;
  /** 颜色 */
  color?: string;
}

/**
 * 魔法圆环配置
 */
export interface StoryMagicCircleConfig {
  /** 是否启用 */
  enabled: boolean;
  /** 半径 */
  radius?: number;
  /** 颜色 */
  color?: string;
  /** 旋转速度 */
  rotationSpeed?: number;
  /** 脉冲强度 */
  pulseIntensity?: number;
}

/**
 * 烟花配置
 */
export interface StoryFireworkConfig {
  /** 是否启用 */
  enabled: boolean;
  /** X位置（比例） */
  x?: number;
  /** Y位置（比例） */
  y?: number;
  /** 粒子数量 */
  particleCount?: number;
  /** 颜色 */
  color?: string;
  /** 触发帧 */
  triggerFrame?: number;
}

/**
 * 气球爆炸配置
 */
export interface StoryBalloonBurstConfig {
  /** 是否启用 */
  enabled: boolean;
  /** X位置（比例） */
  x?: number;
  /** Y位置（比例） */
  y?: number;
  /** 气球数量 */
  balloonCount?: number;
  /** 颜色列表 */
  colors?: string[];
  /** 触发帧 */
  triggerFrame?: number;
}

/**
 * 白闪转场配置
 */
export interface StoryWhiteFlashConfig {
  /** 是否启用 */
  enabled: boolean;
  /** 持续帧数 */
  durationInFrames?: number;
  /** 触发帧数（相对于章节开始） */
  triggerFrame?: number;
}

/**
 * 流星配置
 */
export interface StoryShootingStarConfig {
  /** 是否启用 */
  enabled: boolean;
  /** 开始X（比例） */
  startX?: number;
  /** 开始Y（比例） */
  startY?: number;
  /** 结束X（比例） */
  endX?: number;
  /** 结束Y（比例） */
  endY?: number;
  /** 持续帧数 */
  durationInFrames?: number;
  /** 颜色 */
  color?: string;
  /** 尾迹长度 */
  trailLength?: number;
}

/**
 * 魔法效果集合配置
 */
export interface StoryMagicEffectsConfig {
  /** 魔法粒子 */
  particles?: StoryMagicParticlesConfig;
  /** 魔法棒 */
  magicWand?: StoryMagicWandConfig;
  /** 魔法圆环 */
  magicCircle?: StoryMagicCircleConfig;
  /** 烟花 */
  firework?: StoryFireworkConfig;
  /** 气球爆炸 */
  balloonBurst?: StoryBalloonBurstConfig;
  /** 白闪转场 */
  whiteFlash?: StoryWhiteFlashConfig;
  /** 流星 */
  shootingStar?: StoryShootingStarConfig;
}

/**
 * 发散粒子配置（简化版）
 */
export interface StoryRadialBurstConfig {
  enabled?: boolean;
  effectType?: 'buddhaLight' | 'goldenRays' | 'meteorShower' | 'sparkleBurst';
  color?: string;
  secondaryColor?: string;
  intensity?: number;
  verticalOffset?: number;
  count?: number;
  speed?: number;
  opacity?: number;
}

/**
 * 故事章节 Props
 */
export interface StoryChapterProps {
  /** 章节持续时间（帧） */
  durationInFrames?: number;
  
  // ===== 背景配置 =====
  /** 背景类型 */
  backgroundType?: BackgroundType;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 背景渐变 */
  backgroundGradient?: string;
  /** 背景源 */
  backgroundSource?: string;
  /** 背景视频循环 */
  backgroundVideoLoop?: boolean;
  /** 背景视频静音 */
  backgroundVideoMuted?: boolean;
  
  // ===== 遮罩配置 =====
  /** 遮罩颜色 */
  overlayColor?: string;
  /** 遮罩透明度 */
  overlayOpacity?: number;
  /** 是否显示遮罩 */
  showOverlay?: boolean;
  
  // ===== 角色配置 =====
  /** 角色配置 */
  character?: StoryCharacterConfig;
  
  // ===== 彩带效果配置 =====
  /** 彩带效果配置 */
  confetti?: StoryConfettiConfig;
  
  // ===== 魔法效果配置 =====
  /** 魔法效果配置 */
  magicEffects?: StoryMagicEffectsConfig;
  
  // ===== 发散粒子配置 =====
  /** 发散粒子配置 */
  radialBurst?: StoryRadialBurstConfig;
  
  // ===== 字幕配置 =====
  /** 字幕列表 */
  subtitles?: SubtitleItem[];
  
  // ===== 内容配置 =====
  /** 自定义内容 */
  children?: ReactNode;
  
  // ===== 额外层配置 =====
  /** 额外层 */
  extraLayers?: ReactNode;
  /** 额外层位置 */
  extraLayersPosition?: 'before-content' | 'after-content';
  
  // ===== 音频配置（可选，支持章节内音效）=====
  /** 音频元素 */
  audioElement?: ReactNode;
}

/**
 * 故事章节组件
 * 
 * 用于渲染一个相对短的故事片段动画，支持：
 * - 背景、遮罩
 * - 角色（带对话气泡）
 * - 彩带效果
 * - 魔法效果（粒子、魔法棒、圆环、烟花、气球等）
 * - 字幕系统
 * - 自定义内容
 * 
 * @example
 * ```tsx
 * <StoryChapter
 *   durationInFrames={120}
 *   backgroundType="gradient"
 *   backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
 *   character={{
 *     series: 'zodiac',
 *     type: 'tiger',
 *     position: 'center',
 *     expression: 'happy',
 *     speech: '你好呀！',
 *     showSpeech: true,
 *   }}
 *   confetti={{ enabled: true, level: 'medium' }}
 *   subtitles={[
 *     { text: '欢迎来到魔法世界', startFrame: 0, durationInFrames: 60 }
 *   ]}
 * >
 *   <CustomContent />
 * </StoryChapter>
 * ```
 */
export const StoryChapter: React.FC<StoryChapterProps> = ({
  durationInFrames,
  
  // 背景配置
  backgroundType = 'color',
  backgroundColor = '#1a1a2e',
  backgroundGradient,
  backgroundSource,
  backgroundVideoLoop = true,
  backgroundVideoMuted = true,
  
  // 遮罩配置
  overlayColor = '#000000',
  overlayOpacity = 0.2,
  showOverlay = true,
  
  // 角色配置
  character,
  
  // 彩带配置
  confetti,
  
  // 魔法效果配置
  magicEffects,
  
  // 发散粒子配置
  radialBurst,
  
  // 字幕配置
  subtitles = [],
  
  // 内容配置
  children,
  
  // 额外层配置
  extraLayers,
  extraLayersPosition = 'before-content',
  
  // 音频
  audioElement,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  // 渲染角色
  const renderCharacter = () => {
    if (!character) return null;
    
    const config = getCharacterConfig(character.series, character.type);
    
    if (character.speech && character.showSpeech) {
      return (
        <CharacterWithSpeech
          series={character.series}
          type={character.type}
          size={character.size ?? 200}
          position={character.position ?? 'center'}
          expression={character.expression ?? 'happy'}
          animate={character.animate ?? true}
          speech={character.speech}
          showSpeech={character.showSpeech}
          inline={character.inline}
        />
      );
    }
    
    return (
      <Character
        series={character.series}
        type={character.type}
        size={character.size ?? 200}
        position={character.position ?? 'center'}
        expression={character.expression ?? 'happy'}
        animate={character.animate ?? true}
        inline={character.inline}
      />
    );
  };
  
  // 渲染彩带
  const renderConfetti = () => {
    if (!confetti || !confetti.enabled) return null;
    
    return (
      <ConfettiBurst
        primaryColor={confetti.primaryColor}
        secondaryColor={confetti.secondaryColor}
        level={confetti.level ?? 'medium'}
        seed={confetti.triggerFrame ?? 0}
      />
    );
  };
  
  // 渲染魔法效果
  const renderMagicEffects = () => {
    if (!magicEffects) return null;
    
    return (
      <>
        {/* 魔法粒子 */}
        {magicEffects.particles?.enabled && (
          <MagicParticles
            particleCount={magicEffects.particles.particleCount ?? 50}
            color={magicEffects.particles.color ?? '#B892FF'}
            targetX={magicEffects.particles.targetX ?? 0.5}
            targetY={magicEffects.particles.targetY ?? 0.5}
            durationInFrames={magicEffects.particles.durationInFrames ?? 48}
          />
        )}
        
        {/* 魔法棒 */}
        {magicEffects.magicWand?.enabled && (
          <MagicWand
            x={magicEffects.magicWand.x ?? 0.5}
            y={magicEffects.magicWand.y ?? 0.6}
            rotation={magicEffects.magicWand.rotation ?? -30}
            casting={magicEffects.magicWand.casting ?? false}
            color={magicEffects.magicWand.color ?? '#B892FF'}
          />
        )}
        
        {/* 魔法圆环 */}
        {magicEffects.magicCircle?.enabled && (
          <MagicCircle
            radius={magicEffects.magicCircle.radius ?? 150}
            color={magicEffects.magicCircle.color ?? '#B892FF'}
            rotationSpeed={magicEffects.magicCircle.rotationSpeed ?? 1}
            pulseIntensity={magicEffects.magicCircle.pulseIntensity ?? 0.1}
          />
        )}
        
        {/* 烟花 */}
        {magicEffects.firework?.enabled && (
          <Firework
            x={magicEffects.firework.x ?? 0.5}
            y={magicEffects.firework.y ?? 0.4}
            particleCount={magicEffects.firework.particleCount ?? 30}
            color={magicEffects.firework.color ?? '#FFD76A'}
            triggerFrame={magicEffects.firework.triggerFrame ?? 0}
          />
        )}
        
        {/* 气球爆炸 */}
        {magicEffects.balloonBurst?.enabled && (
          <BalloonBurst
            x={magicEffects.balloonBurst.x ?? 0.5}
            y={magicEffects.balloonBurst.y ?? 0.5}
            balloonCount={magicEffects.balloonBurst.balloonCount ?? 8}
            colors={magicEffects.balloonBurst.colors}
            triggerFrame={magicEffects.balloonBurst.triggerFrame ?? 0}
          />
        )}
        
        {/* 白闪转场 */}
        {magicEffects.whiteFlash?.enabled && (
          <WhiteFlashTransition
            durationInFrames={magicEffects.whiteFlash.durationInFrames ?? 12}
            triggerFrame={magicEffects.whiteFlash.triggerFrame ?? 0}
          />
        )}
        
        {/* 流星 */}
        {magicEffects.shootingStar?.enabled && (
          <ShootingStar
            startX={magicEffects.shootingStar.startX ?? 0.8}
            startY={magicEffects.shootingStar.startY ?? 0.1}
            endX={magicEffects.shootingStar.endX ?? 0.2}
            endY={magicEffects.shootingStar.endY ?? 0.5}
            durationInFrames={magicEffects.shootingStar.durationInFrames ?? 30}
            color={magicEffects.shootingStar.color ?? '#FFFFFF'}
            trailLength={magicEffects.shootingStar.trailLength ?? 80}
          />
        )}
      </>
    );
  };
  
  // 渲染发散粒子
  const renderRadialBurst = () => {
    if (!radialBurst || !radialBurst.enabled) return null;
    
    return (
      <RadialBurst
        enabled={true}
        effectType={radialBurst.effectType ?? 'sparkleBurst'}
        color={radialBurst.color}
        secondaryColor={radialBurst.secondaryColor}
        intensity={radialBurst.intensity}
        verticalOffset={radialBurst.verticalOffset}
        count={radialBurst.count}
        speed={radialBurst.speed}
        opacity={radialBurst.opacity}
      />
    );
  };
  
  // 渲染字幕
  const renderSubtitles = () => {
    if (!subtitles || subtitles.length === 0) return null;
    
    return <SubtitleList subtitles={subtitles} />;
  };
  
  return (
    <AbsoluteFill>
      {/* 背景层 */}
      <Background
        type={backgroundType}
        source={backgroundSource}
        color={backgroundColor}
        gradient={backgroundGradient}
        videoLoop={backgroundVideoLoop}
        videoMuted={backgroundVideoMuted}
      />
      
      {/* 发散粒子效果层 */}
      {renderRadialBurst()}
      
      {/* 额外层（内容前） */}
      {extraLayersPosition === 'before-content' && extraLayers}
      
      {/* 遮罩层 */}
      {showOverlay && overlayOpacity > 0 && (
        <Overlay color={overlayColor} opacity={overlayOpacity} />
      )}
      
      {/* 魔法效果层 */}
      {renderMagicEffects()}
      
      {/* 自定义内容 */}
      {children}
      
      {/* 角色层 */}
      {renderCharacter()}
      
      {/* 彩带层 */}
      {renderConfetti()}
      
      {/* 额外层（内容后） */}
      {extraLayersPosition === 'after-content' && extraLayers}
      
      {/* 字幕层 */}
      {renderSubtitles()}
      
      {/* 音频层 */}
      {audioElement}
    </AbsoluteFill>
  );
};

export default StoryChapter;
