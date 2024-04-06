import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = configureStore({
    reducer: rootReducer,
    compose: composedEnhancer,
});
export default store;