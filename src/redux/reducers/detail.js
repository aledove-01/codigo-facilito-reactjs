import { FETCH_VUELO_DETALLE_COMPLETE,FETCH_VUELO_DETALLE_ERROR,FETCH_VUELO_DETALLE_START} from '../actions/details';

const initialStates = {
    isLoading: false,
    data: [],
    error: {},
};

const detailReducer = (state = initialStates, action) => {
    switch (action.type) {
        case FETCH_VUELO_DETALLE_START:
            return {
                ...state,
                isLoading: true,
                data: [],
            };
        case FETCH_VUELO_DETALLE_COMPLETE:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case FETCH_VUELO_DETALLE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
}
export default detailReducer;