import axios from 'axios'
import {RequestStatusT} from "../app/app-reducer";

// Instance of axios
const instance = axios.create ({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'dd304e28-3d68-4d00-a172-a57bb7d47656'
    }
})

// TodolistAPI
export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistT>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseT<{item: TodolistT}>>('todo-lists', {title})
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseT>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseT>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksT>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseT<{item: TaskT}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelT) {
        return instance.put<ResponseT<{item: TaskT}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseT>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

// AuthAPI
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseT<{userId: number}>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseT<{userId: number}>>('auth/login')
    },
    me() {
        return instance.get<ResponseT<{id: number, email: string, login: string}>>('auth/me')
    }
}

// Types
export type TodolistT = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskT = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusT
}

export type UpdateTaskModelT = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type FieldErrorT = { field: string, error: string };
export type ResponseT<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorT>
    data: D
}

type ResponseTasksT = {
    totalCount: number
    error: string
    items: Array<TaskT>
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
