/**
 * 自定义缓动函数 - 专为儿童视频设计
 */

// 弹跳效果（核心：名字弹跳）
export function bounce(t: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  
  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
}

// 弹性效果（用于爆炸开场）
export function elastic(t: number): number {
  const c4 = (2 * Math.PI) / 3;
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

// 冲击效果（从远处飞来）
export function impact(t: number): number {
  const overshoot = 1.2;
  if (t < 0.5) {
    return 2 * t * t;
  } else if (t < 0.8) {
    return 1 - Math.pow((t - 0.9) * 5, 2) * (overshoot - 1);
  } else {
    return 1 + (overshoot - 1) * Math.pow(1 - t, 2);
  }
}

// 摇摆效果（卡通元素围绕）
export function wobble(t: number): number {
  return Math.sin(t * Math.PI * 2) * 0.5 + 0.5;
}

// 浮动效果（气球等）
export function float(t: number, speed: number = 1): number {
  return Math.sin(t * Math.PI * 2 * speed) * 0.5 + 0.5;
}

// 快速出现（快节奏）
export function quickIn(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// 脉冲效果
export function pulse(t: number): number {
  return Math.sin(t * Math.PI) * 0.3 + 1;
}

// 震动效果
export function shake(t: number, intensity: number = 1): { x: number; y: number } {
  return {
    x: Math.sin(t * 50) * intensity,
    y: Math.cos(t * 40) * intensity
  };
}

// Stagger 延迟计算
export function stagger(index: number, total: number, delayPerItem: number = 0.1): number {
  return index * delayPerItem;
}
