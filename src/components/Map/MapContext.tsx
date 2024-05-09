import React from "react";
import { MapContextType } from "../../../type/type";

const defaultContextValue: MapContextType = {
  map: null, // Assuming the map might not be available immediately
  center: [0, 0], // Default center
  zoom: 1, // Default zoom
  setCenter: () => {}, // Placeholder function
  setZoom: () => {}, // Placeholder function
};

const MapContext = React.createContext<MapContextType | undefined>(
  defaultContextValue
);

export default MapContext;

// Path: geowise/src/components/Map/MapContext.tsx