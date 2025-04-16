import React from "react";
import SolutionHero from "../component/SolutionHero";
import ImageRevealSection from "../component/ImageRevealSection ";
import nsMaxSolvent from "../../public/ns-max-solvent.jpg";
import nsMaxUpgrade from "../../public/ns-max-upgrade.jpg";
const Solution = () => {
  return (
    <div>
      <SolutionHero />
      <ImageRevealSection
  title="NS-Max Solvent"
  description="A next-generation CO₂ capture solvent, NS-Max is optimized for low-energy, high-efficiency absorption. With a regeneration temperature below 90°C, it reduces operating costs by up to 25%, while achieving up to 99.5% CO₂ removal.
"
  mainImage={nsMaxSolvent}
  points={[
    "5x longer solvent life",
    "Low degradation, minimal solvent makeup",
    "Drop-in replacement for existing CO₂ scrubbing systems",
    "Ideal for biogas upgrading and flue gas CO₂ capture in steel, cement, and power sectors"
  ]}
  imagePosition="left"
/>
<ImageRevealSection
  title="NS-Max Upgrading Unit"
  description="Our containerized modular system is designed to upgrade raw biogas or capture CO₂ from industrial flue gas. The unit integrates seamlessly with both biogas facilities and hard-to-abate sectors like steel, enabling on-site purification and emission reduction with ease..
"
  mainImage={nsMaxUpgrade}
  points={[
    "Mobile, plug-and-play unit for biogas and industrial CO₂ capture",
    "Integrated solvent system for low OPEX and high purity output",
    "Suitable for Bio-CNG generation, carbon credit applications, or emissions control",
    "Scalable for multi-site deployment and fast commissioning"
  ]}
  imagePosition="right"
/>

    </div>
  );
};

export default Solution;
