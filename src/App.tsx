import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./components/_common/AddItemForm/AddItemForm";
import {
    addToDoListTC,
    changeTodolistFilterAC,
    changeToDoListTitleTC,
    deleteToDoListTC,
    fetchToDoListsTC,
    FilterValuesType,
    ToDoListDomainType
} from "./bll/todolists-reducer";
import {addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from "./bll/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {ToDoList} from "./components/ToDoList/ToDoList";
import {TaskStatuses} from "./api/todolist-api";
import {Container} from "./components/_layout/Container";
import {SuperEditableSpan} from "./archive/EditableSpanMy/SuperEditableSpan";

// Component
export function App() {
    console.log('App is called')

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

    const addTodoList = useCallback((title: string) => {
        dispatch(addToDoListTC(title))
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

    // Render
    return (
        <div>

            <div>
                <AddItemForm addItem={addTodoList} label={'New to do list'}/>
            </div>
            <Container>
                {
                    todolists.map(tl => {
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
                    })
                }
            </Container>
        </div>
    )
}