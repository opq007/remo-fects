/**
 * 祝福视频生成器 - 类型定义
 */

// 目标人群类型
export type TargetAudience = 'kids' | 'couple' | 'elderly';

// 祝福场景类型
export type BlessingScene = 'birthday' | 'wedding' | 'holiday';

// 儿童风格子类型
export type KidsSubStyle = 'girl_unicorn' | 'boy_rocket' | 'animal' | 'general';

// 颜色主题
export interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  gradient: string;
}

// 儿童风配色方案
export const KIDS_COLOR_THEMES: Record<KidsSubStyle, ColorTheme> = {
  girl_unicorn: {
    name: '女孩独角兽',
    primary: '#FF6FAF',
    secondary: '#FFD93D',
    accent: '#BFA8FF',
    background: '#FFE4EC',
    gradient: 'linear-gradient(135deg, #FF6FAF 0%, #FFD93D 100%)'
  },
  boy_rocket: {
    name: '男孩火箭',
    primary: '#6EC8FF',
    secondary: '#FFD93D',
    accent: '#8DECB4',
    background: '#E4F3FF',
    gradient: 'linear-gradient(135deg, #6EC8FF 0%, #BFA8FF 100%)'
  },
  animal: {
    name: '可爱动物',
    primary: '#8DECB4',
    secondary: '#FFD93D',
    accent: '#FF6FAF',
    background: '#F0FFF0',
    gradient: 'linear-gradient(135deg, #8DECB4 0%, #FFD93D 100%)'
  },
  general: {
    name: '通用派对',
    primary: '#FFD93D',
    secondary: '#6EC8FF',
    accent: '#FF6FAF',
    background: '#FFF9E6',
    gradient: 'linear-gradient(180deg, #6EC8FF 0%, #BFA8FF 100%)'
  }
};

// 基础祝福参数
export interface BaseBlessingParams {
  // 基本信息
  name: string;
  age?: number;
  message: string;
  
  // 时间控制
  duration: number;
  fps: number;
  
  // 视频尺寸
  width: number;
  height: number;
  
  // 样式
  style: string;
  
  // 音频
  musicEnabled: boolean;
  musicTrack: string;
  
  // 粒子效果
  confettiLevel: 'low' | 'medium' | 'high';
}

// 儿童生日祝福参数
export interface KidsBirthdayParams extends BaseBlessingParams {
  scene: 'birthday';
  audience: 'kids';
  subStyle: KidsSubStyle;
  
  // 名字显示
  nameFontSize: number;
  nameColor: string;
  showAge: boolean;
  
  // 祝福语
  blessingText: string;
  blessingFontSize: number;
  
  // 卡通元素
  cartoonElements: CartoonElement[];
  
  // 动画节奏
  animationSpeed: 'slow' | 'normal' | 'fast';
}

// 卡通元素类型
export type CartoonElementType = 'star' | 'balloon' | 'cake' | 'rocket' | 'unicorn' | 'heart' | 'crown';

export interface CartoonElement {
  type: CartoonElementType;
  position: 'top' | 'left' | 'right' | 'bottom' | 'around';
  count: number;
  color: string;
}

// 默认参数
export const DEFAULT_KIDS_BIRTHDAY_PARAMS: Partial<KidsBirthdayParams> = {
  duration: 15,
  fps: 24,
  width: 720,
  height: 1280,
  subStyle: 'general',
  nameFontSize: 120,
  showAge: true,
  blessingText: '生日快乐',
  blessingFontSize: 60,
  confettiLevel: 'high',
  animationSpeed: 'normal',
  musicEnabled: true,
  musicTrack: 'kids_party_01'
};
