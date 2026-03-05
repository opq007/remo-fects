import React, { useMemo } from 'react';
import { 
  AbsoluteFill, 
  useVideoConfig,
  useCurrentFrame,
  interpolate,
  spring
} from 'remotion';
import { z } from 'zod';
import { 
  StoryPanel,
  StoryChapterConfig,
  StoryCharacterConfig,
  Character,
  SpeechBubble,
  Firework,
  StarFieldBackground,
} from '../../../effects/shared/index';
import {
  CartoonElements,
  PhotoCard,
  PhotoFromMagicCircle,
  FloatingHearts,
  BirthdaySongScene,
  DreamBubblesScene,
  BouncingName,
  BlessingText,
} from '../components';
import { getColorTheme } from '../utils/colors';
import { 
  KidsSubStyle, 
  CharacterSeries,
  ZodiacType,
  PetType,
  HeroType,
  PhotoData,
  ScreenOrientation,
  PRIMARY_COLORS,
} from '../types';
import { 
  KidsBirthdaySchema, 
  getModulesByVersion, 
  getDurationByVersion 
} from '../schemas';

export type KidsBirthdayProps = z.infer<typeof KidsBirthdaySchema>;

// ==================== 章节内部组件 ====================

/**
 * 模块 A：魔法开场 - 内部内容
 */
const ChapterAContent: React.FC<{
  name: string;
  characterSeries: CharacterSeries;
  characterType: ZodiacType | PetType | HeroType;
}> = ({ name, characterSeries, characterType }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const blackOpacity = interpolate(frame, [0, 24], [1, 0], { extrapolateRight: 'clamp' });
  const characterEntrance = spring({
    frame: Math.max(frame - 20, 0),
    fps,
    config: { damping: 12, stiffness: 80 }
  });
  const showGreeting = frame > 35;
  const bubbleScale = showGreeting 
    ? spring({
        frame: frame - 35,
        fps,
        config: { damping: 10, stiffness: 200 }
      })
    : 0;
  
  return (
    <>
      {/* 黑屏 */}
      <AbsoluteFill 
        style={{ 
          backgroundColor: 'black', 
          opacity: blackOpacity,
          zIndex: 50 
        }} 
      />
      
      {/* 角色和气泡组合 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '45%',
          transform: `translateX(-50%) translateY(${interpolate(characterEntrance, [0, 1], [100, 0])}px)`,
          opacity: characterEntrance,
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {showGreeting && (
          <div style={{ marginBottom: 25, transform: `scale(${bubbleScale})` }}>
            <SpeechBubble
              text={`亲爱的${name}小朋友——\n生日快乐呀！`}
              visible={true}
              color="#FFFFFF"
            />
          </div>
        )}
        
        <Character
          series={characterSeries}
          type={characterType}
          size={180}
          expression="happy"
          inline={true}
          animate={true}
        />
      </div>
    </>
  );
};

/**
 * 模块 B：角色入场 - 内部内容
 */
const ChapterBContent: React.FC<{
  name: string;
  age?: number;
  characterSeries: CharacterSeries;
  characterType: ZodiacType | PetType | HeroType;
  subStyle: KidsSubStyle;
  orientation: ScreenOrientation;
}> = ({ name, age, characterSeries, characterType, subStyle, orientation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const characterEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 }
  });
  const showIntroduction = frame > 72;
  const showNameBounce = frame > 120;
  
  return (
    <>
      {/* 角色和气泡 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '45%',
          transform: `translateX(-50%) translateY(${interpolate(characterEntrance, [0, 1], [200, 0])}px)`,
          opacity: characterEntrance,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {showIntroduction && !showNameBounce && (
          <div style={{ marginBottom: 25 }}>
            <SpeechBubble text={`我是你的生肖守护神小老虎！`} visible={true} />
          </div>
        )}
        
        <Character
          series={characterSeries}
          type={characterType}
          size={orientation === 'portrait' ? 180 : 150}
          expression={showIntroduction ? 'waving' : 'happy'}
          inline={true}
          animate={true}
        />
      </div>
      
      {/* 名字发光弹跳 */}
      {showNameBounce && (
        <div style={{ position: 'absolute', top: '20%', width: '100%', zIndex: 15 }}>
          <BouncingName
            name={name}
            age={age}
            showAge={false}
            subStyle={subStyle}
            fontSize={orientation === 'portrait' ? 100 : 80}
          />
        </div>
      )}
    </>
  );
};

/**
 * 模块 D：照片互动2 - 内部内容
 */
const ChapterDContent: React.FC<{
  photo: PhotoData;
  orientation: ScreenOrientation;
}> = ({ photo, orientation }) => {
  const frame = useCurrentFrame();
  
  return (
    <>
      <PhotoCard
        photo={photo}
        index={0}
        totalPhotos={1}
        orientation={orientation}
        animationType="flyIn"
        visible={true}
        showCaption={true}
      />
      {frame > 30 && <FloatingHearts count={15} />}
    </>
  );
};

/**
 * 模块 F：成长庆祝高潮 - 内部内容
 */
const ChapterFContent: React.FC<{
  name: string;
  age?: number;
  subStyle: KidsSubStyle;
  orientation: ScreenOrientation;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}> = ({ name, age, subStyle, orientation, primaryColor, secondaryColor, accentColor }) => {
  const frame = useCurrentFrame();
  const showFirework = frame > 20;
  
  return (
    <>
      {/* 多个烟花 */}
      {showFirework && (
        <>
          <Firework x={0.3} y={0.3} color={primaryColor} triggerFrame={0} />
          <Firework x={0.7} y={0.3} color={secondaryColor} triggerFrame={15} />
          <Firework x={0.5} y={0.2} color={accentColor} triggerFrame={30} />
        </>
      )}
      
      {/* 名字+年龄大字 */}
      <div style={{ position: 'absolute', top: '30%', width: '100%', zIndex: 20 }}>
        <BouncingName
          name={name}
          age={age}
          showAge={true}
          subStyle={subStyle}
          fontSize={orientation === 'portrait' ? 90 : 70}
        />
      </div>
      
      {/* 生日快乐文字 */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        width: '100%', 
        zIndex: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <BlessingText
          text="生日快乐"
          fontSize={orientation === 'portrait' ? 50 : 40}
          subStyle={subStyle}
        />
      </div>
    </>
  );
};

/**
 * 模块 G：生日歌 - 内部内容
 */
const ChapterGContent: React.FC<{
  age?: number;
  name?: string;
  birthdaySongSource?: string;
  birthdaySongVolume: number;
  photos: PhotoData[];
  subStyle: KidsSubStyle;
  durationInFrames: number;
}> = ({ age, name, birthdaySongSource, birthdaySongVolume, photos, subStyle, durationInFrames }) => {
  return (
    <BirthdaySongScene
      age={age}
      name={name}
      durationInFrames={durationInFrames}
      birthdaySongSource={birthdaySongSource}
      birthdaySongVolume={birthdaySongVolume}
      photos={photos}
      subStyle={subStyle}
    />
  );
};

/**
 * 模块 J：温暖收尾 - 内部内容
 */
const ChapterJContent: React.FC<{
  name: string;
}> = ({ name }) => {
  const frame = useCurrentFrame();
  const logoOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: logoOpacity,
        zIndex: 30,
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: PRIMARY_COLORS.violet,
          textShadow: '0 0 10px rgba(255,255,255,0.5)',
        }}
      >
        ✨ Remo-Fects ✨
      </div>
    </div>
  );
};

