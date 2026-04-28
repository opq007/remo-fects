/**
 * 文字雨特效参数配置
 * 使用嵌套参数格式
 */

const path = require('path');
const {
  MIXED_INPUT_PARAMS,
  SIZE_RANGE_PARAMS,
  arrayParser,
  objectParser,
  validateMixedInput,
} = require('./shared-params');

/**
 * 特效基础信息
 */
const config = {
  id: 'text-rain-effect',
  name: '文字雨特效',
  compositionId: 'TextRain',
  path: path.join(__dirname, '../../effects/text-rain-effect')
};

/**
 * 默认文字样式
 */
const RAIN_TEXT_STYLE = {
  color: '#ffd700',
  effect: 'gold3d',
  effectIntensity: 0.9,
  fontWeight: 700,
  letterSpacing: 4,
};

/**
 * 默认祝福图案样式
 */
const RAIN_BLESSING_STYLE = {
  primaryColor: '#FFD700',
  secondaryColor: '#FFA500',
  enable3D: true,
  enableGlow: true,
  glowIntensity: 1,
  animated: false,
};

/**
 * 特效特有参数定义
 */
const params = {
  // 混合输入
  ...MIXED_INPUT_PARAMS,
  
  // 尺寸范围
  fontSizeRange: {
    type: 'array',
    defaultValue: [80, 160],
    parser: arrayParser([80, 160]),
  },
  imageSizeRange: {
    type: 'array',
    defaultValue: [80, 150],
    parser: arrayParser([80, 150]),
  },
  blessingSizeRange: SIZE_RANGE_PARAMS.blessingSizeRange,
  
  // 样式
  textStyle: {
    type: 'object',
    defaultValue: RAIN_TEXT_STYLE,
    parser: objectParser(RAIN_TEXT_STYLE),
  },
  blessingStyle: {
    type: 'object',
    defaultValue: RAIN_BLESSING_STYLE,
    parser: objectParser(RAIN_BLESSING_STYLE),
  },
  
  // 运动参数
  textDirection: { type: 'string', defaultValue: 'horizontal' },
  fallDirection: { type: 'string', defaultValue: 'down' },
  fallSpeed: { type: 'number', defaultValue: 0.15 },
  density: { type: 'number', defaultValue: 2 },
  laneCount: { type: 'number', defaultValue: 6 },
  minVerticalGap: { type: 'number', defaultValue: 100 },
  
  // 透明度和旋转
  opacityRange: { type: 'array', defaultValue: [0.6, 1], parser: arrayParser([0.6, 1]) },
  rotationRange: { type: 'array', defaultValue: [-10, 10], parser: arrayParser([-10, 10]) },
  
  // 随机种子
  seed: { type: 'number', defaultValue: 42 },
};

const validate = validateMixedInput;

/**
 * 构建渲染参数
 */
function buildRenderParams(reqParams, commonParams) {
  const result = { ...commonParams };

  // 处理特效特有参数
  for (const [name, def] of Object.entries(params)) {
    if (reqParams[name] !== undefined && reqParams[name] !== null && reqParams[name] !== '') {
      result[name] = def.parser ? def.parser(reqParams[name]) : reqParams[name];
    } else if (def.defaultValue !== undefined) {
      result[name] = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue;
    }
  }

  return result;
}

module.exports = {
  config,
  params,
  validate,
  buildRenderParams
};
