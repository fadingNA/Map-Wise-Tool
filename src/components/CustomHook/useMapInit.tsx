import { useRef, useState, useEffect, RefObject } from "react";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { Options as OverlayOptions } from "ol/Overlay";
import { MapControllerProps, UseMapOverlayProps } from "../../../type/type";
import { Attribution, defaults as defaultControls } from "ol/control";

export function useMapInitialization({
  center,
  zoom,
}: MapControllerProps): [Map | null, React.RefObject<HTMLDivElement>] {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || map) return; // Ensure the div element is mounted

    const options = {
      view: new View({ center, zoom }),
      layers: [],
      controls: defaultControls({
        attribution: false,
      }).extend([
        new Attribution({
          collapsible: false,
          collapsed: false,
          label: "© OpenLayers Contributors",
          tipLabel: "OpenStreetMap",
          target: "attribution",
        }),
      ]),
    };

    if (!map) {
      const mapObject = new Map(options);
      mapObject.setTarget(mapRef.current); // Attach to the div
      setMap(mapObject);

      return () => {
        mapObject.setTarget(undefined);
        mapObject.dispose();
      };
    }
  }, [center, zoom]); // Make sure `map` is stable

  return [map, mapRef]; // Ensure correct order and types
}

export function useMapOverlay({
  map,
  popupRef,
}: UseMapOverlayProps): RefObject<Overlay> {
  const overlayRef = useRef<Overlay | null>(null);

  useEffect(() => {
    if (!map || !popupRef.current) return;

    const overlayOptions: OverlayOptions = {
      element: popupRef.current,
      autoPan: true,
      stopEvent: false,
    } as OverlayOptions;

    const overlay = new Overlay({
      ...overlayOptions,
      autoPanAnimation: {
        duration: 100,
      },
    } as unknown as OverlayOptions);

    map.addOverlay(overlay);
    overlayRef.current = overlay;

    return () => {
      if (map && overlay) {
        map.removeOverlay(overlay);
      }
      overlayRef.current = null;
    };
  }, [map, popupRef]);

  return overlayRef;
}
