import {v1} from "uuid";
import {todolistAPI, ToDoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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
////////////////////////// TYPES - END //////////////////////

const initialState: Array<ToDoListDomainType> = []

export function todolistsReducer(state: Array<ToDoListDomainType> = initialState, action: ActionType): Array<ToDoListDomainType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            }, ...state]
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

export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}

export const addTodolistAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
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
            .then((res) => {
                dispatch(setToDoListsAC(res.data))
            })
    }
}