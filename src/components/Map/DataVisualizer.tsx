import React, { useContext, useEffect } from "react";
import MapContext from "./MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Style } from "ol/style";

function DataVisualizer() {
  const { map, features, addLayer } = useContext(MapContext);

  useEffect(() => {
    if (map && features.length > 0) {
      const vectorSource = new VectorSource({
        features, // these are OpenLayers Feature objects
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      addLayer(vectorLayer); // Use the context's addLayer method
    }
  }, [map, features, addLayer]); // React on changes in these dependencies

  return null; // This component does not render anything itself
}

export default DataVisualizer;
