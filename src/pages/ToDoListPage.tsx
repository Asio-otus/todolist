import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {
    changeTodolistFilterAC, changeToDoListTitleTC,
    deleteToDoListTC,
    fetchToDoListsTC,
    FilterValuesType,
    ToDoListDomainType
} from "../bll/todolists-reducer";
import {addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from "../bll/tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../api/todolist-api";
import {ToDoList} from "../components/ToDoList/ToDoList";

export const ToDoListPage = () => {

    // Connect
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<ToDoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    // Side effects
    useEffect(() => {
        dispatch(fetchToDoListsTC())
    }, [])

    // Callbacks
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, [])

    const deleteTask = useCallback((taskId: string, toDoListId: string) => {
        dispatch(deleteTaskTC(taskId, toDoListId))
    }, [])

    const deleteToDoList = useCallback((todolistId: string) => {
        dispatch(deleteToDoListTC(todolistId))
    }, [])

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])

    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title}, todolistId))
    }, [])

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeToDoListTitleTC(todoListId, title))
    }, [])

    return (
        <>
            {todolists.map(tl => {
                let tasksForTodoList = tasks[tl.id]
                return (
                    <ToDoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodoList}
                        removeTask={deleteTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={deleteToDoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                )
            })}
        </>
    )
}