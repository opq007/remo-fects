import React, { useMemo } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  spring,
  interpolate
} from 'remotion';
import { getColorTheme } from '../utils/colors';
import { KidsSubStyle } from '../types';

interface MessageTextProps {
  message: string;
  subStyle: KidsSubStyle;
}

export const MessageText: React.FC<MessageTextProps> = ({
  message,
  subStyle
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const theme = getColorTheme(subStyle);
  
  // 根据字数动态计算字号和排版
  const { fontSize, lineHeight, maxLines, padding } = useMemo(() => {
    const len = message.length;
    
    if (len <= 10) {
      // 短文字：大字号，单行
      return { fontSize: 42, lineHeight: 1.4, maxLines: 1, padding: '20px 40px' };
    } else if (len <= 25) {
      // 中短文字：中等字号，1-2行
      return { fontSize: 36, lineHeight: 1.5, maxLines: 2, padding: '20px 35px' };
    } else if (len <= 50) {
      // 中等文字：较小字号，2-3行
      return { fontSize: 30, lineHeight: 1.6, maxLines: 3, padding: '18px 30px' };
    } else if (len <= 75) {
      // 较长文字：小字号，3-4行
      return { fontSize: 26, lineHeight: 1.6, maxLines: 4, padding: '16px 25px' };
    } else {
      // 最长文字：最小字号，4-5行
      return { fontSize: 22, lineHeight: 1.7, maxLines: 5, padding: '15px 20px' };
    }
  }, [message]);
  
  // 跳动入场
  const bounce = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 120
    }
  });
  
  const scale = interpolate(
    bounce,
    [0, 0.5, 1],
    [0.8, 1.05, 1]
  );
  
  const y = interpolate(
    bounce,
    [0, 0.4, 0.7, 1],
    [20, -8, 3, 0]
  );
  
  // 持续跳动效果（轻微）
  const hop = Math.abs(Math.sin(frame * 0.12)) * 3;
  
  // 渐变淡入
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  
  // 发光脉动
  const glow = 0.5 + Math.sin(frame * 0.08) * 0.3;
  
  // 计算实际位置 - 屏幕中下方
  const centerY = height * 0.72;
  
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: centerY,
          transform: `translate(-50%, -50%) translateY(${y + hop}px) scale(${scale})`,
          opacity,
          textAlign: 'center',
          maxWidth: width - 80,
          width: 'auto'
        }}
      >
        {/* 背景装饰框 */}
        <div
          style={{
            background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.accent}15 100%)`,
            borderRadius: 20,
            padding,
            boxShadow: `
              0 4px 20px ${theme.primary}30,
              inset 0 1px 0 rgba(255,255,255,0.3)
            `,
            border: `2px solid ${theme.primary}40`
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize,
              fontWeight: 600,
              fontFamily: '"PingFang SC", "Microsoft YaHei", "Comic Sans MS", sans-serif',
              color: '#fff',
              textShadow: `
                0 1px 2px rgba(0,0,0,0.3),
                0 0 ${15 * glow}px ${theme.primary}80
              `,
              letterSpacing: '1px',
              lineHeight,
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap'
            }}
          >
            {message}
          </span>
        </div>
        
        {/* 底部小装饰 */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: -15,
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: i === 1 ? theme.secondary : theme.primary,
                opacity: 0.6 + Math.sin(frame * 0.1 + i) * 0.3
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default MessageText;
