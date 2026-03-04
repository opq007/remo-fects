import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  spring,
  interpolate
} from 'remotion';
import { getColorTheme } from '../utils/colors';
import { KidsSubStyle } from '../types';

interface AgeCelebrationProps {
  age: number;
  subStyle: KidsSubStyle;
}

/**
 * 年龄数字动画组件
 * 显示 "6岁啦!" 这样的年龄标签
 */
export const AgeCelebration: React.FC<AgeCelebrationProps> = ({
  age,
  subStyle
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const theme = getColorTheme(subStyle);
  
  if (!age) return null;
  
  // 弹跳入场
  const bounce = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 150,
      mass: 0.6
    }
  });
  
  const scale = interpolate(
    bounce,
    [0, 0.6, 1],
    [0, 1.3, 1]
  );
  
  const rotation = interpolate(
    bounce,
    [0, 0.5, 1],
    [-30, 10, 0]
  );
  
  const y = interpolate(
    bounce,
    [0, 0.4, 0.7, 1],
    [-50, 10, -5, 0]
  );
  
  // 持续跳动效果
  const hop = Math.abs(Math.sin(frame * 0.1)) * 3;
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        top: '38%'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          transform: `translateY(${y + hop}px) scale(${scale}) rotate(${rotation}deg)`
        }}
      >
        {/* 数字 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
            boxShadow: `
              0 6px 0 rgba(0,0,0,0.2),
              0 10px 30px rgba(0,0,0,0.3),
              inset 0 2px 10px rgba(255,255,255,0.4)
            `
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#fff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {age}
          </span>
        </div>
        
        {/* 岁啦文字 */}
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            fontFamily: '"Comic Sans MS", "PingFang SC", cursive',
            color: theme.primary,
            textShadow: `
              -2px -2px 0 #fff,
              2px -2px 0 #fff,
              -2px 2px 0 #fff,
              2px 2px 0 #fff,
              0 3px 0 rgba(0,0,0,0.1)
            `,
            WebkitTextStroke: '1px #fff'
          }}
        >
          岁啦!
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default AgeCelebration;
