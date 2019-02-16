import { mesh, feature } from "topojson";

export class MapDataClass {
  constructor(topologicalData) {
    this.topologicalData = topologicalData;
  }

  getFeatureData() {
    return feature(this.topologicalData, this.topologicalData.objects.countries)
      .features;
  }

  getMeshData() {
    return mesh(this.topologicalData, this.topologicalData.objects.countries);
  }
}
