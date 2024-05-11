import React, {
  useRef,
  useState,
  PropsWithChildren,
  useMemo,
  useContext,
} from "react";
import {
  useMapInitialization,
  useMapOverlay,
  useFeatureLayer,
} from "../CustomHook";
import MapContext from "./MapContext";
import { MapContextType } from "../../../type/type";
import ol from "ol";
import { Feature } from "ol";

const MapController: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const center = useMemo<[number, number]>(() => [43.6532, -79.3832], []);
  const zoom = useMemo(() => 5, []);

  // Initialize useFeatureLayer hook to manage the vector layer and features


  // Initialize map and other map-related variables
  const [map, mapRef] = useMapInitialization({ center, zoom });
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(zoom);
  const popupElement = useRef<HTMLDivElement>(null);
  useMapOverlay({ map, popupRef: popupElement });

  // Function to add a layer to the map
  const addLayer = (newLayer: any) => {
    if (map) {
      map.addLayer(newLayer);
    }
  };

  // Context value containing map-related data and functions
  const contextValue: MapContextType = {
    map,
    features: [],
    center: mapCenter,
    zoom: mapZoom,
    setCenter: setMapCenter,
    setZoom: setMapZoom,
    addLayer,
  };

  return (
    <MapContext.Provider value={contextValue}>
      <div className="map-wrap">
        <div ref={mapRef} className="ol-map">
          {children}

        </div>
      </div>
    </MapContext.Provider>
  );
};

export default MapController;
