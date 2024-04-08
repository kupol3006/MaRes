import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { setCookie } from 'nookies';

const initialState = {
    isLogin: false,
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({ code, pin }) => { // Sửa đổi tham số này thành một đối số duy nhất là một đối tượng
        try {
            const auth = {
                code: code,
                pin: pin
            };
            const res = await axios.post(API_BASE_URL + 'auth/login', auth);
            const token = res.data.access_token;

            setCookie(null, 'loggedIn', token, {
                maxAge: 1 * 24 * 60 * 60,
                path: '/',
            });
            setCookie(null, 'username', code, {
                maxAge: 1 * 24 * 60 * 60,
                path: '/',
            });
            return res.data;
        } catch (error) {
            throw error; // Sửa thành throw error để thông báo lỗi cho middleware Redux Toolkit
        }
    }
);

export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.value = false
            })
            .addCase(loginAsync.fulfilled, (state) => {
                state.value = true
            })
            .addCase(loginAsync.rejected, (state) => {
                state.value = false
            })
    },
})


export default loginSlice.reducer