export interface GeoFence {
  id: number;
  coordinates: Coordinate[];
}
export type Coordinate = {latitude: number; longitude: number};
export type Fence = {
  id: number;
  coordinates: Coordinate[];
};
