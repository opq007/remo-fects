/**
 * 太极八卦图特效参数配置
 * 使用嵌套参数格式
 */

const path = require('path');
const { numberRangeParser, intRangeParser, booleanParser } = require('./shared-params');

const config = {
  id: 'tai-chi-bagua-effect',
  name: '太极八卦图特效',
  compositionId: 'TaiChiBagua',
  path: path.join(__dirname, '../../effects/tai-chi-bagua-effect')
};

const params = {
  // 颜色
  yangColor: { type: 'string', defaultValue: '#FFD700' },
  yinColor: { type: 'string', defaultValue: '#1a1a1a' },
  glowIntensity: { type: 'number', defaultValue: 0.9, parser: numberRangeParser(0, 2, 0.9) },
  
  // 旋转速度
  taichiRotationSpeed: { type: 'number', defaultValue: 1, parser: numberRangeParser(0, 5, 1) },
  baguaRotationSpeed: { type: 'number', defaultValue: 0.8, parser: numberRangeParser(0, 5, 0.8) },
  
  // 尺寸
  taichiSize: { type: 'number', defaultValue: 200, parser: intRangeParser(50, 400, 200) },
  baguaRadius: { type: 'number', defaultValue: 280, parser: intRangeParser(100, 500, 280) },
  
  // 显示选项
  showLabels: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  showParticles: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  showEnergyField: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  labelOffset: { type: 'number', defaultValue: 45, parser: intRangeParser(20, 100, 45) },
  
  // 粒子
  particleCount: { type: 'number', defaultValue: 40, parser: intRangeParser(10, 100, 40) },
  particleSpeed: { type: 'number', defaultValue: 1, parser: numberRangeParser(0.1, 3, 1) },
  
  // 3D
  viewAngle: { type: 'number', defaultValue: 30, parser: numberRangeParser(0, 60, 30) },
  perspectiveDistance: { type: 'number', defaultValue: 800, parser: intRangeParser(400, 2000, 800) },
  verticalPosition: { type: 'number', defaultValue: 0.5, parser: numberRangeParser(0, 1, 0.5) },
  enable3D: { type: 'boolean', defaultValue: false, parser: booleanParser(false) },
  depth3D: { type: 'number', defaultValue: 15, parser: intRangeParser(5, 50, 15) },
  
  // 金光闪闪
  enableGoldenSparkle: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  sparkleDensity: { type: 'number', defaultValue: 30, parser: intRangeParser(10, 100, 30) },
  
  // 神秘氛围
  enableMysticalAura: { type: 'boolean', defaultValue: true, parser: booleanParser(true) },
  auraIntensity: { type: 'number', defaultValue: 0.6, parser: numberRangeParser(0, 1, 0.6) },
  
  // 入场动画
  entranceDuration: { type: 'number', defaultValue: 30, parser: intRangeParser(10, 60, 30) },
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

  // 默认正方形
  if (!reqParams.width && !reqParams.height) {
    result.width = 720;
    result.height = 720;
  }

  return result;
}

module.exports = { config, params, validate, buildRenderParams };
