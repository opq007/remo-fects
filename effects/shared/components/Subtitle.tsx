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
 * SRT 时间戳格式解析结果
 */
interface SrtTimestamp {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

/**
 * SRT 字幕条目
 */
interface SrtEntry {
  index: number;
  startTime: number; // 毫秒
  endTime: number;   // 毫秒
  text: string;
}

/**
 * 解析 SRT 时间戳字符串
 * 格式: HH:MM:SS,mmm 或 HH:MM:SS.mmm
 * 
 * @param timestamp - SRT 时间戳字符串
 * @returns 毫秒数
 */
function parseSrtTimestamp(timestamp: string): number {
  // 支持两种分隔符: , 和 .
  const normalized = timestamp.replace(',', '.');
  const match = normalized.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/);
  
  if (!match) {
    console.warn(`Invalid SRT timestamp format: ${timestamp}`);
    return 0;
  }
  
  const [, hours, minutes, seconds, milliseconds] = match;
  return (
    parseInt(hours, 10) * 3600000 +
    parseInt(minutes, 10) * 60000 +
    parseInt(seconds, 10) * 1000 +
    parseInt(milliseconds, 10)
  );
}

/**
 * 解析 SRT 格式字幕内容
 * 
 * SRT 格式示例:
 * 1
 * 00:00:01,000 --> 00:00:04,000
 * 第一条字幕文本
 * 
 * 2
 * 00:00:05,000 --> 00:00:08,000
 * 第二条字幕文本
 * 可能有多行
 * 
 * @param srtContent - SRT 格式的字幕内容
 * @returns SRT 条目数组
 */
function parseSrtContent(srtContent: string): SrtEntry[] {
  const entries: SrtEntry[] = [];
  
  // 标准化换行符
  const normalizedContent = srtContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // 按空行分割字幕块
  const blocks = normalizedContent.split(/\n\n+/).filter(block => block.trim());
  
  for (const block of blocks) {
    const lines = block.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length < 2) continue;
    
    // 第一行是序号（可选）
    let indexLine = 0;
    let index = entries.length + 1;
    
    // 检查第一行是否是序号
    if (/^\d+$/.test(lines[0])) {
      index = parseInt(lines[0], 10);
      indexLine = 1;
    }
    
    // 第二行是时间轴
    const timeLine = lines[indexLine];
    const timeMatch = timeLine.match(
      /^(\d{2}:\d{2}:\d{2}[,\.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,\.]\d{3})$/
    );
    
    if (!timeMatch) {
      console.warn(`Invalid SRT time line: ${timeLine}`);
      continue;
    }
    
    const startTime = parseSrtTimestamp(timeMatch[1]);
    const endTime = parseSrtTimestamp(timeMatch[2]);
    
    // 剩余行是字幕文本（可能有多行）
    const text = lines.slice(indexLine + 1).join('\n');
    
    entries.push({
      index,
      startTime,
      endTime,
      text
    });
  }
  
  return entries;
}

/**
 * 将 SRT 条目转换为 SubtitleItem 格式
 * 
 * @param entry - SRT 条目
 * @param fps - 视频帧率
 * @param options - 可选的默认配置
 * @returns SubtitleItem
 */
function srtEntryToSubtitleItem(
  entry: SrtEntry,
  fps: number,
  options?: Partial<SubtitleItem>
): SubtitleItem {
  // 将毫秒转换为帧
  const startFrame = Math.round((entry.startTime / 1000) * fps);
  const durationMs = entry.endTime - entry.startTime;
  const durationInFrames = Math.round((durationMs / 1000) * fps);
  
  return {
    text: entry.text,
    startFrame,
    durationInFrames: Math.max(1, durationInFrames), // 确保至少1帧
    position: options?.position ?? 'bottom',
    fontSize: options?.fontSize,
    color: options?.color,
    backgroundColor: options?.backgroundColor,
    backgroundOpacity: options?.backgroundOpacity,
    textAlign: options?.textAlign,
    style: options?.style,
    animationType: options?.animationType,
    showBackground: options?.showBackground,
  };
}

/**
 * 字幕列表组件 Props
 */
export interface SubtitleListProps {
  /** 字幕列表（与 srtContent 二选一） */
  subtitles?: SubtitleItem[];
  /** SRT 格式字幕内容（与 subtitles 二选一） */
  srtContent?: string;
  /** 帧偏移 */
  frameOffset?: number;
  /** SRT 转换时的默认字幕样式配置 */
  srtDefaultOptions?: Partial<SubtitleItem>;
}

export const SubtitleList: React.FC<SubtitleListProps> = ({
  subtitles: subtitlesProp,
  srtContent,
  frameOffset = 0,
  srtDefaultOptions = {}
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 解析字幕：优先使用 subtitles，否则解析 srtContent
  const subtitles = React.useMemo(() => {
    if (subtitlesProp && subtitlesProp.length > 0) {
      return subtitlesProp;
    }
    
    if (srtContent) {
      const srtEntries = parseSrtContent(srtContent);
      return srtEntries.map(entry => srtEntryToSubtitleItem(entry, fps, srtDefaultOptions));
    }
    
    return [];
  }, [subtitlesProp, srtContent, fps, srtDefaultOptions]);
  
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
