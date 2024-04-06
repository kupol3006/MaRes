import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR, CHECK_IN_REQUEST, CHECK_IN_SUCCESS, CHECK_IN_ERROR, CHECK_OUT_REQUEST, CHECK_OUT_SUCCESS, CHECK_OUT_ERROR } from './types.js';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const fetchApiStaff = () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

    return async (dispatch, getState) => {
        dispatch(fetchApiStaffRequest());
        const token = parseCookies()['loggedIn'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            if (token) {
                const res = await axios.get(API_BASE_URL + `work_day/staff`);
                const data = res && res.data.data ? res.data.data : [];
                const staffId = data.map((item) => item.staff_id);
                dispatch(fetchApiStaffSuccess(data, staffId));
            }
        } catch (error) {
            console.log(error);
            dispatch(fetchApiStaffError());
        }
    };
};

export const fetchApiStaffRequest = () => {

    return {

        type: FETCH_REQUEST,

    };

};

export const fetchApiStaffSuccess = (data, staffId) => {

    return {

        type: FETCH_SUCCESS,
        dataStaff: data,
        staffId: staffId,

    };

};
// Path: src/app/redux/staffReducer/action.js
export const fetchApiStaffError = () => {

    return {

        type: FETCH_ERROR,

    };

};

export const checkOutStaff = (index) => {
    return async (dispatch, getState) => {
        dispatch(checkOutStaffRequest());
        const token = parseCookies()['loggedIn'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const checkout = {
            staff_id: getState().staff.staffId[index],
            type: 'out',
        };
        try {
            if (token) {
                const res = await axios.post(
                    process.env.NEXT_PUBLIC_API_KEY + `work_day/shift`,
                    checkout
                );
                const data = res && res.data.data ? res.data.data : [];
                dispatch(checkOutStaffSuccess(data));
            }
        } catch (error) {
            console.log(error);
            dispatch(checkOutStaffError());
        }
    }
};

export const checkOutStaffRequest = () => {
    return {
        type: CHECK_OUT_REQUEST,
    };
};

export const checkOutStaffSuccess = (data) => {
    return {
        type: CHECK_OUT_SUCCESS,
        dataStaff: data,
    };
};
export const checkOutStaffError = () => {
    return {
        type: CHECK_OUT_ERROR,
    };
};

export const checkInStaff = (index) => {
    return async (dispatch, getState) => {
        dispatch(checkInStaffRequest());
        const token = parseCookies()['loggedIn'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const checkin = {
            staff_id: getState().staff.staffId[index],
            type: 'in',
        };
        try {
            if (token) {
                const res = await axios.post(
                    process.env.NEXT_PUBLIC_API_KEY + `work_day/shift`,
                    checkin
                );
                const data = res && res.data.data ? res.data.data : [];
                dispatch(checkInStaffSuccess(data));
            }
        } catch (error) {
            console.log(error);
            dispatch(checkInStaffError());
        }
    }
};

export const checkInStaffRequest = () => {
    return {
        type: CHECK_IN_REQUEST,
    };
}

export const checkInStaffSuccess = (data) => {
    return {
        type: CHECK_IN_SUCCESS,
        dataStaff: data,
    };
}

export const checkInStaffError = () => {
    return {
        type: CHECK_IN_ERROR,
    };
}