/**
 * 文字水晶球特效参数配置
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
  validateMixedInput,
} = require('./shared-params');

const config = {
  id: 'text-crystal-ball-effect',
  name: '文字水晶球特效',
  compositionId: 'TextCrystalBall',
  path: path.join(__dirname, '../../effects/text-crystal-ball-effect')
};

const params = {
  // 混合输入
  ...MIXED_INPUT_PARAMS,
  ...SIZE_RANGE_PARAMS,
  ...TEXT_STYLE_PARAM,
  
  // 水晶球参数
  ballRadius: { type: 'number', defaultValue: 200, parser: numberRangeParser(50, 400, 200) },
  ballColor: { type: 'string', defaultValue: '#4169E1' },
  ballOpacity: { type: 'number', defaultValue: 0.3, parser: numberRangeParser(0, 1, 0.3) },
  glowColor: { type: 'string', defaultValue: '#87CEEB' },
  glowIntensity: { type: 'number', defaultValue: 1, parser: numberRangeParser(0, 2, 1) },
  
  // 位置
  verticalOffset: { type: 'number', defaultValue: 0.5, parser: numberRangeParser(0, 1, 0.5) },
  
  // 旋转
  rotationSpeedX: { type: 'number', defaultValue: 0.2, parser: numberRangeParser(0, 2, 0.2) },
  rotationSpeedY: { type: 'number', defaultValue: 0.6, parser: numberRangeParser(0, 2, 0.6) },
  rotationSpeedZ: { type: 'number', defaultValue: 0.1, parser: numberRangeParser(0, 2, 0.1) },
  autoRotate: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  
  // 镜头推进
  zoomEnabled: { type: 'boolean', defaultValue: false, parser: booleanParser(false) },
  zoomProgress: { type: 'number', defaultValue: 0, parser: numberRangeParser(0, 1, 0) },
  
  // 内容
  particleCount: { type: 'number', defaultValue: 30, parser: intRangeParser(10, 100, 30) },
  
  // 透视
  perspective: { type: 'number', defaultValue: 1000, parser: intRangeParser(200, 2000, 1000) },
  
  // 入场动画
  entranceDuration: { type: 'number', defaultValue: 30, parser: intRangeParser(10, 60, 30) },
  
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
