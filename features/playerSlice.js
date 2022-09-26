import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    players: [],
    page: 2,
}

export const playerSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        setPlayers: (state, action) => {
            state.players = action.payload
        },
        addTeam: (state, action) => {
            // I need the id of the player and team object
            const item = state.players.find(
                (state) => state.id === action.payload.id
            )
            item.team = action.payload.team
        },
        removePlayerFromDeleteTeam: (state, action) => {
            console.log('removeing ')
            state.players.forEach((player) => {
                if (player.team?.id == action.payload) {
                    console.log('founded')
                    player.team = {}
                }
            })
        },
    },
})

export const { setPlayers, addTeam, setPage, removePlayerFromDeleteTeam } =
    playerSlice.actions

export default playerSlice.reducer
