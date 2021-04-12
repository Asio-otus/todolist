import {Dispatch} from "redux";
import {authAPI} from "../../api/todolist-api";
import {setIsLoggedIn} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppInitialized(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

// Reducer
export const appReducer = slice.reducer

// Actions
export const {setAppStatus, setAppError, setAppInitialized} = slice.actions

// Thunk creators
export const initializeApp = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}))
        }
        dispatch(setAppInitialized({isInitialized: true}))
    })
}

// Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType,
    error: string | null
    isInitialized: boolean
}