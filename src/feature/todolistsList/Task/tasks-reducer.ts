import {TaskPriorities, TaskStatuses, TaskT, todolistAPI, TodolistT, UpdateTaskModelT} from "../../../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusT, setAppStatus} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {AppRootStateT} from "../../../app/store";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "../Todolist/todolists-reducer";

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (toDoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistAPI.getTasks(toDoListId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return {tasks, toDoListId}
})

export const removeTaskTC = createAsyncThunk('tasks/deleteTask', async (param: { taskId: string, toDoListId: string }, thunkAPI) => {
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

export const addTaskTC = createAsyncThunk('tasks/createTask', async (param: { title: string, todolistId: string }, {
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

export const updateTaskTC = createAsyncThunk('tasks/updateTaskTC', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, {
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

    const APIModel: UpdateTaskModelT = {
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

export const tasksAsyncActions = {
    fetchTasksTC,
    removeTaskTC,
    addTaskTC,
    updateTaskTC
}

// Reducer
const initialState: TasksStateT = {}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTaskEntityStatus(state, action: PayloadAction<{ taskId: string, todolistId: string, status: RequestStatusT }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityStatus: action.payload.status}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.toDoList.id] = []
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todoLists.forEach((tl: TodolistT) => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.toDoListId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.toDoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.newTask.todoListId].unshift(action.payload.newTask)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

export const tasksReducer = tasksSlice.reducer

export const {
    setTaskEntityStatus,
} = tasksSlice.actions

// Types
export type TasksStateT = {
    [key: string]: Array<TaskT>
}

// Types
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}