import { useState, useEffect, useContext, use } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import MapContext from "../Map/MapContext";
import getGenericStyle from "../VectorStyling/genericStyling";

interface UseFeatureLayerResult {
  addFeatures: (features: Feature[]) => void;
}

function useFeatureLayer(): UseFeatureLayerResult {
  const [featureLayer, setFeatureLayer] = useState<VectorLayer<
    VectorSource<Feature>
  > | null>(null);
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (map) {
      console.log("Map context is available", map);
      addFeatures([]);
    } else {
      console.error("Map context is not available");
    }
  },[]);

  const addFeatures = (features: Feature[]) => {
    console.log("Adding features to map", features);
    if (!map) {
      console.error("Map context is not available");
      return;
    }
    if (!featureLayer) {
      console.log("Feature layer not initialized yet");
      const vectorSource = new VectorSource({
        features: features, // Log the features being added
      });
      const newFeatureLayer = new VectorLayer({
        source: vectorSource,
        style: getGenericStyle(),
      });
      setFeatureLayer(newFeatureLayer);
      map.addLayer(newFeatureLayer);
      console.log("Feature layer initialized and added to the map");
    } else {
      console.log("Feature layer already initialized", featureLayer);
      const source = featureLayer.getSource();
      if (!source) {
        console.error("Feature layer source is not available");
        return;
      }
      source.addFeatures(features);
      console.log("Features added to the existing feature layer");
    }
  };

  // Return the addFeatures function
  return { addFeatures };
}

export default useFeatureLayer;
