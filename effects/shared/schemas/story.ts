import { z } from 'zod';
import { BackgroundSchema } from './background';
import { OverlaySchema } from './overlay';
import { AudioSchema } from './audio';
import { RadialBurstSchema } from './radial-burst';

// ==================== 字幕 Schema ====================

/**
 * 字幕位置类型
 */
export const SubtitlePositionSchema = z.enum(['bottom', 'top', 'center']);
export type SubtitlePosition = z.infer<typeof SubtitlePositionSchema>;

/**
 * 字幕动画类型
 */
export const SubtitleAnimationTypeSchema = z.enum(['fade', 'slideUp', 'typewriter', 'bounce', 'none']);
export type SubtitleAnimationType = z.infer<typeof SubtitleAnimationTypeSchema>;

/**
 * 字幕项 Schema
 */
export const SubtitleItemSchema = z.object({
  /** 字幕文本 */
  text: z.string(),
  /** 开始帧 */
  startFrame: z.number().min(0),
  /** 持续帧数 */
  durationInFrames: z.number().min(1),
  /** 字幕位置 */
  position: SubtitlePositionSchema.optional(),
  /** 字体大小 */
  fontSize: z.number().min(8).max(200).optional(),
  /** 文字颜色 */
  color: z.string().optional(),
  /** 背景色 */
  backgroundColor: z.string().optional(),
  /** 背景透明度 */
  backgroundOpacity: z.number().min(0).max(1).optional(),
  /** 对齐方式 */
  textAlign: z.enum(['left', 'center', 'right']).optional(),
  /** 动画类型 */
  animationType: SubtitleAnimationTypeSchema.optional(),
  /** 是否显示背景框 */
  showBackground: z.boolean().optional(),
});
export type SubtitleItemProps = z.infer<typeof SubtitleItemSchema>;

/**
 * 字幕列表 Schema
 */
export const SubtitleListSchema = z.array(SubtitleItemSchema);

// ==================== 角色配置 Schema ====================

/**
 * 角色系列 Schema
 */
export const CharacterSeriesSchema = z.enum(['zodiac', 'pet', 'hero']);
export type CharacterSeriesType = z.infer<typeof CharacterSeriesSchema>;

/**
 * 生肖类型 Schema
 */
export const ZodiacTypeSchema = z.enum([
  'rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake',
  'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'
]);
export type ZodiacTypeSchemaType = z.infer<typeof ZodiacTypeSchema>;

/**
 * 萌宠类型 Schema
 */
export const PetTypeSchema = z.enum(['bunny', 'kitten', 'puppy', 'bear', 'fox', 'panda']);
export type PetTypeSchemaType = z.infer<typeof PetTypeSchema>;

/**
 * 勇气超人类型 Schema
 */
export const HeroTypeSchema = z.enum(['superhero', 'astronaut', 'knight', 'wizard', 'pirate']);
export type HeroTypeSchemaType = z.infer<typeof HeroTypeSchema>;

/**
 * 角色表情 Schema
 */
export const CharacterExpressionSchema = z.enum(['happy', 'excited', 'waving', 'hugging']);
export type CharacterExpressionType = z.infer<typeof CharacterExpressionSchema>;

/**
 * 角色位置 Schema
 */
export const CharacterPositionSchema = z.enum(['center', 'left', 'right']);
export type CharacterPositionType = z.infer<typeof CharacterPositionSchema>;

/**
 * 故事角色配置 Schema
 */
export const StoryCharacterConfigSchema = z.object({
  /** 角色系列 */
  series: CharacterSeriesSchema,
  /** 角色类型 */
  type: z.string(), // 简化类型，实际使用时验证
  /** 位置 */
  position: CharacterPositionSchema.optional(),
  /** 表情 */
  expression: CharacterExpressionSchema.optional(),
  /** 大小 */
  size: z.number().min(50).max(500).optional(),
  /** 是否动画 */
  animate: z.boolean().optional(),
  /** 对话内容 */
  speech: z.string().optional(),
  /** 是否显示对话 */
  showSpeech: z.boolean().optional(),
  /** 是否内联布局 */
  inline: z.boolean().optional(),
});
export type StoryCharacterConfigProps = z.infer<typeof StoryCharacterConfigSchema>;

// ==================== 彩带效果 Schema ====================

/**
 * 彩带密度 Schema
 */
export const ConfettiLevelSchema = z.enum(['low', 'medium', 'high']);
export type ConfettiLevelType = z.infer<typeof ConfettiLevelSchema>;

/**
 * 彩带效果配置 Schema
 */
export const StoryConfettiConfigSchema = z.object({
  /** 是否启用 */
  enabled: z.boolean(),
  /** 密度级别 */
  level: ConfettiLevelSchema.optional(),
  /** 主颜色 */
  primaryColor: z.string().optional(),
  /** 次颜色 */
  secondaryColor: z.string().optional(),
  /** 触发帧 */
  triggerFrame: z.number().optional(),
});
export type StoryConfettiConfigProps = z.infer<typeof StoryConfettiConfigSchema>;

// ==================== 魔法效果 Schema ====================

