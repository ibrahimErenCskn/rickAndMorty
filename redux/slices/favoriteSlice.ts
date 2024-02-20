import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface AddDataProps {
    value: any
}

export const addData: any = createAsyncThunk(
    'users/addData',
    async ({ value }: AddDataProps) => {
        try {
            const key = "favoriteC";
            const jsonData: any = await AsyncStorage.getItem(key);
            const mevcutDizi = JSON.parse(jsonData) || [];
            if (mevcutDizi.length > 9) {
                return 'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.'
            }
            else {
                const check = mevcutDizi.filter((v: any, i: number) => {
                    return value.id == v.id
                })
                if (check.length !== 0) {
                    return 'Zaten Favorilere Eklenmiş'
                }
                else {
                    const yeniDizi = [...mevcutDizi, value];
                    await AsyncStorage.setItem(key, JSON.stringify(yeniDizi));
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    },
)
export const readData: any = createAsyncThunk(
    'users/readData',
    async () => {
        try {
            const mevcutVerilerJson = await AsyncStorage.getItem('favoriteC');
            if (mevcutVerilerJson !== null) {
                const mevcutDizi = JSON.parse(mevcutVerilerJson) || [];
                return mevcutDizi
            } else {
                console.log('data mevcut değil')
            }
        } catch (error) {
            console.log(error);
        }
    },
)
export const deleteData: any = createAsyncThunk(
    'users/deleteData',
    async ({ value }: AddDataProps) => {
        try {
            const key = "favoriteC";
            const jsonData: any = await AsyncStorage.getItem(key);
            const mevcutDizi = JSON.parse(jsonData) || [];

            mevcutDizi.filter((v: any, i: number) => {
                if (value.id == v.id) {
                    mevcutDizi.splice(i, 1)
                }
            })
            await AsyncStorage.setItem(key, JSON.stringify(mevcutDizi));
            return mevcutDizi
        }
        catch (e) {
            console.log(e)
        }
    },
)

interface UsersState {
    notification: string
    data: any
    isLoading: boolean
}

const initialState = {
    notification: '',
    data: null,
    isLoading: true
} as UsersState

const favoriteAdd = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setNotificationData: (state, action) => {
            state.notification = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addData.fulfilled, (state, action) => {
                state.notification = action.payload
                state.isLoading = false
            })
            .addCase(addData.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(readData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(readData.fulfilled, (state, action) => {
                state.data = action.payload
                state.isLoading = false
            })
            .addCase(readData.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(deleteData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.data = action.payload
                state.isLoading = false
            })
            .addCase(deleteData.rejected, (state) => {
                state.isLoading = false
            })
    },
})
export const { setNotificationData } = favoriteAdd.actions

export default favoriteAdd.reducer