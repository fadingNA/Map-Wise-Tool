import React, { useContext, useCallback } from "react";
import { useUploadFile } from "../CustomHook";
import MapContext from "../Map/MapContext"; // Add this import statement

function UploadData() {
  const {
    uploadGeoJSONFile,
    uploadShapeFile,
    uploadCSVFile,
    uploadKMLFile,
    uploadGPXFile,
  } = useUploadFile();


  const handleFileChange = useCallback(
    (event: any) => {
      const file = event.target.files[0];
      if (!file) return;
      console.log(file);
      const fileType = file.name.split(".").pop();
      switch (fileType) {
        case "geojson":
          uploadGeoJSONFile(file);
          break;
        case "zip":
          console.log("zip file");
          uploadShapeFile(file);
          break;
        case "csv":
          uploadCSVFile(file);
          break;
        case "kml":
          uploadKMLFile(file);
          break;
        case "gpx":
          uploadGPXFile(file);
          break;
        default:
          alert("File type not supported");
      }
    },
    [
      uploadGeoJSONFile,
      uploadShapeFile,
      uploadCSVFile,
      uploadKMLFile,
      uploadGPXFile,
    ]
  );

  return (
    <div className="z-40 absolute top-10  bg-white shadow-md p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <h1 className="textl-4xl">Upload Data</h1>
      <input
        type="file"
        onChange={handleFileChange}
        multiple={false}
        accept=".geojson,.shp,.csv,.kml,.gpx,.zip"
      />
    </div>
  );
}

export default UploadData;
