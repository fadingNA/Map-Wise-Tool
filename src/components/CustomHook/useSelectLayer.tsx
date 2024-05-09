import { useState } from "react";
import layerData from "../../../data/layerData.json";
import { LayerInfo, UseSelectLayerReturn } from "../../../type/type";

const useSelectLayer = (): UseSelectLayerReturn => {
  const [selectedLayer, setSelectedLayer] = useState<string>("");

  function selectLayer(style: string) {
    setSelectedLayer(style);
    console.log(`Selected layer: ${style}`);
  }

  return { selectLayer, selectedLayer, layerData };
};

export default useSelectLayer;
