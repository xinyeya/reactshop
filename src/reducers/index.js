import {combineReducers} from "redux";
import hkReducer from './hkreducer.js';
import cartReducer from './cartreducer';
import loginReducer from './loiginreducer';
let reducers=combineReducers({
    hk:hkReducer,
    cart: cartReducer,
    user: loginReducer
});
export default reducers;