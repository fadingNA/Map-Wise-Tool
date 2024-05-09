import Image from "next/image";
import { Inter } from "next/font/google";
import ToolControl from "@/components/ToolControl/ToolControl";
import MapController from "@/components/Map/Map";
import { useState } from "react";
import MapTilerLayer from "@/components/LayerModel/BaseLayer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("default");

  const handleMenuSelect = (menuItem: string) => {
    console.log(menuItem);
    setActiveComponent(menuItem);
  };

  return (
    <div
      className="app-container"
      style={{ display: "flex", height: "100vh", width: "100vw" }}
    >
      <ToolControl handleMenuSelect={handleMenuSelect} />
      <div className="main-content" style={{ flex: 1 }}>
        {activeComponent === "Maps" && (
          <MapController>
            <MapTilerLayer style="streets-v2-dark" zIndex={1} opacity={1} />
          </MapController>
        )}
      </div>
    </div>
  );
}
