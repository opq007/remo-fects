import React from 'react';
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
  ConfettiBurst,
  BouncingName,
  BlessingText,
  CartoonElements,
  MessageText,
  AgeCelebration,
  ClosingEffect
} from '../components';
import { getColorTheme } from '../utils/colors';
import { KidsSubStyle } from '../types';
import { KidsBirthdaySchema } from '../schemas';

export type KidsBirthdayProps = z.infer<typeof KidsBirthdaySchema>;

/**
 * 儿童生日祝福视频组合组件
 * 
 * 使用 BaseComposition 提供统一的背景、遮罩、音频等功能
 * 
 * 动画节奏（15秒 = 360帧 @ 24fps）：
 * 0-1秒    爆炸开场
 * 1-4秒    名字弹跳 + 年龄显示
 * 4-8秒    生日快乐冲击
 * 8-12秒   祝福语跳动
 * 12-15秒  彩带收尾 + 派对开始
 */
export const KidsBirthdayComposition: React.FC<KidsBirthdayProps> = ({
  name,
  age,
  message,
  duration = 15,
  fps = 24,
  width = 720,
  height = 1280,
  subStyle = 'general',
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
  seed,
  // BaseComposition 背景参数（扁平化）
  backgroundType = 'gradient',
  backgroundColor,
  backgroundGradient,
  backgroundSource,
  backgroundVideoLoop,
  backgroundVideoMuted,
  // 遮罩参数（扁平化）
  overlayColor,
  overlayOpacity = 0.1,
  // 音频参数（扁平化）
  audioEnabled,
  audioSource,
  audioVolume = 0.5,
  audioLoop = true,
  // 水印参数（扁平化，需要转换）
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
  // 走马灯参数（扁平化，需要转换）
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
  // 发散粒子参数（扁平化，需要转换）
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
  // 前景参数（扁平化，需要转换）
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
}) => {
  const { fps: configFps } = useVideoConfig();
  const theme = getColorTheme(subStyle);
  
  // 动画速度调整
  const speedMultiplier = animationSpeed === 'slow' ? 1.3 : animationSpeed === 'fast' ? 0.7 : 1;
  
  // 计算各阶段帧数（优化时间安排）
  // 0-1秒: 开场彩带
  // 1-3秒: 名字弹跳
  // 3-4秒: 年龄显示  
  // 4-7秒: 生日快乐
  // 7-12秒: 祝福语
  // 12-15秒: 结尾
  
  const introEnd = Math.round(24 * speedMultiplier);        // 1秒
  const nameStart = Math.round(24 * speedMultiplier);        // 1秒开始
  const ageStart = Math.round(72 * speedMultiplier);         // 3秒开始
  const blessingStart = Math.round(96 * speedMultiplier);    // 4秒开始
  const messageStart = Math.round(168 * speedMultiplier);    // 7秒开始
  const closingStart = Math.round(300 * speedMultiplier);    // 12.5秒开始
  const outroStart = Math.round(288 * speedMultiplier);      // 12秒开始
  
  const randomSeed = seed ?? random('kids-birthday-seed');
  
  // 确定背景渐变色（优先使用传入的，否则使用主题色）
  const effectiveGradient = backgroundGradient || theme.gradient;
  const effectiveBackgroundColor = backgroundColor || theme.background;
  
  // 音频配置（兼容 musicEnabled 和 audioEnabled）
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
      
      {/* 开场爆炸彩带 */}
      <Sequence from={0} durationInFrames={120}>
        <ConfettiBurst 
          subStyle={subStyle} 
          level={confettiLevel}
          seed={randomSeed + 1}
        />
      </Sequence>
      
      {/* 名字弹跳动画 */}
      <Sequence from={nameStart} durationInFrames={Infinity}>
        <BouncingName
          name={name}
          age={age}
          showAge={false}
          subStyle={subStyle}
          fontSize={nameFontSize}
          color={nameColor}
        />
      </Sequence>
      
      {/* 年龄庆祝 */}
      {showAge && age && (
        <Sequence from={ageStart} durationInFrames={Infinity}>
          <AgeCelebration
            age={age}
            subStyle={subStyle}
          />
        </Sequence>
      )}
      
      {/* 生日快乐大字冲击 */}
      <Sequence from={blessingStart} durationInFrames={Infinity}>
        <BlessingText
          text={blessingText}
          fontSize={blessingFontSize}
          subStyle={subStyle}
        />
      </Sequence>
      
      {/* 祝福语跳动 */}
      <Sequence from={messageStart} durationInFrames={Infinity}>
        <MessageText
          message={message}
          subStyle={subStyle}
        />
      </Sequence>
      
      {/* 结尾文字 */}
      <Sequence from={closingStart} durationInFrames={Infinity}>
        <ClosingEffect />
      </Sequence>
      
      {/* 结尾彩带 */}
      <Sequence from={outroStart} durationInFrames={120}>
        <ConfettiBurst 
          subStyle={subStyle} 
          level="high"
          seed={randomSeed + 2}
        />
      </Sequence>
    </BaseComposition>
  );
};

export default KidsBirthdayComposition;
