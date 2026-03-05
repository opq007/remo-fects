/**
 * 卡通元素类型定义
 */

// 卡通元素类型
export type CartoonElementType = 'star' | 'balloon' | 'cake' | 'rocket' | 'unicorn' | 'heart' | 'crown';

export interface CartoonElement {
  type: CartoonElementType;
  position: 'top' | 'left' | 'right' | 'bottom' | 'around';
  count: number;
  color: string;
}

// 默认卡通元素颜色
export const DEFAULT_CARTOON_COLORS = [
  '#FF6FAF', // Candy Pink
  '#6EC8FF', // Sky Blue
  '#FFD93D', // Lemon Yellow
  '#8DECB4', // Mint Green
  '#BFA8FF', // Soft Purple
];