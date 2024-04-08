import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const initialState = {
    listStaff: [],
    isLoading: false,
    isError: false,
    staffId: [],
    isChecking: false,
    result: []
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const token = parseCookies()['loggedIn'];
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const getStaff = createAsyncThunk(
    'staff/fetchStaff',
    async () => {
        try {
            const res = await axios.get(API_BASE_URL + 'work_day/staff');
            const data = res.data.data;
            return data;
        } catch (error) {
            throw error; // Sửa thành throw error để thông báo lỗi cho middleware Redux Toolkit
        }
    }
);

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStaff.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(getStaff.fulfilled, (state, actions) => {
                state.isError = false
                state.isLoading = false
                state.listStaff = actions.payload
                state.staffId = actions.payload.map((item) => item.staff_id);
            })
            .addCase(getStaff.rejected, (state) => {
                state.isError = true
                state.isLoading = false
            })
    },
})

export const selectStaffId = (state) => state.staff.staffId;

export default staffSlice.reducer
