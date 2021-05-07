import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../bll/store";
import {
    changeToDoListFilter,
    createToDoList,
    deleteToDoList,
    fetchToDoLists,
    FilterValuesType,
    ToDoListDomainT,
    updateToDoListTitle
} from "../../bll/reducers/todolists-reducer";
import {createTask, deleteTask, TasksStateType, updateTask} from "../../bll/reducers/tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todolist-api";
import {ToDoList} from "../../components/ToDoList/ToDoList";
import {AddItemForm} from "../../components/_common/AddItemForm/AddItemForm";
import styled from "styled-components";
import {Container} from "../../components/_layout/Container";
import {Redirect} from "react-router-dom";

export const ToDoListPage: React.FC<PropsT> = ({demoMode = false}) => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateT, Array<ToDoListDomainT>>(state => state.todolists)
    const tasks = useSelector<AppRootStateT, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateT, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!demoMode || !isLoggedIn) {
            dispatch(fetchToDoLists())
        }
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(createToDoList({title}))
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTask({title, todolistId}))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTask({taskId, model: {status}, todolistId}))
    }, [])

    const removeTask = useCallback((taskId: string, toDoListId: string) => {
        dispatch(deleteTask({taskId, toDoListId}))
    }, [])

    const removeToDoList = useCallback((todolistId: string) => {
        dispatch(deleteToDoList({todolistId}))
    }, [])

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeToDoListFilter({todolistId, filter}))
    }, [])

    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTask({taskId, model: {title}, todolistId}))
    }, [])

    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateToDoListTitle({todolistId, title}))
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
                <TodolistContainer>
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
                </TodolistContainer>
            </Container>
        </>
    )
}


// Styles
const ItemFormContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  
  box-shadow: ${({theme}) => theme.shadows[4]};

  margin-bottom: 30px;

  width: 100vw;
  height: 100px;
`

const ItemFormWrapper = styled.div`
  width: 30%;
  min-width: 300px;
`

const TodolistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  // The margin left is negative to compensate for the positive margin of the ToDoListCard... 
  margin-left: -25px;
  height: 100%;

  @media (max-width: 2120px) {
    width: 1620px;
  }
  
  @media (max-width: 1715px) {
    width: 1215px;
  }
  
  @media (max-width: 1310px) {
    width: 810px;
  }

  @media (max-width: 905px) {
    width: 405px;
  }
`

// Types
type PropsT = {
    demoMode?: boolean
}