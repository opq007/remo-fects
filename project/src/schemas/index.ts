import { z } from 'zod';
import { CompleteCompositionSchema } from '../../../effects/shared/schemas';

// 儿童风格子类型
export const KidsSubStyleSchema = z.enum(['girl_unicorn', 'boy_rocket', 'animal', 'general']).meta({
  description: '儿童风格子类型'
});

// 卡通元素类型
export const CartoonElementTypeSchema = z.enum(['star', 'balloon', 'cake', 'rocket', 'unicorn', 'heart', 'crown']).meta({
  description: '卡通元素类型'
});

// 卡通元素
export const CartoonElementSchema = z.object({
  type: CartoonElementTypeSchema,
  position: z.enum(['top', 'left', 'right', 'bottom', 'around']),
  count: z.number().min(1).max(20).default(5),
  color: z.string().default('#FFD93D')
});

/**
 * 儿童生日祝福 Schema
 * 继承 CompleteCompositionSchema（包含背景、遮罩、音频、水印、走马灯、前景等公共参数）
 * 只定义特有参数
 */
export const KidsBirthdaySchema = CompleteCompositionSchema.extend({
  // 基本信息
  name: z.string().min(1).max(10).meta({ description: '主角名字' }),
  age: z.number().min(1).max(18).optional().meta({ description: '年龄' }),
  message: z.string().max(50).default('愿你每天开心成长').meta({ description: '祝福语' }),
  
  // 视频参数
  duration: z.number().min(5).max(60).default(15).meta({ description: '视频时长(秒)' }),
  fps: z.number().default(24),
  width: z.number().default(720),
  height: z.number().default(1280),
  
  // 风格
  subStyle: KidsSubStyleSchema.default('general'),
  
  // 名字样式
  nameFontSize: z.number().min(60).max(200).default(120),
  nameColor: z.string().optional(),
  showAge: z.boolean().default(true),
  
  // 祝福语样式
  blessingText: z.string().default('生日快乐'),
  blessingFontSize: z.number().min(30).max(100).default(60),
  
  // 卡通元素
  cartoonElements: z.array(CartoonElementSchema).optional(),
  
  // 粒子效果
  confettiLevel: z.enum(['low', 'medium', 'high']).default('high'),
  
  // 动画速度
  animationSpeed: z.enum(['slow', 'normal', 'fast']).default('normal'),
  
  // 音频（使用 audioEnabled 和 audioSource，与 CompleteCompositionSchema 保持一致）
  musicEnabled: z.boolean().default(true).meta({ description: '是否启用背景音乐' }),
  musicTrack: z.string().default('kids_party_01').meta({ description: '音乐轨道' }),
  
  // 随机种子
  seed: z.number().optional()
});

export type KidsBirthdayProps = z.infer<typeof KidsBirthdaySchema>;

// 导出所有 Schema 以便组合
export const BirthdayBlessingSchema = z.discriminatedUnion('audience', [
  KidsBirthdaySchema.extend({ audience: z.literal('kids') })
]);

export type BirthdayBlessingProps = z.infer<typeof BirthdayBlessingSchema>;
