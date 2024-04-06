import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './types.js';


const INITIAL_STATE = {
    token: '',
    username: '',
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case LOGIN_REQUEST:
            console.log('login request', action);
            return {

                ...state,

            };

        case LOGIN_SUCCESS:
            console.log('login success', action);
            return {
                ...state, token: action.token, username: action.username,
            };

        case LOGIN_ERROR:
            console.log('login error', action);
            return {

                ...state,

            };

        default: return state;

    }

};

export default reducer;