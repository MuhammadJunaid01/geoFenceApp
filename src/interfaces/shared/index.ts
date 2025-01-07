export interface GeoFence {
  id: number;
  coordinates: Coordinate[];
}
export type Coordinate = {latitude: number; longitude: number};
