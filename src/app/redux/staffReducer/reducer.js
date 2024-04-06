import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from './types.js';


const INITIAL_STATE = {
    listStaff: [],
    isLoading: false,
    isError: false,
    staffId: [],
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_REQUEST:
            console.log('fetch request', action);
            return {

                ...state, isLoading: true, isError: false,

            };

        case FETCH_SUCCESS:
            console.log('fetch success', action);
            return {
                ...state, listStaff: action.dataStaff, isLoading: false, isError: false, staffId: action.staffId,
            };

        case FETCH_ERROR:
            console.log('fetch error', action);
            return {
                ...state, isError: true, isLoading: false,

            };

        default: return state;

    }

};

export default reducer;