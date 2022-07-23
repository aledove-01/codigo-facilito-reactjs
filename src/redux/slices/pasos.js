import {createSlice} from "@reduxjs/toolkit";

const initialStates = {
    data: 0,
}

const pasosReducer = createSlice({
    name: "pasos",
    initialState: initialStates,
    reducers: {
        pasosStart: (state) => {
            state.data = 0;
        },
        pasosChange: (state, action) => {
            state.data = action.payload;
        },
      
    }
});

export const {pasosStart, pasosChange} = pasosReducer.actions;

export default pasosReducer.reducer;