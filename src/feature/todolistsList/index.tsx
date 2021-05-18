import {todolistAsyncActions, todolistSlice} from './Todolist/todolists-reducer'
import {tasksAsyncActions, tasksSlice} from './Task/tasks-reducer'
import * as todolistsSelectors from './Todolist/todolist-selectors'
import * as taskSelectors from './Task/tasks-selectors'

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
    todolistsActions,
    todolistsSelectors,
    taskSelectors
}