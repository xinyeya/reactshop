import {combineReducers} from "redux";
import hkReducer from "./hkReducer";

let reducers = combineReducers({
    hk: hkReducer
});

export default reducers;
