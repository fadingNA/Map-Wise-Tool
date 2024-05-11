import { Style, Fill, Stroke, Circle, Text } from "ol/style";

// Function to determine the style based on the feature type
const getGenericStyle = () => {
  return (feature: any) => {
    const geometryType = feature.getGeometry().getType();
    let style;
    console.log("geometryType", geometryType)
    console.log("feature", feature)
    switch (geometryType) {
      case "Point":
      case "MultiPoint":
        style = new Style({
          image: new Circle({
            radius: 5,
            fill: new Fill({ color: "blue" }),
            stroke: new Stroke({ color: "white", width: 1 }),
          }),
          text: new Text({
            text: feature.get("name") || "", // Assuming features have a 'name' property to display
            fill: new Fill({ color: "#000" }),
            stroke: new Stroke({ color: "#fff", width: 2 }),
          }),
        });
        break;
      case "LineString":
      case "MultiLineString":
        style = new Style({
          stroke: new Stroke({
            color: "green",
            width: 3,
          }),
        });
        break;
      case "Polygon":
      case "MultiPolygon":
        style = new Style({
          fill: new Fill({
            color: "rgba(0, 255, 0, 0.1)", // Semi-transparent green
          }),
          stroke: new Stroke({
            color: "green",
            width: 2,
          }),
        });
        break;
      default:
        style = new Style({
          stroke: new Stroke({
            color: "red",
            width: 3,
          }),
          fill: new Fill({
            color: "rgba(255, 0, 0, 0.1)", // Semi-transparent red
          }),
        });
    }

    return style;
  };
};

export default getGenericStyle;
