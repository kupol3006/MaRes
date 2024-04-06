import { combineReducers } from 'redux';

import staffReducer from './staffReducer/reducer.js';

import authReducer from './authReducer/reducer.js';

const rootReducer = combineReducers({

    staff: staffReducer,
    auth: authReducer,

});

export default rootReducer;