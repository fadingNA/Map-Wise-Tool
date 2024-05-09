import { Inter } from "next/font/google";
import { CSSTransition } from "react-transition-group";
import ToolControl from "@/components/ToolControl/ToolControl";
import MapController from "@/components/Map/Map";
import { useState } from "react";
import MapTilerLayer from "@/components/LayerModel/BaseLayer";
import LayerSelector from "../LayerModel/LayerSelector";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("default");
  const [layerStyle, setLayerStyle] = useState("streets-v2-dark");

  const handleMenuSelect = (menuItem: string) => {
    console.log(menuItem);
    if (menuItem === activeComponent) {
      setActiveComponent("default");
      return;
    }
    setActiveComponent(menuItem);
  };

  return (
    <div
      className="app-container"
      style={{ display: "flex", height: "100vh", width: "100vw" }}
    >
      <ToolControl handleMenuSelect={handleMenuSelect} />
      <div className="main-content" style={{ flex: 1 }}>
        <MapController>
          <MapTilerLayer style={layerStyle} zIndex={1} opacity={1} />
        </MapController>
        <CSSTransition
          in={activeComponent === "Layers"}
          timeout={100}
          classNames="slide"
          unmountOnExit
        >
          <LayerSelector onSelectStyle={setLayerStyle} />
        </CSSTransition>
      </div>
    </div>
  );
}
