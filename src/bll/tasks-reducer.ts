import {AddTodoListActionType, RemoveTodoListActionType, SetToDoListsActionType} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

export type AddTaskActionType = {
    type: 'ADD_TASK'
    toDoListId: string
    title: string
}

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    toDoListId: string
    taskId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    status: TaskStatuses
    toDoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    title: string
    toDoListId: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    toDoListId: string
}

export type ActionType = | AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetToDoListsActionType
    | SetTasksActionType


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
                todoListId: action.toDoListId,
                order: 0,
                addedDate: ''
            }
            return {
                ...state,
                [action.toDoListId]: [newTask, ...state[action.toDoListId]]
            }
        }
        case 'REMOVE_TASK':
            let copyState = {...state}
            copyState[action.toDoListId] = copyState[action.toDoListId].filter(task => task.id !== action.taskId)
            return copyState
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(task => task.id !== action.taskId
                    ? task
                    : {...task, status: action.status})

            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(task => task.id !== action.taskId
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
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            return {
                ...state,
                [action.toDoListId]: action.tasks
            }
        }
        default:
            return state
    }
}

export const addTaskAC = (title: string, toDoListId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, toDoListId}
}

export const removeTaskAC = (taskId: string, toDoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, toDoListId}
}

export const changeTaskStatusAC = (taskId: string, status: number, toDoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, status, toDoListId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, toDoListId: todolistId}
}

export const setTasksAc = (tasks: Array<TaskType>, toDoListId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, toDoListId}
}

// Thunk creators
export const fetchTasksTC = (toDoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(toDoListId)
            .then ((res) => {
                dispatch(setTasksAc(res.data.items, toDoListId))
            })
    }
}