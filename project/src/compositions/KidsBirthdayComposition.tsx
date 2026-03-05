import React, { useMemo } from 'react';
import { 
  AbsoluteFill, 
  useVideoConfig,
  Sequence,
  random
} from 'remotion';
import { z } from 'zod';
import { BaseComposition } from '../../../effects/shared/components';
import {
  extractWatermarkProps,
  extractMarqueeProps,
  extractRadialBurstProps,
  extractForegroundProps,
} from '../../../effects/shared/schemas';
import {
  CartoonElements,
  // 新模块
  ModuleA_MagicOpening,
  ModuleB_CharacterEntrance,
  ModuleC_PhotoInteraction1,
  ModuleD_PhotoInteraction2,
  ModuleE_PhotoInteraction3,
  ModuleF_GrowthCelebration,
  ModuleG_BirthdaySong,
  ModuleH_FutureBlessing,
  ModuleI_DreamSeeds,
  ModuleJ_WarmClosing,
} from '../components';
import { getColorTheme } from '../utils/colors';
import { 
  KidsSubStyle, 
  CharacterSeries,
  ZodiacType,
  PetType,
  HeroType,
  VIDEO_VERSIONS,
} from '../types';
import { 
  KidsBirthdaySchema, 
  getModulesByVersion, 
  getDurationByVersion
} from '../schemas';

export type KidsBirthdayProps = z.infer<typeof KidsBirthdaySchema>;

/**
 * 儿童生日祝福视频组合组件 v2.0
 * 
 * 支持模块化分镜系统：
 * - 模块 A：魔法开场（0-2秒）
 * - 模块 B：角色入场（2-12秒）
 * - 模块 C：照片互动1（12-25秒）
 * - 模块 D：照片互动2（25-38秒）
 * - 模块 E：照片互动3（38-50秒）
 * - 模块 F：成长庆祝高潮（50-60秒）
 * - 模块 G：生日歌互动（60-90秒）
 * - 模块 H：未来祝福（90-105秒）
 * - 模块 I：梦想种子（105-115秒）
 * - 模块 J：温暖收尾（115-120秒）
 */
