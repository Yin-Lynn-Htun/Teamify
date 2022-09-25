import { configureStore } from '@reduxjs/toolkit'
import teamReducer from '../features/teamSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
    reducer: {
        team: teamReducer,
        auth: authReducer,
    },
})