// ==================== 主组件 ====================

/**
 * 儿童生日祝福视频组合组件 v3.0
 * 
 * 使用 StoryPanel + StoryChapter 架构重构
 * 
 * 特性：
 * - 配置驱动的章节管理
 * - 统一的过渡效果
 * - 角色系统支持
 * - 魔法效果集成
 * - 字幕系统
 */
export const KidsBirthdayComposition: React.FC<KidsBirthdayProps> = (props) => {
  const { fps } = useVideoConfig();
  
  // 解构属性
  const {
    name,
    age,
    videoVersion = '120s',
    duration,
    subStyle = 'general',
    characterSeries = 'zodiac',
    characterType = 'tiger',
    photos = [],
    dreams = ['astronaut', 'artist', 'racer'],
    orientation = 'portrait',
    cartoonElements,
    confettiLevel = 'high',
    musicEnabled = true,
    musicTrack = 'kids_party_01',
    birthdaySongSource,
    birthdaySongVolume = 0.6,
    seed,
    // 背景参数
    backgroundType = 'gradient',
    backgroundColor,
    backgroundGradient,
    backgroundSource,
    backgroundVideoLoop,
    backgroundVideoMuted,
    // 遮罩参数
    overlayColor,
    overlayOpacity = 0.1,
    // 音频参数
    audioEnabled,
    audioSource,
    audioVolume = 0.5,
    audioLoop = true,
  } = props;
  
  const theme = getColorTheme(subStyle);
  
  // 计算时长
  const effectiveDuration = duration ?? getDurationByVersion(videoVersion);
  
  // 确定背景
  const effectiveGradient = backgroundGradient || theme.gradient;
  const effectiveBackgroundColor = backgroundColor || theme.background;
  
  // 音频配置
  const effectiveAudioEnabled = audioEnabled ?? musicEnabled;
  const effectiveAudioSource = audioSource || `${musicTrack}.mp3`;
  
  // 类型断言
  const typedCharacterType = characterType as ZodiacType & PetType & HeroType;
  
  // 角色配置（共享）
  const characterConfig: StoryCharacterConfig = {
    series: characterSeries,
    type: typedCharacterType,
    size: orientation === 'portrait' ? 180 : 150,
    animate: true,
  };
  
  // 构建章节配置
  const chapters = useMemo((): StoryChapterConfig[] => {
    const chapterList: StoryChapterConfig[] = [];
    const modules = getModulesByVersion(videoVersion);
    
    // 模块 A：魔法开场（2秒 = 48帧）
    if (modules.includes('A')) {
      chapterList.push({
        id: 'A_magicOpening',
        durationInFrames: 2 * fps,
        backgroundType: 'color',
        backgroundColor: '#0a0a20',
        magicEffects: {
          particles: {
            enabled: true,
            particleCount: 80,
            color: PRIMARY_COLORS.violet,
            durationInFrames: 48,
          },
        },
        children: (
          <ChapterAContent
            name={name}
            characterSeries={characterSeries}
            characterType={typedCharacterType}
          />
        ),
      });
    }
    
    // 模块 B：角色入场（10秒 = 240帧）
    if (modules.includes('B')) {
      chapterList.push({
        id: 'B_characterEntrance',
        durationInFrames: 10 * fps,
        backgroundType: 'gradient',
        backgroundGradient: effectiveGradient,
        magicEffects: {
          balloonBurst: {
            enabled: true,
            x: 0.5,
            y: 0.5,
            balloonCount: 12,
            triggerFrame: 192,
          },
          whiteFlash: {
            enabled: true,
            durationInFrames: 20,
            triggerFrame: 200, // 在第 200 帧触发白闪
          },
        },
        children: (
          <ChapterBContent
            name={name}
            age={age}
            characterSeries={characterSeries}
            characterType={typedCharacterType}
            subStyle={subStyle}
            orientation={orientation}
          />
        ),
      });
    }
    
    // 模块 C：照片互动1（13秒 = 312帧）
    if (modules.includes('C') && photos[0]) {
      chapterList.push({
        id: 'C_photoInteraction1',
        durationInFrames: 13 * fps,
        backgroundType: 'gradient',
        backgroundGradient: effectiveGradient,
        overlayOpacity: 0.05,
        children: <PhotoFromMagicCircle photo={photos[0]} visible={true} orientation={orientation} />,
      });
    }
    
    // 模块 D：照片互动2（13秒 = 312帧）
    if (modules.includes('D') && photos[1]) {
      chapterList.push({
        id: 'D_photoInteraction2',
        durationInFrames: 13 * fps,
        backgroundType: 'gradient',
        backgroundGradient: effectiveGradient,
        overlayOpacity: 0.05,
        children: <ChapterDContent photo={photos[1]} orientation={orientation} />,
      });
    }
    
    // 模块 E：照片互动3（12秒 = 288帧）
    if (modules.includes('E') && photos[2]) {
      chapterList.push({
        id: 'E_photoInteraction3',
        durationInFrames: 12 * fps,
        backgroundType: 'gradient',
        backgroundGradient: effectiveGradient,
        overlayOpacity: 0.05,
        children: (
          <PhotoCard
            photo={photos[2]}
            index={0}
            totalPhotos={1}
            orientation={orientation}
            animationType="rotateIn"
            visible={true}
          />
        ),
      });
    }
    
    // 模块 F：成长庆祝高潮（10秒 = 240帧）
    if (modules.includes('F')) {
      chapterList.push({
        id: 'F_growthCelebration',
        durationInFrames: 10 * fps,
        backgroundType: 'gradient',
        backgroundGradient: effectiveGradient,
        confetti: {
          enabled: true,
          level: confettiLevel,
          primaryColor: theme.primary,
          secondaryColor: theme.secondary,
        },
        magicEffects: {
          firework: {
            enabled: true,
            x: 0.5,
            y: 0.3,
            particleCount: 50,
            color: theme.primary,
            triggerFrame: 20,
          },
        },
        children: (
          <ChapterFContent
            name={name}
            age={age}
            subStyle={subStyle}
            orientation={orientation}
            primaryColor={theme.primary}
            secondaryColor={theme.secondary}
            accentColor={theme.accent}
          />
        ),
      });
    }
    
    // 模块 G：生日歌互动（30秒 = 720帧）
    if (modules.includes('G')) {
      chapterList.push({
        id: 'G_birthdaySong',
        durationInFrames: 30 * fps,
        backgroundType: 'gradient',
        backgroundGradient: effectiveGradient,
        children: (
          <ChapterGContent
            age={age}
            name={name}
            birthdaySongSource={birthdaySongSource}
            birthdaySongVolume={birthdaySongVolume}
            photos={photos}
            subStyle={subStyle}
            durationInFrames={30 * fps}
          />
        ),
      });
    }
    
    // 模块 H：未来祝福（15秒 = 360帧）
    if (modules.includes('H')) {
      chapterList.push({
        id: 'H_futureBlessing',
        durationInFrames: 15 * fps,
        backgroundType: 'gradient',
        backgroundGradient: 'linear-gradient(180deg, #0a0a2e 0%, #1a1a4e 50%, #2a2a6e 100%)',
        character: {
          ...characterConfig,
          position: 'center',
        },
        subtitles: [
          {
            text: '未来的一年，我会一直守护你。',
            startFrame: 60,
            durationInFrames: 180,
            position: 'bottom',
            fontSize: 28,
            color: '#FFFFFF',
            backgroundColor: PRIMARY_COLORS.violet,
            backgroundOpacity: 0.8,
          },
        ],
        magicEffects: {
          shootingStar: {
            enabled: true,
            startX: 0.9,
            startY: 0.1,
            endX: 0.3,
            endY: 0.5,
            durationInFrames: 40,
          },
        },
        children: <StarFieldBackground starCount={150} />,
      });
    }
    
    // 模块 I：梦想种子（10秒 = 240帧）
    if (modules.includes('I')) {
      chapterList.push({
        id: 'I_dreamSeeds',
        durationInFrames: 10 * fps,
        backgroundType: 'gradient',
        backgroundGradient: 'linear-gradient(180deg, #1a1a4e 0%, #2a2a6e 50%, #3a3a8e 100%)',
        children: (
          <DreamBubblesScene
            dreams={dreams}
            visible={true}
            showText={true}
            text="你的梦想一定会发光！"
          />
        ),
      });
    }
    
    // 模块 J：温暖收尾（5秒 = 120帧）
    if (modules.includes('J')) {
      chapterList.push({
        id: 'J_warmClosing',
        durationInFrames: 5 * fps,
        backgroundType: 'gradient',
        backgroundGradient: effectiveGradient,
        character: {
          ...characterConfig,
          position: 'center',
          expression: 'waving',
        },
        subtitles: [
          {
            text: `生日快乐，${name}！`,
            startFrame: 30,
            durationInFrames: 90,
            position: 'top',
            fontSize: 40,
            color: PRIMARY_COLORS.creamYellow,
            animationType: 'bounce',
          },
        ],
        children: <ChapterJContent name={name} />,
      });
    }
    
    return chapterList;
  }, [
    videoVersion, fps, photos, dreams, name, age, subStyle, orientation, 
    confettiLevel, theme, characterSeries, typedCharacterType, effectiveGradient,
    birthdaySongSource, birthdaySongVolume, characterConfig
  ]);
  
  return (
    <StoryPanel
      chapters={chapters}
      defaultTransition={{ type: 'fade', durationInFrames: 12 }}
      chapterGap={0}
      backgroundType={backgroundType}
      backgroundColor={effectiveBackgroundColor}
      backgroundGradient={effectiveGradient}
      backgroundSource={backgroundSource}
      backgroundVideoLoop={backgroundVideoLoop}
      backgroundVideoMuted={backgroundVideoMuted}
      overlayColor={overlayColor}
      overlayOpacity={overlayOpacity}
      audioEnabled={effectiveAudioEnabled}
      audioSource={effectiveAudioSource}
      audioVolume={audioVolume}
      audioLoop={audioLoop}
      // 背景音乐配置
      backgroundMusic={
        musicEnabled
          ? {
              enabled: true,
              source: `${musicTrack}.mp3`,
              volume: 0.3,
              loop: true,
            }
          : undefined
      }
      // 面板级覆盖内容：卡通元素
      overlayContent={
        cartoonElements ? (
          <CartoonElements
            defaultColor={theme.primary}
            elements={cartoonElements}
            seed={seed ?? 0}
          />
        ) : undefined
      }
    />
  );
};

export default KidsBirthdayComposition;