import React, { useContext, useEffect } from "react";
import OLTileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import MapContext from "@/components/Map/MapContext";

const MapTilerLayer = ({
  style = "streets-v2-dark",
  baseLayerZIndex = 0, // Default zIndex for base layers
  opacity = 1,
  visible = true,
}) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return; // Check if 'map' is available

    const url = `https://api.maptiler.com/maps/${style}/{z}/{x}/{y}@2x.png?key=0EwVPj0QPVB9CXJO2d0g`;
    const maptilerLayer = new OLTileLayer({
      source: new XYZ({
        url,
        tileSize: 512,
        crossOrigin: "anonymous",
        attributions: "© MapTiler © OpenStreetMap contributors",
      }),
      zIndex: baseLayerZIndex,
      opacity,
      visible,
    });

    map.addLayer(maptilerLayer);

    // Manage layer ordering on change
    map
      .getLayers()
      .getArray()
      .filter((layer) => layer !== maptilerLayer)
      .forEach((layer) => layer.setZIndex(baseLayerZIndex + 1)); // Ensuring all other layers are above the base layer

    return () => {
      map.removeLayer(maptilerLayer);
    };
  }, [map, style, baseLayerZIndex, opacity, visible]);

  return null;
};

export default MapTilerLayer;