/**
 * 魔法粒子配置 Schema
 */
export const StoryMagicParticlesConfigSchema = z.object({
  enabled: z.boolean(),
  particleCount: z.number().min(10).max(200).optional(),
  color: z.string().optional(),
  targetX: z.number().min(0).max(1).optional(),
  targetY: z.number().min(0).max(1).optional(),
  durationInFrames: z.number().min(10).optional(),
});
export type StoryMagicParticlesConfigProps = z.infer<typeof StoryMagicParticlesConfigSchema>;

/**
 * 魔法棒配置 Schema
 */
export const StoryMagicWandConfigSchema = z.object({
  enabled: z.boolean(),
  x: z.number().min(0).max(1).optional(),
  y: z.number().min(0).max(1).optional(),
  rotation: z.number().optional(),
  casting: z.boolean().optional(),
  color: z.string().optional(),
});
export type StoryMagicWandConfigProps = z.infer<typeof StoryMagicWandConfigSchema>;

/**
 * 魔法圆环配置 Schema
 */
export const StoryMagicCircleConfigSchema = z.object({
  enabled: z.boolean(),
  radius: z.number().min(50).max(500).optional(),
  color: z.string().optional(),
  rotationSpeed: z.number().optional(),
  pulseIntensity: z.number().min(0).max(1).optional(),
});
export type StoryMagicCircleConfigProps = z.infer<typeof StoryMagicCircleConfigSchema>;

/**
 * 烟花配置 Schema
 */
export const StoryFireworkConfigSchema = z.object({
  enabled: z.boolean(),
  x: z.number().min(0).max(1).optional(),
  y: z.number().min(0).max(1).optional(),
  particleCount: z.number().min(10).max(100).optional(),
  color: z.string().optional(),
  triggerFrame: z.number().optional(),
});
export type StoryFireworkConfigProps = z.infer<typeof StoryFireworkConfigSchema>;

/**
 * 气球爆炸配置 Schema
 */
export const StoryBalloonBurstConfigSchema = z.object({
  enabled: z.boolean(),
  x: z.number().min(0).max(1).optional(),
  y: z.number().min(0).max(1).optional(),
  balloonCount: z.number().min(3).max(20).optional(),
  colors: z.array(z.string()).optional(),
  triggerFrame: z.number().optional(),
});
export type StoryBalloonBurstConfigProps = z.infer<typeof StoryBalloonBurstConfigSchema>;

/**
 * 白闪转场配置 Schema
 */
export const StoryWhiteFlashConfigSchema = z.object({
  enabled: z.boolean(),
  durationInFrames: z.number().min(5).max(30).optional(),
  triggerFrame: z.number().min(0).optional(),
});
export type StoryWhiteFlashConfigProps = z.infer<typeof StoryWhiteFlashConfigSchema>;

/**
 * 流星配置 Schema
 */
export const StoryShootingStarConfigSchema = z.object({
  enabled: z.boolean(),
  startX: z.number().min(0).max(1).optional(),
  startY: z.number().min(0).max(1).optional(),
  endX: z.number().min(0).max(1).optional(),
  endY: z.number().min(0).max(1).optional(),
  durationInFrames: z.number().min(10).optional(),
  color: z.string().optional(),
  trailLength: z.number().min(20).max(200).optional(),
});
export type StoryShootingStarConfigProps = z.infer<typeof StoryShootingStarConfigSchema>;

/**
 * 魔法效果集合 Schema
 */
export const StoryMagicEffectsConfigSchema = z.object({
  particles: StoryMagicParticlesConfigSchema.optional(),
  magicWand: StoryMagicWandConfigSchema.optional(),
  magicCircle: StoryMagicCircleConfigSchema.optional(),
  firework: StoryFireworkConfigSchema.optional(),
  balloonBurst: StoryBalloonBurstConfigSchema.optional(),
  whiteFlash: StoryWhiteFlashConfigSchema.optional(),
  shootingStar: StoryShootingStarConfigSchema.optional(),
});
export type StoryMagicEffectsConfigProps = z.infer<typeof StoryMagicEffectsConfigSchema>;

// ==================== 故事章节 Schema ====================

/**
 * 故事章节 Schema
 */
export const StoryChapterSchema = z.object({
  /** 章节持续时间（帧） */
  durationInFrames: z.number().min(1),
  
  // 背景配置
  backgroundType: z.enum(['color', 'image', 'video', 'gradient']).optional(),
  backgroundColor: z.string().optional(),
  backgroundGradient: z.string().optional(),
  backgroundSource: z.string().optional(),
  backgroundVideoLoop: z.boolean().optional(),
  backgroundVideoMuted: z.boolean().optional(),
  
  // 遮罩配置
  overlayColor: z.string().optional(),
  overlayOpacity: z.number().min(0).max(1).optional(),
  showOverlay: z.boolean().optional(),
  
  // 角色配置
  character: StoryCharacterConfigSchema.optional(),
  
  // 彩带效果
  confetti: StoryConfettiConfigSchema.optional(),
  
  // 魔法效果
  magicEffects: StoryMagicEffectsConfigSchema.optional(),
  
  // 发散粒子
  radialBurst: RadialBurstSchema.optional(),
  
  // 字幕
  subtitles: z.array(SubtitleItemSchema).optional(),
});
export type StoryChapterSchemaType = z.infer<typeof StoryChapterSchema>;

