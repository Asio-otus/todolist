import {TodolistT} from "../../../api/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusT} from "../../../app/app-reducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatus} from "../../../app/app-reducer";
import {todolistAPI} from "../../../api/todolist-api";
import {handleServerNetworkError} from "../../../utils/error-utils";

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchToDoLists', async (param, {dispatch, rejectWithValue}) => {
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

export const addTodolistTC = createAsyncThunk('todolists/createToDoList', async (param: { title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistAPI.createTodolist(param.title)
    try {
        dispatch(setAppStatus({status: 'succeeded'}))
        return {toDoList: res.data.data.item}
    }
    catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(error)
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/deleteToDoList', async (param: { todolistId: string }, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeToDoListEntityStatus({todolistId: param.todolistId, status: 'loading'}))
    await todolistAPI.deleteTodolist(param.todolistId)
    dispatch(setAppStatus({status: 'succeeded'}))
    return {todolistId: param.todolistId}
})

export const updateTodolistTitleTC = createAsyncThunk('todolists/updateToDoListTitle', async (param: { todolistId: string, title: string }, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    await todolistAPI.updateTodolistTitle(param.todolistId, param.title)
    dispatch(setAppStatus({status: 'succeeded'}))
    return (param)
})

export const todolistAsyncActions = {
    fetchTodolistsTC,
    addTodolistTC,
    removeTodolistTC,
    updateTodolistTitleTC
}

// Reducer
export const todolistSlice = createSlice({
    name: 'todolists',
    initialState: [] as Array<ToDoListDomainT>,
    reducers: {
        changeToDoListFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesT }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeToDoListEntityStatus(state, action: PayloadAction<{ todolistId: string, status: RequestStatusT }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.toDoList, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = todolistSlice.reducer


export const {
    changeToDoListFilter,
    changeToDoListEntityStatus,
} = todolistSlice.actions

// Types
export type ToDoListDomainT = TodolistT & {
    filter: FilterValuesT
    entityStatus: RequestStatusT
}

export type FilterValuesT = 'all' | 'active' | 'completed'