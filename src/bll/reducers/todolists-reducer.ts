import {todolistAPI, ToDoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus} from "./app-reducer";

// Reducer
const initialState: Array<ToDoListDomainType> = []

export function todolistsReducer(state: Array<ToDoListDomainType> = initialState, action: ActionType): Array<ToDoListDomainType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)

        case 'ADD-TODOLIST':
            return [{...action.toDoList, filter: 'all', entityStatus: 'idle'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => (tl.id === action.todolistId) ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => (tl.id === action.todolistId) ? {...tl, filter: action.filter} : tl)

        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => (tl.id === action.todolistId) ? {...tl, entityStatus: action.status} : tl)

        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        default: return state
    }
}

// Action creators
export const removeToDoList = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)

export const addToDoList = (toDoList: ToDoListType) => ({type: 'ADD-TODOLIST', toDoList} as const)

export const changeToDoListTitle = (todolistId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const)

export const changeToDoListFilter = (todolistId: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const)

export const changeToDoListEntityStatus = (todolistId: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, status} as const)

export const setToDoLists = (todoLists: Array<ToDoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)

// Thunk creators
export const fetchToDoLists = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setToDoLists(res.data))
            dispatch(setAppStatus('succeeded'))
        })
}

export const createToDoList = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addToDoList(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
        })
}

export const deleteToDoList = (toDoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeToDoListEntityStatus(toDoListId,'loading'))
    todolistAPI.deleteTodolist(toDoListId)
        .then(() => {
            dispatch(removeToDoList(toDoListId))
            dispatch(setAppStatus('succeeded'))
        })
}

export const updateToDoListTitle = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then(() => {
            dispatch(changeToDoListTitle(todolistId, title))
            dispatch(setAppStatus('succeeded'))
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