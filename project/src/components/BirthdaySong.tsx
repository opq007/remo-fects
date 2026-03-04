import React, { useMemo } from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig,
  interpolate,
  spring,
  Sequence
} from 'remotion';
import { PRIMARY_COLORS, KidsSubStyle } from '../types';
import { getColorTheme, generateGlow, generate3DTextShadow } from '../utils/colors';

// ==================== 生日蛋糕 ====================

interface BirthdayCakeProps {
  candles?: number;
  age?: number;
  lit?: boolean;
  size?: number;
  showFlame?: boolean;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  candles = 5,
  age,
  lit = true,
  size = 200,
  showFlame = true
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 蛋糕升起动画
  const rise = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 50 }
  });
  
  // 火焰闪烁
  const flicker = 0.8 + Math.sin(frame * 0.3) * 0.2;
  
  // 烛光摇曳
  const candleGlow = 0.5 + Math.sin(frame * 0.2) * 0.3;
  
  const candleCount = age || candles;
  const candlePositions = useMemo(() => {
    return Array.from({ length: Math.min(candleCount, 10) }, (_, i) => ({
      x: 80 + (i % 5) * 20,
      y: i < 5 ? -15 : -25,
    }));
  }, [candleCount]);
  
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size * 1.2,
        transform: `translateY(${interpolate(rise, [0, 1], [100, 0])}px)`,
        opacity: rise,
      }}
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 200 240">
        {/* 蛋糕盘 */}
        <ellipse cx="100" cy="220" rx="90" ry="15" fill="#E8E8E8" />
        <ellipse cx="100" cy="215" rx="85" ry="12" fill="#F5F5F5" />
        
        {/* 第一层蛋糕 */}
        <rect x="30" y="150" width="140" height="60" rx="10" fill="#FFB6C1" />
        <rect x="30" y="150" width="140" height="20" rx="10" fill="#FFC0CB" />
        
        {/* 奶油装饰 - 第一层 */}
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse
            key={`cream1-${i}`}
            cx={35 + i * 22}
            cy="155"
            rx="12"
            ry="8"
            fill="white"
          />
        ))}
        
        {/* 第二层蛋糕 */}
        <rect x="50" y="90" width="100" height="65" rx="8" fill="#FFE4E1" />
        <rect x="50" y="90" width="100" height="18" rx="8" fill="#FFF0F5" />
        
        {/* 奶油装饰 - 第二层 */}
        {Array.from({ length: 5 }).map((_, i) => (
          <ellipse
            key={`cream2-${i}`}
            cx={60 + i * 22}
            cy="95"
            rx="10"
            ry="6"
            fill="white"
          />
        ))}
        
        {/* 第三层蛋糕（顶层） */}
        <rect x="65" y="50" width="70" height="45" rx="6" fill="#FFF8DC" />
        <rect x="65" y="50" width="70" height="15" rx="6" fill="#FFFEF0" />
        
        {/* 顶部奶油花 */}
        <circle cx="100" cy="55" r="15" fill="white" />
        <circle cx="100" cy="50" r="10" fill="white" />
        <circle cx="100" cy="46" r="6" fill="#FFB6C1" />
        
        {/* 蜡烛 */}
        {candlePositions.map((pos, i) => (
          <g key={`candle-${i}`}>
            {/* 蜡烛身体 */}
            <rect
              x={pos.x - 2}
              y={pos.y}
              width="4"
              height="20"
              fill={`hsl(${(i * 40) % 360}, 80%, 70%)`}
              rx="1"
            />
            {/* 蜡烛条纹 */}
            <rect
              x={pos.x - 2}
              y={pos.y + 3}
              width="4"
              height="3"
              fill="white"
              opacity="0.5"
            />
            <rect
              x={pos.x - 2}
              y={pos.y + 10}
              width="4"
              height="3"
              fill="white"
              opacity="0.5"
            />
            {/* 火焰 */}
            {lit && showFlame && (
              <g style={{ opacity: flicker }}>
                <ellipse
                  cx={pos.x}
                  cy={pos.y - 8}
                  rx="4"
                  ry="8"
                  fill="#FFD700"
                  style={{
                    filter: `drop-shadow(0 0 ${5 * candleGlow}px #FF6B00)`,
                  }}
                />
                <ellipse
                  cx={pos.x}
                  cy={pos.y - 6}
                  rx="2"
                  ry="5"
                  fill="#FF6B00"
                />
                <ellipse
                  cx={pos.x}
                  cy={pos.y - 4}
                  rx="1"
                  ry="3"
                  fill="#FFF"
                />
              </g>
            )}
          </g>
        ))}
        
        {/* 樱桃装饰 */}
        <circle cx="80" cy="115" r="6" fill="#DC143C" />
        <circle cx="120" cy="115" r="6" fill="#DC143C" />
        <circle cx="78" cy="113" r="2" fill="white" opacity="0.6" />
        <circle cx="118" cy="113" r="2" fill="white" opacity="0.6" />
      </svg>
    </div>
  );
};

