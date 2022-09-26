import teamReducer from '../features/teamSlice'
import authReducer from '../features/authSlice'
import playerReducer from '../features/playerSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    team: teamReducer,
    player: playerReducer,
    auth: authReducer,
})
