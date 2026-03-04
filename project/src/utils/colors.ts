import { KIDS_COLOR_THEMES, KidsSubStyle, ColorTheme } from '../types';

/**
 * 根据子风格获取颜色主题
 */
export function getColorTheme(subStyle: KidsSubStyle): ColorTheme {
  return KIDS_COLOR_THEMES[subStyle];
}

/**
 * 获取渐变色数组
 */
export function getGradientColors(gradient: string): [string, string] {
  const matches = gradient.match(/#[A-Fa-f0-9]{6}/g);
  if (matches && matches.length >= 2) {
    return [matches[0], matches[1]];
  }
  return ['#6EC8FF', '#BFA8FF'];
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
  const colors = ['#FF6FAF', '#6EC8FF', '#FFD93D', '#8DECB4', '#BFA8FF'];
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
