import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchEpisode: any = createAsyncThunk(
    'users/fetchEpisode',
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

interface fetchCharactersProps {
    id: number
}

export const fetchCharacters: any = createAsyncThunk(
    'users/fetchCharacters',
    async ({ id }: fetchCharactersProps, { dispatch }) => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
            dispatch(setlength(response.data?.characters.length))
            dispatch(restartData())
            response.data?.characters.map(async (v: string) => {
                let responseCharacters = await axios.get(v);
                dispatch(setData(responseCharacters.data))
            })
        }
        catch (err) {
            console.log(err);
        }
    },
)

interface UsersState {
    episodeData: any
    episodeLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
    charactersData: any
    charactersLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
    charactersLength: number
}

const initialState = {
    episodeData: [],
    episodeLoading: 'idle',
    charactersData: [],
    charactersLength: 1,
    charactersLoading: 'idle'
} as UsersState

const fetchingApi = createSlice({
    name: 'fetching',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.charactersData.push(action.payload)
        },
        restartData: (state) => {
            state.charactersData = []
        },
        setlength: (state, action) => {
            state.charactersLength = action.payload
        }
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
            .addCase(fetchCharacters.pending, (state) => {
                state.charactersLoading = 'pending'
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.charactersLoading = 'succeeded'
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.charactersLoading = 'failed'
            })
    },
})
export const { setData, setlength, restartData } = fetchingApi.actions

export default fetchingApi.reducer