import {createSlice} from "@reduxjs/toolkit";

const initialStates = {
    data: [],
}

const detaReducerVuelo = createSlice({
    name: "detalleVuelo",
    initialState: initialStates,
    reducers: {
        vueloStart: (state) => {
            state.data = [];
        },
        vueloComplete: (state, action) => {
            //console.log('detalleVuelo',state, action);
            state.data = action.payload;
        },
      
    }
});

export const {vueloStart, vueloComplete} = detaReducerVuelo.actions;

export default detaReducerVuelo.reducer;