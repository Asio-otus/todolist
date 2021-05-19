import {TodolistT} from "../../../api/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusT} from "../../../app/app-reducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatus} from "../../../app/app-reducer";
import {todolistAPI} from "../../../api/todolist-api";
import {handleServerNetworkError} from "../../../utils/error-utils";

// Thunks
const fetchTodolists = createAsyncThunk('todolists/fetchToDoLists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistAPI.getTodolists()
    try {
        dispatch(setAppStatus({status: 'succeeded'}))
        return {todoLists: res.data}
    }
    catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(error)
    }
})

const addTodolist = createAsyncThunk('todolists/createToDoList', async (title:string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistAPI.createTodolist(title)
    try {
        dispatch(setAppStatus({status: 'succeeded'}))
        return {toDoList: res.data.data.item}
    }
    catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(error)
    }
})

const removeTodolist = createAsyncThunk('todolists/deleteToDoList', async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeToDoListEntityStatus({todolistId, status: 'loading'}))
    await todolistAPI.deleteTodolist(todolistId)
    dispatch(setAppStatus({status: 'succeeded'}))
    return {todolistId}
})

const updateTodolistTitle = createAsyncThunk('todolists/updateToDoListTitle', async (param: { todolistId: string, title: string }, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    await todolistAPI.updateTodolistTitle(param.todolistId, param.title)
    dispatch(setAppStatus({status: 'succeeded'}))
    return (param)
})

export const todolistAsyncActions = {
    fetchTodolists,
    addTodolist,
    removeTodolist,
    updateTodolistTitle
}

// Slice
export const todolistSlice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainT>,
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ todolistId: string, filter: TodolistFilterValuesT }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeToDoListEntityStatus(state, action: PayloadAction<{ todolistId: string, status: RequestStatusT }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.toDoList, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(updateTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = todolistSlice.reducer

// Actions
export const {
    changeTodolistFilter,
    changeToDoListEntityStatus,
} = todolistSlice.actions

// Types
export type TodolistDomainT = TodolistT & {
    filter: TodolistFilterValuesT
    entityStatus: RequestStatusT
}

export type TodolistFilterValuesT = 'all' | 'active' | 'completed'