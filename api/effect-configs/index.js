/**
 * 特效配置注册表
 * 
 * 统一管理所有特效的配置，提供配置查询和参数处理功能
 * 使用嵌套参数格式，参数结构更清晰
 */

const path = require('path');

// 导入所有特效配置
const effectConfigs = {
  'text-rain-effect': require('./text-rain-effect'),
  'text-ring-effect': require('./text-ring-effect'),
  'text-firework-effect': require('./text-firework-effect'),
  'text-breakthrough-effect': require('./text-breakthrough-effect'),
  'tai-chi-bagua-effect': require('./tai-chi-bagua-effect'),
  'text-tornado-effect': require('./text-tornado-effect'),
  'text-flood-effect': require('./text-flood-effect'),
  'text-vortex-effect': require('./text-vortex-effect'),
  'text-kaleidoscope-effect': require('./text-kaleidoscope-effect'),
  'text-windmill-effect': require('./text-windmill-effect'),
  'text-vector-effect': require('./text-vector-effect'),
  'text-crystal-ball-effect': require('./text-crystal-ball-effect'),
  'kids-birthday-effect': require('./kids-birthday-effect')
};

// 导入公共参数处理
const { buildCommonParams, NESTED_PARAMS } = require('./common-params');

/**
 * 获取所有已注册的特效列表
 */
function getProjectList() {
  return Object.entries(effectConfigs).map(([id, config]) => ({
    id,
    name: config.config.name,
    compositionId: config.config.compositionId
  }));
}

/**
 * 获取特效配置
 */
function getEffectConfig(projectId) {
  return effectConfigs[projectId] || null;
}

/**
 * 获取特效基础信息
 */
function getProjectInfo(projectId) {
  const config = effectConfigs[projectId];
  if (!config) return null;
  
  return {
    id: projectId,
    name: config.config.name,
    compositionId: config.config.compositionId,
    path: config.config.path
  };
}

/**
 * 验证参数
 */
function validateParams(projectId, params) {
  const config = effectConfigs[projectId];
  if (!config) {
    return { valid: false, error: `项目不存在: ${projectId}` };
  }
  
  if (config.validate) {
    return config.validate(params);
  }
  
  return { valid: true };
}

/**
 * 构建渲染参数
 * 将请求参数转换为完整的渲染参数（嵌套格式）
 */
function buildRenderParams(projectId, reqParams, options = {}) {
  const config = effectConfigs[projectId];
  if (!config) {
    throw new Error(`项目不存在: ${projectId}`);
  }
  
  // 构建公共参数（包含嵌套参数）
  const commonParams = buildCommonParams({
    ...reqParams,
    ...options
  });
  
  // 构建特效特有参数
  let result;
  if (config.buildRenderParams) {
    result = config.buildRenderParams(reqParams, commonParams);
  } else {
    result = { ...commonParams };
    // 默认参数处理
    for (const [name, def] of Object.entries(config.params || {})) {
      if (reqParams[name] !== undefined && reqParams[name] !== null && reqParams[name] !== '') {
        result[name] = def.parser ? def.parser(reqParams[name]) : reqParams[name];
      } else if (def.defaultValue !== undefined) {
        result[name] = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue;
      }
    }
  }
  
  // 添加项目元信息
  result.projectId = projectId;
  result.projectPath = config.config.path;
  result.compositionId = config.config.compositionId;
  
  return result;
}

/**
 * 注册新的特效配置
 */
function registerEffect(projectId, config) {
  if (effectConfigs[projectId]) {
    console.warn(`特效 ${projectId} 已存在，将被覆盖`);
  }
  effectConfigs[projectId] = config;
  console.log(`已注册特效: ${projectId}`);
}

/**
 * 获取所有已注册的特效 ID
 */
function getRegisteredEffectIds() {
  return Object.keys(effectConfigs);
}

/**
 * 检查特效是否已注册
 */
function hasEffect(projectId) {
  return projectId in effectConfigs;
}

/**
 * 获取嵌套参数结构定义（用于 API 文档）
 */
function getNestedParamsSchema() {
  return NESTED_PARAMS;
}

module.exports = {
  effectConfigs,
  getProjectList,
  getEffectConfig,
  getProjectInfo,
  validateParams,
  buildRenderParams,
  registerEffect,
  getRegisteredEffectIds,
  hasEffect,
  getNestedParamsSchema,
};