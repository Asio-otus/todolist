import {todolistAPI, ToDoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

// Reducer
const initialState: Array<ToDoListDomainType> = []

export function todolistsReducer(state: Array<ToDoListDomainType> = initialState, action: ActionType): Array<ToDoListDomainType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)

        case 'ADD-TODOLIST':
            return [{...action.toDoList, filter: 'all'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => (tl.id === action.todolistId) ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => (tl.id === action.todolistId) ? {...tl, filter: action.filter} : tl)

        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))

        default: return state
    }
}

// Action creators
export const removeTodoListAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)

export const addTodolistAC = (toDoList: ToDoListType) => ({type: 'ADD-TODOLIST', toDoList} as const)

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const)

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const)

export const setToDoListsAC = (todoLists: Array<ToDoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)

// Thunk creators
export const fetchToDoListsTC = () => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setToDoListsAC(res.data))
        })
}


export const addToDoListTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}


export const deleteToDoListTC = (toDoListId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTodolist(toDoListId)
        .then(() => {
            dispatch(removeTodoListAC(toDoListId))
        })
}

export const changeToDoListTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

// Types
type ActionType =
    ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setToDoListsAC>

export type ToDoListDomainType = ToDoListType & {
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'