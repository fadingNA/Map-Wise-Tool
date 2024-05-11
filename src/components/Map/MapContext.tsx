import React, { useRef, useState, useMemo, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { createContext } from "react";

export interface MapContextType {
  map: Map | null;
  features: Feature[];
  addLayer: (layer: any) => void;
}

const defaultContextValue: MapContextType = {
  map: null,
  features: [],
  addLayer: () => {},
};

const MapContext = createContext<MapContextType>(defaultContextValue);

export default MapContext;
