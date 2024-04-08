import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { selectStaffId } from './staffSlice';

const initialState = {
    isChecking: false,
    result: []
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const token = parseCookies()['loggedIn'];
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const checkStatus = createAsyncThunk(
    'checkStatus/inOut',
    async ({ index, type }, thunkAPI) => { // Sửa đổi tham số này thành một đối số duy nhất là một đối tượng
        const staffId = selectStaffId(thunkAPI.getState()); // Sử dụng selector selectStaffId để lấy giá trị staffId
        console.log(staffId);
        try {
            const check = {
                staff_id: staffId[index],
                type: type,
            };
            const res = await axios.post(API_BASE_URL + 'work_day/staff', check);
            console.log(staffId);
            return res.data;
        } catch (error) {
            throw error; // Sửa thành throw error để thông báo lỗi cho middleware Redux Toolkit
        }
    }
);

export const checkStatusSlice = createSlice({
    name: 'checkStatus',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkStatus.pending, (state) => {
                state.isChecking = false
            })
            .addCase(checkStatus.fulfilled, (state, actions) => {
                state.isChecking = true
                state.result = actions.payload
            })
            .addCase(checkStatus.rejected, (state) => {
                state.isChecking = false
            })
    },
})

export default checkStatusSlice.reducer