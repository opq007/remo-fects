import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  spring,
  interpolate,
  Sequence
} from 'remotion';
import { getColorTheme } from '../utils/colors';
import { KidsSubStyle } from '../types';

interface BouncingNameProps {
  name: string;
  age?: number;
  showAge?: boolean;
  subStyle: KidsSubStyle;
  fontSize: number;
  color?: string;
}

// 单个字符弹跳组件
const BouncingChar: React.FC<{
  char: string;
  index: number;
  total: number;
  fontSize: number;
  color: string;
  themeColor: string;
  frame: number;
  fps: number;
}> = ({ char, index, total, fontSize, color, themeColor, frame, fps }) => {
  // Stagger 延迟
  const delay = index * 3;
  const localFrame = Math.max(frame - delay, 0);
  
  // 弹跳动画
  const bounce = spring({
    frame: localFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 180,
      mass: 0.8
    }
  });
  
  // 入场缩放
  const scale = interpolate(
    bounce,
    [0, 0.5, 1],
    [0, 1.3, 1]
  );
  
  // Y 轴弹跳
  const y = interpolate(
    bounce,
    [0, 0.3, 0.5, 0.7, 1],
    [-50, 10, -5, 2, 0]
  );
  
  // 轻微旋转
  const rotation = interpolate(
    bounce,
    [0, 0.5, 1],
    [-15, 5, 0]
  );
  
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize,
        fontWeight: 700,
        fontFamily: '"Comic Sans MS", "PingFang SC", "Microsoft YaHei", cursive',
        color,
        textShadow: `
          -4px -4px 0 #fff,
          4px -4px 0 #fff,
          -4px 4px 0 #fff,
          4px 4px 0 #fff,
          0 8px 0 rgba(0,0,0,0.15)
        `,
        WebkitTextStroke: '3px #fff',
        transform: `translateY(${y}px) scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center bottom',
        letterSpacing: '4px'
      }}
    >
      {char}
    </span>
  );
};

// 年龄数字组件
const AgeBadge: React.FC<{
  age: number;
  frame: number;
  fps: number;
  color: string;
}> = ({ age, frame, fps, color }) => {
  const progress = spring({
    frame: Math.max(frame - 15, 0),
    fps,
    config: {
      damping: 10,
      stiffness: 150
    }
  });
  
  const scale = interpolate(progress, [0, 0.5, 1], [0, 1.2, 1]);
  const rotation = interpolate(progress, [0, 1], [-30, 0]);
  
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '20px',
        padding: '10px 20px',
        backgroundColor: color,
        borderRadius: '50px',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
      }}
    >
      <span
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: '#fff',
          textShadow: '0 2px 0 rgba(0,0,0,0.2)'
        }}
      >
        {age}岁啦!
      </span>
    </div>
  );
};

export const BouncingName: React.FC<BouncingNameProps> = ({
  name,
  age,
  showAge = true,
  subStyle,
  fontSize,
  color
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const theme = getColorTheme(subStyle);
  const textColor = color || theme.primary;
  
  const chars = name.split('');
  
  // 整体出现动画
  const containerOpacity = interpolate(
    frame,
    [0, 10],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        top: '25%',
        opacity: containerOpacity
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}
      >
        {chars.map((char, index) => (
          <BouncingChar
            key={index}
            char={char}
            index={index}
            total={chars.length}
            fontSize={fontSize}
            color={textColor}
            themeColor={theme.secondary}
            frame={frame}
            fps={fps}
          />
        ))}
        
        {/* 年龄标签 */}
        {showAge && age && frame > 15 && (
          <AgeBadge age={age} frame={frame} fps={fps} color={theme.accent} />
        )}
      </div>
    </AbsoluteFill>
  );
};

export default BouncingName;
