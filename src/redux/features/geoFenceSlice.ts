import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GeoFence, Region} from '../../interfaces/shared';
interface IState {
  fences: GeoFence[];
  region: Region | null;
}
const initialState: IState = {
  fences: [],
  region: null,
};
const geoFenceSlice = createSlice({
  name: 'geoFence',
  initialState,
  reducers: {
    addGeoFence: (state, action: PayloadAction<GeoFence>) => {
      state.fences.push(action.payload);
    },
    removeGeoFence: (state, action: PayloadAction<number>) => {
      state.fences = state.fences.filter(fence => fence.id !== action.payload);
    },
    setRegion: (state, action: PayloadAction<Region>) => {
      state.region = action.payload;
    },
  },
});

export const {addGeoFence, removeGeoFence, setRegion} = geoFenceSlice.actions;
export default geoFenceSlice.reducer;
