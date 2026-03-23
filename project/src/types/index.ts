/**
 * 儿童生日祝福视频 - 类型定义
 * 按照视觉规范 v2.0 重新设计
 */

// ==================== 角色系统 ====================

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

// ==================== 颜色系统 ====================

// 主色调（高饱和但不刺眼）
export interface PrimaryColors {
  creamYellow: string;   // #FFD76A 奶油黄 - 温暖底色
  skyBlue: string;       // #7EC8FF 天空蓝 - 背景
  strawberryPink: string; // #FF8FA3 草莓粉 - 情绪强调
  mintGreen: string;     // #82E6C5 薄荷绿 - 点缀
  violet: string;        // #B892FF 紫罗兰 - 魔法效果
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

// 辅助渐变背景
export interface GradientBackground {
  name: string;
  colors: [string, string];
  type: 'dreamy' | 'energetic' | 'soft';
}

// ==================== 分镜模块 ====================

// 模块类型
export type ModuleType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';

// 模块配置
export interface ModuleConfig {
  id: ModuleType;
  name: string;
  nameCn: string;
  startFrame: number;
  endFrame: number;
  duration: number;      // 秒
  required: boolean;     // 是否必须保留
  canSkip: boolean;      // 是否可裁剪
  description: string;
}

// ==================== 布局系统 ====================

// 屏幕方向
export type ScreenOrientation = 'portrait' | 'landscape';

// 布局配置
export interface LayoutConfig {
  orientation: ScreenOrientation;
  aspectRatio: string;
  characterPosition: 'center' | 'left' | 'right';
  photoPosition: 'float' | 'right' | 'left';
  namePosition: 'center-top' | 'center';
}

// ==================== 照片系统 ====================

// 照片数据
export interface PhotoData {
  id?: string;
  src: string;
}

// ==================== 梦想系统 ====================

// 梦想职业类型
export type DreamJob = 'astronaut' | 'artist' | 'racer' | 'doctor' | 'teacher' 
  | 'scientist' | 'musician' | 'athlete' | 'chef' | 'pilot';

// 梦想配置
export interface DreamConfig {
  type: DreamJob;
  name: string;
  icon: string;
  color: string;
}

// ==================== 动画节奏 ====================

// 音乐节奏配置
export interface MusicRhythm {
  start: number;         // 开始时间（秒）
  end: number;           // 结束时间（秒）
  bpm: number;           // 节拍
  style: 'high-energy' | 'playful' | 'birthday-song' | 'warm';
}

// 动画速度
export type AnimationSpeed = 'slow' | 'normal' | 'fast';

// ==================== 完整参数接口 ====================

// 儿童风格子类型（保留兼容）
export type KidsSubStyle = 'girl_unicorn' | 'boy_rocket' | 'animal' | 'general';

// 卡通元素类型
export type CartoonElementType = 'star' | 'balloon' | 'cake' | 'rocket' | 'unicorn' | 'heart' | 'crown';

export interface CartoonElement {
  type: CartoonElementType;
  position: 'top' | 'left' | 'right' | 'bottom' | 'around';
  count: number;
  color: string;
}

// 基础祝福参数
export interface BaseBlessingParams {
  name: string;
  age?: number;
  message: string;
  duration: number;
  fps: number;
  width: number;
  height: number;
  style: string;
  musicEnabled: boolean;
  musicTrack: string;
  confettiLevel: 'low' | 'medium' | 'high';
}

// 儿童生日祝福参数（新版）
export interface KidsBirthdayParams extends BaseBlessingParams {
  scene: 'birthday';
  audience: 'kids';
  subStyle: KidsSubStyle;
  
  // 祝福系列（决定角色和视频资源）
  blessingSeries: BlessingSeries;
  /** 自定义角色图片路径列表，覆盖祝福系列的默认角色图片 */
  customCharacterImages?: string[];
  /** 自定义角色视频路径列表，覆盖祝福系列的默认角色视频 */
  customCharacterVideos?: string[];
  
  // 新增：照片系统
  photos: PhotoData[];
  
  // 新增：梦想泡泡
  dreams: DreamJob[];
  
