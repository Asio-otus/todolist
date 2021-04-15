import {combineReducers} from "redux";
import {todolistsReducer} from "./reducers/todolists-reducer";
import {tasksReducer} from "./reducers/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./reducers/app-reducer";
import {authReducer} from "./reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

// Redux
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

// Types
export type AppRootStateT = ReturnType<typeof rootReducer>
export type AppDispatchT = typeof store.dispatch

// Custom hooks
export const useAppDispatch = () => useDispatch<AppDispatchT>()

// Utilities
// @ts-ignore
window.store = store;