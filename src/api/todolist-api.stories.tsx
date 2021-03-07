import React, {useEffect, useState} from 'react'
import {TaskPriorities, TaskStatuses, todolistAPI} from "./todolist-api";

export default {
    title: 'API/Requests'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Last check'
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f89eefb0-9027-4f8f-a521-b43907f04db4';
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8ce1c07b-de2f-4837-952e-50fbb81c475f'
        const title = 'Check'
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

// Tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8ce1c07b-de2f-4837-952e-50fbb81c475f'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8ce1c07b-de2f-4837-952e-50fbb81c475f'
        const taskTitle = 'New Task'
        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '8ce1c07b-de2f-4837-952e-50fbb81c475f'
        const taskID = 'cdbf4d82-5848-4c78-94f1-a790d1f1d6a4'
        const newTaskModel = {
            title: 'Brand new task',
            description: '',
            status: TaskStatuses.New,
            priority: TaskPriorities.low,
            startDate: '',
            deadline: '',
        }
        todolistAPI.updateTask(todolistID, taskID, newTaskModel)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '8ce1c07b-de2f-4837-952e-50fbb81c475f'
        const taskID = '01ac2100-49ba-48e3-a2f1-1fcd7afcb80f'
        todolistAPI.deleteTask(todolistID, taskID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
