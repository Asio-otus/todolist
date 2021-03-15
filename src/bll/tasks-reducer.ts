import {addTodolistAC, removeTodoListAC, setToDoListsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

// Reducer
const initialState: TasksStateType = {}

export function tasksReducer(state: TasksStateType = initialState, action: ActionType): TasksStateType {
    switch (action.type) {
        case 'ADD_TASK':
            return {...state, [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]}

        case 'REMOVE_TASK':
            return {...state, [action.toDoListId]: state[action.toDoListId].filter(task => task.id !== action.taskId)}

        case 'UPDATE-TASK':
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId]
                    .map(task => task.id !== action.taskId ? task : {...task, ...action.model})
            }
        case 'ADD-TODOLIST':
            return {...state, [action.toDoList.id]: []}

        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }

        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case 'SET-TASKS':
            return {...state, [action.toDoListId]: action.tasks}

        default: return state
    }
}

// Action creators
export const addTaskAC = (title: string, newTask: TaskType) => ({type: 'ADD_TASK', title, newTask} as const)

export const removeTaskAC = (taskId: string, toDoListId: string) => ({type: 'REMOVE_TASK', taskId, toDoListId} as const)

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, toDoListId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, toDoListId} as const)

export const setTasksAc = (tasks: Array<TaskType>, toDoListId: string) =>
    ({type: 'SET-TASKS', tasks, toDoListId} as const)

// Thunk creators
export const fetchTasksTC = (toDoListId: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        todolistAPI.getTasks(toDoListId)
            .then((res) => {
                dispatch(setTasksAc(res.data.items, toDoListId))
            })
    }
}

export const addTaskTC = (title: string, toDoListId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.createTask(toDoListId, title)
        .then((res) => {
            dispatch(addTaskAC(title, res.data.data.item))
        })
}


export const deleteTaskTC = (taskId: string, toDoListId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTask(toDoListId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, toDoListId))
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        // This line needed in case the task is undefined
        if (!task) {
            throw new Error('Task not found in the state')
        }

        const APIModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistAPI.updateTask(todolistId, taskId, APIModel)
            .then(() => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }

// Types
export type ActionType = | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAc>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setToDoListsAC>


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}