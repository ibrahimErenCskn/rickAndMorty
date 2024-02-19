import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchEpisode: any = createAsyncThunk(
    'users/fetchByIdStatus',
    async () => {
        try {
            const response = await axios.get('https://rickandmortyapi.com/api/episode');
            return response.data
        }
        catch (err) {
            console.log(err);
        }
    },
)

interface UsersState {
    episodeData: any
    episodeLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    episodeData: [],
    episodeLoading: 'idle',
} as UsersState

// Then, handle actions in your reducers:
const fetchingApi = createSlice({
    name: 'fetching',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisode.pending, (state) => {
                state.episodeLoading = 'pending'
            })
            .addCase(fetchEpisode.fulfilled, (state, action) => {
                state.episodeLoading = 'succeeded'
                state.episodeData = action.payload
            })
            .addCase(fetchEpisode.rejected, (state) => {
                state.episodeLoading = 'failed'
            })
    },
})
export const { } = fetchingApi.actions

export default fetchingApi.reducer