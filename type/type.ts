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
  map: any; // Use the specific type of your map object, e.g., ol.Map if using OpenLayers
  center: [number, number];
  zoom: number;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
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
