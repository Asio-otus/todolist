import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import {todolistsReducer} from "../feature/todolistsList/Todolist/todolists-reducer";
import {tasksReducer} from "../feature/todolistsList/Task/tasks-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../feature/auth/auth-reducer";
import {useMemo} from "react";

// Store
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

export const useActions = <T extends ActionCreatorsMapObject<any>>(actions: T) => {
    const dispatch = useDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}

