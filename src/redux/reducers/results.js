import { FETCH_VUELOS_COMPLETE,FETCH_VUELOS_ERROR,FETCH_VUELOS_START} from '../actions/results';

const initialStates = {
    isLoading: false,
    data: [],
    error: {},
};

const resultsReducer = () => (state = initialStates, action) => {
    switch (action.type) {
        case 'FETCH_VUELOS_START':
            return {
                ...state,
                isLoading: true,
                data:[]
            };
        case 'FETCH_VUELOS_COMPLETE':
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case 'FETCH_VUELOS_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
}

export default resultsReducer;