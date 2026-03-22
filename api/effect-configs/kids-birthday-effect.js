/**
 * 儿童生日祝福特效配置 v5.0
 * 
 * 更新说明：
 * - 视频时长固定为 124 秒（4秒倒计时 + 120秒正片）
 * - 移除 videoVersion 参数
 * - 新增 chapterList 支持自定义章节配置
 * - 角色系统增加 image 类型（自定义图片）
 */

const path = require('path');

// 特效基础信息
const config = {
  id: 'kids-birthday-effect',
  name: '儿童生日祝福',
  compositionId: 'KidsBirthday',
  path: path.join(__dirname, '../../project'),
  description: '专为3-10岁儿童设计的生日祝福视频，固定时长124秒（4秒倒计时+120秒正片）'
};

// 参数定义
const params = {
  // ========== 基本信息 ==========
  name: {
    type: 'string',
    defaultValue: '小明',
    required: true,
    description: '主角名字（1-10字）'
  },
  age: {
    type: 'number',
    defaultValue: 6,
    description: '年龄（1-18岁）'
  },
  message: {
    type: 'string',
    defaultValue: '愿你每天开心成长，梦想成真！',
    description: '祝福语（最多100字）'
  },
  
  // ========== 视频配置（固定 124 秒） ==========
  duration: {
    type: 'number',
    defaultValue: 124,
    description: '视频时长(秒)，固定为 124 秒（4秒倒计时 + 120秒正片）'
  },
  fps: {
    type: 'number',
    defaultValue: 24,
    description: '帧率'
  },
  width: {
    type: 'number',
    defaultValue: 720,
    description: '视频宽度'
  },
  height: {
    type: 'number',
    defaultValue: 1280,
    description: '视频高度'
  },
  
  // ========== 风格 ==========
  subStyle: {
    type: 'string',
    defaultValue: 'general',
    description: '风格主题：girl_unicorn(女孩独角兽) | boy_rocket(男孩火箭) | animal(可爱动物) | general(通用派对)'
  },
  
  // ========== 角色系统 ==========
  characterSeries: {
    type: 'string',
    defaultValue: 'zodiac',
    description: '角色系列：zodiac(生肖守护神) | pet(萌宠精灵) | hero(勇气超人) | image(自定义图片)'
  },
  characterType: {
    type: 'string',
    defaultValue: 'tiger',
    description: '角色类型（根据series选择：生肖12种/萌宠6种/超人5种，image模式可忽略）'
  },
  characterImageSrc: {
    type: 'string',
    defaultValue: null,
    description: '自定义角色图片路径（仅当 characterSeries="image" 时使用）'
  },
  
  // ========== 照片系统 ==========
  photos: {
    type: 'array',
    defaultValue: [],
    description: '照片列表（最多5张，每张包含 src 字段）'
  },
  
  // ========== 梦想泡泡 ==========
  dreams: {
    type: 'array',
    defaultValue: ['astronaut', 'artist', 'racer'],
    description: '梦想职业列表（最多5个）：astronaut | artist | racer | doctor | teacher | scientist | musician | athlete | chef | pilot'
  },
  
  // ========== 布局 ==========
  orientation: {
    type: 'string',
    defaultValue: 'portrait',
    description: '屏幕方向：portrait(竖屏9:16) | landscape(横屏16:9)'
  },
  
  // ========== 名字样式 ==========
  nameFontSize: {
    type: 'number',
    defaultValue: 120,
    description: '名字字体大小（60-200）'
  },
  nameColor: {
    type: 'string',
    defaultValue: null,
    description: '名字颜色（可选，默认跟随主题）'
  },
  showAge: {
    type: 'boolean',
    defaultValue: true,
    description: '是否显示年龄标签'
  },
  
  // ========== 祝福语样式 ==========
  blessingText: {
    type: 'string',
    defaultValue: '生日快乐',
    description: '主祝福文字'
  },
  blessingFontSize: {
    type: 'number',
    defaultValue: 60,
    description: '祝福语字体大小（30-100）'
  },
  
  // ========== 卡通元素 ==========
  cartoonElements: {
    type: 'array',
    defaultValue: null,
    description: '卡通元素配置（可选）'
  },
  
  // ========== 粒子效果 ==========
  confettiLevel: {
    type: 'string',
    defaultValue: 'high',
    description: '彩带粒子密度：low | medium | high'
  },
  
  // ========== 动画速度 ==========
  animationSpeed: {
    type: 'string',
    defaultValue: 'normal',
    description: '动画速度：slow | normal | fast'
  },
  
  // ========== 音频 ==========
  musicEnabled: {
    type: 'boolean',
    defaultValue: true,
    description: '是否启用背景音乐'
  },
  musicTrack: {
    type: 'string',
    defaultValue: 'kids_party_01',
    description: '背景音乐曲目'
  },
  birthdaySongSource: {
    type: 'string',
    defaultValue: null,
    description: '生日歌音频文件路径（有值时在模块G播放）'
  },
  birthdaySongVolume: {
    type: 'number',
    defaultValue: 0.6,
    description: '生日歌音量（0-1）'
  },
  
  // ========== 随机种子 ==========
  seed: {
    type: 'number',
    defaultValue: null,
    description: '随机种子（可选，用于复现效果）'
  },
  
  // ========== 自定义章节 ==========
  chapterList: {
    type: 'array',
    defaultValue: null,
    description: '自定义章节配置列表（可选，用于高级定制，按id与默认配置合并）'
  },
};

