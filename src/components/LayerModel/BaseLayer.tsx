import React, { useContext, useEffect } from "react";
import OLTileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import MapContext from "@/components/Map/MapContext";

const MapTilerLayer = ({
  style = "streets-v2-dark",
  zIndex = 0,
  opacity = 1,
  visible = true,
}) => {
  const context = useContext(MapContext);

  useEffect(() => {
    if (!context?.map) return; // Check if 'map' is available
    console.log(style);
    const map = context.map;
    const url = `https://api.maptiler.com/maps/${style}/{z}/{x}/{y}@2x.png?key=0EwVPj0QPVB9CXJO2d0g`;
    const maptilerLayer = new OLTileLayer({
      source: new XYZ({
        url,
        tileSize: 512,
        crossOrigin: "anonymous",
        attributions: "© MapTiler © OpenStreetMap contributors",
      }),
      zIndex,
      opacity,
      visible,
    });

    map.addLayer(maptilerLayer);

    return () => {
      map.removeLayer(maptilerLayer);
    };
  }, [context?.map, style, zIndex, opacity, visible]);

  return null;
};

export default MapTilerLayer;
