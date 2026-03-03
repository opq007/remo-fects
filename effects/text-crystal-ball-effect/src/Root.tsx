import { Composition } from "remotion";
import { TextCrystalBallComposition, TextCrystalBallSchema } from "./TextCrystalBallComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TextCrystalBall"
      component={TextCrystalBallComposition}
      durationInFrames={300}
      fps={24}
      width={720}
      height={1280}
      schema={TextCrystalBallSchema}
      defaultProps={{
        contentType: "text",
        words: ["福", "禄", "寿", "喜", "财", "旺", "吉", "祥"],
        images: [],
        blessingTypes: [],
        imageWeight: 0.5,
        ballRadius: 200,
        ballColor: "#4169E1",
        ballOpacity: 0.3,
        glowColor: "#87CEEB",
        glowIntensity: 1,
        verticalOffset: 0.5,
        rotationSpeedX: 0.2,
        rotationSpeedY: 0.6,
        rotationSpeedZ: 0.1,
        autoRotate: true,
        zoomEnabled: true,
        zoomProgress: 0,
        particleCount: 30,
        backgroundColor: "#0a0a30",
        audioEnabled: false,
        audioSource: "coin-sound.mp3",
        audioVolume: 0.5,
        audioLoop: true,
        textStyle: {
          color: "#FFD700",
          effect: "gold3d",
          effectIntensity: 0.9,
        },
        fontSizeRange: [30, 60],
        imageSizeRange: [40, 80],
        blessingSizeRange: [35, 70],
        entranceDuration: 30,
        perspective: 1000,
        seed: 42,
      }}
    />
  );
};