// 辅助函数：获取有效的角色类型
function getValidCharacterTypes(series) {
  switch (series) {
    case 'zodiac':
      return ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];
    case 'pet':
      return ['bunny', 'kitten', 'puppy', 'bear', 'fox', 'panda'];
    case 'hero':
      return ['superhero', 'astronaut', 'knight', 'wizard', 'pirate'];
    case 'image':
      return []; // image 模式不需要类型
    default:
      return ['tiger'];
  }
}

// 辅助函数：获取 Composition ID
function getCompositionId(orientation) {
  return orientation === 'landscape' ? 'KidsBirthdayLandscape' : 'KidsBirthday';
}

// 参数验证
function validate(params) {
  if (!params.name || params.name.trim() === '') {
    return { valid: false, error: '请提供主角名字 (name)' };
  }
  if (params.name.length > 10) {
    return { valid: false, error: '名字长度不能超过10个字符' };
  }
  if (params.age && (params.age < 1 || params.age > 18)) {
    return { valid: false, error: '年龄必须在1-18岁之间' };
  }
  if (params.message && params.message.length > 100) {
    return { valid: false, error: '祝福语长度不能超过100个字符' };
  }
  
  // 验证角色类型
  if (params.characterSeries !== 'image' && params.characterType) {
    const validTypes = getValidCharacterTypes(params.characterSeries || 'zodiac');
    if (validTypes.length > 0 && !validTypes.includes(params.characterType)) {
      return { valid: false, error: `角色类型无效，${params.characterSeries}系列可选：${validTypes.join(', ')}` };
    }
  }
  
  // image 模式需要提供图片
  if (params.characterSeries === 'image' && !params.characterImageSrc) {
    return { valid: false, error: 'image 模式需要提供 characterImageSrc 自定义图片路径' };
  }
  
  if (params.photos && params.photos.length > 5) {
    return { valid: false, error: '照片数量不能超过5张' };
  }
  if (params.dreams && params.dreams.length > 5) {
    return { valid: false, error: '梦想数量不能超过5个' };
  }
  
  return { valid: true };
}

/**
 * 构建渲染参数
 * 支持嵌套参数格式
 */
function buildRenderParams(reqParams, commonParams) {
  const orientation = reqParams.orientation || params.orientation.defaultValue;
  const characterSeries = reqParams.characterSeries || params.characterSeries.defaultValue;
  
  const result = { ...commonParams };

  // 处理特效特有参数
  for (const [name, def] of Object.entries(params)) {
    if (reqParams[name] !== undefined && reqParams[name] !== null) {
      result[name] = reqParams[name];
    } else if (def.defaultValue !== undefined) {
      result[name] = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue;
    }
  }
  
  // 固定时长为 124 秒
  result.duration = 124;
  
  // 处理角色类型默认值
  if (characterSeries !== 'image') {
    result.characterType = reqParams.characterType || getValidCharacterTypes(characterSeries)[0];
  }
  
  // 支持嵌套参数（背景、音频等）
  if (reqParams.background) result.background = reqParams.background;
  if (reqParams.audio) result.audio = reqParams.audio;
  if (reqParams.overlay) result.overlay = reqParams.overlay;
  if (reqParams.marquee) result.marquee = reqParams.marquee;
  if (reqParams.watermark) result.watermark = reqParams.watermark;
  if (reqParams.radialBurst) result.radialBurst = reqParams.radialBurst;
  if (reqParams.foreground) result.foreground = reqParams.foreground;
  
  // 动态设置 Composition ID 和尺寸
  result._compositionId = getCompositionId(orientation);
  if (orientation === 'landscape') {
    result.width = 1280;
    result.height = 720;
  } else {
    result.width = 720;
    result.height = 1280;
  }
  
  return result;
}

