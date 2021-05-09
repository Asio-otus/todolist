import {todolistAPI, ToDoListType} from "../../../api/todolist-api";
import {RequestStatusT, setAppStatus} from "../../application/bll/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerNetworkError} from "../../../utils/error-utils";

// Thunk
export const fetchToDoLists = createAsyncThunk('todolists/fetchToDoLists', async (param, {dispatch, rejectWithValue}) => {
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

export const createToDoList = createAsyncThunk('todolists/createToDoList', async (param: { title: string }, {dispatch, rejectWithValue}) => {
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

export const deleteToDoList = createAsyncThunk('todolists/deleteToDoList', async (param: { todolistId: string }, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeToDoListEntityStatus({todolistId: param.todolistId, status: 'loading'}))
    await todolistAPI.deleteTodolist(param.todolistId)
    dispatch(setAppStatus({status: 'succeeded'}))
    return {todolistId: param.todolistId}
})

export const updateToDoListTitle = createAsyncThunk('todolists/updateToDoListTitle', async (param: { todolistId: string, title: string }, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    await todolistAPI.updateTodolistTitle(param.todolistId, param.title)
    dispatch(setAppStatus({status: 'succeeded'}))
    return (param)
})

// Reducer
const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<ToDoListDomainT>,
    reducers: {
        changeToDoListFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeToDoListEntityStatus(state, action: PayloadAction<{ todolistId: string, status: RequestStatusT }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchToDoLists.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(createToDoList.fulfilled, (state, action) => {
            state.unshift({...action.payload.toDoList, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(deleteToDoList.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(updateToDoListTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        })
    }
})

// Reducer
export const todolistsReducer = slice.reducer

// Action
export const {
    changeToDoListFilter,
    changeToDoListEntityStatus,
} = slice.actions

// Types
export type ToDoListDomainT = ToDoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusT
}

export type FilterValuesType = 'all' | 'active' | 'completed'