import { Feature } from "ol";
import { GeoJSON } from "ol/format";
import * as shpjs from "shpjs";
import KML from "ol/format/KML";
import GPX from "ol/format/GPX";
import WKT from "ol/format/WKT";
import { Table as ArrowTable } from "apache-arrow";
import { load } from "@loaders.gl/core";
import { ArrowLoader } from "@loaders.gl/arrow";
import { useContext, useCallback } from "react";
import MapContext from "../Map/MapContext";
import useFeatureLayer from "./useFeatureLayer";

interface ProcessedData {
  features?: Feature[];
  rawData?: any;
}
function useUploadFile() {
  const { addFeatures } = useFeatureLayer();
  const { map } = useContext(MapContext);

  const handleFileUpload = useCallback(
    async (file: File, fileType: string) => {
      try {
        const processedData = await processFile(file, fileType);
        const features = transformFeatures(processedData.features);
        console.log("Features:", features);
        addFeatures(features);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    },
    [addFeatures] // Add featureLayer to dependency array
  );

  const transformFeatures = (geojsonData: any) => {
    const geojsonFormat = new GeoJSON();
    if (!geojsonData || !geojsonData.features) {
      console.error("Invalid or empty GeoJSON data");
      return []; // Return an empty array to safely handle errors
    }
    const transformedFeatures = geojsonFormat.readFeatures(geojsonData, {
      featureProjection: "EPSG:3857",
      dataProjection: "EPSG:4326", // Assuming the shapefile is in WGS 84
    });
    return transformedFeatures;
  };

  const uploadShapeFile = async (file: File) =>
    await handleFileUpload(file, "shapefile");
  const uploadRasterFile = async (file: File) =>
    await handleFileUpload(file, "raster");
  const uploadCSVFile = async (file: File) =>
    await handleFileUpload(file, "csv");
  const uploadGeoJSONFile = async (file: File) =>
    await handleFileUpload(file, "geojson");
  const uploadKMLFile = async (file: File) =>
    await handleFileUpload(file, "kml");
  const uploadGPXFile = async (file: File) =>
    await handleFileUpload(file, "gpx");
  const uploadTopoJSONFile = async (file: File) =>
    await handleFileUpload(file, "topojson");
  const uploadWKTFile = async (file: File) =>
    await handleFileUpload(file, "wkt");
  const uploadFeatherFile = async (file: File) =>
    await handleFileUpload(file, "feather");

  return {
    uploadShapeFile,
    uploadRasterFile,
    uploadCSVFile,
    uploadGeoJSONFile,
    uploadKMLFile,
    uploadGPXFile,
    uploadTopoJSONFile,
    uploadWKTFile,
    uploadFeatherFile,
  };
}

export default useUploadFile;

async function processFile(
  file: File,
  fileType: string
): Promise<ProcessedData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const fileContent = event.target?.result;
        if (!fileContent) {
          throw new Error("File content is empty");
        }

        switch (fileType) {
          case "shapefile":
            if (!(fileContent instanceof ArrayBuffer)) {
              reject(new Error("File content is not an ArrayBuffer"));
              return;
            }
            shpjs
              .parseZip(fileContent)
              .then((geojsonData: any) => {
                if (
                  geojsonData &&
                  geojsonData.type === "FeatureCollection" &&
                  Array.isArray(geojsonData.features)
                ) {
                  resolve({
                    features: geojsonData,
                  });
                } else {
                  reject(new Error("Invalid GeoJSON data"));
                }
              })
              .catch((err) => {
                reject(err);
              });
            break;

          case "geojson":
            resolve({
              features: new GeoJSON().readFeatures(fileContent as string),
            });
            break;
          case "csv":
            break;
          case "kml":
            resolve({
              features: new KML().readFeatures(fileContent as string),
            });
            break;
          case "gpx":
            resolve({
              features: new GPX().readFeatures(fileContent as string),
            });
            break;
          case "topojson":
            // TopoJSON can be handled similarly to GeoJSON, possibly with an additional conversion step
            break;
          case "wkt":
            resolve({
              features: new WKT().readFeatures(fileContent as string),
            });
            break;
          case "feather":
            readFeatherFile(file)
              .then((table) => {
                resolve({ rawData: table });
              })
              .catch((err) => {
                reject(err);
              });
            break;
          default:
            reject(new Error("Unsupported file type"));
        }
      } catch (err) {
        reject(err);
      }
    };

    if (fileType === "shapefile" || fileType === "feather") {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  });
}

async function readFeatherFile(file: Blob): Promise<ArrowTable> {
  const table = (await load(file, ArrowLoader)) as unknown as ArrowTable;
  return table;
}
