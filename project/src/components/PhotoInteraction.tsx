import React, { useMemo } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  interpolate,
  spring,
  random,
  Img,
  Easing
} from 'remotion';
import { PhotoData, ScreenOrientation, LAYOUT_CONFIGS, PRIMARY_COLORS } from '../types';
import { colorWithOpacity } from '../utils/colors';
import { MagicCircle } from './MagicEffects';

// ==================== 单张照片卡片 ====================

interface PhotoCardProps {
  photo: PhotoData;
  index: number;
  totalPhotos: number;
  orientation?: ScreenOrientation;
  animationType?: 'flyIn' | 'rotateIn' | 'scaleIn' | 'fadeIn';
  visible?: boolean;
  showCaption?: boolean;
  showMemory?: boolean;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  index,
  totalPhotos,
  orientation = 'portrait',
  animationType = 'flyIn',
  visible = true,
  showCaption = true,
  showMemory = false
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const layoutConfig = LAYOUT_CONFIGS[orientation];
  
  // 入场动画
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 0.8 }
  });
  
  // 轻微浮动
  const floatY = Math.sin(frame * 0.05 + index) * 5;
  const floatRotation = Math.sin(frame * 0.03 + index * 0.5) * 2;
  
  // 位置计算
  const getPosition = () => {
    if (orientation === 'landscape') {
      return {
        x: width * 0.65,
        y: height * 0.35 + index * 30,
      };
    }
    return {
      x: width * 0.5,
      y: height * 0.3 + index * 20,
    };
  };
  
  const pos = getPosition();
  
  // 动画样式
  const getAnimationStyle = (): React.CSSProperties => {
    switch (animationType) {
      case 'flyIn':
        return {
          transform: `translateX(${interpolate(entrance, [0, 1], [width, 0])}px) translateY(${floatY}px) rotate(${floatRotation}deg)`,
        };
      case 'rotateIn':
        return {
          transform: `rotate(${interpolate(entrance, [0, 1], [180, 0])}deg) scale(${entrance}) translateY(${floatY}px)`,
        };
      case 'scaleIn':
        return {
          transform: `scale(${interpolate(entrance, [0, 0.5, 1], [0, 1.2, 1])}) translateY(${floatY}px) rotate(${floatRotation}deg)`,
        };
      default:
        return {
          transform: `translateY(${floatY}px) rotate(${floatRotation}deg)`,
          opacity: entrance,
        };
    }
  };
  
  if (!visible) return null;
  
  // 照片卡片尺寸
  const cardWidth = orientation === 'portrait' ? width * 0.6 : width * 0.25;
  const cardHeight = cardWidth * 1.2;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        ...getAnimationStyle(),
        zIndex: 20 + index,
      }}
    >
      {/* 照片卡片 */}
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 10,
          boxShadow: `
            0 10px 30px rgba(0,0,0,0.2),
            0 0 0 1px rgba(255,255,255,0.5),
            inset 0 0 0 1px rgba(0,0,0,0.05)
          `,
          transform: 'translateX(-50%)',
        }}
      >
        {/* 照片 */}
        <div
          style={{
            width: '100%',
            height: '75%',
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
          }}
        >
          {photo.src ? (
            <Img
              src={photo.src}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
            }}>
              📷
            </div>
          )}
        </div>
        
        {/* 标题 */}
        {showCaption && photo.caption && (
          <div
            style={{
              padding: '8px 5px',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 600,
              color: '#333',
              fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
            }}
          >
            {photo.caption}
          </div>
        )}
      </div>
      
      {/* 回忆文字（角色说的） */}
      {showMemory && photo.memory && (
        <div
          style={{
            position: 'absolute',
            bottom: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: colorWithOpacity(PRIMARY_COLORS.violet, 0.9),
            padding: '8px 16px',
            borderRadius: 20,
            whiteSpace: 'nowrap',
            fontSize: 14,
            color: 'white',
            fontWeight: 500,
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}
        >
          {photo.memory}
        </div>
      )}
    </div>
  );
};

// ==================== 照片飞出魔法圈效果 ====================

interface PhotoFromMagicCircleProps {
  photo: PhotoData;
  visible?: boolean;
  orientation?: ScreenOrientation;
}