// ==================== 歌词弹跳字幕 ====================

interface BouncingLyricsProps {
  lyrics: string[];
  currentIndex: number;
  color?: string;
  fontSize?: number;
  highlightColor?: string;
}

export const BouncingLyrics: React.FC<BouncingLyricsProps> = ({
  lyrics,
  currentIndex,
  color = '#333333',
  fontSize = 32,
  highlightColor = PRIMARY_COLORS.strawberryPink
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        padding: '0 20px',
      }}
    >
      {lyrics.map((line, lineIndex) => {
        const chars = line.split('');
        const isActive = lineIndex === currentIndex;
        
        return (
          <div
            key={lineIndex}
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            {chars.map((char, charIndex) => {
              // 弹跳动画
              const bounce = isActive 
                ? spring({
                    frame: Math.max(frame - charIndex * 2, 0),
                    fps,
                    config: { damping: 10, stiffness: 200 }
                  })
                : 0.8;
              
              const scale = isActive ? interpolate(bounce, [0, 0.5, 1], [0.8, 1.2, 1]) : 1;
              const y = isActive ? interpolate(bounce, [0, 0.5, 1], [10, -15, 0]) : 0;
              
              return (
                <span
                  key={charIndex}
                  style={{
                    display: 'inline-block',
                    fontSize: isActive ? fontSize * 1.2 : fontSize,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? highlightColor : color,
                    transform: `translateY(${y}px) scale(${scale})`,
                    textShadow: isActive 
                      ? `2px 2px 4px rgba(0,0,0,0.2), 0 0 20px ${colorWithOpacity(highlightColor, 0.5)}`
                      : 'none',
                    transition: 'all 0.1s ease',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// 辅助函数
function colorWithOpacity(color: string, opacity: number): string {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// ==================== 许愿界面 ====================

interface MakeWishProps {
  visible?: boolean;
  name?: string;
}

export const MakeWish: React.FC<MakeWishProps> = ({
  visible = true,
  name = '小朋友'
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  // 脉冲效果
  const pulse = 1 + Math.sin(frame * 0.1) * 0.05;
  
  // 闪烁星星
  const sparkle = 0.5 + Math.sin(frame * 0.3) * 0.5;
  
  if (!visible) return null;
  
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* 主文字 */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: PRIMARY_COLORS.creamYellow,
          textShadow: `
            2px 2px 0 white,
            -2px -2px 0 white,
            2px -2px 0 white,
            -2px 2px 0 white,
            0 0 30px ${PRIMARY_COLORS.creamYellow}
          `,
          transform: `scale(${pulse})`,
          fontFamily: '"Comic Sans MS", "PingFang SC", cursive',
          textAlign: 'center',
        }}
      >
        ✨ 快许个愿吧！✨
      </div>
      
      {/* 装饰星星 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + frame * 0.02;
        const radius = 150 + Math.sin(frame * 0.05 + i) * 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: width / 2 + x,
              top: height / 2 + y,
              fontSize: 20,
              opacity: sparkle,
              transform: 'translate(-50%, -50%)',
            }}
          >
            ⭐
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ==================== 完整生日歌场景 ====================

interface BirthdaySongSceneProps {
  age?: number;
  name?: string;
  durationInFrames: number;
}

// 生日歌歌词（标准30秒）
const BIRTHDAY_SONG_LYRICS = [
  '祝你生日快乐',
  '祝你生日快乐',
  '祝你生日快乐',
  '祝你生日快乐',
  'Happy Birthday to You',
  'Happy Birthday to You',
  'Happy Birthday to You',
  'Happy Birthday to You',
];

export const BirthdaySongScene: React.FC<BirthdaySongSceneProps> = ({
  age = 1,
  name = '小朋友',
  durationInFrames
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  
  // 计算当前歌词索引（每行约3.75秒 = 90帧）
  const lyricsInterval = Math.floor(durationInFrames / BIRTHDAY_SONG_LYRICS.length);
  const currentLyricIndex = Math.min(
    Math.floor(frame / lyricsInterval),
    BIRTHDAY_SONG_LYRICS.length - 1
  );
  
  // 许愿阶段（最后5秒）
  const showWish = frame > durationInFrames - 120;
  
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 蛋糕 */}
      <div style={{ marginBottom: 30 }}>
        <BirthdayCake
          candles={5}
          age={age}
          lit={!showWish}
          size={250}
        />
      </div>
      
      {/* 歌词 */}
      {!showWish && (
        <div style={{
          position: 'absolute',
          bottom: height * 0.2,
          width: '100%',
        }}>
          <BouncingLyrics
            lyrics={BIRTHDAY_SONG_LYRICS.slice(0, currentLyricIndex + 1)}
            currentIndex={currentLyricIndex}
          />
        </div>
      )}
      
      {/* 许愿 */}
      {showWish && <MakeWish name={name} />}
    </AbsoluteFill>
  );
};

export default BirthdayCake;