  // 新增：布局
  orientation: ScreenOrientation;
  
  // 原有参数
  nameFontSize: number;
  nameColor: string;
  showAge: boolean;
  blessingText: string;
  blessingFontSize: number;
  cartoonElements: CartoonElement[];
  animationSpeed: AnimationSpeed;
}

// ==================== 祝福系列系统 ====================

// 祝福系列类型
export type BlessingSeries = 'journey_to_the_west' | 'zodiac' | 'fairy_tale' | 'custom';

// 系列角色配置
export interface SeriesCharacter {
  /** 角色类型标识 */
  type: string;
  /** 角色图片路径 */
  imageSrc: string;
  /** 角色视频路径（绿幕视频） */
  videoSrc?: string;
  /** 角色名 */
  name: string;
  /** 祝福语 */
  greeting: string;
}

// 祝福系列配置
export interface BlessingSeriesConfig {
  /** 系列ID */
  id: BlessingSeries;
  /** 系列名称 */
  name: string;
  /** 角色列表 */
  characters: SeriesCharacter[];
  /** 默认主色调 */
  primaryColor: string;
  /** 默认次色调 */
  secondaryColor: string;
}

// 西游系列角色配置
export const JOURNEY_TO_THE_WEST_SERIES: BlessingSeriesConfig = {
  id: 'journey_to_the_west',
  name: '西游记系列',
  primaryColor: '#FFD76A',
  secondaryColor: '#7EC8FF',
  characters: [
    { type: 'sun_wukong', imageSrc: 'pic/孙悟空.png', videoSrc: '孙悟空.mp4', name: '孙悟空', greeting: '俺老孙来也！祝你生日快乐！' },
    { type: 'tang_seng', imageSrc: 'pic/唐僧.png', videoSrc: '唐僧.mp4', name: '唐僧', greeting: '阿弥陀佛，祝你健康成长！' },
    { type: 'zhu_bajie', imageSrc: 'pic/猪八戒.png', videoSrc: '猪八戒.mp4', name: '猪八戒', greeting: '嘿嘿，生日快乐！' },
    { type: 'sha_wujing', imageSrc: 'pic/沙和尚.png', videoSrc: '沙和尚.mp4', name: '沙和尚', greeting: '祝你天天开心！' },
    { type: 'white_dragon_horse', imageSrc: 'pic/白龙马.png', videoSrc: '白龙马.mp4', name: '白龙马', greeting: '祝你一马当先！' },
  ],
};

// 生肖系列（使用内置生肖角色）
export const ZODIAC_SERIES: BlessingSeriesConfig = {
  id: 'zodiac',
  name: '生肖守护神系列',
  primaryColor: '#FFD76A',
  secondaryColor: '#B892FF',
  characters: [
    { type: 'tiger', imageSrc: 'pic/小老虎.png', name: '小老虎', greeting: '嗷呜～祝你生日快乐！' },
    { type: 'rabbit', imageSrc: 'pic/小兔子.png', name: '小兔子', greeting: '蹦蹦跳～祝你快乐成长！' },
    { type: 'dragon', imageSrc: 'pic/小龙龙.png', name: '小龙龙', greeting: '吼～祝你心想事成！' },
    { type: 'snake', imageSrc: 'pic/小蛇蛇.png', name: '小蛇蛇', greeting: '祝你天天开心！' },
    { type: 'horse', imageSrc: 'pic/小马驹.png', name: '小马驹', greeting: '祝你前程似锦！' },
    { type: 'goat', imageSrc: 'pic/小山羊.png', name: '小山羊', greeting: '祝你喜气洋洋！' },
    { type: 'monkey', imageSrc: 'pic/小猴子.png', name: '小猴子', greeting: '祝你聪明伶俐！' },
    { type: 'rooster', imageSrc: 'pic/小公鸡.png', name: '小公鸡', greeting: '祝你勤奋向上！' },
    { type: 'dog', imageSrc: 'pic/小狗汪.png', name: '小狗汪', greeting: '祝你忠诚勇敢！' },
    { type: 'pig', imageSrc: 'pic/小猪猪.png', name: '小猪猪', greeting: '祝你福气满满！' },
    { type: 'rat', imageSrc: 'pic/小老鼠.png', name: '小老鼠', greeting: '祝你聪明机智！' },
    { type: 'ox', imageSrc: 'pic/小牛牛.png', name: '小牛牛', greeting: '祝你踏实努力！' },
  ],
};

// 童话系列
export const FAIRY_TALE_SERIES: BlessingSeriesConfig = {
  id: 'fairy_tale',
  name: '童话系列',
  primaryColor: '#FF8FA3',
  secondaryColor: '#B892FF',
  characters: [
    { type: 'cinderella', imageSrc: 'pic/灰姑娘.png', name: '灰姑娘', greeting: '祝你梦想成真！' },
    { type: 'snow_white', imageSrc: 'pic/白雪公主.png', name: '白雪公主', greeting: '祝你永远快乐！' },
    { type: 'mickey', imageSrc: 'pic/米奇.png', name: '米奇', greeting: '祝你生日快乐！' },
  ],
};

// 所有系列配置
export const BLESSING_SERIES_CONFIGS: Record<BlessingSeries, BlessingSeriesConfig> = {
  journey_to_the_west: JOURNEY_TO_THE_WEST_SERIES,
  zodiac: ZODIAC_SERIES,
  fairy_tale: FAIRY_TALE_SERIES,
  custom: {
    id: 'custom',
    name: '自定义系列',
    primaryColor: '#FFD76A',
    secondaryColor: '#7EC8FF',
    characters: [],
  },
};

// ==================== 简化参数接口 ====================

/**
 * 简化版儿童生日祝福参数
 * 只需要传入核心参数，其余使用默认配置
 */
export interface SimplifiedKidsBirthdayProps {
  /** 屏幕方向：竖屏/横屏 */
  orientation?: ScreenOrientation;
  /** 主角名字 */
  name: string;
  /** 年龄 */
  age?: number;
  /** 照片列表 */
  photos?: PhotoData[];
  /** ��福系列 */
  blessingSeries?: BlessingSeries;
  
