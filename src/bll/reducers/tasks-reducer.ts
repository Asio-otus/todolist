import {addToDoList, removeToDoList, setToDoLists} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import {setAppError, setAppStatus, SetAppErrorActionType, SetAppStatusActionType} from "./app-reducer";

// Reducer
const initialState: TasksStateType = {}

export function tasksReducer(state: TasksStateType = initialState, action: ActionType): TasksStateType {
    switch (action.type) {
        case 'ADD_TASK':
            return {...state, [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]}

        case 'REMOVE_TASK':
            return {...state, [action.toDoListId]: state[action.toDoListId].filter(task => task.id !== action.taskId)}

        case 'UPDATE-TASK':
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId]
                    .map(task => task.id !== action.taskId ? task : {...task, ...action.model})
            }

        case 'ADD-TODOLIST':
            return {...state, [action.toDoList.id]: []}

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

        case 'SET-TASKS':
            return {...state, [action.toDoListId]: action.tasks}

        default:
            return state
    }
}

// Action creators
export const addTask = (title: string, newTask: TaskType) => ({type: 'ADD_TASK', title, newTask} as const)

export const removeTask = (taskId: string, toDoListId: string) => ({type: 'REMOVE_TASK', taskId, toDoListId} as const)

export const updateTask = (taskId: string, model: UpdateDomainTaskModelType, toDoListId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, toDoListId} as const)

export const setTasks = (tasks: Array<TaskType>, toDoListId: string) =>
    ({type: 'SET-TASKS', tasks, toDoListId} as const)

// Thunk creators
export const fetchTasks = (toDoListId: string) => {
    return (dispatch: Dispatch<ActionType | SetAppStatusActionType>) => {
        dispatch(setAppStatus('loading'))
        todolistAPI.getTasks(toDoListId)
            .then((res) => {
                dispatch(setTasks(res.data.items, toDoListId))
                dispatch(setAppStatus('succeeded'))
            })
    }
}

export const createTask = (title: string, toDoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTask(toDoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTask(title, res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                // Checks if there is an error message from the server, then dispatches the message.
                if (res.data.messages.length) {
                    dispatch(setAppError(res.data.messages[0]))
                } else {
                    dispatch(setAppError('Sorry. Undefined error occurred!'))
                }
            }
            dispatch(setAppStatus('failed'))
        })
}

export const deleteTask = (taskId: string, toDoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.deleteTask(toDoListId, taskId)
        .then(() => {
            dispatch(removeTask(taskId, toDoListId))
            dispatch(setAppStatus('succeeded'))
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatus('loading'))

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            dispatch(setAppStatus('failed'))
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
            .then(() => {
                dispatch(updateTask(taskId, domainModel, todolistId))
                dispatch(setAppStatus('succeeded'))
            })
    }

// Types
export type ActionType = ReturnType<typeof addTask>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof addToDoList>
    | ReturnType<typeof removeToDoList>
    | ReturnType<typeof setToDoLists>


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}