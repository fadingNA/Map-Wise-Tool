import * as ol from "ol";
import { Map, Feature } from "ol";
import { Layer } from "ol/layer";

export interface LayoutProps {
  children: React.ReactNode;
}
type Coordinate = [number, number];

export interface MapControllerProps {
  center: Coordinate;
  zoom: number;
}

export interface UseMapOverlayProps {
  map: any;
  popupRef: React.RefObject<HTMLDivElement>;
}

export interface MapContextType {
  map: Map | null;
  features: Feature[]; // Array to hold features
  addFeatures: (newFeatures: Feature[]) => void; // Function to add features
  center: [number, number];
  zoom: number;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  addLayer: (layer: Layer) => void; // Use ol/layer Layer type for correctness
}

export interface MapTilerLayerProps {
  style?: string;
  zIndex?: number;
  opacity?: number;
  visible?: boolean;
}

export interface ToolControlProps {
  handleMenuSelect: (menuItemName: string) => void; // Define the type for the function prop
}

export interface LayerInfo {
  name: string;
  style: string;
}

export interface LayerGroup {
  baseLayerName: LayerInfo[];
}

export interface UseSelectLayerReturn {
  selectLayer: (style: string) => void;
  selectedLayer: string;
  layerData: LayerGroup[];
}
