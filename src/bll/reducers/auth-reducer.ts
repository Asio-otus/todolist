import {Dispatch} from "redux";
import {setAppStatus} from "./app-reducer";
import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from "axios";

// Thunk creators
export const login = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>('auth/login', async (data: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await authAPI.login(data)

    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error: AxiosError = err; // You can't type inside catch round brackets.
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logout = createAsyncThunk('auth/login', async (param, thunkAPI) => {

    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedIn({value: false}))
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})

// Initial state
const initialState = {
    isLoggedIn: false
}

// Slice
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

// Reducer
export const authReducer = slice.reducer

// Actions
export const {setIsLoggedIn} = slice.actions

// Thunk creators
export const _logout = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: false}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}