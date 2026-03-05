/**
 * 类型定义导出
 */

export type {
  RelativePosition,
  Size,
  ColorConfig,
  BaseTextStyle,
  GlowConfig,
  ShadowConfig,
  AnimationTiming,
  Perspective3D,
  ParticleConfig,
} from "./common";

// 混合输入类型（排除已从 schemas 导出的 MixedContentType 和 MixedItemType）
// 注意：MixedContentType 和 MixedItemType 已从 schemas 导出，这里不再重复导出
export type {
  BlessingStyleConfig,
  MixedTextStyleConfig,
  MixedImageStyleConfig,
  MixedInputConfig,
  MixedInputItem,
  MixedInputGenerateOptions,
  AvailableContent,
  ContentTypeResult,
} from "./mixed-input";

// 角色系统类型
export type {
  CharacterSeries,
  ZodiacType,
  PetType,
  HeroType,
  CharacterConfig,
  ScreenOrientation,
} from "./character";

// 颜色主题类型和常量
export {
  PRIMARY_COLORS,
  CONFETTI_COLORS,
  ZODIAC_CHARACTERS,
  PET_CHARACTERS,
  HERO_CHARACTERS,
} from "./colors";
export type {
  PrimaryColors,
  ColorTheme,
} from "./colors";

// 卡通元素类型
export type {
  CartoonElementType,
  CartoonElement,
} from "./cartoon";
export { DEFAULT_CARTOON_COLORS } from "./cartoon";
