import React from 'react';
import { Composition } from 'remotion';
import { KidsBirthdayComposition } from './compositions';
import { KidsBirthdaySchema } from './schemas';

/**
 * 祝福视频生成器 - 根组件
 * 
 * 支持场景：
 * - 生日祝福（儿童、情侣、长辈）
 * - 婚礼祝福
 * - 节假祝福
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 儿童生日祝福 */}
      <Composition
        id="KidsBirthday"
        component={KidsBirthdayComposition}
        durationInFrames={360} // 15秒 @ 24fps
        fps={24}
        width={720}
        height={1280}
        schema={KidsBirthdaySchema}
        defaultProps={{
          name: '小明',
          age: 6,
          message: '愿你每天开心成长',
          duration: 15,
          fps: 24,
          width: 720,
          height: 1280,
          subStyle: 'general',
          nameFontSize: 120,
          showAge: true,
          blessingText: '生日快乐',
          blessingFontSize: 60,
          confettiLevel: 'high',
          animationSpeed: 'normal',
          musicEnabled: true,
          musicTrack: 'kids_party_01'
        }}
      />
      
      {/* 女孩独角兽风格 */}
      <Composition
        id="KidsBirthdayGirl"
        component={KidsBirthdayComposition}
        durationInFrames={360}
        fps={24}
        width={720}
        height={1280}
        schema={KidsBirthdaySchema}
        defaultProps={{
          name: '小美',
          age: 5,
          message: '小公主生日快乐！',
          duration: 15,
          fps: 24,
          width: 720,
          height: 1280,
          subStyle: 'girl_unicorn',
          nameFontSize: 120,
          showAge: true,
          blessingText: '生日快乐',
          blessingFontSize: 60,
          confettiLevel: 'high',
          animationSpeed: 'normal',
          musicEnabled: true,
          musicTrack: 'kids_party_01'
        }}
      />
      
      {/* 男孩火箭风格 */}
      <Composition
        id="KidsBirthdayBoy"
        component={KidsBirthdayComposition}
        durationInFrames={360}
        fps={24}
        width={720}
        height={1280}
        schema={KidsBirthdaySchema}
        defaultProps={{
          name: '小强',
          age: 7,
          message: '小小男子汉生日快乐！',
          duration: 15,
          fps: 24,
          width: 720,
          height: 1280,
          subStyle: 'boy_rocket',
          nameFontSize: 120,
          showAge: true,
          blessingText: '生日快乐',
          blessingFontSize: 60,
          confettiLevel: 'high',
          animationSpeed: 'normal',
          musicEnabled: true,
          musicTrack: 'kids_party_01'
        }}
      />
    </>
  );
};
