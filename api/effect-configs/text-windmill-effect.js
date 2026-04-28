/**
 * 文字大风车特效参数配置
 * 使用嵌套参数格式
 */

const path = require('path');
const { DEFAULT_COLORS, DEFAULT_BLESSING_STYLE, numberRangeParser, intRangeParser, booleanParser, arrayParser } = require('./shared-params');

const config = {
  id: 'text-windmill-effect',
  name: '文字大风车特效',
  compositionId: 'TextWindmill',
  path: path.join(__dirname, '../../effects/text-windmill-effect')
};

const DEFAULT_BLADES_DATA = [
  [{ type: 'text', content: '福' }, { type: 'text', content: '运' }],
  [{ type: 'text', content: '禄' }, { type: 'text', content: '财' }],
  [{ type: 'text', content: '寿' }, { type: 'text', content: '喜' }],
  [{ type: 'text', content: '吉' }, { type: 'text', content: '祥' }],
];

function parseContentItem(item) {
  if (typeof item === 'string') {
    const blessingTypes = ['goldCoin', 'moneyBag', 'luckyBag', 'redPacket', 'star', 'heart', 'balloon'];
    if (blessingTypes.includes(item)) return { type: 'blessing', content: item };
    return { type: 'text', content: item };
  }
  if (typeof item === 'object' && item !== null) {
    return { type: item.type || 'text', content: item.content || '' };
  }
  return { type: 'text', content: String(item) };
}

const params = {
  // 叶片数据
  bladesData: {
    type: 'array',
    defaultValue: DEFAULT_BLADES_DATA,
    parser: (v) => {
      if (!v) return DEFAULT_BLADES_DATA;
      if (Array.isArray(v)) {
        if (v.length === 0) return DEFAULT_BLADES_DATA;
        return v.map(blade => {
          if (!Array.isArray(blade)) return [parseContentItem(blade)];
          return blade.map(item => parseContentItem(item));
        });
      }
      return DEFAULT_BLADES_DATA;
    },
  },
  
  // 简化文字输入
  words: { type: 'array', defaultValue: [], parser: arrayParser([]) },
  
  // 字体
  fontSize: { type: 'number', defaultValue: 60 },
  
  // 颜色
  colors: { type: 'array', defaultValue: DEFAULT_COLORS, parser: arrayParser(DEFAULT_COLORS) },
  glowColor: { type: 'string', defaultValue: '#ffd700' },
  glowIntensity: { type: 'number', defaultValue: 1.2 },
  
  // 旋转
  rotationSpeed: { type: 'number', defaultValue: 0.3 },
  rotationDirection: { type: 'string', defaultValue: 'clockwise' },
  
  // 中心点
  centerOffsetY: { type: 'number', defaultValue: 0, parser: numberRangeParser(-0.5, 0.5, 0) },
  
  // 3D
  tiltAngle: { type: 'number', defaultValue: 30, parser: intRangeParser(-60, 60, 30) },
  rotateY: { type: 'number', defaultValue: 0, parser: intRangeParser(-180, 180, 0) },
  perspective: { type: 'number', defaultValue: 1000 },
  
  // 效果
  enableGlow: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  appearDuration: { type: 'number', defaultValue: 30 },
  itemRotateWithBlade: { type: 'boolean', defaultValue: false, parser: booleanParser(false) },
  bladeLengthRatio: { type: 'number', defaultValue: 0.7, parser: numberRangeParser(0.3, 1, 0.7) },
  enableRandomBladeLength: { type: 'boolean', defaultValue: false, parser: booleanParser(false) },
  
  blessingStyle: { type: 'object', defaultValue: null },
};

function validate(params) {
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

  // 如果只提供了 words，自动生成 bladesData
  if (!reqParams.bladesData && result.words && result.words.length > 0) {
    const bladeCount = Math.min(6, Math.max(4, Math.ceil(result.words.length / 3)));
    const bladesData = [];
    const itemsPerBlade = Math.ceil(result.words.length / bladeCount);
    
    for (let i = 0; i < bladeCount; i++) {
      const bladeItems = [];
      for (let j = 0; j < itemsPerBlade; j++) {
        const wordIndex = i * itemsPerBlade + j;
        if (wordIndex < result.words.length) {
          bladeItems.push({ type: 'text', content: result.words[wordIndex] });
        }
      }
      if (bladeItems.length > 0) bladesData.push(bladeItems);
    }
    result.bladesData = bladesData;
  }

  return result;
}

module.exports = { config, params, validate, buildRenderParams };
