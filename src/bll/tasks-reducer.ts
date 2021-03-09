import {AddTodoListActionType, RemoveTodoListActionType, SetToDoListsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    newTask: TaskType
}

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    toDoListId: string
    taskId: string
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    model: UpdateDomainTaskModelType
    toDoListId: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    toDoListId: string
}

export type ActionType = | AddTaskActionType
    | RemoveTaskActionType
    | UpdateTaskActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetToDoListsActionType
    | SetTasksActionType


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// Reducer
const initialState: TasksStateType = {}

export function tasksReducer(state: TasksStateType = initialState, action: ActionType): TasksStateType {
    switch (action.type) {
        case 'ADD_TASK': {
            return {
                ...state,
                [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]
            }
        }
        case 'REMOVE_TASK':
            let copyState = {...state}
            copyState[action.toDoListId] = copyState[action.toDoListId].filter(task => task.id !== action.taskId)
            return copyState
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(task => task.id !== action.taskId
                    ? task
                    : {...task, ...action.model})

            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.toDoList.id]: []
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

// Action creators
export const addTaskAC = (title: string, newTask: TaskType): AddTaskActionType => {
    return {type: 'ADD_TASK', title, newTask}
}

export const removeTaskAC = (taskId: string, toDoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, toDoListId}
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, toDoListId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', taskId, model, toDoListId}
}

export const setTasksAc = (tasks: Array<TaskType>, toDoListId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, toDoListId}
}

// Thunk creators
export const fetchTasksTC = (toDoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(toDoListId)
            .then((res) => {
                dispatch(setTasksAc(res.data.items, toDoListId))
            })
    }
}

export const addTaskTC = (title: string, toDoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(toDoListId, title)
            .then ((res) => {
                dispatch(addTaskAC(title, res.data.data.item))
            })
    }
}

export const deleteTaskTC = (taskId: string, toDoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(toDoListId, taskId)
            .then (() => {
                dispatch(removeTaskAC(taskId, toDoListId))
            })
    }
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        // This line needed in case the task is undefined
        if(!task) {
            throw new Error('Task not found in the state')
        }

        const APIModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistAPI.updateTask(todolistId, taskId, APIModel)
            .then (() => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }
}