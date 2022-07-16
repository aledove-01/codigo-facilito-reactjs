import { combineReducers } from '@reduxjs/toolkit';
import resultsReducer from './results';

export default combineReducers({
    results: resultsReducer,
});