export const KidsBirthdayComposition: React.FC<KidsBirthdayProps> = (props) => {
  const { fps } = useVideoConfig();
  
  // 解构属性
  const {
    name,
    age,
    message,
    videoVersion = '120s',
    duration,
    fps: propFps = 24,
    width = 720,
    height = 1280,
    subStyle = 'general',
    characterSeries = 'zodiac',
    characterType = 'tiger',
    photos = [],
    dreams = ['astronaut', 'artist', 'racer'],
    orientation = 'portrait',
    nameFontSize = 120,
    nameColor,
    showAge = true,
    blessingText = '生日快乐',
    blessingFontSize = 60,
    cartoonElements,
    confettiLevel = 'high',
    animationSpeed = 'normal',
    musicEnabled = true,
    musicTrack = 'kids_party_01',
    birthdaySongSource,
    birthdaySongVolume = 0.6,
    seed,
    // BaseComposition 参数
    backgroundType = 'gradient',
    backgroundColor,
    backgroundGradient,
    backgroundSource,
    backgroundVideoLoop,
    backgroundVideoMuted,
    overlayColor,
    overlayOpacity = 0.1,
    audioEnabled,
    audioSource,
    audioVolume = 0.5,
    audioLoop = true,
    // 水印参数
    watermarkEnabled,
    watermarkText,
    watermarkFontSize,
    watermarkColor,
    watermarkOpacity,
    watermarkEffect,
    watermarkSpeed,
    watermarkIntensity,
    watermarkVelocityX,
    watermarkVelocityY,
    // 走马灯参数
    marqueeEnabled,
    marqueeForegroundTexts,
    marqueeForegroundImages,
    marqueeForegroundFontSize,
    marqueeForegroundOpacity,
    marqueeForegroundColor,
    marqueeForegroundEffect,
    marqueeBackgroundTexts,
    marqueeBackgroundImages,
    marqueeBackgroundFontSize,
    marqueeBackgroundOpacity,
    marqueeBackgroundColor,
    marqueeBackgroundEffect,
    marqueeOrientation,
    marqueeTextOrientation,
    marqueeDirection,
    marqueeSpeed: marqueeSpeedProp,
    marqueeSpacing,
    marqueePerspectiveDepth,
    marqueeForegroundOffsetX,
    marqueeForegroundOffsetY,
    marqueeBackgroundOffsetX,
    marqueeBackgroundOffsetY,
    marqueeZIndex,
    // 发散粒子参数
    radialBurstEnabled,
    radialBurstEffectType,
    radialBurstColor,
    radialBurstSecondaryColor,
    radialBurstIntensity,
    radialBurstVerticalOffset,
    radialBurstCount,
    radialBurstSpeed,
    radialBurstOpacity,
    radialBurstSeed,
    radialBurstRotate,
    radialBurstRotationSpeed,
    // 前景参数
    foregroundEnabled,
    foregroundType,
    foregroundSource,
    foregroundWidth,
    foregroundHeight,
    foregroundVerticalOffset,
    foregroundHorizontalOffset,
    foregroundScale,
    foregroundAnimationType,
    foregroundAnimationStartFrame,
    foregroundAnimationDuration,
    foregroundAnimationIntensity,
    foregroundUseSpring,
    foregroundSpringDamping,
    foregroundSpringStiffness,
    foregroundOpacity,
    foregroundMixBlendMode,
    foregroundObjectFit,
    foregroundZIndex,
    foregroundVideoLoop,
    foregroundVideoMuted,
    foregroundContinuousAnimation,
    foregroundContinuousSpeed,
  } = props;
  
  const theme = getColorTheme(subStyle);
  const randomSeed = seed ?? random('kids-birthday-seed');
  
  // 根据视频版本计算时长和模块
  const effectiveVersion = videoVersion;
  const effectiveDuration = duration ?? getDurationByVersion(effectiveVersion);
  const totalFrames = effectiveDuration * fps;
  
  // 获取模块列表
  const modules = useMemo(() => getModulesByVersion(effectiveVersion), [effectiveVersion]);
  
  // 计算各模块的时间范围（帧）
  const moduleTimings = useMemo(() => {
    const config = VIDEO_VERSIONS[effectiveVersion];
    const timings: Record<string, { from: number; durationInFrames: number }> = {};
    
    // 模块 A：魔法开场（2秒）
    timings.A = { from: 0, durationInFrames: 2 * fps };
    
    // 模块 B：角色入场（10秒）
    timings.B = { from: 2 * fps, durationInFrames: 10 * fps };
    
    // 模块 C：照片互动1（13秒）- 可裁剪
    timings.C = { from: 12 * fps, durationInFrames: 13 * fps };
    
    // 模块 D：照片互动2（13秒）- 可裁剪
    timings.D = { from: 25 * fps, durationInFrames: 13 * fps };
    
    // 模块 E：照片互动3（12秒）- 可裁剪
    timings.E = { from: 38 * fps, durationInFrames: 12 * fps };
    
    // 模块 F：成长庆祝高潮（10秒）- 60秒版本截止
    timings.F = { from: 50 * fps, durationInFrames: 10 * fps };
    
    // 模块 G：生日歌互动（30秒）
    timings.G = { from: 60 * fps, durationInFrames: 30 * fps };
    
    // 模块 H：未来祝福（15秒）- 90秒版本截止
    timings.H = { from: 90 * fps, durationInFrames: 15 * fps };
    
    // 模块 I：梦想种子（10秒）
    timings.I = { from: 105 * fps, durationInFrames: 10 * fps };
    
    // 模块 J：温暖收尾（5秒）
    timings.J = { from: 115 * fps, durationInFrames: 5 * fps };
    
    return timings;
  }, [effectiveVersion, fps]);
  
  // 确定背景
  const effectiveGradient = backgroundGradient || theme.gradient;
  const effectiveBackgroundColor = backgroundColor || theme.background;
  
  // 音频配置
  const effectiveAudioEnabled = audioEnabled ?? musicEnabled;
  const effectiveAudioSource = audioSource || `${musicTrack}.mp3`;
  
  // 转换水印参数
  const watermarkProps = extractWatermarkProps({
    watermarkEnabled,
    watermarkText,
    watermarkFontSize,
    watermarkColor,
    watermarkOpacity,
    watermarkEffect,
    watermarkSpeed,
    watermarkIntensity,
    watermarkVelocityX,
    watermarkVelocityY,
  });
  
  // 转换走马灯参数
  const marqueeProps = extractMarqueeProps({
    marqueeEnabled,
    marqueeForegroundTexts,
    marqueeForegroundImages,
    marqueeForegroundFontSize,
    marqueeForegroundOpacity,
    marqueeForegroundColor,
    marqueeForegroundEffect,
    marqueeBackgroundTexts,
    marqueeBackgroundImages,
    marqueeBackgroundFontSize,
    marqueeBackgroundOpacity,
    marqueeBackgroundColor,
    marqueeBackgroundEffect,
    marqueeOrientation,
    marqueeTextOrientation,
    marqueeDirection,
    marqueeSpeed: marqueeSpeedProp,
    marqueeSpacing,
    marqueePerspectiveDepth,
    marqueeForegroundOffsetX,
    marqueeForegroundOffsetY,
    marqueeBackgroundOffsetX,
    marqueeBackgroundOffsetY,
    marqueeZIndex,
  });
  
  // 转换发散粒子参数
  const radialBurstProps = extractRadialBurstProps({
    radialBurstEnabled,
    radialBurstEffectType,
    radialBurstColor,
    radialBurstSecondaryColor,
    radialBurstIntensity,
    radialBurstVerticalOffset,
    radialBurstCount,
    radialBurstSpeed,
    radialBurstOpacity,
    radialBurstSeed,
    radialBurstRotate,
    radialBurstRotationSpeed,
  });
  
  // 转换前景参数
  const foregroundProps = extractForegroundProps({
    foregroundEnabled,
    foregroundType,
    foregroundSource,
    foregroundWidth,
    foregroundHeight,
    foregroundVerticalOffset,
    foregroundHorizontalOffset,
    foregroundScale,
    foregroundAnimationType,
    foregroundAnimationStartFrame,
    foregroundAnimationDuration,
    foregroundAnimationIntensity,
    foregroundUseSpring,
    foregroundSpringDamping,
    foregroundSpringStiffness,
    foregroundOpacity,
    foregroundMixBlendMode,
    foregroundObjectFit,
    foregroundZIndex,
    foregroundVideoLoop,
    foregroundVideoMuted,
    foregroundContinuousAnimation,
    foregroundContinuousSpeed,
  });
  
  // 渲染模块内容
  const renderModule = (moduleId: string) => {
    const timing = moduleTimings[moduleId];
    if (!timing) return null;
    
    const commonProps = {
      name,
      age,
      subStyle,
      characterSeries,
      characterType: characterType as ZodiacType & PetType & HeroType,
      orientation,
      dreams,
    };
    
    switch (moduleId) {
      case 'A':
        return (
          <ModuleA_MagicOpening
            name={name}
            characterSeries={characterSeries}
            characterType={characterType as ZodiacType & PetType & HeroType}
          />
        );
      case 'B':
        return (
          <ModuleB_CharacterEntrance
            {...commonProps}
          />
        );
      case 'C':
        return photos[0] ? (
          <ModuleC_PhotoInteraction1
            photo={photos[0]}
            photoIndex={0}
            orientation={orientation}
          />
        ) : null;
      case 'D':
        return photos[1] ? (
          <ModuleD_PhotoInteraction2
            photo={photos[1]}
            photoIndex={1}
            showHearts={true}
            orientation={orientation}
          />
        ) : null;
      case 'E':
        return photos[2] ? (
          <ModuleE_PhotoInteraction3
            photo={photos[2]}
            photoIndex={2}
            orientation={orientation}
          />
        ) : null;
      case 'F':
        return (
          <ModuleF_GrowthCelebration
            {...commonProps}
          />
        );
      case 'G':
        return (
          <ModuleG_BirthdaySong
            age={age}
            name={name}
            birthdaySongSource={birthdaySongSource}
            birthdaySongVolume={birthdaySongVolume}
            photos={photos}
            subStyle={subStyle}
          />
        );
      case 'H':
        return (
          <ModuleH_FutureBlessing
            {...commonProps}
          />
        );
      case 'I':
        return (
          <ModuleI_DreamSeeds
            dreams={dreams}
          />
        );
      case 'J':
        return (
          <ModuleJ_WarmClosing
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <BaseComposition
      // 背景配置
      backgroundType={backgroundType}
      backgroundColor={effectiveBackgroundColor}
      backgroundGradient={effectiveGradient}
      backgroundSource={backgroundSource}
      backgroundVideoLoop={backgroundVideoLoop}
      backgroundVideoMuted={backgroundVideoMuted}
      // 遮罩配置
      overlayColor={overlayColor}
      overlayOpacity={overlayOpacity}
      // 音频配置
      audioEnabled={effectiveAudioEnabled}
      audioSource={effectiveAudioSource}
      audioVolume={audioVolume}
      audioLoop={audioLoop}
      // 水印配置
      watermark={watermarkProps}
      // 走马灯配置
      marquee={marqueeProps}
      // 发散粒子配置
      radialBurst={radialBurstProps}
      // 前景配置
      foreground={foregroundProps ?? undefined}
    >
      {/* 卡通元素层 - 持续显示 */}
      <CartoonElements 
        subStyle={subStyle} 
        elements={cartoonElements}
        seed={randomSeed}
      />
      
      {/* 模块化分镜 */}
      {modules.map((moduleId) => {
        const timing = moduleTimings[moduleId];
        if (!timing) return null;
        
        return (
          <Sequence
            key={moduleId}
            from={timing.from}
            durationInFrames={timing.durationInFrames}
          >
            {renderModule(moduleId)}
          </Sequence>
        );
      })}
    </BaseComposition>
  );
};

export default KidsBirthdayComposition;