import React from "react";
import { Feature } from "ol";
import { GeoJSON } from "ol/format";
import * as shpjs from "shpjs";
import KML from "ol/format/KML";
import GPX from "ol/format/GPX";
import WKT from "ol/format/WKT";
import { Table as ArrowTable } from "apache-arrow";
import { load } from "@loaders.gl/core";
import { ArrowLoader } from "@loaders.gl/arrow";

interface ProcessedData {
  features?: Feature[];
  rawData?: any;
}
function useUploadFile() {
  const handleFileUpload = React.useCallback(
    async (file: File, fileType: string) => {
      const processedData = await processFile(file, fileType);
      console.log(processedData);
    },
    []
  );

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
              .then((shapefileData) => {
                resolve({
                  features: new GeoJSON().readFeatures(shapefileData),
                });
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