// ==================== 故事面板 Schema ====================

/**
 * 章节过渡类型 Schema
 */
export const ChapterTransitionTypeSchema = z.enum([
  'none', 'fade', 'slideLeft', 'slideRight', 'slideUp', 'slideDown', 'crossfade'
]);
export type ChapterTransitionTypeType = z.infer<typeof ChapterTransitionTypeSchema>;

/**
 * 章节过渡配置 Schema
 */
export const ChapterTransitionSchema = z.object({
  type: ChapterTransitionTypeSchema,
  durationInFrames: z.number().min(0).max(60).optional(),
});
export type ChapterTransitionProps = z.infer<typeof ChapterTransitionSchema>;

/**
 * 故事面板章节配置 Schema
 */
export const StoryPanelChapterSchema = StoryChapterSchema.extend({
  /** 章节唯一标识 */
  id: z.string(),
  /** 章节过渡配置 */
  transition: ChapterTransitionSchema.optional(),
});
export type StoryPanelChapterProps = z.infer<typeof StoryPanelChapterSchema>;

/**
 * 背景音乐配置 Schema
 */
export const BackgroundMusicSchema = z.object({
  enabled: z.boolean(),
  source: z.string(),
  volume: z.number().min(0).max(1).optional(),
  loop: z.boolean().optional(),
});
export type BackgroundMusicProps = z.infer<typeof BackgroundMusicSchema>;

/**
 * 故事面板 Schema
 */
export const StoryPanelSchema = z.object({
  /** 章节列表 */
  chapters: z.array(StoryPanelChapterSchema).min(1),
  
  /** 默认章节过渡配置 */
  defaultTransition: ChapterTransitionSchema.optional(),
  
  /** 是否自动计算起始帧 */
  autoCalculateStartFrame: z.boolean().optional(),
  
  /** 章节间距 */
  chapterGap: z.number().min(0).optional(),
  
  /** 背景音乐配置 */
  backgroundMusic: BackgroundMusicSchema.optional(),
  
  // 基础配置（继承 BaseComposition）
  backgroundType: z.enum(['color', 'image', 'video', 'gradient']).optional(),
  backgroundColor: z.string().optional(),
  backgroundGradient: z.string().optional(),
  backgroundSource: z.string().optional(),
  overlayColor: z.string().optional(),
  overlayOpacity: z.number().min(0).max(1).optional(),
  audioEnabled: z.boolean().optional(),
  audioSource: z.string().optional(),
  audioVolume: z.number().min(0).max(1).optional(),
  audioLoop: z.boolean().optional(),
});
export type StoryPanelProps = z.infer<typeof StoryPanelSchema>;

// ==================== 辅助函数 ====================

/**
 * 从 props 中提取故事章节参数
 */
export function extractStoryChapterProps(props: Record<string, unknown>): StoryChapterSchemaType {
  return {
    durationInFrames: props.durationInFrames as number,
    backgroundType: props.backgroundType as StoryChapterSchemaType['backgroundType'],
    backgroundColor: props.backgroundColor as string,
    backgroundGradient: props.backgroundGradient as string,
    backgroundSource: props.backgroundSource as string,
    backgroundVideoLoop: props.backgroundVideoLoop as boolean,
    backgroundVideoMuted: props.backgroundVideoMuted as boolean,
    overlayColor: props.overlayColor as string,
    overlayOpacity: props.overlayOpacity as number,
    showOverlay: props.showOverlay as boolean,
    character: props.character as StoryChapterSchemaType['character'],
    confetti: props.confetti as StoryChapterSchemaType['confetti'],
    magicEffects: props.magicEffects as StoryChapterSchemaType['magicEffects'],
    radialBurst: props.radialBurst as StoryChapterSchemaType['radialBurst'],
    subtitles: props.subtitles as SubtitleItemProps[],
  };
}

/**
 * 从 props 中提取故事面板参数
 */
export function extractStoryPanelProps(props: Record<string, unknown>): StoryPanelProps {
  return {
    chapters: props.chapters as StoryPanelChapterProps[],
    defaultTransition: props.defaultTransition as ChapterTransitionProps,
    autoCalculateStartFrame: props.autoCalculateStartFrame as boolean,
    chapterGap: props.chapterGap as number,
    backgroundMusic: props.backgroundMusic as BackgroundMusicProps,
    backgroundType: props.backgroundType as StoryPanelProps['backgroundType'],
    backgroundColor: props.backgroundColor as string,
    backgroundGradient: props.backgroundGradient as string,
    backgroundSource: props.backgroundSource as string,
    overlayColor: props.overlayColor as string,
    overlayOpacity: props.overlayOpacity as number,
    audioEnabled: props.audioEnabled as boolean,
    audioSource: props.audioSource as string,
    audioVolume: props.audioVolume as number,
    audioLoop: props.audioLoop as boolean,
  };
}
