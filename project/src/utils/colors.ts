import { 
  KIDS_COLOR_THEMES, 
  KidsSubStyle, 
  ColorTheme, 
  PRIMARY_COLORS,
  GRADIENT_BACKGROUNDS,
  GradientBackground,
  CharacterConfig,
  ZodiacType,
  PetType,
  HeroType,
  ZODIAC_CHARACTERS,
  PET_CHARACTERS,
  HERO_CHARACTERS
} from '../types';

/**
 * 根据子风格获取颜色主题
 */
export function getColorTheme(subStyle: KidsSubStyle): ColorTheme {
  return KIDS_COLOR_THEMES[subStyle];
}

/**
 * 获取主色调
 */
export function getPrimaryColor(colorName: keyof typeof PRIMARY_COLORS): string {
  return PRIMARY_COLORS[colorName];
}

/**
 * 获取所有主色调
 */
export function getAllPrimaryColors(): typeof PRIMARY_COLORS {
  return PRIMARY_COLORS;
}

/**
 * 获取渐变背景
 */
export function getGradientBackground(type: 'dreamy' | 'energetic' | 'soft'): GradientBackground {
  return GRADIENT_BACKGROUNDS.find(g => g.type === type) || GRADIENT_BACKGROUNDS[0];
}

/**
 * 获取渐变色数组
 */
export function getGradientColors(gradient: string): [string, string] {
  const matches = gradient.match(/#[A-Fa-f0-9]{6}/g);
  if (matches && matches.length >= 2) {
    return [matches[0], matches[1]];
  }
  return [PRIMARY_COLORS.skyBlue, PRIMARY_COLORS.violet];
}

/**
 * 计算对比色（用于描边等）
 */
export function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

/**
 * 生成随机颜色
 */
export function randomColor(seed?: number): string {
  const colors = [
    PRIMARY_COLORS.strawberryPink, 
    PRIMARY_COLORS.skyBlue, 
    PRIMARY_COLORS.creamYellow, 
    PRIMARY_COLORS.mintGreen, 
    PRIMARY_COLORS.violet
  ];
  const index = seed !== undefined ? seed % colors.length : Math.floor(Math.random() * colors.length);
  return colors[index];
}

/**
 * 混合两种颜色
 */
export function blendColors(color1: string, color2: string, ratio: number = 0.5): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);
  
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * 获取生肖角色配置
 */
export function getZodiacCharacter(type: ZodiacType): CharacterConfig {
  return ZODIAC_CHARACTERS[type];
}

/**
 * 获取萌宠角色配置
 */
export function getPetCharacter(type: PetType): CharacterConfig {
  return PET_CHARACTERS[type];
}

/**
 * 获取超人角色配置
 */
export function getHeroCharacter(type: HeroType): CharacterConfig {
  return HERO_CHARACTERS[type];
}

/**
 * 获取角色配置（通用）
 */
export function getCharacterConfig(series: 'zodiac' | 'pet' | 'hero', type: ZodiacType | PetType | HeroType): CharacterConfig {
  switch (series) {
    case 'zodiac':
      return getZodiacCharacter(type as ZodiacType);
    case 'pet':
      return getPetCharacter(type as PetType);
    case 'hero':
      return getHeroCharacter(type as HeroType);
    default:
      return ZODIAC_CHARACTERS.tiger;
  }
}

/**
 * 颜色透明度调整
 */
export function colorWithOpacity(hexColor: string, opacity: number): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * 生成发光阴影效果
 */
export function generateGlow(color: string, intensity: number = 1): string {
  return `0 0 ${10 * intensity}px ${color}, 0 0 ${20 * intensity}px ${color}, 0 0 ${30 * intensity}px ${color}`;
}

/**
 * 生成文字描边效果
 */
export function generateTextStroke(width: number, color: string = '#FFFFFF'): string {
  return `
    -${width}px -${width}px 0 ${color},
    ${width}px -${width}px 0 ${color},
    -${width}px ${width}px 0 ${color},
    ${width}px ${width}px 0 ${color}
  `.trim();
}

/**
 * 生成3D立体文字阴影
 */
export function generate3DTextShadow(color: string, depth: number = 4): string {
  let shadow = '';
  for (let i = 1; i <= depth; i++) {
    shadow += `0 ${i}px 0 ${color}`;
    if (i < depth) shadow += ', ';
  }
  // 添加模糊阴影
  shadow += `, 0 ${depth + 2}px ${depth}px rgba(0,0,0,0.2)`;
  return shadow;
}

/**
 * 生成渐变文字效果
 */
export function generateGradientText(gradient: string): {
  background: string;
  WebkitBackgroundClip: string;
  WebkitTextFillColor: string;
  backgroundClip: string;
} {
  return {
    background: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };
}