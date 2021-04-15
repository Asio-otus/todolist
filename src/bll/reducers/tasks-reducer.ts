import {createToDoList, deleteToDoList, fetchToDoLists} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
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
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        await todolistAPI.deleteTask(param.toDoListId, param.taskId)
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {taskId: param.taskId, toDoListId: param.toDoListId}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(error)
    }
})

export const createTask = createAsyncThunk('tasks/createTask', async (param: { title: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistAPI.createTask(param.todolistId, param.title)

    try {
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatus({status: 'succeeded'}))
            return {newTask: task}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }

})

export const updateTask = createAsyncThunk('tasks/updateTaskTC', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(setTaskEntityStatus({taskId: param.taskId, todolistId: param.todolistId, status: 'loading'}))

    const state = getState() as AppRootStateT
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)

    if (!task) {
        dispatch(setAppStatus({status: 'failed'}))
        dispatch(setTaskEntityStatus({taskId: param.taskId, todolistId: param.todolistId, status: 'failed'}))
        throw new Error('Task not found in the state')
    }

    const APIModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.model
    }

    const res = await todolistAPI.updateTask(param.todolistId, param.taskId, APIModel)

    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setTaskEntityStatus({taskId: param.taskId, todolistId: param.todolistId, status: 'succeeded'}))
            return param
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }

    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

// Reducer
const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTaskEntityStatus(state, action: PayloadAction<{ taskId: string, todolistId: string, status: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityStatus: action.payload.status}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createToDoList.fulfilled, (state, action) => {
            state[action.payload.toDoList.id] = []
        })
        builder.addCase(deleteToDoList.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(fetchToDoLists.fulfilled, (state, action) => {
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
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.newTask.todoListId].unshift(action.payload.newTask)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

// Reducer
export const tasksReducer = slice.reducer

// Actions
export const {setTaskEntityStatus} = slice.actions


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