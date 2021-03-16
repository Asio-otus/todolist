import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./reducers/todolists-reducer";
import {tasksReducer} from "./reducers/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./reducers/app-reducer";

// Redux
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// Types
export type AppRootStateType = ReturnType<typeof rootReducer>

// Utilities
// @ts-ignore
window.store = store;