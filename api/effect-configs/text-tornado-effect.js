/**
 * 文字龙卷风特效参数配置
 * 使用嵌套参数格式
 */

const path = require('path');
const {
  MIXED_INPUT_PARAMS,
  SIZE_RANGE_PARAMS,
  TEXT_STYLE_PARAM,
  numberRangeParser,
  intRangeParser,
  validateMixedInput,
} = require('./shared-params');

const config = {
  id: 'text-tornado-effect',
  name: '文字龙卷风特效',
  compositionId: 'TextTornado',
  path: path.join(__dirname, '../../effects/text-tornado-effect')
};

const params = {
  // 混合输入
  ...MIXED_INPUT_PARAMS,
  ...SIZE_RANGE_PARAMS,
  ...TEXT_STYLE_PARAM,
  
  // 龙卷风参数
  particleCount: { type: 'number', defaultValue: 60, parser: intRangeParser(10, 200, 60) },
  baseRadius: { type: 'number', defaultValue: 300 },
  topRadius: { type: 'number', defaultValue: 50 },
  rotationSpeed: { type: 'number', defaultValue: 2 },
  liftSpeed: { type: 'number', defaultValue: 0.3, parser: numberRangeParser(0, 1, 0.3) },
  funnelHeight: { type: 'number', defaultValue: 0.85, parser: numberRangeParser(0.3, 1, 0.85) },
  zoomIntensity: { type: 'number', defaultValue: 0.5, parser: numberRangeParser(0, 2, 0.5) },
  entranceDuration: { type: 'number', defaultValue: 30, parser: intRangeParser(10, 60, 30) },
  swirlIntensity: { type: 'number', defaultValue: 1, parser: numberRangeParser(0.5, 2, 1) },
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
