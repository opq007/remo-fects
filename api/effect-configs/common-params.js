/**
 * 公共参数配置
 * 
 * 定义所有特效项目共享的公共参数（背景、遮罩、音频等）
 * 使用嵌套参数结构，参数组织更清晰
 */

/**
 * 嵌套参数结构定义
 * 用于验证和文档生成
 */
const NESTED_PARAMS = {
  // ===== 背景配置 =====
  background: {
    type: { type: 'string', defaultValue: 'color', description: '背景类型：color | gradient | image | video' },
    color: { type: 'string', defaultValue: '#1a1a2e', description: '背景颜色' },
    gradient: { type: 'string', defaultValue: null, description: '背景渐变 CSS' },
    source: { type: 'string', defaultValue: null, description: '背景图片/视频路径' },
    videoLoop: { type: 'boolean', defaultValue: true, description: '背景视频是否循环' },
    videoMuted: { type: 'boolean', defaultValue: true, description: '背景视频是否静音' },
  },

  // ===== 遮罩配置 =====
  overlay: {
    color: { type: 'string', defaultValue: '#000000', description: '遮罩颜色' },
    opacity: { type: 'number', defaultValue: 0.2, description: '遮罩透明度' },
  },

  // ===== 音频配置 =====
  audio: {
    enabled: { type: 'boolean', defaultValue: false, description: '是否启用音频' },
    source: { type: 'string', defaultValue: 'coin-sound.mp3', description: '音频源文件' },
    volume: { type: 'number', defaultValue: 0.5, description: '音量（0-1）' },
    loop: { type: 'boolean', defaultValue: true, description: '音频是否循环' },
  },

  // ===== 水印配置 =====
  watermark: {
    enabled: { type: 'boolean', defaultValue: false, description: '是否启用水印' },
    text: { type: 'string', defaultValue: '© Remo-Fects', description: '水印文字' },
    fontSize: { type: 'number', defaultValue: 24, description: '水印字体大小' },
    color: { type: 'string', defaultValue: '#ffffff', description: '水印颜色' },
    opacity: { type: 'number', defaultValue: 0.35, description: '水印透明度（0-1）' },
    speed: { type: 'number', defaultValue: 1, description: '水印动画速度' },
    intensity: { type: 'number', defaultValue: 0.8, description: '水印效果强度（0-1）' },
    velocityX: { type: 'number', defaultValue: 180, description: '水印X方向速度（像素/秒）' },
    velocityY: { type: 'number', defaultValue: 120, description: '水印Y方向速度（像素/秒）' },
  },

  // ===== 走马灯配置 =====
  marquee: {
    enabled: { type: 'boolean', defaultValue: false, description: '是否启用走马灯' },
    foreground: {
      texts: { type: 'array', defaultValue: ['新年快乐', '万事如意', '恭喜发财'], description: '前景文字列表' },
      fontSize: { type: 'number', defaultValue: 32, description: '前景文字字体大小' },
      opacity: { type: 'number', defaultValue: 0.9, description: '前景文字透明度（0-1）' },
      color: { type: 'string', defaultValue: '#ffd700', description: '前景文字颜色' },
      effect: { type: 'string', defaultValue: 'none', description: '前景文字效果' },
    },
    background: {
      texts: { type: 'array', defaultValue: ['新春大吉', '财源广进'], description: '后景文字列表' },
      fontSize: { type: 'number', defaultValue: 24, description: '后景文字字体大小' },
      opacity: { type: 'number', defaultValue: 0.5, description: '后景文字透明度（0-1）' },
      color: { type: 'string', defaultValue: '#ffffff', description: '后景文字颜色' },
      effect: { type: 'string', defaultValue: 'none', description: '后景文字效果' },
    },
    orientation: { type: 'string', defaultValue: 'horizontal', description: '文字项排列方向' },
    textOrientation: { type: 'string', defaultValue: 'horizontal', description: '单字字符排列方向' },
    direction: { type: 'string', defaultValue: 'left-to-right', description: '运动方向' },
    speed: { type: 'number', defaultValue: 50, description: '走马灯速度（像素/帧）' },
    spacing: { type: 'number', defaultValue: 80, description: '文字间距' },
    foregroundOffsetX: { type: 'number', defaultValue: 0, description: '前景层水平偏移' },
    foregroundOffsetY: { type: 'number', defaultValue: 0, description: '前景层垂直偏移' },
    backgroundOffsetX: { type: 'number', defaultValue: 0, description: '背景层水平偏移' },
    backgroundOffsetY: { type: 'number', defaultValue: 0, description: '背景层垂直偏移' },
  },

  // ===== 射线爆发配置 =====
  radialBurst: {
    enabled: { type: 'boolean', defaultValue: false, description: '是否启用发散粒子效果' },
    effectType: { type: 'string', defaultValue: 'goldenRays', description: '发散效果类型' },
    color: { type: 'string', defaultValue: '#FFD700', description: '发散效果主颜色' },
    secondaryColor: { type: 'string', defaultValue: '#FFA500', description: '发散效果次颜色' },
    intensity: { type: 'number', defaultValue: 1, description: '发散效果强度（0-2）' },
    verticalOffset: { type: 'number', defaultValue: 0.5, description: '中心垂直偏移' },
    count: { type: 'number', defaultValue: 8, description: '发散粒子/光线数量' },
    speed: { type: 'number', defaultValue: 1, description: '发散粒子动画速度系数' },
    opacity: { type: 'number', defaultValue: 1, description: '发散粒子整体透明度' },
    seed: { type: 'number', defaultValue: 42, description: '发散粒子随机种子' },
    rotate: { type: 'boolean', defaultValue: true, description: '发散粒子是否旋转' },
    rotationSpeed: { type: 'number', defaultValue: 1, description: '发散粒子旋转速度' },
  },

  // ===== 前景配置 =====
  foreground: {
    enabled: { type: 'boolean', defaultValue: false, description: '是否启用前景' },
    type: { type: 'string', defaultValue: 'image', description: '前景类型：image | video' },
    source: { type: 'string', defaultValue: null, description: '前景源文件路径' },
    width: { type: 'number', defaultValue: null, description: '前景宽度' },
    height: { type: 'number', defaultValue: null, description: '前景高度' },
    verticalOffset: { type: 'number', defaultValue: 0, description: '垂直偏移' },
    horizontalOffset: { type: 'number', defaultValue: 0, description: '水平偏移' },
    scale: { type: 'number', defaultValue: 1, description: '前景缩放比例' },
    animationType: { type: 'string', defaultValue: 'none', description: '前景动画类型' },
    animationStartFrame: { type: 'number', defaultValue: 0, description: '动画开始帧' },
    animationDuration: { type: 'number', defaultValue: 60, description: '动画持续时间（帧）' },
    animationIntensity: { type: 'number', defaultValue: 1, description: '动画强度系数（0-2）' },
    opacity: { type: 'number', defaultValue: 1, description: '前景透明度（0-1）' },
    mixBlendMode: { type: 'string', defaultValue: 'normal', description: 'CSS 混合模式' },
    objectFit: { type: 'string', defaultValue: 'cover', description: '对象适应方式' },
    zIndex: { type: 'number', defaultValue: 100, description: '前景 z-index 层级' },
    continuousAnimation: { type: 'boolean', defaultValue: false, description: '是否启用持续动画' },
    continuousSpeed: { type: 'number', defaultValue: 1, description: '持续动画速度' },
  },
};

