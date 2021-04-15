import {addToDoList, removeToDoList, setToDoLists} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateT} from "../store";
import {RequestStatusType, setAppStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (toDoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistAPI.getTasks(toDoListId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return {tasks, toDoListId}
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (param: { taskId: string, toDoListId: string }, thunkAPI) => {
    // thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    await todolistAPI.deleteTask(param.toDoListId, param.taskId)
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return {taskId: param.taskId, toDoListId: param.toDoListId}
    // .catch((error) => {
    //     handleServerNetworkError(error, thunkAPI.dispatch)
    // })
})

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

export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateT) => {
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
                    dispatch(setTaskEntityStatus({taskId, todolistId, status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

// Reducer
const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
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
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.toDoListId] = action.payload.tasks
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
    }
})


export const tasksReducer = slice.reducer

// Actions
export const {addTask, updateTask, setTaskEntityStatus} = slice.actions


// Thunk creators
// export const createTask = (title: string, toDoListId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatus({status: 'loading'}))
//     todolistAPI.createTask(toDoListId, title)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 const task = res.data.data.item
//                 dispatch(addTask({newTask: task}))
//                 dispatch(setAppStatus({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
//
// export const deleteTask = (taskId: string, toDoListId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatus({status: 'loading'}))
//     todolistAPI.deleteTask(toDoListId, taskId)
//         .then(() => {
//             dispatch(removeTask({taskId, toDoListId}))
//             dispatch(setAppStatus({status: 'succeeded'}))
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
//
// export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         dispatch(setAppStatus({status: 'loading'}))
//         dispatch(setTaskEntityStatus({taskId, todolistId, status: 'loading'}))
//         const state = getState()
//         const task = state.tasks[todolistId].find(t => t.id === taskId)
//
//         if (!task) {
//             dispatch(setAppStatus({status: 'failed'}))
//             dispatch(setTaskEntityStatus({taskId, todolistId, status: 'failed'}))
//             throw new Error('Task not found in the state')
//         }
//
//         const APIModel: UpdateTaskModelType = {
//             title: task.title,
//             description: task.description,
//             status: task.status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             ...model
//         }
//         todolistAPI.updateTask(todolistId, taskId, APIModel)
//             .then(res => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(updateTask({taskId, model, todolistId}))
//                     dispatch(setAppStatus({status: 'succeeded'}))
//                     dispatch(setTaskEntityStatus({taskId, todolistId, status: 'succeeded'}))
//                 } else {
//                     handleServerAppError(res.data, dispatch)
//                 }
//             })
//             .catch((error) => {
//                 handleServerNetworkError(error, dispatch)
//             })
//     }

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