// 获取预设配置
function getPresets() {
  return {
    'girl_unicorn': {
      name: '女孩独角兽',
      subStyle: 'girl_unicorn',
      characterSeries: 'pet',
      characterType: 'bunny',
      confettiLevel: 'high',
      dreams: ['artist', 'musician', 'teacher']
    },
    'boy_rocket': {
      name: '男孩火箭',
      subStyle: 'boy_rocket',
      characterSeries: 'hero',
      characterType: 'astronaut',
      confettiLevel: 'high',
      dreams: ['astronaut', 'racer', 'scientist']
    },
    'animal': {
      name: '可爱动物',
      subStyle: 'animal',
      characterSeries: 'pet',
      characterType: 'puppy',
      confettiLevel: 'high'
    },
    'general': {
      name: '通用派对',
      subStyle: 'general',
      characterSeries: 'zodiac',
      characterType: 'tiger',
      confettiLevel: 'high'
    },
  };
}

// 获取角色选项
function getCharacterOptions() {
  return {
    zodiac: {
      name: '生肖守护神',
      description: '根据小朋友的生肖选择守护神',
      characters: [
        { type: 'rat', name: '小老鼠', description: '聪明机灵' },
        { type: 'ox', name: '小牛牛', description: '勤恳踏实' },
        { type: 'tiger', name: '小老虎', description: '勇敢威武' },
        { type: 'rabbit', name: '小兔子', description: '温柔可爱' },
        { type: 'dragon', name: '小龙龙', description: '神气活现' },
        { type: 'snake', name: '小蛇蛇', description: '灵动优雅' },
        { type: 'horse', name: '小马驹', description: '自由奔放' },
        { type: 'goat', name: '小山羊', description: '温和善良' },
        { type: 'monkey', name: '小猴子', description: '活泼好动' },
        { type: 'rooster', name: '小公鸡', description: '自信美丽' },
        { type: 'dog', name: '小狗汪', description: '忠诚可靠' },
        { type: 'pig', name: '小猪猪', description: '可爱福气' }
      ]
    },
    pet: {
      name: '萌宠精灵',
      description: '可爱的小动物精灵',
      characters: [
        { type: 'bunny', name: '蹦蹦兔', description: '蹦蹦跳跳' },
        { type: 'kitten', name: '喵喵猫', description: '温柔粘人' },
        { type: 'puppy', name: '汪汪狗', description: '活泼忠诚' },
        { type: 'bear', name: '小熊熊', description: '温暖抱抱' },
        { type: 'fox', name: '小狐狸', description: '机智聪明' },
        { type: 'panda', name: '盼盼熊', description: '国宝萌宠' }
      ]
    },
    hero: {
      name: '勇气超人',
      description: '勇敢的小英雄',
      characters: [
        { type: 'superhero', name: '超级小英雄', description: '保护世界' },
        { type: 'astronaut', name: '小小宇航员', description: '探索宇宙' },
        { type: 'knight', name: '勇敢小骑士', description: '守护正义' },
        { type: 'wizard', name: '魔法小巫师', description: '神奇魔法' },
        { type: 'pirate', name: '冒险小海盗', description: '勇敢探险' }
      ]
    },
    image: {
      name: '自定义角色',
      description: '使用自定义图片作为角色',
      characters: []
    }
  };
}

// 获取模块列表
function getModules() {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
}

// 获取视频时长
function getDuration() {
  return 124;
}

module.exports = {
  config,
  params,
  validate,
  buildRenderParams,
  getPresets,
  getCharacterOptions,
  getValidCharacterTypes,
  getModules,
  getDuration
};
