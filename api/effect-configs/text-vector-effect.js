/**
 * 文字矢量动画特效参数配置
 * 使用嵌套参数格式
 */

const path = require('path');
const { MIXED_INPUT_PARAMS, DEFAULT_COLORS, BLESSING_TYPES, numberRangeParser, booleanParser, intRangeParser, arrayParser } = require('./shared-params');

const config = {
  id: 'text-vector-effect',
  name: '文字矢量动画特效',
  compositionId: 'TextVector',
  path: path.join(__dirname, '../../effects/text-vector-effect')
};

const VECTOR_BLESSING_TYPES = [...BLESSING_TYPES];

const params = {
  // 核心文字
  text: { type: 'string', defaultValue: '福' },
  
  // 字体
  fontSize: { type: 'number', defaultValue: 300 },
  fontFamily: { type: 'string', defaultValue: 'Arial, sans-serif' },
  fontWeight: { type: 'number', defaultValue: 700 },
  
  // 混合输入
  contentType: { ...MIXED_INPUT_PARAMS.contentType, defaultValue: 'mixed' },
  words: { ...MIXED_INPUT_PARAMS.words, parser: arrayParser([]) },
  images: { ...MIXED_INPUT_PARAMS.images, parser: arrayParser([]) },
  blessingTypes: { type: 'array', defaultValue: VECTOR_BLESSING_TYPES, parser: arrayParser(VECTOR_BLESSING_TYPES) },
  imageWeight: { ...MIXED_INPUT_PARAMS.imageWeight },
  blessingStyle: { type: 'object', defaultValue: null },
  
  // 元素配置
  elementSize: { type: 'number', defaultValue: 20 },
  elementSizeRange: { type: 'array', defaultValue: null, parser: arrayParser(null) },
  elementSpacing: { type: 'number', defaultValue: 16 },
  
  // 颜色
  textColor: { type: 'string', defaultValue: '#FFD700' },
  glowColor: { type: 'string', defaultValue: '#FFD700' },
  glowIntensity: { type: 'number', defaultValue: 1.2, parser: numberRangeParser(0, 3, 1.2) },
  colors: { type: 'array', defaultValue: DEFAULT_COLORS, parser: arrayParser(DEFAULT_COLORS) },
  
  // 排列
  textOrientation: { type: 'string', defaultValue: 'horizontal' },
  
  // 多字动画
  charAnimationMode: { type: 'string', defaultValue: 'together' },
  charInterval: { type: 'number', defaultValue: 60 },
  charStayDuration: { type: 'number', defaultValue: 120 },
  
  // 动画
  entranceDuration: { type: 'number', defaultValue: 12, parser: intRangeParser(1, 60, 12) },
  fillDuration: { type: 'number', defaultValue: 80 },
  fillType: { type: 'string', defaultValue: 'sequential' },
  stayAnimation: { type: 'string', defaultValue: 'pulse' },
  pulseSpeed: { type: 'number', defaultValue: 1.2 },
  glowPulseSpeed: { type: 'number', defaultValue: 0.8 },
  floatAmplitude: { type: 'number', defaultValue: 4 },
  floatSpeed: { type: 'number', defaultValue: 1 },
  
  // 3D
  enable3D: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  rotation3D: { type: 'number', defaultValue: 10 },
  
  // StarField
  enableStarField: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  starCount: { type: 'number', defaultValue: 50 },
  starOpacity: { type: 'number', defaultValue: 0.35 },
  
  seed: { type: 'number', defaultValue: 12345 },
};

function validate(params) {
  if (!params.text || params.text.trim().length === 0) {
    return { valid: false, error: '请提供核心文字 (text)' };
  }
  return { valid: true };
}

function calculateDuration(params) {
  if (params.duration && params.duration !== 10) return params.duration;
  
  if (params.charAnimationMode === 'sequential' && params.text && params.text.length > 1) {
    const textLength = params.text.length;
    const totalCharTime = (textLength - 1) * params.charInterval + params.charStayDuration;
    const baseDuration = params.entranceDuration + params.fillDuration;
    return Math.ceil(Math.max(totalCharTime, baseDuration + 60) / params.fps);
  }
  
  const baseDuration = params.entranceDuration + params.fillDuration + 60;
  const textLength = (params.text || '福').length;
  const textBonus = Math.max(0, textLength - 1) * 30;
  
  return Math.ceil((baseDuration + textBonus) / params.fps);
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
