/**
 * 文字旋涡特效参数配置
 * 使用嵌套参数格式
 */

const path = require('path');
const {
  MIXED_INPUT_PARAMS,
  SIZE_RANGE_PARAMS,
  TEXT_STYLE_PARAM,
  numberRangeParser,
  intRangeParser,
  booleanParser,
  enumParser,
  validateMixedInput,
} = require('./shared-params');

const config = {
  id: 'text-vortex-effect',
  name: '文字旋涡特效',
  compositionId: 'TextVortex',
  path: path.join(__dirname, '../../effects/text-vortex-effect')
};

const params = {
  // 混合输入
  ...MIXED_INPUT_PARAMS,
  ...SIZE_RANGE_PARAMS,
  ...TEXT_STYLE_PARAM,
  
  // 旋涡参数
  particleCount: { type: 'number', defaultValue: 80, parser: intRangeParser(20, 200, 80) },
  ringCount: { type: 'number', defaultValue: 6, parser: intRangeParser(2, 12, 6) },
  rotationDirection: { type: 'string', defaultValue: 'clockwise', parser: enumParser(['clockwise', 'counterclockwise'], 'clockwise') },
  rotationSpeed: { type: 'number', defaultValue: 1.5, parser: numberRangeParser(0.5, 4, 1.5) },
  expansionDuration: { type: 'number', defaultValue: 6, parser: numberRangeParser(2, 15, 6) },
  initialRadius: { type: 'number', defaultValue: 30, parser: numberRangeParser(10, 100, 30) },
  maxRadius: { type: 'number', defaultValue: 350, parser: numberRangeParser(150, 500, 350) },
  
  // 3D
  depth3D: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  depthIntensity: { type: 'number', defaultValue: 0.4, parser: numberRangeParser(0, 1, 0.4) },
  perspective: { type: 'number', defaultValue: 800, parser: intRangeParser(400, 2000, 800) },
  
  // 动画
  entranceDuration: { type: 'number', defaultValue: 25, parser: intRangeParser(10, 60, 25) },
  fadeInEnabled: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  spiralTightness: { type: 'number', defaultValue: 1.2, parser: numberRangeParser(0.5, 2, 1.2) },
  pulseEnabled: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  pulseIntensity: { type: 'number', defaultValue: 0.15, parser: numberRangeParser(0, 0.5, 0.15) },
  
  // 震撼效果
  shockwaveEnabled: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  shockwaveTiming: { type: 'number', defaultValue: 3, parser: numberRangeParser(1, 10, 3) },
  suctionEffect: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  suctionIntensity: { type: 'number', defaultValue: 0.3, parser: numberRangeParser(0, 1, 0.3) },
  
  seed: { type: 'number', defaultValue: null },
};

const validate = validateMixedInput;

function buildRenderParams(reqParams, commonParams) {
  const result = { ...commonParams };

  for (const [name, def] of Object.entries(params)) {
    if (reqParams[name] !== undefined && reqParams[name] !== null && reqParams[name] !== '') {
      result[name] = def.parser ? def.parser(reqParams[name]) : reqParams[name];
    } else if (def.defaultValue !== undefined) {
      result[name] = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue;
    }
  }

  return result;
}

module.exports = { config, params, validate, buildRenderParams };
