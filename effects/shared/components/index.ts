/**
 * 公共组件导出
 */

export { Background } from "./Background";
export type { BackgroundComponentProps } from "../schemas";

export { Overlay } from "./Overlay";
export type { OverlayComponentProps } from "../schemas";

export { CenterGlow } from "./CenterGlow";
export type { CenterGlowProps } from "./CenterGlow";

export { StarField } from "./StarField";
export type { StarFieldProps } from "./StarField";

export { AudioPlayer } from "./AudioPlayer";
export type { AudioPlayerProps } from "./AudioPlayer";

export { Watermark } from "./Watermark";

export { Marquee } from "./Marquee";

export { BaseComposition } from "./BaseComposition";
export type { BaseCompositionComponentProps } from "./BaseComposition";

export { BlessingSymbol, SingleBlessingSymbol } from "./BlessingSymbol";

export { RadialBurst } from "./RadialBurst";

export { Foreground } from "./Foreground";

// 混合输入渲染组件
export {
  TextItemRender,
  ImageItemRender,
  BlessingItemRender,
  MixedInputItemRender,
  MixedInputListRender,
  isTextItem,
  isImageItem,
  isBlessingItem,
  isNetworkUrl,
  isDataUrl,
  getImageSrc,
} from "./MixedInputItem";
export type {
  TextItemRenderProps,
  ImageItemRenderProps,
  BlessingItemRenderProps,
  MixedInputItemRenderProps,
  MixedInputListRenderProps,
} from "./MixedInputItem";

// ==================== 新迁移的公共组件 ====================

// 彩带粒子效果
export { ConfettiBurst } from "./ConfettiBurst";

// 魔法效果集合
export { 
  MagicParticles, 
  MagicWand, 
  MagicCircle, 
  WhiteFlashTransition,
  Firework,
  BalloonBurst,
  ShootingStar,
  StarFieldBackground
} from "./MagicEffects";

// 角色系统（生肖/萌宠/超人）
export { 
  Character, 
  CharacterWithSpeech, 
  SpeechBubble,
  getCharacterConfig 
} from "./Character";

// 卡通元素（气球、星星、蛋糕等）
export { CartoonElements } from "./CartoonElements";

// ==================== 故事系统组件 ====================

// 字幕组件
export { Subtitle, SubtitleList } from "./Subtitle";
export type { SubtitleItem, SubtitleProps, SubtitleListProps } from "./Subtitle";

// 故事章节组件
export { StoryChapter } from "./StoryChapter";
export type {
  StoryChapterProps,
  StoryCharacterConfig,
  StoryConfettiConfig,
  StoryMagicEffectsConfig,
  StoryMagicParticlesConfig,
  StoryMagicWandConfig,
  StoryMagicCircleConfig,
  StoryFireworkConfig,
  StoryBalloonBurstConfig,
  StoryWhiteFlashConfig,
  StoryShootingStarConfig,
  StoryRadialBurstConfig,
} from "./StoryChapter";

// 故事面板组件
export { StoryPanel } from "./StoryPanel";
export type {
  StoryPanelProps,
  StoryChapterConfig,
  ChapterTransition,
  ChapterTransitionType,
} from "./StoryPanel";