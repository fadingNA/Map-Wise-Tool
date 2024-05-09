import React, { useRef, useState, PropsWithChildren, useMemo } from "react";
import { useMapInitialization, useMapOverlay } from "../CustomHook";
import MapContext from "./MapContext";
import { MapContextType } from "../../../type/type";
//import ol from "ol";

const MapController: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const center = useMemo<[number, number]>(() => [43.6532, -79.3832], []);
  const zoom = useMemo(() => 5, []);

  const [map, mapRef] = useMapInitialization({ center, zoom });
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(zoom);

  const popupElement = useRef<HTMLDivElement>(null);
  useMapOverlay({ map, popupRef: popupElement });

  const contextValue: MapContextType = {
    map,
    center: mapCenter,
    zoom: mapZoom,
    setCenter: setMapCenter,
    setZoom: setMapZoom,
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

// Path: geowise/src/components/Map/MapController.tsx
