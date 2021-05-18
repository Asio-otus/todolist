import {todolistAsyncActions, todolistSlice} from './Todolist/todolists-reducer'
import {tasksAsyncActions, tasksSlice} from "./Task/tasks-reducer";

const todolistsActions = {
    ...todolistAsyncActions,
    ...todolistSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}


export {
    tasksActions,
    todolistsActions
}