import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux"
import handleNumReducer from "./NumStatus/reducer"
import reduxThunk from 'redux-thunk'

const reducers = combineReducers({
    handleNum:handleNumReducer,
})

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;

const stores =
    legacy_createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)));

// const store = legacy_createStore(handleNum,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());
export default stores;
export type RootState = ReturnType<typeof reducers>;