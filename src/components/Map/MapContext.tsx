import React from "react";
import { MapContextType } from "../../../type/type";
import { Feature, Map } from "ol";

// Providing a more functional default context value
const defaultContextValue: MapContextType = {
  map: null, // Correctly assumed as possibly null initially
  features: [], // Should be an empty array as the default
  addFeatures: (newFeatures: Feature[]) => {
    // Example implementation that might simply console log the features
    console.log("Adding features", newFeatures);
  },
  center: [0, 0], // Default center coordinates
  zoom: 1, // Default zoom level
  setCenter: (center: [number, number]) => {
    console.log("Setting center to", center);
  },
  setZoom: (zoom: number) => {
    console.log("Setting zoom to", zoom);
  },
  addLayer: (layer: any) => {
    console.log("Adding layer", layer);
  },
};

const MapContext = React.createContext<MapContextType>(defaultContextValue);

export default MapContext;
