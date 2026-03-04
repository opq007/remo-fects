const path = require('path');

/**
 * 儿童生日祝福特效配置
 * 配置驱动架构 - 无需修改 render.js 和 server.js
 */

// 1. 特效基础信息
const config = {
  id: 'kids-birthday-effect',
  name: '儿童生日祝福',
  compositionId: 'KidsBirthday',
  path: path.join(__dirname, '../../project'),
  description: '专为3-10岁儿童设计的生日祝福视频，支持多种风格主题'
};

// 2. 参数定义
const params = {
  // 基本信息
  name: {
    type: 'string',
    defaultValue: '小明',
    parser: (v) => typeof v === 'string' ? v.slice(0, 10) : '小明',
    required: true,
    description: '主角名字（最多10字）'
  },
  age: {
    type: 'number',
    defaultValue: 6,
    parser: (v) => {
      const num = parseInt(v);
      return num >= 1 && num <= 18 ? num : 6;
    },
    description: '年龄（1-18岁）'
  },
  message: {
    type: 'string',
    defaultValue: '愿你每天开心成长',
    parser: (v) => typeof v === 'string' ? v.slice(0, 50) : '愿你每天开心成长',
    description: '祝福语（最多50字）'
  },
  
  // 风格设置
  subStyle: {
    type: 'enum',
    defaultValue: 'general',
    parser: (v) => ['girl_unicorn', 'boy_rocket', 'animal', 'general'].includes(v) ? v : 'general',
    description: '风格主题：girl_unicorn(女孩独角兽) | boy_rocket(男孩火箭) | animal(可爱动物) | general(通用派对)'
  },
  
  // 名字样式
  nameFontSize: {
    type: 'number',
    defaultValue: 120,
    parser: (v) => {
      const num = parseInt(v);
      return num >= 60 && num <= 200 ? num : 120;
    },
    description: '名字字体大小（60-200）'
  },
  showAge: {
    type: 'boolean',
    defaultValue: true,
    parser: (v) => v === 'true' || v === true,
    description: '是否显示年龄标签'
  },
  nameColor: {
    type: 'string',
    defaultValue: null,
    parser: (v) => v || null,
    description: '名字颜色（可选，默认跟随主题）'
  },
  
  // 祝福语样式
  blessingText: {
    type: 'string',
    defaultValue: '生日快乐',
    parser: (v) => v || '生日快乐',
    description: '主祝福文字'
  },
  blessingFontSize: {
    type: 'number',
    defaultValue: 60,
    parser: (v) => {
      const num = parseInt(v);
      return num >= 30 && num <= 100 ? num : 60;
    },
    description: '祝福语字体大小（30-100）'
  },
  
  // 特效强度
  confettiLevel: {
    type: 'enum',
    defaultValue: 'high',
    parser: (v) => ['low', 'medium', 'high'].includes(v) ? v : 'high',
    description: '彩带粒子密度：low | medium | high'
  },
  animationSpeed: {
    type: 'enum',
    defaultValue: 'normal',
    parser: (v) => ['slow', 'normal', 'fast'].includes(v) ? v : 'normal',
    description: '动画速度：slow | normal | fast'
  },
  
  // 音频设置
  musicEnabled: {
    type: 'boolean',
    defaultValue: true,
    parser: (v) => v === 'true' || v === true,
    description: '是否启用背景音乐'
  },
  musicTrack: {
    type: 'string',
    defaultValue: 'kids_party_01',
    parser: (v) => v || 'kids_party_01',
    description: '背景音乐曲目'
  },
  
  // 视频参数
  duration: {
    type: 'number',
    defaultValue: 15,
    parser: (v) => {
      const num = parseInt(v);
      return num >= 5 && num <= 60 ? num : 15;
    },
    description: '视频时长（秒）'
  },
  
  // 随机种子
  seed: {
    type: 'number',
    defaultValue: null,
    parser: (v) => v ? parseInt(v) : null,
    description: '随机种子（可选，用于复现效果）'
  }
};

// 3. 参数验证函数
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
  
  if (params.message && params.message.length > 50) {
    return { valid: false, error: '祝福语长度不能超过50个字符' };
  }
  
  return { valid: true };
}

// 4. 构建渲染参数
function buildRenderParams(reqParams, commonParams) {
  const result = {
    ...commonParams,
    // 基本信息优先使用请求参数
    name: reqParams.name || params.name.defaultValue,
    age: reqParams.age ?? params.age.defaultValue,
    message: reqParams.message || params.message.defaultValue,
    
    // 风格设置
    subStyle: reqParams.subStyle || params.subStyle.defaultValue,
    
    // 样式设置
    nameFontSize: reqParams.nameFontSize ?? params.nameFontSize.defaultValue,
    showAge: reqParams.showAge ?? params.showAge.defaultValue,
    nameColor: reqParams.nameColor || params.nameColor.defaultValue,
    blessingText: reqParams.blessingText || params.blessingText.defaultValue,
    blessingFontSize: reqParams.blessingFontSize ?? params.blessingFontSize.defaultValue,
    
    // 特效设置
    confettiLevel: reqParams.confettiLevel || params.confettiLevel.defaultValue,
    animationSpeed: reqParams.animationSpeed || params.animationSpeed.defaultValue,
    
    // 音频设置
    musicEnabled: reqParams.musicEnabled ?? params.musicEnabled.defaultValue,
    musicTrack: reqParams.musicTrack || params.musicTrack.defaultValue,
    
    // 随机种子
    seed: reqParams.seed || params.seed.defaultValue
  };
  
  return result;
}

// 5. 获取默认参数组合（用于预览）
function getPresets() {
  return {
    'general': {
      name: '通用派对',
      subStyle: 'general',
      confettiLevel: 'high'
    },
    'girl_unicorn': {
      name: '女孩独角兽',
      subStyle: 'girl_unicorn',
      confettiLevel: 'high',
      nameColor: '#FF6FAF'
    },
    'boy_rocket': {
      name: '男孩火箭',
      subStyle: 'boy_rocket',
      confettiLevel: 'high',
      nameColor: '#6EC8FF'
    },
    'animal': {
      name: '可爱动物',
      subStyle: 'animal',
      confettiLevel: 'medium'
    }
  };
}

module.exports = {
  config,
  params,
  validate,
  buildRenderParams,
  getPresets
};
