import {createSlice} from "@reduxjs/toolkit";

const initialStates = {
    data: [],
}

const resultsReducerVuelos = createSlice({
    name: "resultsVuelos",
    initialState: initialStates,
    reducers: {
        fetchVuelosStart: (state) => {
            state.data = [];
        },
        fetchVuelosComplete: (state, action) => {
            //console.log('fetchVuelosComplete',state, action);
            state.data = action.payload;
        },
      
    }
});

export const {fetchVuelosStart, fetchVuelosComplete} = resultsReducerVuelos.actions;

//export const vuelosResult = (state) => state.resultsVuelos.data;

export default resultsReducerVuelos.reducer;