export const PhotoFromMagicCircle: React.FC<PhotoFromMagicCircleProps> = ({
  photo,
  visible = true,
  orientation = 'portrait'
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  // 魔法圈先出现
  const circleVisible = frame < 40;
  
  // 照片从中心飞出
  const photoProgress = spring({
    frame: Math.max(frame - 20, 0),
    fps,
    config: { damping: 20, stiffness: 60 }
  });
  
  const targetX = orientation === 'portrait' ? width * 0.5 : width * 0.65;
  const targetY = height * 0.35;
  
  const photoX = interpolate(photoProgress, [0, 1], [width * 0.5, targetX]);
  const photoY = interpolate(photoProgress, [0, 1], [height * 0.5, targetY]);
  const photoScale = interpolate(photoProgress, [0, 0.5, 1], [0.3, 0.5, 1]);
  
  if (!visible) return null;
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* 魔法圈 */}
      <MagicCircle 
        radius={100} 
        visible={circleVisible} 
        rotationSpeed={2}
      />
      
      {/* 照片 */}
      <div
        style={{
          position: 'absolute',
          left: photoX,
          top: photoY,
          transform: `translate(-50%, -50%) scale(${photoScale})`,
          zIndex: 30,
        }}
      >
        <PhotoCard
          photo={photo}
          index={0}
          totalPhotos={1}
          orientation={orientation}
          animationType="fadeIn"
          visible={photoProgress > 0.2}
        />
      </div>
    </AbsoluteFill>
  );
};

// ==================== 爱心飘出效果 ====================

interface FloatingHeartsProps {
  count?: number;
  color?: string;
  startX?: number;
  startY?: number;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({
  count = 10,
  color = PRIMARY_COLORS.strawberryPink,
  startX = 0.5,
  startY = 0.6
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      offsetX: (random(`heart-x-${i}`) - 0.5) * 200,
      speed: 1 + random(`heart-speed-${i}`) * 0.5,
      size: 20 + random(`heart-size-${i}`) * 20,
      delay: random(`heart-delay-${i}`) * 20,
      wobbleSpeed: random(`heart-wobble-${i}`) * 0.1 + 0.05,
    }));
  }, [count]);
  
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {hearts.map((heart) => {
        const localFrame = Math.max(frame - heart.delay, 0);
        const progress = Math.min(localFrame * heart.speed * 0.01, 1);
        
        const x = width * startX + heart.offsetX + Math.sin(localFrame * heart.wobbleSpeed) * 30;
        const y = height * startY - progress * 200;
        
        const opacity = interpolate(progress, [0, 0.7, 1], [0, 1, 0]);
        const scale = interpolate(progress, [0, 0.3, 1], [0.5, 1, 0.8]);
        
        return (
          <div
            key={heart.id}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              fontSize: heart.size,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          >
            ❤️
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ==================== 年龄数字气球 ====================

interface AgeBalloonProps {
  age: number;
  color?: string;
  visible?: boolean;
}

export const AgeBalloon: React.FC<AgeBalloonProps> = ({
  age,
  color = PRIMARY_COLORS.creamYellow,
  visible = true
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  // 上升动画
  const rise = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 50 }
  });
  
  // 轻微摇摆
  const wobble = Math.sin(frame * 0.08) * 10;
  
  const y = interpolate(rise, [0, 1], [height * 0.7, height * 0.2]);
  
  if (!visible) return null;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: width * 0.5 + wobble,
        top: y,
        transform: 'translateX(-50%)',
        zIndex: 25,
      }}
    >
      <svg width={150} height={200} viewBox="0 0 150 200">
        {/* 气球主体 */}
        <ellipse cx="75" cy="60" rx="60" ry="70" fill={color} />
        
        {/* 高光 */}
        <ellipse cx="55" cy="40" rx="15" ry="20" fill="rgba(255,255,255,0.4)" />
        
        {/* 气球结 */}
        <path d="M70 130 L75 140 L80 130 Z" fill={color} />
        
        {/* 绳子 */}
        <path 
          d={`M75 140 Q ${65 + wobble * 0.5} 160 75 180 Q ${85 - wobble * 0.5} 190 75 200`}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        
        {/* 年龄数字 */}
        <text
          x="75"
          y="75"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="50"
          fontWeight="bold"
          fill="white"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {age}
        </text>
      </svg>
    </div>
  );
};

// ==================== 照片互动场景（完整） ====================

interface PhotoInteractionSceneProps {
  photos: PhotoData[];
  currentIndex: number;
  orientation?: ScreenOrientation;
  characterText?: string;
  showHearts?: boolean;
  showAgeBalloon?: boolean;
  age?: number;
}

export const PhotoInteractionScene: React.FC<PhotoInteractionSceneProps> = ({
  photos,
  currentIndex,
  orientation = 'portrait',
  characterText,
  showHearts = false,
  showAgeBalloon = false,
  age
}) => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill>
      {/* 当前照片 */}
      {photos[currentIndex] && (
        <PhotoCard
          photo={photos[currentIndex]}
          index={currentIndex}
          totalPhotos={photos.length}
          orientation={orientation}
          animationType="flyIn"
          showMemory={!!characterText}
        />
      )}
      
      {/* 爱心效果 */}
      {showHearts && <FloatingHearts />}
      
      {/* 年龄气球 */}
      {showAgeBalloon && age && <AgeBalloon age={age} />}
    </AbsoluteFill>
  );
};

export default PhotoCard;
