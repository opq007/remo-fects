import React, { useMemo } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  random,
  spring
} from 'remotion';
import { CartoonElement, CartoonElementType, DEFAULT_CARTOON_COLORS } from '../types/cartoon';

interface CartoonElementsProps {
  /** 卡通元素配置 */
  elements?: CartoonElement[];
  /** 随机种子 */
  seed?: number;
  /** 默认颜色 */
  defaultColor?: string;
}

// SVG 卡通元素
const CartoonSVG: React.FC<{
  type: CartoonElementType;
  color: string;
  size: number;
}> = ({ type, color, size }) => {
  switch (type) {
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'balloon':
      return (
        <svg width={size} height={size * 1.3} viewBox="0 0 40 52">
          <ellipse cx="20" cy="18" rx="18" ry="22" fill={color} />
          <path d="M20 40 L18 45 L22 45 Z" fill={color} />
          <path d="M20 45 Q15 50 20 52 Q25 50 20 45" stroke={color} fill="none" strokeWidth="1" />
          <ellipse cx="14" cy="12" rx="4" ry="6" fill="rgba(255,255,255,0.4)" />
        </svg>
      );
    case 'cake':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <rect x="6" y="24" width="36" height="20" rx="4" fill={color} />
          <rect x="10" y="16" width="28" height="12" rx="3" fill="#FFD93D" />
          <rect x="22" y="4" width="4" height="14" fill="#FFF" />
          <ellipse cx="24" cy="4" rx="4" ry="4" fill="#FF6FAF" />
          <circle cx="16" cy="22" r="3" fill="#FF6FAF" />
          <circle cx="24" cy="20" r="3" fill="#6EC8FF" />
          <circle cx="32" cy="22" r="3" fill="#8DECB4" />
        </svg>
      );
    case 'rocket':
      return (
        <svg width={size} height={size * 1.2} viewBox="0 0 40 48">
          <path d="M20 0 C12 8 8 20 8 32 L32 32 C32 20 28 8 20 0Z" fill={color} />
          <circle cx="20" cy="18" r="6" fill="#FFF" />
          <circle cx="20" cy="18" r="3" fill="#6EC8FF" />
          <path d="M12 32 L8 44 L16 38 Z" fill="#FFD93D" />
          <path d="M28 32 L32 44 L24 38 Z" fill="#FFD93D" />
          <path d="M16 44 L20 48 L24 44 L20 40 Z" fill="#FF6FAF" />
        </svg>
      );
    case 'unicorn':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <ellipse cx="20" cy="22" rx="14" ry="12" fill="#FFF" />
          <circle cx="20" cy="10" r="8" fill="#FFF" />
          <path d="M18 4 L20 -4 L22 4 L24 -2 L22 6 Z" fill="#FFD93D" />
          <circle cx="16" cy="8" r="2" fill="#333" />
          <ellipse cx="20" cy="34" rx="4" ry="3" fill="#FFB6C1" />
          <path d="M6 20 Q2 15 8 12" stroke="#FFB6C1" fill="none" strokeWidth="2" />
          <path d="M34 20 Q38 15 32 12" stroke="#FFB6C1" fill="none" strokeWidth="2" />
        </svg>
      );
    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case 'crown':
      return (
        <svg width={size} height={size * 0.8} viewBox="0 0 40 32">
          <path 
            d="M4 28 L4 12 L12 20 L20 4 L28 20 L36 12 L36 28 Z" 
            fill={color}
          />
          <circle cx="4" cy="10" r="4" fill="#FFD93D" />
          <circle cx="20" cy="2" r="4" fill="#FF6FAF" />
          <circle cx="36" cy="10" r="4" fill="#6EC8FF" />
          <rect x="4" y="26" width="32" height="6" rx="2" fill={color} />
        </svg>
      );
    default:
      return null;
  }
};

// 单个卡通元素
const FloatingElement: React.FC<{
  type: CartoonElementType;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  frame: number;
  fps: number;
}> = ({ type, x, y, color, size, delay, frame, fps }) => {
  const localFrame = Math.max(frame - delay, 0);
  
  // 入场动画
  const entry = spring({
    frame: localFrame,
    fps,
    config: {
      damping: 15,
      stiffness: 100
    }
  });
  
  // 浮动动画
  const floatY = Math.sin(localFrame * 0.05 + delay * 0.1) * 10;
  
  // 摇摆旋转
  const rotation = Math.sin(localFrame * 0.08 + delay * 0.2) * 10;
  
  // 缩放呼吸
  const breathe = 1 + Math.sin(localFrame * 0.1) * 0.05;
  
  const scale = entry * breathe;
  const opacity = entry;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + floatY,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
      }}
    >
      <CartoonSVG type={type} color={color} size={size} />
    </div>
  );
};

// 默认卡通元素配置
const DEFAULT_ELEMENTS: CartoonElement[] = [
  { type: 'balloon', position: 'top', count: 3, color: '#FF6FAF' },
  { type: 'balloon', position: 'top', count: 2, color: '#6EC8FF' },
  { type: 'star', position: 'around', count: 8, color: '#FFD93D' },
  { type: 'heart', position: 'around', count: 5, color: '#FF6FAF' },
  { type: 'cake', position: 'bottom', count: 1, color: '#8DECB4' }
];

export const CartoonElements: React.FC<CartoonElementsProps> = ({
  elements = DEFAULT_ELEMENTS,
  seed = 0,
  defaultColor
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  // 根据位置生成坐标
  const positionedElements = useMemo(() => {
    const result: Array<{
      type: CartoonElementType;
      x: number;
      y: number;
      color: string;
      size: number;
      delay: number;
    }> = [];
    
    let index = 0;
    
    elements.forEach((el) => {
      for (let i = 0; i < el.count; i++) {
        let x, y;
        const baseSize = el.type === 'cake' ? 80 : el.type === 'balloon' ? 50 : 30;
        
        switch (el.position) {
          case 'top':
            x = width * (0.15 + (i / el.count) * 0.7) + random(`x-${seed}-${index}`) * 30;
            y = height * 0.08 + random(`y-${seed}-${index}`) * 20;
            break;
          case 'bottom':
            x = width * 0.5 + (i - el.count / 2) * 100;
            y = height * 0.88;
            break;
          case 'left':
            x = width * 0.1;
            y = height * (0.3 + i * 0.15);
            break;
          case 'right':
            x = width * 0.9;
            y = height * (0.3 + i * 0.15);
            break;
          case 'around':
          default:
            x = random(`around-x-${seed}-${index}`) * width;
            y = random(`around-y-${seed}-${index}`) * height;
            break;
        }
        
        result.push({
          type: el.type,
          x,
          y,
          color: el.color || defaultColor || DEFAULT_CARTOON_COLORS[index % DEFAULT_CARTOON_COLORS.length],
          size: baseSize,
          delay: index * 5
        });
        
        index++;
      }
    });
    
    return result;
  }, [elements, seed, width, height, defaultColor]);
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {positionedElements.map((el, idx) => (
        <FloatingElement
          key={idx}
          type={el.type}
          x={el.x}
          y={el.y}
          color={el.color}
          size={el.size}
          delay={el.delay}
          frame={frame}
          fps={fps}
        />
      ))}
    </AbsoluteFill>
  );
};

export default CartoonElements;
