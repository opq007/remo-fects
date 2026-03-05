import React, { useMemo } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  interpolate,
  spring,
  random,
  Easing
} from 'remotion';
import { PRIMARY_COLORS } from '../types';
import { colorWithOpacity } from '../utils/colors';

// ==================== 魔法光粒聚集效果 ====================

interface MagicParticlesProps {
  durationInFrames?: number;
  particleCount?: number;
  color?: string;
  targetX?: number;
  targetY?: number;
  onComplete?: boolean;
}

export const MagicParticles: React.FC<MagicParticlesProps> = ({
  durationInFrames = 48,
  particleCount = 50,
  color = PRIMARY_COLORS.violet,
  targetX = 0.5,
  targetY = 0.5,
  onComplete = false
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const progress = Math.min(frame / durationInFrames, 1);
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      startX: random(`px-${i}`) * width,
      startY: random(`py-${i}`) * height,
      endX: width * targetX + (random(`ox-${i}`) - 0.5) * 50,
      endY: height * targetY + (random(`oy-${i}`) - 0.5) * 50,
      size: random(`s-${i}`) * 6 + 2,
      delay: random(`d-${i}`) * 10,
      hue: random(`h-${i}`) * 60 - 30,
    }));
  }, [particleCount, width, height, targetX, targetY]);
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {particles.map((p) => {
        const localProgress = Math.max(0, (frame - p.delay) / (durationInFrames - p.delay));
        const eased = interpolate(localProgress, [0, 1], [0, 1], {
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });
        
        const x = interpolate(eased, [0, 1], [p.startX, p.endX]);
        const y = interpolate(eased, [0, 1], [p.startY, p.endY]);
        const opacity = localProgress > 0.8 ? interpolate(localProgress, [0.8, 1], [1, 0]) : localProgress;
        const scale = onComplete ? 0 : 1;
        
        const hue = (parseInt(color.slice(1), 16) % 360 + p.hue + 360) % 360;
        const particleColor = `hsl(${hue}, 80%, 70%)`;
        
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: particleColor,
              boxShadow: `0 0 ${p.size * 2}px ${particleColor}, 0 0 ${p.size * 4}px ${particleColor}`,
              opacity: opacity * (1 - scale),
              transform: `translate(-50%, -50%) scale(${1 - eased * 0.5})`,
            }}
          />
        );
      })}
      
      <div
        style={{
          position: 'absolute',
          left: width * targetX,
          top: height * targetY,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colorWithOpacity(color, 0.8)} 0%, transparent 70%)`,
          opacity: interpolate(progress, [0.5, 0.8, 1], [0, 1, onComplete ? 0 : 1]),
          transform: `translate(-50%, -50%) scale(${interpolate(progress, [0.5, 1], [0.5, 1.5])})`,
        }}
      />
    </AbsoluteFill>
  );
};

// ==================== 魔法棒效果 ====================

interface MagicWandProps {
  x?: number;
  y?: number;
  rotation?: number;
  casting?: boolean;
  color?: string;
}

export const MagicWand: React.FC<MagicWandProps> = ({
  x = 0.5,
  y = 0.6,
  rotation = -30,
  casting = false,
  color = PRIMARY_COLORS.violet
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const swingAngle = casting ? Math.sin(frame * 0.2) * 20 : 0;
  const sparkleOpacity = casting ? 0.5 + Math.sin(frame * 0.3) * 0.5 : 0;
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: width * x,
          top: height * y,
          transform: `translate(-50%, -50%) rotate(${rotation + swingAngle}deg)`,
        }}
      >
        <div style={{
          width: 8,
          height: 80,
          background: `linear-gradient(180deg, #FFD700 0%, #8B4513 100%)`,
          borderRadius: 4,
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }} />
        
        <div style={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 35,
          filter: `drop-shadow(0 0 10px ${color})`,
          opacity: sparkleOpacity + 0.8,
        }}>
          ✨
        </div>
        
        {casting && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: -10,
                  left: 4,
                  fontSize: 15,
                  opacity: sparkleOpacity,
                  transform: `translate(${-30 + i * 15}px, ${-frame % 30}px) rotate(${frame * 5}deg)`,
                }}
              >
                ✨
              </div>
            ))}
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ==================== 魔法圆环效果 ====================

interface MagicCircleProps {
  radius?: number;
  color?: string;
  visible?: boolean;
  rotationSpeed?: number;
  pulseIntensity?: number;
}

