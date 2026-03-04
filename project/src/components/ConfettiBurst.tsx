import React, { useMemo } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  interpolate,
  spring,
  random
} from 'remotion';
import { getColorTheme } from '../utils/colors';
import { elastic } from '../utils/easing';
import { KidsSubStyle } from '../types';

interface ConfettiBurstProps {
  subStyle: KidsSubStyle;
  level: 'low' | 'medium' | 'high';
  seed?: number;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  shape: 'circle' | 'star' | 'rect' | 'triangle';
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

const CONFETTI_COLORS = [
  '#FF6FAF', // Candy Pink
  '#6EC8FF', // Sky Blue
  '#FFD93D', // Lemon Yellow
  '#8DECB4', // Mint Green
  '#BFA8FF', // Soft Purple
];

const COUNT_MAP = {
  low: 50,
  medium: 100,
  high: 150
};

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
  subStyle,
  level,
  seed = 0
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const theme = getColorTheme(subStyle);
  
  const count = COUNT_MAP[level];
  
  // 生成彩带粒子
  const pieces = useMemo<ConfettiPiece[]>(() => {
    const result: ConfettiPiece[] = [];
    for (let i = 0; i < count; i++) {
      const r = random(`confetti-${seed}-${i}`);
      const r2 = random(`confetti-x-${seed}-${i}`);
      const r3 = random(`confetti-y-${seed}-${i}`);
      const r4 = random(`confetti-rot-${seed}-${i}`);
      const r5 = random(`confetti-shape-${seed}-${i}`);
      
      const shapes: ConfettiPiece['shape'][] = ['circle', 'star', 'rect', 'triangle'];
      
      result.push({
        id: i,
        x: width / 2 + (r2 - 0.5) * 100,
        y: height / 2 + (r3 - 0.5) * 100,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotation: r4 * 360,
        scale: 0.5 + r * 0.5,
        shape: shapes[Math.floor(r5 * shapes.length)],
        velocityX: (r2 - 0.5) * 20,
        velocityY: -10 - r * 15,
        rotationSpeed: (r4 - 0.5) * 20
      });
    }
    return result;
  }, [count, seed, width, height]);
  
  // 爆炸进度
  const progress = Math.min(frame / 60, 1);
  const elasticProgress = elastic(progress);
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {pieces.map((piece) => {
        // 计算当前位置
        const currentX = piece.x + piece.velocityX * frame * elasticProgress;
        const currentY = piece.y + piece.velocityY * frame + 
          0.5 * 0.3 * frame * frame; // 重力
        
        // 淡出
        const opacity = interpolate(
          frame,
          [0, 40, 80, 120],
          [0, 1, 1, 0],
          { extrapolateRight: 'clamp' }
        );
        
        // 缩放
        const scale = piece.scale * interpolate(
          frame,
          [0, 10, 60],
          [0, 1.5, 1],
          { extrapolateRight: 'clamp' }
        );
        
        // 旋转
        const rotation = piece.rotation + piece.rotationSpeed * frame;
        
        if (currentY > height + 50 || opacity <= 0) return null;
        
        return (
          <div
            key={piece.id}
            style={{
              position: 'absolute',
              left: currentX,
              top: currentY,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
              opacity
            }}
          >
            <ConfettiShape shape={piece.shape} color={piece.color} size={15} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// 彩带形状组件
const ConfettiShape: React.FC<{
  shape: ConfettiPiece['shape'];
  color: string;
  size: number;
}> = ({ shape, color, size }) => {
  switch (shape) {
    case 'circle':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color
          }}
        />
      );
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={color}
          />
        </svg>
      );
    case 'rect':
      return (
        <div
          style={{
            width: size * 0.6,
            height: size,
            backgroundColor: color,
            borderRadius: 2
          }}
        />
      );
    case 'triangle':
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`
          }}
        />
      );
    default:
      return null;
  }
};

export default ConfettiBurst;
