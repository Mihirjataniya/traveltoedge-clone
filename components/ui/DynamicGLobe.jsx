import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { sampleArcs } from "@/data/sampleArcs";

const World = dynamic(() => import("@/components/ui/Globe").then((m) => m.World), {
  ssr: false,
});

export default function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#03435e",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#03435E",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full aspect-square max-w-[700px]"> {/* Fixed aspect ratio container */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <World data={sampleArcs} globeConfig={globeConfig} />
        </motion.div>
      </div>
    </div>
  );
}
