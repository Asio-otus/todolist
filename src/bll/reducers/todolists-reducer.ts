import {todolistAPI, ToDoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Reducer
const initialState: Array<ToDoListDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeToDoList(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addToDoList(state, action: PayloadAction<{ toDoList: ToDoListType }>) {
            state.unshift({...action.payload.toDoList, filter: 'all', entityStatus: 'idle'})
        },
        changeToDoListTitle(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeToDoListFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.filter
        },
        changeToDoListEntityStatus(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
        setToDoLists(state, action: PayloadAction<{ todoLists: Array<ToDoListType> }>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    }
})

// Reducer
export const todolistsReducer = slice.reducer

// Action creators
export const {
    removeToDoList,
    addToDoList,
    changeToDoListTitle,
    changeToDoListFilter,
    changeToDoListEntityStatus,
    setToDoLists
} = slice.actions

// Thunk creators
export const fetchToDoLists = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setToDoLists({todoLists: res.data}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}

export const createToDoList = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addToDoList({toDoList: res.data.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}

export const deleteToDoList = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeToDoListEntityStatus({todolistId, status: 'loading'}))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeToDoList({todolistId}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}

export const updateToDoListTitle = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then(() => {
            dispatch(changeToDoListTitle({todolistId, title}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}

// Types
type ActionType =
    ReturnType<typeof removeToDoList>
    | ReturnType<typeof addToDoList>
    | ReturnType<typeof changeToDoListTitle>
    | ReturnType<typeof changeToDoListFilter>
    | ReturnType<typeof setToDoLists>
    | ReturnType<typeof changeToDoListEntityStatus>

export type ToDoListDomainType = ToDoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type FilterValuesType = 'all' | 'active' | 'completed'