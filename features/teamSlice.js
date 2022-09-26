import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    teams: [],
    allTeams: [],
    allTeamNames: [],
    page: 2,
    isHasMore: true,
}

export const fetchAllTeams = createAsyncThunk(
    'team/fetchAllTeams',
    async () => {
        const response = await fetch('https://www.balldontlie.io/api/v1/teams')
        if (response.ok) {
            const data = await response.json()
            return data.data
        }
        return []
    }
)

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setStopHasMore: (state) => {
            state.isHasMore = false
        },
        setTeamPage: (state, action) => {
            state.page = action.payload
        },
        setTeams: (state, action) => {
            state.teams = action.payload
        },
        createTeam: (state, action) => {
            state.teams = [action.payload, ...state.teams]
            state.allTeams = [action.payload, ...state.allTeams]
            state.allTeamNames = [action.payload.name, ...state.allTeamNames]
        },
        deleteTeam: (state, action) => {
            state.teams = state.teams.filter(
                (team) => team.id !== action.payload
            )
        },
        updateTeam: (state, action) => {
            const item = state.teams.find(
                (state) => state.id === action.payload.id
            )
            item.name = action.payload.team.name
            item.full_name = action.payload.team.full_name
            item.city = action.payload.team.city
            item.division = action.payload.team.division
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllTeams.fulfilled, (state, action) => {
            state.allTeams = action.payload
            state.allTeamNames = action.payload.map((team) => team.name)
        })
    },
})

// Action creators are generated for each case reducer function
export const {
    setTeams,
    createTeam,
    deleteTeam,
    updateTeam,
    setTeamPage,
    setStopHasMore,
} = teamSlice.actions

export default teamSlice.reducer
