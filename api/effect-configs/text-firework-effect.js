/**
 * 文字烟花特效参数配置
 * 使用嵌套参数格式
 */

const path = require('path');
const {
  MIXED_INPUT_PARAMS,
  BLESSING_TYPES,
  DEFAULT_BLESSING_STYLE,
  booleanParser,
  validateMixedInput,
  getContentCount,
} = require('./shared-params');

/**
 * 特效基础信息
 */
const config = {
  id: 'text-firework-effect',
  name: '文字烟花特效',
  compositionId: 'TextFirework',
  path: path.join(__dirname, '../../effects/text-firework-effect')
};

/**
 * 特效参数定义
 */
const params = {
  // 混合输入
  contentType: MIXED_INPUT_PARAMS.contentType,
  words: MIXED_INPUT_PARAMS.words,
  images: MIXED_INPUT_PARAMS.images,
  blessingTypes: { ...MIXED_INPUT_PARAMS.blessingTypes, defaultValue: [...BLESSING_TYPES] },
  imageWeight: MIXED_INPUT_PARAMS.imageWeight,
  blessingStyle: { type: 'object', defaultValue: DEFAULT_BLESSING_STYLE },
  
  // 尺寸
  fontSize: { type: 'number', defaultValue: 60 },
  imageSize: { type: 'number', defaultValue: 90 },
  blessingSize: { type: 'number', defaultValue: 72 },
  
  // 颜色
  textColor: { type: 'string', defaultValue: '#ffd700' },
  glowColor: { type: 'string', defaultValue: '#ffaa00' },
  glowIntensity: { type: 'number', defaultValue: 1 },
  
  // 发射配置
  launchHeight: { type: 'number', defaultValue: 0.2 },
  
  // 粒子配置
  particleCount: { type: 'number', defaultValue: 80 },
  gravity: { type: 'number', defaultValue: 0.15 },
  wind: { type: 'number', defaultValue: 0 },
  rainParticleSize: { type: 'number', defaultValue: 3 },
  
  // 时长配置
  textDuration: { type: 'number', defaultValue: 60 },
  rainDuration: { type: 'number', defaultValue: 120 },
  interval: { type: 'number', defaultValue: 40 },
  
  // 循环
  enableLoop: { type: 'boolean', defaultValue: false, parser: booleanParser(false) },
};

/**
 * 参数验证
 */
function validate(params) {
  const hasText = params.words && params.words.length > 0;
  const hasImages = params.images && params.images.length > 0;
  
  if (params.contentType === 'blessing') return { valid: true };
  if (params.contentType === 'text' && !hasText) {
    return { valid: false, error: 'text 模式需要提供文字列表 (words)' };
  }
  if (params.contentType === 'image' && !hasImages) {
    return { valid: false, error: 'image 模式需要提供图片列表 (images)' };
  }
  if (params.contentType === 'mixed' && !hasText && !hasImages) {
    return { valid: false, error: 'mixed 模式至少需要提供文字或图片' };
  }
  if (!params.contentType && hasText) return { valid: true };
  
  return { valid: true };
}

/**
 * 时长计算
 */
function calculateDuration(params) {
  if (params.duration && params.duration !== 10) return params.duration;
  
  const contentCount = getContentCount(params);
  const lastLaunchFrame = (contentCount - 1) * params.interval;
  const totalFrames = lastLaunchFrame + 30 + params.textDuration + params.rainDuration + 30;
  return Math.ceil(totalFrames / params.fps);
}

/**
 * 构建渲染参数
 */
function buildRenderParams(reqParams, commonParams) {
  const result = { ...commonParams };

  for (const [name, def] of Object.entries(params)) {
    if (reqParams[name] !== undefined && reqParams[name] !== null && reqParams[name] !== '') {
      result[name] = def.parser ? def.parser(reqParams[name]) : reqParams[name];
    } else {
      result[name] = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue;
    }
  }

  // 兼容旧版
  if (!reqParams.contentType && result.words && result.words.length > 0) {
    result.contentType = 'text';
  }

  // 自动计算时长
  if (!reqParams.duration && !result.enableLoop) {
    result.duration = calculateDuration(result);
  }

  return result;
}

module.exports = {
  config,
  params,
  validate,
  buildRenderParams,
  calculateDuration
};