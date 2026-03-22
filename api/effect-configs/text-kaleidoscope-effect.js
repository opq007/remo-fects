/**
 * 文字万花筒特效参数配置
 * 使用嵌套参数格式
 */

const path = require('path');
const { MIXED_INPUT_PARAMS, DEFAULT_COLORS, DEFAULT_BLESSING_STYLE, booleanParser, arrayParser } = require('./shared-params');

const config = {
  id: 'text-kaleidoscope-effect',
  name: '文字万花筒特效',
  compositionId: 'TextKaleidoscope',
  path: path.join(__dirname, '../../effects/text-kaleidoscope-effect')
};

const params = {
  // 混合输入
  contentType: MIXED_INPUT_PARAMS.contentType,
  words: { ...MIXED_INPUT_PARAMS.words, parser: arrayParser([]) },
  images: { ...MIXED_INPUT_PARAMS.images, parser: arrayParser([]) },
  blessingTypes: { ...MIXED_INPUT_PARAMS.blessingTypes, parser: arrayParser([]) },
  imageWeight: MIXED_INPUT_PARAMS.imageWeight,
  blessingStyle: { type: 'object', defaultValue: null },
  
  // 中心焦点文字
  focusWords: { type: 'array', defaultValue: null, parser: arrayParser(null) },
  
  // 字体
  fontSize: { type: 'number', defaultValue: 60 },
  focusFontSize: { type: 'number', defaultValue: null },
  
  // 颜色
  colors: { type: 'array', defaultValue: DEFAULT_COLORS, parser: arrayParser(DEFAULT_COLORS) },
  glowColor: { type: 'string', defaultValue: '#ffd700' },
  glowIntensity: { type: 'number', defaultValue: 1.2 },
  
  // 万花筒配置
  itemCount: { type: 'number', defaultValue: 60 },
  ringCount: { type: 'number', defaultValue: 5 },
  rotationSpeed: { type: 'number', defaultValue: 0.3 },
  
  // 动画
  expansionDuration: { type: 'number', defaultValue: 120 },
  fadeInDuration: { type: 'number', defaultValue: 60 },
  
  // 中心爆发
  enableCenterBurst: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  burstParticleCount: { type: 'number', defaultValue: 20 },
  burstInterval: { type: 'number', defaultValue: 60 },
  
  // 焦点文字
  focusTextInterval: { type: 'number', defaultValue: 90 },
  focusTextDuration: { type: 'number', defaultValue: 60 },
  
  // 3D
  enable3D: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  enablePulse: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
};

function validate(params) {
  const hasText = params.words && params.words.length > 0;
  const hasImages = params.images && params.images.length > 0;
  const hasBlessing = params.blessingTypes && params.blessingTypes.length > 0;
  
  if (params.contentType === 'blessing') return { valid: true };
  if (params.contentType === 'text' && !hasText) {
    return { valid: false, error: 'text 模式需要提供文字列表 (words)' };
  }
  if (params.contentType === 'image' && !hasImages) {
    return { valid: false, error: 'image 模式需要提供图片列表 (images)' };
  }
  if (params.contentType === 'mixed' && !hasText && !hasImages && !hasBlessing) {
    return { valid: false, error: 'mixed 模式需要提供内容' };
  }
  return { valid: true };
}

function calculateDuration(params) {
  if (params.duration && params.duration !== 10) return params.duration;
  const baseDuration = params.fadeInDuration + params.expansionDuration + 60;
  if (params.focusWords && params.focusWords.length > 0) {
    const focusCycleDuration = params.focusTextInterval + params.focusTextDuration;
    return Math.max(baseDuration, focusCycleDuration + 60) / params.fps;
  }
  return Math.ceil(baseDuration / params.fps);
}

function buildRenderParams(reqParams, commonParams) {
  const result = { ...commonParams };

  for (const [name, def] of Object.entries(params)) {
    if (reqParams[name] !== undefined && reqParams[name] !== null && reqParams[name] !== '') {
      result[name] = def.parser ? def.parser(reqParams[name]) : reqParams[name];
    } else {
      result[name] = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue;
    }
  }

  if (!reqParams.duration) {
    result.duration = calculateDuration(result);
  }

  return result;
}

module.exports = { config, params, validate, buildRenderParams, calculateDuration };