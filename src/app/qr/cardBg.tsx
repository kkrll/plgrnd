/** @paper-design/shaders-react@0.0.60 */
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K4SD4RX86NT0HCQZSV74FDH5?node=01K8BHTRHCV0PA3D8KFF1W24QQ
 * on Oct 27, 2025 at 12:16 PM.
 */
export default function Bg() {
  return (
    <MeshGradient
      speed={0.75}
      colors={["#D9D6F3", "#B7B2DF", "#FFFFFF", "#FF0519"]}
      distortion={0.36}
      swirl={0.27}
      grainMixer={0.3}
      grainOverlay={0.3}
      style={{ height: "420px", width: "300px", opacity: "0.4" }}
    />
  );
}
