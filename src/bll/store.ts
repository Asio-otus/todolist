import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./reducers/todolists-reducer";
import {tasksReducer} from "./reducers/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./reducers/app-reducer";
import {authReducer} from "./reducers/auth-reducer";

// Redux
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// Types
export type AppRootStateType = ReturnType<typeof rootReducer>

// Utilities
// @ts-ignore
window.store = store;