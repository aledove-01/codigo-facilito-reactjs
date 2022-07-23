import {createSlice} from "@reduxjs/toolkit";

const initialStates = {
    data: {},
}

const busquedaReducerVuelo = createSlice({
    name: "busquedaVuelos",
    initialState: initialStates,
    reducers: {
        busquedaVuelosInit: (state) => {
            state.data = {};
        },
        busquedaVuelosComplete: (state, action) => {
            state.data = action.payload;
        },
      
    }
});

export const {busquedaVuelosInit, busquedaVuelosComplete} = busquedaReducerVuelo.actions;

export default busquedaReducerVuelo.reducer;