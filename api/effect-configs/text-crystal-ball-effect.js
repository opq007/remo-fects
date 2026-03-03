/**
 * 文字水晶球特效参数配置
 * 
 * 定义 text-crystal-ball-effect 特效的所有参数
 */

const path = require('path');

/**
 * 特效基础信息
 */
const config = {
  id: 'text-crystal-ball-effect',
  name: '文字水晶球特效',
  compositionId: 'TextCrystalBall',
  path: path.join(__dirname, '../../effects/text-crystal-ball-effect')
};

/**
 * 数组解析器工厂函数
 */
const arrayParser = (defaultValue = []) => (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') {
    try {
      return JSON.parse(v);
    } catch {
      return v.split(',').map(w => w.trim()).filter(w => w);
    }
  }
  return defaultValue;
};

/**
 * 对象解析器工厂函数
 */
const objectParser = (defaultValue = {}) => (v) => {
  if (typeof v === 'string') {
    try {
      return JSON.parse(v);
    } catch {
      return defaultValue;
    }
  }
  return v || defaultValue;
};

/**
 * 特效特有参数定义
 */
const params = {
  // ===== 内容类型 =====
  contentType: {
    type: 'string',
    defaultValue: 'text',
    description: '内容类型：text(纯文字) | image(纯图片) | blessing(祝福图案) | mixed(混合模式)'
  },

  // ===== 文字内容 =====
  words: {
    type: 'array',
    defaultValue: [],
    parser: arrayParser([]),
    description: '文字列表'
  },

  // ===== 图片内容 =====
  images: {
    type: 'array',
    defaultValue: [],
    parser: arrayParser([]),
    description: '图片路径列表（支持：1. public目录相对路径如"coin.png" 2. 网络URL如"https://example.com/img.png" 3. Data URL base64编码）'
  },
  imageWeight: {
    type: 'number',
    defaultValue: 0.5,
    parser: (v) => Math.max(0, Math.min(1, parseFloat(v) || 0.5)),
    description: 'mixed 模式下图片出现权重 (0-1)'
  },

  // ===== 祝福图案配置 =====
  blessingTypes: {
    type: 'array',
    defaultValue: [],
    parser: arrayParser([]),
    description: '祝福图案类型列表：goldCoin | moneyBag | luckyBag | redPacket'
  },
  blessingStyle: {
    type: 'object',
    defaultValue: {
      primaryColor: '#FFD700',
      secondaryColor: '#FFA500',
      enable3D: true,
      enableGlow: true,
      glowIntensity: 1
    },
    parser: objectParser({
      primaryColor: '#FFD700',
      secondaryColor: '#FFA500',
      enable3D: true,
      enableGlow: true,
      glowIntensity: 1
    }),
    description: '祝福图案样式配置'
  },

  // ===== 水晶球配置 =====
  ballRadius: {
    type: 'number',
    defaultValue: 200,
    parser: (v) => Math.max(50, Math.min(400, parseFloat(v) || 200)),
    description: '水晶球半径 (50-400)'
  },
  ballColor: {
    type: 'string',
    defaultValue: '#4169E1',
    description: '水晶球颜色'
  },
  ballOpacity: {
    type: 'number',
    defaultValue: 0.3,
    parser: (v) => Math.max(0, Math.min(1, parseFloat(v) || 0.3)),
    description: '水晶球透明度 (0-1)'
  },
  glowColor: {
    type: 'string',
    defaultValue: '#87CEEB',
    description: '发光颜色'
  },
  glowIntensity: {
    type: 'number',
    defaultValue: 1,
    parser: (v) => Math.max(0, Math.min(2, parseFloat(v) || 1)),
    description: '发光强度 (0-2)'
  },

  // ===== 位置配置 =====
  verticalOffset: {
    type: 'number',
    defaultValue: 0.5,
    parser: (v) => Math.max(0, Math.min(1, parseFloat(v) || 0.5)),
    description: '垂直偏移 (0=顶部, 0.5=居中, 1=底部)'
  },

  // ===== 旋转动画配置 =====
  rotationSpeedX: {
    type: 'number',
    defaultValue: 0.2,
    parser: (v) => Math.max(0, Math.min(2, parseFloat(v) || 0.2)),
    description: 'X轴旋转速度 (0-2)'
  },
  rotationSpeedY: {
    type: 'number',
    defaultValue: 0.6,
    parser: (v) => Math.max(0, Math.min(2, parseFloat(v) || 0.6)),
    description: 'Y轴旋转速度 (0-2)'
  },
  rotationSpeedZ: {
    type: 'number',
    defaultValue: 0.1,
    parser: (v) => Math.max(0, Math.min(2, parseFloat(v) || 0.1)),
    description: 'Z轴旋转速度 (0-2)'
  },
  autoRotate: {
    type: 'boolean',
    defaultValue: true,
    parser: (v) => v === true || v === 'true',
    description: '是否自动旋转'
  },

  // ===== 镜头推进配置 =====
  zoomEnabled: {
    type: 'boolean',
    defaultValue: false,
    parser: (v) => v === true || v === 'true',
    description: '是否启用镜头推进效果'
  },
  zoomProgress: {
    type: 'number',
    defaultValue: 0,
    parser: (v) => Math.max(0, Math.min(1, parseFloat(v) || 0)),
    description: '镜头推进进度 (0=正常距离, 1=最近)'
  },

  // ===== 内容配置 =====
  particleCount: {
    type: 'number',
    defaultValue: 30,
    parser: (v) => Math.max(10, Math.min(100, parseInt(v) || 30)),
    description: '粒子数量 (10-100)'
  },
  fontSizeRange: {
    type: 'array',
    defaultValue: [30, 60],
    parser: arrayParser([30, 60]),
    description: '字体大小范围 [min, max]'
  },
  imageSizeRange: {
    type: 'array',
    defaultValue: [40, 80],
    parser: arrayParser([40, 80]),
    description: '图片大小范围 [min, max]'
  },
  blessingSizeRange: {
    type: 'array',
    defaultValue: [35, 70],
    parser: arrayParser([35, 70]),
    description: '祝福图案大小范围 [min, max]'
  },

  // ===== 样式配置 =====
  textStyle: {
    type: 'object',
    defaultValue: {
      color: '#FFD700',
      effect: 'gold3d',
      effectIntensity: 0.9,
      fontWeight: 700
    },
    parser: objectParser({
      color: '#FFD700',
      effect: 'gold3d',
      effectIntensity: 0.9,
      fontWeight: 700
    }),
    description: '文字样式配置'
  },

  // ===== 透视配置 =====
  perspective: {
    type: 'number',
    defaultValue: 1000,
    parser: (v) => Math.max(200, Math.min(2000, parseInt(v) || 1000)),
    description: '透视距离 (200-2000)'
  },

  // ===== 入场动画 =====
  entranceDuration: {
    type: 'number',
    defaultValue: 30,
    parser: (v) => Math.max(10, Math.min(60, parseInt(v) || 30)),
    description: '入场动画时长（帧）'
  },

  // ===== 随机种子 =====
  seed: {
    type: 'number',
    defaultValue: undefined,
    parser: (v) => v ? parseInt(v) : undefined,
    description: '随机种子（可选，不设置则随机）'
  }
};

