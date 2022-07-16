export const FETCH_VUELOS_START = 'FETCH_VUELOS_START';
export const FETCH_VUELOS_COMPLETE = 'FETCH_VUELOS_COMPLETE';
export const FETCH_VUELOS_ERROR = 'FETCH_VUELOS_ERROR';

const fetchVuelos = () => ({
    type: FETCH_VUELOS_START,
});

const fetchVuelosComplete = (payload) => ({
    type: FETCH_VUELOS_COMPLETE,
    payload,
});

const fetchVuelosError = (error) => ({
    type: FETCH_VUELOS_ERROR,
    error,
});
