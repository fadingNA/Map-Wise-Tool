import React from "react";
import { useSelectLayer } from "../CustomHook";
import { LayerGroup } from "../../../type/type";

interface LayerSelectorProps {
  onSelectStyle: (style: string) => void;
}

function LayerSelector({ onSelectStyle }: LayerSelectorProps) {
  const { selectLayer, selectedLayer, layerData } = useSelectLayer();

  const handleSelectStyle = (style: string) => {
    selectLayer(style);
    onSelectStyle(style);
  };

  return (
    <div className="z-40 absolute top-10  bg-white shadow-md p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <h1 className="font-semibold text-lg">
        Current Selected Layer: {selectedLayer}
      </h1>
      <ul>
        {layerData.map((group: LayerGroup) =>
          group.baseLayerName.map((layer) => (
            <li
              key={layer.style}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectStyle(layer.style)}
            >
              {layer.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default LayerSelector;