  // ========== 可选的高级配置 ==========
  /** 风格子类型 */
  subStyle?: KidsSubStyle;
  /** 自定义角色图片（覆盖系列默认） */
  customCharacterImages?: string[];
  /** 自定义角色视频（覆盖系列默认） */
  customCharacterVideos?: string[];
  /** 是否启用背景音乐 */
  musicEnabled?: boolean;
  /** 生日歌音频路径 */
  birthdaySongSource?: string;
}

// ==================== 默认配置 ====================

// 主色调常量
export const PRIMARY_COLORS: PrimaryColors = {
  creamYellow: '#FFD76A',
  skyBlue: '#7EC8FF',
  strawberryPink: '#FF8FA3',
  mintGreen: '#82E6C5',
  violet: '#B892FF'
};

// 辅助渐变背景
export const GRADIENT_BACKGROUNDS: GradientBackground[] = [
  { name: '梦幻蓝紫', colors: ['#7EC8FF', '#B892FF'], type: 'dreamy' },
  { name: '活力粉橙', colors: ['#FF8FA3', '#FFD76A'], type: 'energetic' },
  { name: '柔和粉紫', colors: ['#FFB6D9', '#E8D4F8'], type: 'soft' }
];

// 儿童风配色方案（更新为新的视觉规范）
export const KIDS_COLOR_THEMES: Record<KidsSubStyle, ColorTheme> = {
  girl_unicorn: {
    name: '女孩独角兽',
    primary: PRIMARY_COLORS.strawberryPink,
    secondary: PRIMARY_COLORS.creamYellow,
    accent: PRIMARY_COLORS.violet,
    background: '#FFE4EC',
    gradient: `linear-gradient(135deg, ${PRIMARY_COLORS.strawberryPink} 0%, ${PRIMARY_COLORS.violet} 100%)`,
    gradientSecondary: `linear-gradient(180deg, ${PRIMARY_COLORS.skyBlue} 0%, ${PRIMARY_COLORS.violet} 100%)`
  },
  boy_rocket: {
    name: '男孩火箭',
    primary: PRIMARY_COLORS.skyBlue,
    secondary: PRIMARY_COLORS.creamYellow,
    accent: PRIMARY_COLORS.mintGreen,
    background: '#E4F3FF',
    gradient: `linear-gradient(135deg, ${PRIMARY_COLORS.skyBlue} 0%, ${PRIMARY_COLORS.violet} 100%)`,
    gradientSecondary: `linear-gradient(180deg, ${PRIMARY_COLORS.skyBlue} 0%, ${PRIMARY_COLORS.mintGreen} 100%)`
  },
  animal: {
    name: '可爱动物',
    primary: PRIMARY_COLORS.mintGreen,
    secondary: PRIMARY_COLORS.creamYellow,
    accent: PRIMARY_COLORS.strawberryPink,
    background: '#F0FFF0',
    gradient: `linear-gradient(135deg, ${PRIMARY_COLORS.mintGreen} 0%, ${PRIMARY_COLORS.creamYellow} 100%)`,
    gradientSecondary: `linear-gradient(180deg, ${PRIMARY_COLORS.skyBlue} 0%, ${PRIMARY_COLORS.mintGreen} 100%)`
  },
  general: {
    name: '通用派对',
    primary: PRIMARY_COLORS.creamYellow,
    secondary: PRIMARY_COLORS.skyBlue,
    accent: PRIMARY_COLORS.strawberryPink,
    background: '#FFF9E6',
    gradient: `linear-gradient(180deg, ${PRIMARY_COLORS.skyBlue} 0%, ${PRIMARY_COLORS.violet} 100%)`,
    gradientSecondary: `linear-gradient(135deg, ${PRIMARY_COLORS.strawberryPink} 0%, ${PRIMARY_COLORS.creamYellow} 100%)`
  }
};

// 分镜模块配置（基于120秒完整版）
export const MODULE_CONFIGS: Record<ModuleType, ModuleConfig> = {
  A: {
    id: 'A',
    name: 'MagicOpening',
    nameCn: '魔法开场',
    startFrame: 0,
    endFrame: 48,         // 0-2秒
    duration: 2,
    required: true,
    canSkip: false,
    description: '黑屏 → 魔法光粒聚集 → 角色声音'
  },
  B: {
    id: 'B',
    name: 'CharacterEntrance',
    nameCn: '角色入场',
    startFrame: 48,
    endFrame: 288,        // 2-12秒
    duration: 10,
    required: true,
    canSkip: false,
    description: '角色冲入画面 → 名字发光弹跳 → 气球爆开彩带 → 白闪转场'
  },
  C: {
    id: 'C',
    name: 'PhotoInteraction1',
    nameCn: '照片互动1',
    startFrame: 288,
    endFrame: 600,        // 12-25秒
    duration: 13,
    required: false,
    canSkip: true,
    description: '角色挥魔法棒 → 照片1从魔法圈飞出 → 角色跳到照片边缘'
  },
  D: {
    id: 'D',
    name: 'PhotoInteraction2',
    nameCn: '照片互动2',
    startFrame: 600,
    endFrame: 912,        // 25-38秒
    duration: 13,
    required: false,
    canSkip: true,
    description: '照片2飞入 → 角色做拥抱动作 → 爱心飘出'
  },
  E: {
    id: 'E',
    name: 'PhotoInteraction3',
    nameCn: '照片互动3',
    startFrame: 912,
    endFrame: 1200,       // 38-50秒
    duration: 12,
    required: false,
    canSkip: true,
    description: '照片3旋转入场 → 年龄数字气球上升'
  },
  F: {
    id: 'F',
    name: 'GrowthCelebration',
    nameCn: '成长庆祝高潮',
    startFrame: 1200,
    endFrame: 1440,       // 50-60秒
    duration: 10,
    required: true,
    canSkip: false,
    description: '烟花绽放 → 名字+年龄大字炸开 → 60秒版本截止点'
  },
  G: {
    id: 'G',
    name: 'BirthdaySong',
    nameCn: '生日歌互动',
    startFrame: 1440,
    endFrame: 2160,       // 60-90秒
    duration: 30,
    required: true,
    canSkip: false,
    description: '蛋糕缓缓升起 → 完整生日歌 → 歌词弹跳字幕 → 许愿'
  },
  H: {
    id: 'H',
    name: 'FutureBlessing',
    nameCn: '未来祝福',
    startFrame: 2160,
    endFrame: 2520,       // 90-105秒
    duration: 15,
    required: false,
    canSkip: true,
    description: '角色飞到夜空 → 流星划过 → 守护祝福'
  },
  I: {
    id: 'I',
    name: 'DreamSeeds',
    nameCn: '梦想种子',
    startFrame: 2520,
    endFrame: 2760,       // 105-115秒
    duration: 10,
    required: false,
    canSkip: true,
    description: '梦想泡泡出现 → 宇航员/画家/赛车手 → 梦想发光'
  },
  J: {
    id: 'J',
    name: 'WarmClosing',
    nameCn: '温暖收尾',
    startFrame: 2760,
    endFrame: 2880,       // 115-120秒
    duration: 5,
    required: true,
    canSkip: false,
    description: '角色挥手 → LOGO浮现 → 生日快乐'
  }
};

// 音乐节奏配置
export const MUSIC_RHYTHMS: MusicRhythm[] = [
  { start: 0, end: 15, bpm: 130, style: 'high-energy' },
  { start: 15, end: 60, bpm: 110, style: 'playful' },
  { start: 60, end: 90, bpm: 100, style: 'birthday-song' },
  { start: 90, end: 120, bpm: 80, style: 'warm' }
];

// 生肖角色配置
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

// 梦想职业配置
export const DREAM_JOBS: Record<DreamJob, DreamConfig> = {
  astronaut: { type: 'astronaut', name: '宇航员', icon: '🚀', color: '#7EC8FF' },
  artist: { type: 'artist', name: '画家', icon: '🎨', color: '#FF8FA3' },
  racer: { type: 'racer', name: '赛车手', icon: '🏎️', color: '#FFD76A' },
  doctor: { type: 'doctor', name: '医生', icon: '👨‍⚕️', color: '#82E6C5' },
  teacher: { type: 'teacher', name: '老师', icon: '📚', color: '#B892FF' },
  scientist: { type: 'scientist', name: '科学家', icon: '🔬', color: '#7EC8FF' },
  musician: { type: 'musician', name: '音乐家', icon: '🎵', color: '#FF8FA3' },
  athlete: { type: 'athlete', name: '运动员', icon: '⚽', color: '#82E6C5' },
  chef: { type: 'chef', name: '厨师', icon: '👨‍🍳', color: '#FFD76A' },
  pilot: { type: 'pilot', name: '飞行员', icon: '✈️', color: '#B892FF' }
};

// 布局配置
export const LAYOUT_CONFIGS: Record<ScreenOrientation, LayoutConfig> = {
  portrait: {
    orientation: 'portrait',
    aspectRatio: '9:16',
    characterPosition: 'center',
    photoPosition: 'float',
    namePosition: 'center-top'
  },
  landscape: {
    orientation: 'landscape',
    aspectRatio: '16:9',
    characterPosition: 'left',
    photoPosition: 'right',
    namePosition: 'center'
  }
};

// 默认参数（更新）
export const DEFAULT_KIDS_BIRTHDAY_PARAMS: Partial<KidsBirthdayParams> = {
  duration: 124,         // 固定 124 秒（4秒倒计时 + 120秒正片）
  fps: 24,
  width: 720,
  height: 1280,
  subStyle: 'general',
  blessingSeries: 'journey_to_the_west',
  photos: [],
  dreams: ['astronaut', 'artist', 'racer'],
  orientation: 'portrait',
  nameFontSize: 120,
  showAge: true,
  blessingText: '生日快乐',
  blessingFontSize: 60,
  confettiLevel: 'high',
  animationSpeed: 'normal',
  musicEnabled: true,
  musicTrack: 'kids_party_01'
};