import {Dispatch} from "redux";
import {authAPI} from "../../api/todolist-api";
import {setIsLoggedIn} from "./auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

// Reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-STATUS':
            return {...state, status: action.status}

        case 'app/SET-ERROR':
            return {...state, error: action.error}

        case 'app/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}

        default:
            return state
    }
}

// Action creators
export const setAppStatus = (status: RequestStatusType) => ({type: 'app/SET-STATUS', status} as const)

export const setAppError = (error: string | null) => ({type: 'app/SET-ERROR', error} as const)

export const setAppInitialized = (isInitialized: boolean) => ({type: 'app/SET-INITIALIZED', isInitialized} as const)

// Thunk creators
export const initializeApp = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
        }
        dispatch(setAppInitialized(true))
    })
}

// Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType,
    error: string | null
    isInitialized: boolean
}
export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitialized>

type ActionsType = SetAppStatusActionType | SetAppErrorActionType | SetAppInitializedActionType