import {combineReducers} from "redux";
import hkReducer from './hkreducer.js';
let reducers=combineReducers({
    hk:hkReducer
});
export default reducers;