"use client";

/** @paper-design/shaders-react@0.0.51 */
import { GrainGradient } from "@paper-design/shaders-react";

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K4SD4RX9YJBM8DVYW87Y63GT?node=01K4SDKKRZP0P8NTTV4TRANMKN
 * on Sep 10, 2025 at 11:02 AM.
 */
const heroBg = () => {
  return (
    <GrainGradient
      colors={["#8A1102B3", "#00407099", "#000000", "#000000"]}
      colorBack="#00000000"
      speed={1}
      scale={4}
      rotation={0}
      offsetX={0}
      offsetY={0}
      softness={0.7}
      intensity={0.15}
      noise={0.28}
      shape="blob"
      style={{ backgroundColor: "#000000", height: "100%", width: "100%" }}
    />
  );
};

export default heroBg;
