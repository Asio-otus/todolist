import {combineReducers} from "redux";
import {todolistsReducer} from "../feature/todolist/bll/todolists-reducer";
import {tasksReducer} from "../feature/todolist/bll/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "../feature/application/bll/app-reducer";
import {authReducer} from "../feature/auth/bll/auth-reducer";
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

