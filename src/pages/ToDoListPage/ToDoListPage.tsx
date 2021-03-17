import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {
    changeToDoListFilter,
    createToDoList,
    deleteToDoList,
    fetchToDoLists,
    FilterValuesType,
    ToDoListDomainType,
    updateToDoListTitle
} from "../../bll/reducers/todolists-reducer";
import {createTask, deleteTask, TasksStateType, updateTaskTC} from "../../bll/reducers/tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todolist-api";
import {ToDoList} from "../../components/ToDoList/ToDoList";
import {AddItemForm} from "../../components/_common/AddItemForm/AddItemForm";
import styled from "styled-components";
import {Container} from "../../components/_layout/Container";
import {Redirect} from "react-router-dom";

export const ToDoListPage: React.FC<PropsType> = ({demoMode = false}) => {

    // Connect
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<ToDoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    // Side effects
    useEffect(() => {
        if (!demoMode || !isLoggedIn) {
            dispatch(fetchToDoLists())
        }
    }, [])

    // Callbacks
    const addTodoList = useCallback((title: string) => {
        dispatch(createToDoList(title))
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTask(title, todolistId))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, [])

    const removeTask = useCallback((taskId: string, toDoListId: string) => {
        dispatch(deleteTask(taskId, toDoListId))
    }, [])

    const removeToDoList = useCallback((todolistId: string) => {
        dispatch(deleteToDoList(todolistId))
    }, [])

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeToDoListFilter(todolistId, filter))
    }, [])

    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title}, todolistId))
    }, [])

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(updateToDoListTitle(todoListId, title))
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <ItemFormContainer>
                <ItemFormWrapper>
                    <AddItemForm addItem={addTodoList} label={'Add to do list'}/>
                </ItemFormWrapper>
            </ItemFormContainer>
            <Container>
                {todolists.map(tl => {
                    let tasksForTodoList = tasks[tl.id]
                    return (
                        <ToDoList
                            demoMode={demoMode}
                            key={tl.id}
                            todolist={tl}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeToDoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })}
            </Container>
        </>
    )
}


// Styled components
const ItemFormContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 30px;

  width: 100vw;
  height: 100px;

  background-color: ${({theme}) => theme.color.lightGray};
  box-shadow: ${({theme}) => theme.effect.shadow};
`

const ItemFormWrapper = styled.div`
  width: 30%;
  min-width: 300px;
`

// Type
type PropsType = {
    demoMode?: boolean
}