export const MagicCircle: React.FC<MagicCircleProps> = ({
  radius = 150,
  color = PRIMARY_COLORS.violet,
  visible = true,
  rotationSpeed = 1,
  pulseIntensity = 0.1
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  if (!visible) return null;
  
  const rotation = frame * rotationSpeed;
  const pulse = 1 + Math.sin(frame * 0.1) * pulseIntensity;
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: width / 2,
          top: height / 2,
          transform: `translate(-50%, -50%) scale(${pulse})`,
        }}
      >
        <div
          style={{
            width: radius * 2,
            height: radius * 2,
            borderRadius: '50%',
            border: `3px solid ${color}`,
            opacity: 0.6,
            transform: `rotate(${rotation}deg)`,
            boxShadow: `0 0 20px ${colorWithOpacity(color, 0.5)}, inset 0 0 20px ${colorWithOpacity(color, 0.3)}`,
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: radius * 1.4,
            height: radius * 1.4,
            borderRadius: '50%',
            border: `2px solid ${color}`,
            opacity: 0.4,
            transform: `translate(-50%, -50%) rotate(${-rotation * 0.5}deg)`,
          }}
        />
        
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2 + rotation * 0.02;
          const symbolX = Math.cos(angle) * radius * 0.85;
          const symbolY = Math.sin(angle) * radius * 0.85;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${symbolX}px), calc(-50% + ${symbolY}px))`,
                fontSize: 20,
                opacity: 0.8,
              }}
            >
              ✦
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ==================== 白闪转场效果 ====================

interface WhiteFlashTransitionProps {
  durationInFrames?: number;
  /** 触发帧数（相对于当前序列开始） */
  triggerFrame?: number;
}

export const WhiteFlashTransition: React.FC<WhiteFlashTransitionProps> = ({
  durationInFrames = 12,
  triggerFrame = 0
}) => {
  const frame = useCurrentFrame();
  
  // 计算相对帧数
  const localFrame = frame - triggerFrame;
  
  // 如果还没到触发时间，不显示
  if (localFrame < 0) return null;
  
  const opacity = interpolate(
    localFrame,
    [0, durationInFrames * 0.3, durationInFrames],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'white',
        opacity,
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  );
};

// ==================== 烟花绽放效果 ====================

interface FireworkProps {
  x?: number;
  y?: number;
  particleCount?: number;
  color?: string;
  triggerFrame?: number;
}

export const Firework: React.FC<FireworkProps> = ({
  x = 0.5,
  y = 0.4,
  particleCount = 30,
  color = PRIMARY_COLORS.creamYellow,
  triggerFrame = 0
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const localFrame = frame - triggerFrame;
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      angle: (i / particleCount) * Math.PI * 2,
      speed: 100 + random(`speed-${i}`) * 100,
      size: 3 + random(`size-${i}`) * 4,
      hue: random(`hue-${i}`) * 60 - 30,
    }));
  }, [particleCount]);
  
  if (localFrame < 0) return null;
  
  const progress = Math.min(localFrame / 60, 1);
  const centerX = width * x;
  const centerY = height * y;
  
  const gravity = 0.5;
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {particles.map((p) => {
        const distance = p.speed * progress;
        const currentX = centerX + Math.cos(p.angle) * distance;
        const currentY = centerY + Math.sin(p.angle) * distance + gravity * progress * progress * 100;
        
        const opacity = interpolate(progress, [0, 0.3, 1], [1, 1, 0], { 
          extrapolateLeft: 'clamp', 
          extrapolateRight: 'clamp' 
        });
        const validOpacity = Math.max(0, Math.min(1, opacity));
        const hue = (parseInt(color.slice(1), 16) % 360 + p.hue + 360) % 360;
        const particleColor = `hsl(${hue}, 100%, 70%)`;
        
        if (validOpacity <= 0 || isNaN(validOpacity)) return null;
        
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: currentX,
              top: currentY,
              width: p.size * (1 - progress * 0.5),
              height: p.size * (1 - progress * 0.5),
              borderRadius: '50%',
              backgroundColor: particleColor,
              boxShadow: `0 0 ${p.size}px ${particleColor}`,
              opacity: validOpacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ==================== 气球爆炸效果 ====================

interface BalloonBurstProps {
  x?: number;
  y?: number;
  balloonCount?: number;
  colors?: string[];
  triggerFrame?: number;
}

export const BalloonBurst: React.FC<BalloonBurstProps> = ({
  x = 0.5,
  y = 0.5,
  balloonCount = 8,
  colors = [PRIMARY_COLORS.strawberryPink, PRIMARY_COLORS.skyBlue, PRIMARY_COLORS.creamYellow, PRIMARY_COLORS.mintGreen],
  triggerFrame = 0
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  
  // 必须在提前返回之前调用所有 hooks，以遵守 React Hooks 规则
  const balloons = useMemo(() => {
    return Array.from({ length: balloonCount }, (_, i) => ({
      id: i,
      angle: (i / balloonCount) * Math.PI * 2 + random(`angle-${i}`) * 0.5,
      speed: 150 + random(`speed-${i}`) * 100,
      color: colors[i % colors.length],
      size: 40 + random(`size-${i}`) * 20,
      wobbleSpeed: random(`wobble-${i}`) * 0.1 + 0.05,
    }));
  }, [balloonCount, colors]);
  
  const localFrame = frame - triggerFrame;
  if (localFrame < 0) return null;
  
  const progress = Math.min(localFrame / 90, 1);
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {balloons.map((b) => {
        const distance = b.speed * progress;
        const wobble = Math.sin(localFrame * b.wobbleSpeed) * 30;
        const currentX = width * x + Math.cos(b.angle) * distance + wobble;
        const currentY = height * y - distance * 1.5;
        
        const scale = spring({
          frame: localFrame,
          fps,
          config: { damping: 15, stiffness: 100 }
        });
        
        const opacity = interpolate(progress, [0, 0.8, 1], [1, 1, 0], { extrapolateRight: 'clamp' });
        
        return (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              left: currentX,
              top: currentY,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          >
            <svg width={b.size} height={b.size * 1.3} viewBox="0 0 40 52">
              <ellipse cx="20" cy="18" rx="18" ry="22" fill={b.color} />
              <path d="M20 40 L18 45 L22 45 Z" fill={b.color} />
              <path d="M20 45 Q15 50 20 52 Q25 50 20 45" stroke={b.color} fill="none" strokeWidth="1" />
              <ellipse cx="14" cy="12" rx="4" ry="6" fill="rgba(255,255,255,0.4)" />
            </svg>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ==================== 流星效果 ====================

interface ShootingStarProps {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  durationInFrames?: number;
  color?: string;
  trailLength?: number;
}

export const ShootingStar: React.FC<ShootingStarProps> = ({
  startX = 0.8,
  startY = 0.1,
  endX = 0.2,
  endY = 0.5,
  durationInFrames = 30,
  color = '#FFFFFF',
  trailLength = 80
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const progress = Math.min(frame / durationInFrames, 1);
  
  const x = interpolate(progress, [0, 1], [startX * width, endX * width]);
  const y = interpolate(progress, [0, 1], [startY * height, endY * height]);
  
  const angle = Math.atan2(endY * height - startY * height, endX * width - startX * width);
  
  const opacity = progress < 0.8 ? 1 : interpolate(progress, [0.8, 1], [1, 0]);
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: trailLength,
          height: 3,
          background: `linear-gradient(90deg, transparent 0%, ${colorWithOpacity(color, 0.5)} 50%, ${color} 100%)`,
          transform: `translate(-${trailLength}px, -50%) rotate(${angle}rad)`,
          opacity,
          borderRadius: 2,
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
          opacity,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </AbsoluteFill>
  );
};

// ==================== 星空背景 ====================

interface StarFieldBackgroundProps {
  starCount?: number;
  twinkleSpeed?: number;
  color?: string;
}

export const StarFieldBackground: React.FC<StarFieldBackgroundProps> = ({
  starCount = 100,
  twinkleSpeed = 0.1,
  color = '#FFFFFF'
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const stars = useMemo(() => {
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: random(`star-x-${i}`) * width,
      y: random(`star-y-${i}`) * height,
      size: random(`star-size-${i}`) * 2 + 1,
      twinkleOffset: random(`star-twinkle-${i}`) * Math.PI * 2,
    }));
  }, [starCount, width, height]);
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {stars.map((star) => {
        const twinkle = 0.3 + Math.sin(frame * twinkleSpeed + star.twinkleOffset) * 0.5 + 0.2;
        
        return (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: twinkle,
              boxShadow: `0 0 ${star.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export default MagicParticles;