/**
 * 参数验证函数
 * @param {Object} params - 解析后的参数
 * @returns {{ valid: boolean, error?: string }}
 */
function validate(params) {
  const { contentType, words, images, blessingTypes } = params;

  // 根据内容类型验证必要参数
  if (contentType === 'text') {
    if (!words || words.length === 0) {
      return { valid: false, error: 'text 模式需要提供文字列表 (words)' };
    }
  } else if (contentType === 'image') {
    if (!images || images.length === 0) {
      return { valid: false, error: 'image 模式需要提供图片列表 (images)' };
    }
  } else if (contentType === 'blessing') {
    if (!blessingTypes || blessingTypes.length === 0) {
      return { valid: false, error: 'blessing 模式需要提供祝福图案类型列表 (blessingTypes)' };
    }
  } else if (contentType === 'mixed') {
    // mixed 模式至少需要提供一种内容
    const hasContent = (words && words.length > 0) || 
                       (images && images.length > 0) || 
                       (blessingTypes && blessingTypes.length > 0);
    if (!hasContent) {
      return { valid: false, error: 'mixed 模式需要至少提供 words、images 或 blessingTypes 中的一种' };
    }
  }

  return { valid: true };
}

/**
 * 构建渲染参数
 * 从请求参数构建完整的渲染参数
 * @param {Object} reqParams - 请求参数
 * @param {Object} commonParams - 已处理的公共参数
 * @returns {Object}
 */
function buildRenderParams(reqParams, commonParams) {
  const result = { ...commonParams };

  // 处理特有参数
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
