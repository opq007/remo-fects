/**
 * 角色系统类型定义
 */

// 角色系列类型
export type CharacterSeries = 'zodiac' | 'pet' | 'hero' | 'image';

// 生肖类型（12生肖）
export type ZodiacType = 'rat' | 'ox' | 'tiger' | 'rabbit' | 'dragon' | 'snake' 
  | 'horse' | 'goat' | 'monkey' | 'rooster' | 'dog' | 'pig';

// 萌宠精灵类型
export type PetType = 'bunny' | 'kitten' | 'puppy' | 'bear' | 'fox' | 'panda';

// 勇气超人类型
export type HeroType = 'superhero' | 'astronaut' | 'knight' | 'wizard' | 'pirate';

// 角色配置
export interface CharacterConfig {
  series: CharacterSeries;
  type: ZodiacType | PetType | HeroType;
  name: string;
  greeting: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  /** 图片资源路径（本地路径或网络URL），仅当 series='image' 时使用 */
  imageSrc?: string;
}

// 屏幕方向
export type ScreenOrientation = 'portrait' | 'landscape';
