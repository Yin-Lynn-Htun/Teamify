import { configureStore } from '@reduxjs/toolkit'
import teamReducer from '../features/teamSlice'
import authReducer from '../features/authSlice'
import playerReducer from '../features/playerSlice'

export const store = configureStore({
    reducer: {
        team: teamReducer,
        player: playerReducer,
        auth: authReducer,
    },
})
