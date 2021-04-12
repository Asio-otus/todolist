import {addToDoList, removeToDoList, setToDoLists} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import {RequestStatusType, setAppStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Reducer
const initialState: TasksStateType = {}


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{ taskId: string, toDoListId: string }>) {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTask(state, action: PayloadAction<{ newTask: TaskType }>) {
            state[action.payload.newTask.todoListId].unshift(action.payload.newTask)
        },
        updateTask(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTaskEntityStatus(state, action: PayloadAction<{ taskId: string, todolistId: string, status: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityStatus: action.payload.status}
            }
        },
        setTasks(state, action: PayloadAction<{ tasks: Array<TaskType>, toDoListId: string }>) {
            state[action.payload.toDoListId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToDoList, (state, action) => {
            state[action.payload.toDoList.id] = []
        })
        builder.addCase(removeToDoList, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(setToDoLists, (state, action) => {
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
    }
})


export const tasksReducer = slice.reducer

export const {addTask, removeTask, updateTask, setTaskEntityStatus, setTasks} = slice.actions

// Thunk creators
export const fetchTasks = (toDoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.getTasks(toDoListId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasks({tasks, toDoListId}))
                dispatch(setAppStatus({status: 'succeeded'}))
            })
    }
}

export const createTask = (title: string, toDoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.createTask(toDoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTask({newTask: task}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const deleteTask = (taskId: string, toDoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.deleteTask(toDoListId, taskId)
        .then(() => {
            dispatch(removeTask({taskId, toDoListId}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(setTaskEntityStatus({taskId, todolistId, status: 'loading'}))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            dispatch(setAppStatus({status: 'failed'}))
            dispatch(setTaskEntityStatus({taskId, todolistId, status: 'failed'}))
            throw new Error('Task not found in the state')
        }

        const APIModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }
        todolistAPI.updateTask(todolistId, taskId, APIModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTask({taskId, model, todolistId}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                    dispatch(setTaskEntityStatus({taskId, todolistId, status:'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

// Types

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