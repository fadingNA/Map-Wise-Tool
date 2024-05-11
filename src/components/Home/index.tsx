import { Inter } from "next/font/google";
import { CSSTransition } from "react-transition-group";
import ToolControl from "@/components/ToolControl/ToolControl";
import MapController from "@/components/Map/Map";
import { useState } from "react";
import MapTilerLayer from "@/components/LayerModel/BaseLayer";
import LayerSelector from "../LayerModel/LayerSelector";
import UploadData from "../UploadData/uploadData";
import DataVisualizer from "../Map/DataVisualizer";

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
          <MapTilerLayer style={layerStyle} baseLayerZIndex={0} opacity={1} />
          <CSSTransition
            in={activeComponent === "Layers"}
            timeout={100}
            classNames="slide"
            unmountOnExit
          >
            <LayerSelector onSelectStyle={setLayerStyle} />
          </CSSTransition>
          <CSSTransition
            in={activeComponent === "Upload"}
            timeout={100}
            classNames="slide"
            unmountOnExit
          >
            <UploadData />
          </CSSTransition>
        </MapController>
      </div>
    </div>
  );
}
