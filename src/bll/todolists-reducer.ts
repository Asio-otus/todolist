import {todolistAPI, ToDoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    toDoList: ToDoListType
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    filter: FilterValuesType
}

export type SetToDoListsActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<ToDoListType>
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetToDoListsActionType

export type ToDoListDomainType = ToDoListType & {
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

// Reducer
const initialState: Array<ToDoListDomainType> = []

export function todolistsReducer(state: Array<ToDoListDomainType> = initialState, action: ActionType): Array<ToDoListDomainType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newToDoList: ToDoListDomainType = {
                ...action.toDoList,
                filter: 'all'
            }
            return [newToDoList, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => (tl.id === action.todolistId) ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => (tl.id === action.todolistId) ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }
        default:
            return state
    }
}

// Action creators
export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}

export const addTodolistAC = (toDoList: ToDoListType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', toDoList}
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title}
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter}
}

export const setToDoListsAC = (todoLists: Array<ToDoListType>): SetToDoListsActionType => {
    return {type: 'SET-TODOLISTS', todoLists}
}

// Thunk creators
export const fetchToDoListsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setToDoListsAC(res.data))
            })
    }
}

export const addToDoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const deleteToDoListTC = (toDoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(toDoListId)
            .then(() => {
                dispatch(removeTodoListAC(toDoListId))
            })
    }
}

export const changeToDoListTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}