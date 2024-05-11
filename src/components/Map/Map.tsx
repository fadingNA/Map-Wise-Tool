import React, { useRef, useState, PropsWithChildren, useMemo } from "react";
import { useMapInitialization, useMapOverlay } from "../CustomHook";
import MapContext from "./MapContext";
import { MapContextType } from "../../../type/type";
import ol from "ol";
import { Feature } from "ol";

const MapController: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const center = useMemo<[number, number]>(() => [43.6532, -79.3832], []);
  const zoom = useMemo(() => 5, []);

  const [map, mapRef] = useMapInitialization({ center, zoom });
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(zoom);
  const [features, setFeatures] = useState<Feature[]>([]);

  const popupElement = useRef<HTMLDivElement>(null);
  useMapOverlay({ map, popupRef: popupElement });

  const addLayer = (newLayer: any) => {
    if (map) {
      map.addLayer(newLayer);
    }
  };

  const addFeatures = (newFeatures: Feature[]) => {
    setFeatures((currentFeatures) => [...currentFeatures, ...newFeatures]);
    // You might want to add these features to a specific layer too
  };

  const contextValue: MapContextType = {
    map,
    features,
    addFeatures,
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

// Path: geowise/src/components/Map/MapController.tsx
