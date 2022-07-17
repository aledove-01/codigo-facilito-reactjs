export const FETCH_VUELO_DETALLE = 'FETCH_VUELO_DETALLE';
export const FETCH_VUELO_DETALLE_START = 'FETCH_VUELO_DETALLE_START';
export const FETCH_VUELO_DETALLE_COMPLETE = 'FETCH_VUELO_DETALLE_COMPLETE';
export const FETCH_VUELO_DETALLE_ERROR = 'FETCH_VUELO_DETALLE_ERROR';

const fetchVueloDetalleStart = () => ({
    type: FETCH_VUELO_DETALLE_START,
});
const fetchVueloDetalleComplete = (payload) => ({
    type: FETCH_VUELO_DETALLE_COMPLETE,
    payload,
});
const fetchVueloDetalleError = (error) => ({
    type: FETCH_VUELO_DETALLE_ERROR,
    error,
});


export const  fetchVueloDetalle = (id) => dispatch => {
    try {
        
    } catch (error) {
        
    }
};