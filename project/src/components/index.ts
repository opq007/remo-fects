// 原有组件
export { ConfettiBurst } from './ConfettiBurst';
export { BouncingName } from './BouncingName';
export { BlessingText } from './BlessingText';
export { CartoonElements } from './CartoonElements';
export { MessageText } from './MessageText';
export { AgeCelebration } from './AgeCelebration';
export { ClosingEffect } from './ClosingEffect';

// 新增角色系统
export { Character, CharacterWithSpeech, SpeechBubble } from './Character';

// 新增魔法效果
export { 
  MagicParticles, 
  MagicWand, 
  MagicCircle, 
  WhiteFlashTransition,
  Firework,
  BalloonBurst,
  ShootingStar,
  StarFieldBackground
} from './MagicEffects';

// 新增照片互动
export { 
  PhotoCard, 
  PhotoFromMagicCircle, 
  FloatingHearts, 
  AgeBalloon,
  PhotoInteractionScene 
} from './PhotoInteraction';

// 新增生日歌
export { BirthdayCake, BouncingLyrics, MakeWish, BirthdaySongScene } from './BirthdaySong';

// 新增梦想泡泡
export { DreamBubblesScene, DreamIcon } from './DreamBubbles';

// 新增模块化分镜
export { 
  ModuleA_MagicOpening,
  ModuleB_CharacterEntrance,
  ModuleC_PhotoInteraction1,
  ModuleD_PhotoInteraction2,
  ModuleE_PhotoInteraction3,
  ModuleF_GrowthCelebration,
  ModuleG_BirthdaySong,
  ModuleH_FutureBlessing,
  ModuleI_DreamSeeds,
  ModuleJ_WarmClosing,
  createModule
} from './Modules';