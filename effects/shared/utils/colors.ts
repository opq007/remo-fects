/**
 * 颜色工具函数
 */

import { 
  PRIMARY_COLORS, 
  ZODIAC_CHARACTERS, 
  PET_CHARACTERS, 
  HERO_CHARACTERS 
} from "../types";
import { ZodiacType, PetType, HeroType, CharacterConfig } from "../types";

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
 * 获取角色配置
 */
export function getCharacterConfig(series: 'zodiac' | 'pet' | 'hero', type: ZodiacType | PetType | HeroType): CharacterConfig {
  switch (series) {
    case 'zodiac':
      return ZODIAC_CHARACTERS[type as ZodiacType];
    case 'pet':
      return PET_CHARACTERS[type as PetType];
    case 'hero':
      return HERO_CHARACTERS[type as HeroType];
    default:
      return ZODIAC_CHARACTERS.tiger;
  }
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
