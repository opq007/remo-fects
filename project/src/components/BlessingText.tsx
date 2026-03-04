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

interface BlessingTextProps {
  text: string;
  fontSize: number;
  subStyle: KidsSubStyle;
}

export const BlessingText: React.FC<BlessingTextProps> = ({
  text,
  fontSize,
  subStyle
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const theme = getColorTheme(subStyle);
  
  // 冲击入场动画
  const impact = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
      mass: 0.6
    }
  });
  
  // 从远处飞来 - 缩放效果
  const scale = interpolate(
    impact,
    [0, 0.5, 1],
    [2, 1.1, 1]
  );
  
  // Y轴移动 - 从上方飞入
  const y = interpolate(
    impact,
    [0, 0.4, 0.7, 1],
    [-100, 10, -3, 0]
  );
  
  // 轻微旋转
  const rotation = interpolate(
    impact,
    [0, 1],
    [-8, 0]
  );
  
  // 震动效果
  const shake = Math.sin(frame * 0.5) * (1 - impact) * 5;
  
  // 闪烁效果
  const glow = Math.sin(frame * 0.1) * 0.3 + 0.7;
  
  // 计算实际位置 - 屏幕中央偏上
  const centerY = height * 0.48;
  
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: centerY,
          transform: `translate(-50%, -50%) translateY(${y + shake}px) scale(${scale}) rotate(${rotation}deg)`,
          transformOrigin: 'center center',
          whiteSpace: 'nowrap'
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize,
            fontWeight: 700,
            fontFamily: '"Comic Sans MS", "PingFang SC", "Microsoft YaHei", cursive',
            color: theme.secondary,
            textShadow: `
              -3px -3px 0 #fff,
              3px -3px 0 #fff,
              -3px 3px 0 #fff,
              3px 3px 0 #fff,
              0 4px 0 rgba(0,0,0,0.1),
              0 0 ${20 * glow}px ${theme.secondary}80
            `,
            WebkitTextStroke: '2px #fff',
            letterSpacing: '6px'
          }}
        >
          {text}
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default BlessingText;
