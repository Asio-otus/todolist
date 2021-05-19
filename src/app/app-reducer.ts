import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../api/todolist-api";
import {authActions} from "../feature/auth";

// Thunk
const initializeApp = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({value: true}))
    }
})

export const authAsyncActions = {
    initializeApp
}

// Slice
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusT }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

// Reducer
export const appReducer = appSlice.reducer

export const {setAppStatus, setAppError} = appSlice.actions

// Types
export type RequestStatusT = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusT,
    error: string | null
    isInitialized: boolean
}