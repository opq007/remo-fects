/**
 * 文字环绕特效参数配置
 * 使用嵌套参数格式
 */

const path = require('path');
const {
  MIXED_INPUT_PARAMS,
  BLESSING_TYPES,
  DEFAULT_BLESSING_STYLE,
  validateMixedInput,
} = require('./shared-params');

const config = {
  id: 'text-ring-effect',
  name: '金色发光立体字环绕特效',
  compositionId: 'TextRing',
  path: path.join(__dirname, '../../effects/text-ring-effect')
};

const params = {
  // 混合输入
  contentType: MIXED_INPUT_PARAMS.contentType,
  words: MIXED_INPUT_PARAMS.words,
  images: MIXED_INPUT_PARAMS.images,
  blessingTypes: { ...MIXED_INPUT_PARAMS.blessingTypes, defaultValue: [...BLESSING_TYPES] },
  imageWeight: MIXED_INPUT_PARAMS.imageWeight,
  blessingStyle: { type: 'object', defaultValue: DEFAULT_BLESSING_STYLE },
  
  // 尺寸
  fontSize: { type: 'number', defaultValue: 70 },
  imageSize: { type: 'number', defaultValue: 80 },
  blessingSize: { type: 'number', defaultValue: 80 },
  opacity: { type: 'number', defaultValue: 1 },
  
  // 环绕配置
  ringRadius: { type: 'number', defaultValue: 250 },
  rotationSpeed: { type: 'number', defaultValue: 0.8 },
  glowIntensity: { type: 'number', defaultValue: 0.9 },
  
  // 3D
  depth3d: { type: 'number', defaultValue: 8 },
  cylinderHeight: { type: 'number', defaultValue: 400 },
  perspective: { type: 'number', defaultValue: 1000 },
  
  // 模式
  mode: { type: 'string', defaultValue: 'vertical' },
  verticalPosition: { type: 'number', defaultValue: 0.5 },
};

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

  return result;
}

module.exports = { config, params, validate, buildRenderParams };