import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame,
  interpolate
} from 'remotion';

interface ClosingEffectProps {
  text?: string;
}

/**
 * 结尾特效组件
 * 显示收尾文字和效果
 */
export const ClosingEffect: React.FC<ClosingEffectProps> = ({
  text = '派对开始啦!'
}) => {
  const frame = useCurrentFrame();
  
  // 放大入场
  const scale = interpolate(
    frame,
    [0, 20, 40],
    [0.5, 1.2, 1],
    { extrapolateRight: 'clamp' }
  );
  
  // 旋转
  const rotation = interpolate(
    frame,
    [0, 30],
    [-10, 0],
    { extrapolateRight: 'clamp' }
  );
  
  // 发光脉动
  const glow = Math.sin(frame * 0.15) * 10 + 20;
  
  // 颜色循环
  const hue = (frame * 3) % 360;
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        top: '85%'
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          textAlign: 'center'
        }}
      >
        <span
          style={{
            fontSize: 42,
            fontWeight: 700,
            fontFamily: '"Comic Sans MS", "PingFang SC", cursive',
            color: '#fff',
            textShadow: `
              -3px -3px 0 #FF6FAF,
              3px -3px 0 #6EC8FF,
              -3px 3px 0 #FFD93D,
              3px 3px 0 #8DECB4,
              0 0 ${glow}px rgba(255,255,255,0.8)
            `,
            letterSpacing: '4px'
          }}
        >
          {text}
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default ClosingEffect;
