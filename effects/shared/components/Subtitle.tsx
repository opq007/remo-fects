import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  interpolate,
  spring,
  Easing
} from 'remotion';

/**
 * 字幕项配置
 */
export interface SubtitleItem {
  /** 字幕文本 */
  text: string;
  /** 开始帧（相对于章节开始） */
  startFrame: number;
  /** 持续帧数 */
  durationInFrames: number;
  /** 字幕位置 */
  position?: 'bottom' | 'top' | 'center';
  /** 字体大小 */
  fontSize?: number;
  /** 文字颜色 */
  color?: string;
  /** 背景色 */
  backgroundColor?: string;
  /** 背景透明度 */
  backgroundOpacity?: number;
  /** 对齐方式 */
  textAlign?: 'left' | 'center' | 'right';
  /** 额外样式 */
  style?: React.CSSProperties;
  /** 动画类型 */
  animationType?: 'fade' | 'slideUp' | 'typewriter' | 'bounce' | 'none';
  /** 是否显示背景框 */
  showBackground?: boolean;
}

/**
 * 字幕组件 Props
 */
export interface SubtitleProps {
  /** 字幕项 */
  subtitle: SubtitleItem;
  /** 额外的帧偏移（用于面板中的章节偏移） */
  frameOffset?: number;
}

/**
 * 单个字幕组件
 */
export const Subtitle: React.FC<SubtitleProps> = ({
  subtitle,
  frameOffset = 0
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const {
    text,
    startFrame,
    durationInFrames,
    position = 'bottom',
    fontSize = 36,
    color = '#FFFFFF',
    backgroundColor = '#000000',
    backgroundOpacity = 0.6,
    textAlign = 'center',
    style = {},
    animationType = 'slideUp',
    showBackground = true,
  } = subtitle;
  
  // 计算相对帧
  const relativeFrame = frame - frameOffset - startFrame;
  
  // 如果不在显示时间范围内，不渲染
  if (relativeFrame < 0 || relativeFrame > durationInFrames) {
    return null;
  }
  
  // 进度计算
  const progress = relativeFrame / durationInFrames;
  
  // 淡入淡出
  const fadeInDuration = Math.min(10, durationInFrames * 0.2);
  const fadeOutDuration = Math.min(10, durationInFrames * 0.2);
  
  let opacity = 1;
  let translateY = 0;
  let scale = 1;
  let displayText = text;
  
  // 动画效果
  switch (animationType) {
    case 'fade':
      opacity = interpolate(
        relativeFrame,
        [0, fadeInDuration, durationInFrames - fadeOutDuration, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      break;
      
    case 'slideUp':
      opacity = interpolate(
        relativeFrame,
        [0, fadeInDuration, durationInFrames - fadeOutDuration, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      translateY = interpolate(
        relativeFrame,
        [0, fadeInDuration],
        [30, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      break;
      
    case 'bounce':
      const bounceProgress = spring({
        frame: relativeFrame,
        fps,
        config: { damping: 12, stiffness: 200 }
      });
      opacity = bounceProgress;
      translateY = interpolate(bounceProgress, [0, 1], [30, 0]);
      scale = interpolate(bounceProgress, [0, 0.5, 1], [0.8, 1.1, 1]);
      break;
      
    case 'typewriter':
      opacity = 1;
      const charProgress = interpolate(
        relativeFrame,
        [fadeInDuration, durationInFrames - fadeOutDuration],
        [0, text.length],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      displayText = text.slice(0, Math.floor(charProgress));
      break;
      
    case 'none':
    default:
      break;
  }
  
  // 确保 opacity 在有效范围内
  opacity = Math.max(0, Math.min(1, opacity));
  
  // 位置样式
  const getPositionStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      right: 0,
      padding: '16px 32px',
    };
    
    switch (position) {
      case 'top':
        return { ...baseStyle, top: '10%' };
      case 'center':
        return { ...baseStyle, top: '50%', transform: 'translateY(-50%)' };
      case 'bottom':
      default:
        return { ...baseStyle, bottom: '10%' };
    }
  };
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 50 }}>
      <div
        style={{
          ...getPositionStyle(),
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          display: 'flex',
          justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: showBackground ? '12px 24px' : 0,
            borderRadius: 8,
            backgroundColor: showBackground 
              ? `rgba(${hexToRgb(backgroundColor)}, ${backgroundOpacity})` 
              : 'transparent',
            backdropFilter: showBackground ? 'blur(4px)' : 'none',
          }}
        >
          <span
            style={{
              fontSize,
              color,
              fontWeight: 600,
              textAlign,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              whiteSpace: 'pre-wrap',
              fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
              ...style,
            }}
          >
            {displayText}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * 字幕列表组件
 */
export interface SubtitleListProps {
  /** 字幕列表 */
  subtitles: SubtitleItem[];
  /** 帧偏移 */
  frameOffset?: number;
}

export const SubtitleList: React.FC<SubtitleListProps> = ({
  subtitles,
  frameOffset = 0
}) => {
  const frame = useCurrentFrame();
  
  // 筛选当前应该显示的字幕
  const visibleSubtitles = subtitles.filter((sub) => {
    const relativeFrame = frame - frameOffset;
    return relativeFrame >= sub.startFrame && 
           relativeFrame <= sub.startFrame + sub.durationInFrames;
  });
  
  return (
    <>
      {visibleSubtitles.map((subtitle, index) => (
        <Subtitle 
          key={`${subtitle.startFrame}-${index}`} 
          subtitle={subtitle}
          frameOffset={frameOffset}
        />
      ))}
    </>
  );
};

/**
 * 十六进制转 RGB
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }
  return '0, 0, 0';
}

export default Subtitle;
