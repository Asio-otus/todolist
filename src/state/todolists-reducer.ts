import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export function todoListsReducer(state: Array<TodolistType>, action: ActionType) {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => (tl.id === action.id) ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => (tl.id === action.id) ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}