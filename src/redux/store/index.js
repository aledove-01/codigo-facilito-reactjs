import { configureStore } from "@reduxjs/toolkit";
import resultsVuelos from "../slices/resultsVuelos";
import detalleVuelo from "../slices/detaVuelo";
import pasos from "../slices/pasos";
import busquedaVuelos from "../slices/busqueda";

export const store = configureStore({
    reducer: {
        resultsVuelos,
        detalleVuelo,
        pasos,
        busquedaVuelos,
    },
  })