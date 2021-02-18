import {AddTodoListActionType, RemoveTodoListActionType, todoListID1, todoListID2} from "./todolists-reducer";
import {v1} from "uuid";

export type AddTaskActionType = {
    type: 'ADD_TASK'
    todolistId: string
    title: string
}

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    isDone: boolean
    todolistId: string


}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    title: string
    todolistId: string
}

export type ActionType = | AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {
    [todoListID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'Java Script', isDone: true},
        {id: v1(), title: 'Some shit', isDone: false},
        {id: v1(), title: 'Another shit', isDone: false},
    ],
    [todoListID2]: [
        {id: v1(), title: 'Phone', isDone: false},
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Monitor', isDone: false},
        {id: v1(), title: 'Coffee', isDone: true},
    ]
}

export function tasksReducer(state: TasksStateType = initialState, action: ActionType): TasksStateType {
    switch (action.type) {
        case 'ADD_TASK': {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }
        case 'REMOVE_TASK':
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id !== action.taskId
                    ? task
                    : {...task, isDone: action.isDone})

            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id !== action.taskId
                    ? task
                    : {...task, title: action.title})
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default:
            return state
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todolistId}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todolistId}
}

