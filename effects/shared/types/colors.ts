/**
 * 颜色主题类型定义
 */

// 主色调
export interface PrimaryColors {
  creamYellow: string;
  skyBlue: string;
  strawberryPink: string;
  mintGreen: string;
  violet: string;
}

// 颜色主题
export interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  gradient: string;
  gradientSecondary?: string;
}

// 主色调常量
export const PRIMARY_COLORS: PrimaryColors = {
  creamYellow: '#FFD76A',
  skyBlue: '#7EC8FF',
  strawberryPink: '#FF8FA3',
  mintGreen: '#82E6C5',
  violet: '#B892FF'
};

// 彩带颜色
export const CONFETTI_COLORS = [
  '#FF6FAF', // Candy Pink
  '#6EC8FF', // Sky Blue
  '#FFD93D', // Lemon Yellow
  '#8DECB4', // Mint Green
  '#BFA8FF', // Soft Purple
];

// 生肖角色配置
import { ZodiacType, PetType, HeroType, CharacterConfig } from './character';

export const ZODIAC_CHARACTERS: Record<ZodiacType, CharacterConfig> = {
  rat: { series: 'zodiac', type: 'rat', name: '小老鼠', greeting: '吱吱！我是你的生肖守护神小老鼠！', primaryColor: '#A0A0A0', secondaryColor: '#FFD76A', accentColor: '#FF8FA3' },
  ox: { series: 'zodiac', type: 'ox', name: '小牛牛', greeting: '哞～我是你的生肖守护神小牛牛！', primaryColor: '#8B4513', secondaryColor: '#FFD76A', accentColor: '#82E6C5' },
  tiger: { series: 'zodiac', type: 'tiger', name: '小老虎', greeting: '嗷呜～我是你的生肖守护神小老虎！', primaryColor: '#FF8C00', secondaryColor: '#FFD76A', accentColor: '#7EC8FF' },
  rabbit: { series: 'zodiac', type: 'rabbit', name: '小兔子', greeting: '蹦蹦跳～我是你的生肖守护神小兔子！', primaryColor: '#FFB6C1', secondaryColor: '#FFD76A', accentColor: '#B892FF' },
  dragon: { series: 'zodiac', type: 'dragon', name: '小龙龙', greeting: '吼～我是你的生肖守护神小龙龙！', primaryColor: '#FFD700', secondaryColor: '#FF6347', accentColor: '#7EC8FF' },
  snake: { series: 'zodiac', type: 'snake', name: '小蛇蛇', greeting: '嘶嘶～我是你的生肖守护神小蛇蛇！', primaryColor: '#32CD32', secondaryColor: '#FFD76A', accentColor: '#B892FF' },
  horse: { series: 'zodiac', type: 'horse', name: '小马驹', greeting: '咴咴～我是你的生肖守护神小马驹！', primaryColor: '#DEB887', secondaryColor: '#FFD76A', accentColor: '#82E6C5' },
  goat: { series: 'zodiac', type: 'goat', name: '小山羊', greeting: '咩～我是你的生肖守护神小山羊！', primaryColor: '#F5F5DC', secondaryColor: '#FFD76A', accentColor: '#FF8FA3' },
  monkey: { series: 'zodiac', type: 'monkey', name: '小猴子', greeting: '嘻嘻～我是你的生肖守护神小猴子！', primaryColor: '#D2691E', secondaryColor: '#FFD76A', accentColor: '#7EC8FF' },
  rooster: { series: 'zodiac', type: 'rooster', name: '小公鸡', greeting: '喔喔～我是你的生肖守护神小公鸡！', primaryColor: '#FF4500', secondaryColor: '#FFD76A', accentColor: '#82E6C5' },
  dog: { series: 'zodiac', type: 'dog', name: '小狗汪', greeting: '汪汪～我是你的生肖守护神小狗汪！', primaryColor: '#DAA520', secondaryColor: '#FFD76A', accentColor: '#B892FF' },
  pig: { series: 'zodiac', type: 'pig', name: '小猪猪', greeting: '哼哼～我是你的生肖守护神小猪猪！', primaryColor: '#FFC0CB', secondaryColor: '#FFD76A', accentColor: '#82E6C5' }
};

// 萌宠精灵配置
export const PET_CHARACTERS: Record<PetType, CharacterConfig> = {
  bunny: { series: 'pet', type: 'bunny', name: '蹦蹦兔', greeting: '蹦蹦跳跳～我是萌宠小精灵蹦蹦兔！', primaryColor: '#FFB6C1', secondaryColor: '#FFD76A', accentColor: '#B892FF' },
  kitten: { series: 'pet', type: 'kitten', name: '喵喵猫', greeting: '喵～我是萌宠小精灵喵喵猫！', primaryColor: '#FFA07A', secondaryColor: '#FFD76A', accentColor: '#7EC8FF' },
  puppy: { series: 'pet', type: 'puppy', name: '汪汪狗', greeting: '汪汪～我是萌宠小精灵汪汪狗！', primaryColor: '#DAA520', secondaryColor: '#FFD76A', accentColor: '#82E6C5' },
  bear: { series: 'pet', type: 'bear', name: '小熊熊', greeting: '抱抱～我是萌宠小精灵小熊熊！', primaryColor: '#8B4513', secondaryColor: '#FFD76A', accentColor: '#FF8FA3' },
  fox: { series: 'pet', type: 'fox', name: '小狐狸', greeting: '叮铃～我是萌宠小精灵小狐狸！', primaryColor: '#FF6347', secondaryColor: '#FFD76A', accentColor: '#B892FF' },
  panda: { series: 'pet', type: 'panda', name: '盼盼熊', greeting: '滚滚～我是萌宠小精灵盼盼熊！', primaryColor: '#2F4F4F', secondaryColor: '#FFFFFF', accentColor: '#82E6C5' }
};

// 勇气超人配置
export const HERO_CHARACTERS: Record<HeroType, CharacterConfig> = {
  superhero: { series: 'hero', type: 'superhero', name: '超级小英雄', greeting: '冲呀～我是勇气小超人超级小英雄！', primaryColor: '#FF4500', secondaryColor: '#FFD76A', accentColor: '#7EC8FF' },
  astronaut: { series: 'hero', type: 'astronaut', name: '小小宇航员', greeting: '出发～我是勇气小超小小宇航员！', primaryColor: '#7EC8FF', secondaryColor: '#FFD76A', accentColor: '#B892FF' },
  knight: { series: 'hero', type: 'knight', name: '勇敢小骑士', greeting: '守护～我是勇气小超人勇敢小骑士！', primaryColor: '#C0C0C0', secondaryColor: '#FFD76A', accentColor: '#82E6C5' },
  wizard: { series: 'hero', type: 'wizard', name: '魔法小巫师', greeting: '魔法～我是勇气小超人魔法小巫师！', primaryColor: '#B892FF', secondaryColor: '#FFD76A', accentColor: '#FF8FA3' },
  pirate: { series: 'hero', type: 'pirate', name: '冒险小海盗', greeting: '冒险～我是勇气小超人冒险小海盗！', primaryColor: '#2F4F4F', secondaryColor: '#FFD76A', accentColor: '#FF4500' }
};
