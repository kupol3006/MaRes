import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './types.js';
import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';

export const requestLogin = (code, pin) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
    return async (dispatch, getState) => {
        dispatch(AUTH_REQUEST());
        const req = {
            code,
            pin,
        };
        try {
            const res = await axios.post(API_BASE_URL + `auth/login`, req);
            const token = res.data.access_token; // Assuming the token is returned in the response data
            const username = code;

            setCookie(null, 'loggedIn', token, {
                maxAge: 1 * 24 * 60 * 60, // Cookie sẽ tồn tại trong 1 ngày
                path: '/', // Đường dẫn của cookie
            });
            setCookie(null, 'username', username, {
                maxAge: 1 * 24 * 60 * 60, // Cookie sẽ tồn tại trong 1 ngày
                path: '/', // Đường dẫn của cookie
            });

            dispatch(AUTH_SUCCESS(token, username));
        } catch (error) {
            dispatch(AUTH_ERROR());
        }
    };
};

export const AUTH_REQUEST = () => {

    return {

        type: LOGIN_REQUEST,

    };

};

export const AUTH_SUCCESS = (token, username) => {

    return {

        type: LOGIN_SUCCESS,
        token: token,
        username: username,

    };

};

export const AUTH_ERROR = () => {

    return {

        type: LOGIN_ERROR,

    };

};