/**
 * 基础视频参数定义
 */
const BASE_PARAMS = {
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
  fps: {
    type: 'number',
    defaultValue: 24,
    description: '帧率'
  },
  duration: {
    type: 'number',
    defaultValue: 10,
    description: '视频时长（秒）'
  },
  seed: {
    type: 'number',
    defaultValue: () => Math.floor(Math.random() * 10000),
    description: '随机种子'
  },
};

/**
 * 解析器工厂函数
 */
const parseNumber = (defaultValue) => (v) => {
  const num = parseFloat(v);
  return isNaN(num) ? defaultValue : num;
};

const parseInt_default = (defaultValue) => (v) => {
  const num = parseInt(v);
  return isNaN(num) ? defaultValue : num;
};

const parseBoolean = (defaultValue) => (v) => {
  if (v === true || v === 'true') return true;
  if (v === false || v === 'false') return false;
  return defaultValue;
};

const parseArray = (defaultValue) => (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') {
    try {
      return JSON.parse(v);
    } catch {
      return v.split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  return defaultValue;
};

/**
 * 构建基础参数
 */
function buildBaseParams(params) {
  const result = {};
  
  for (const [name, def] of Object.entries(BASE_PARAMS)) {
    if (params[name] !== undefined && params[name] !== null) {
      result[name] = params[name];
    } else if (typeof def.defaultValue === 'function') {
      result[name] = def.defaultValue();
    } else {
      result[name] = def.defaultValue;
    }
  }
  
  return result;
}

/**
 * 构建单个嵌套参数对象
 */
function buildNestedParam(params, paramName) {
  const nestedDef = NESTED_PARAMS[paramName];
  if (!nestedDef) return null;
  
  const input = params[paramName];
  
  // 如果没有提供该嵌套参数，返回 null
  if (!input || typeof input !== 'object') {
    return null;
  }
  
  const result = {};
  
  for (const [key, def] of Object.entries(nestedDef)) {
    if (input[key] !== undefined && input[key] !== null) {
      result[key] = input[key];
    } else if (def.defaultValue !== undefined) {
      result[key] = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue;
    }
  }
  
  return result;
}

/**
 * 构建所有嵌套参数
 */
function buildAllNestedParams(params) {
  const result = {};
  
  for (const paramName of Object.keys(NESTED_PARAMS)) {
    const nested = buildNestedParam(params, paramName);
    if (nested) {
      result[paramName] = nested;
    }
  }
  
  return result;
}

/**
 * 构建完整的公共参数
 */
function buildCommonParams(params) {
  const result = buildBaseParams(params);
  const nestedParams = buildAllNestedParams(params);
  Object.assign(result, nestedParams);
  return result;
}

module.exports = {
  NESTED_PARAMS,
  BASE_PARAMS,
  parseNumber,
  parseInt_default,
  parseBoolean,
  parseArray,
  buildBaseParams,
  buildNestedParam,
  buildAllNestedParams,
  buildCommonParams,
};