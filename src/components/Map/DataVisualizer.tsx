import React, { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import useFeatureLayer from "../CustomHook/useFeatureLayer";

function DataVisualizer() {
  const { map, features } = useContext(MapContext);
  const { addFeatures } = useFeatureLayer(features);

  useEffect(() => {
    if (map && features.length > 0) {
      console.log("Adding features to map DataVisualizer");
      addFeatures(features);
    }
  }, [map, features, addFeatures]);

  return null; // This component does not render anything itself
}

export default DataVisualizer;
