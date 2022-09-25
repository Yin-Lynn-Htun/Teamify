import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    isLogin: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true
            state.user = action.payload.user
        },
        logout: (state) => {
            state.user = {}
            state.isLogin = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer
