import { configureStore } from '@reduxjs/toolkit'
import staffReducer from './slices/staffSlice.js'
import checkReducer from './slices/checkSlice.js'

export const store = configureStore({
    reducer: {
        staff: staffReducer,
        check: checkReducer,
    },
})