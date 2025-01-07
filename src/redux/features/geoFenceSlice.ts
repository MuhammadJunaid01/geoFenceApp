import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GeoFence} from '../../interfaces/shared';

const geoFenceSlice = createSlice({
  name: 'geoFence',
  initialState: [] as GeoFence[],
  reducers: {
    addGeoFence: (state, action: PayloadAction<GeoFence>) => {
      state.push(action.payload);
    },
    removeGeoFence: (state, action: PayloadAction<number>) => {
      return state.filter(fence => fence.id !== action.payload);
    },
  },
});

export const {addGeoFence, removeGeoFence} = geoFenceSlice.actions;
export default geoFenceSlice.reducer;
