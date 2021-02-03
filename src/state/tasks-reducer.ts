import {TasksStateType, TaskType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

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
    todolistID: string,
    taskID: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskID: string
    title: string
    todolistID: string
}

export type ActionType = | AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export function tasksReducer(state: TasksStateType, action: ActionType) {
    switch (action.type) {
        case 'ADD_TASK': {
            let task: TaskType = {id: action.todolistId, title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [task, ...state[action.todolistId]]
            }
        }
        case 'REMOVE_TASK':
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id !== action.taskID
                    ? task
                    : {...task, isDone: action.isDone})
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id !== action.taskID
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
    return {type: 'ADD_TASK', title: title, todolistId: todolistId}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId: taskId, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', todolistID: todolistID, taskID: taskID, isDone: isDone}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskID: taskID, title: title, todolistID: todolistID}
}

