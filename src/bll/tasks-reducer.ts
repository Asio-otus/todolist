import {AddTodoListActionType, RemoveTodoListActionType, SetToDoListsActionType} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

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
    status: TaskStatuses
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
    | SetToDoListsActionType


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
////////////////////////// TYPES - END //////////////////////

const initialState: TasksStateType = {}

export function tasksReducer(state: TasksStateType = initialState, action: ActionType): TasksStateType {
    switch (action.type) {
        case 'ADD_TASK': {
            let newTask: TaskType = {
                description: '',
                title: action.title,
                status: TaskStatuses.New,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: action.todolistId,
                order: 0,
                addedDate: ''
            }
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
                    : {...task, status: action.status})

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
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
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

export const changeTaskStatusAC = (taskId: string, status: number, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, status, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todolistId}
}


