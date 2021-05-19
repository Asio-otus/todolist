import React, {useCallback, useEffect} from 'react';
import {Delete} from "@material-ui/icons";
import {Button, Card, IconButton} from "@material-ui/core";
import {TodolistDomainT, TodolistFilterValuesT} from "./todolists-reducer";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskT} from "../../../api/todolist-api";
import styled from "styled-components";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {useActions} from "../../../app/store";
import {tasksActions, todolistsActions} from "../index";
import {RequestStatusT} from "../../../app/app-reducer";
import {CapitalizeFirstLetter} from "../../../utils/text-utils";

export const Todolist: React.FC<PropsT> = React.memo(props => {

    const {
        todolist,
        tasks,
        demoMode = false
    } = props

    const {fetchTasks, addTask} = useActions(tasksActions)
    const {changeTodolistFilter, removeTodolist, updateTodolistTitle} = useActions(todolistsActions)

    useEffect(() => {
        if (!demoMode) {
            fetchTasks(todolist.id)
        }
    }, [])

    let tasksForTodoList = tasks;

    if (todolist.filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }

    if (todolist.filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const buttonFilterHandler = useCallback((filterValue: TodolistFilterValuesT) => {
        changeTodolistFilter({todolistId: todolist.id, filter: filterValue})
    }, [todolist.id])

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolist.id)
    }, [todolist.id])

    const changeTodolistTitleHandler = useCallback((title: string) => {
        updateTodolistTitle({todolistId: todolist.id, title})
    }, [todolist.id])

    const addTaskHandler = useCallback((title: string) => {
        addTask({title, todolistId: todolist.id})
    }, [todolist.id])


    return (
        <CardStyled>
            <TitleWrapper>
                <TaskTitle>
                    <EditableSpan title={todolist.title} changeTitle={changeTodolistTitleHandler}
                                  disabled={todolist.entityStatus === 'loading'}/>
                </TaskTitle>
                <IconButtonStyled onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButtonStyled>
            </TitleWrapper>

            {/*Add new task input*/}
            <AddTaskWrapper>
                <AddItemForm addItem={addTaskHandler} label={'Add task'}
                             disabled={todolist.entityStatus === 'loading'}/>
            </AddTaskWrapper>

            {/*Tasks*/}
            {tasksForTodoList.map(task => {
                return (
                    <TaskWrapper key={task.id}>
                        <Task task={task}
                              todolistId={todolist.id}
                              todolistEntityStatus={todolist.entityStatus}/>
                    </TaskWrapper>
                )
            })
            }

            {/*Filter buttons*/}
            <ButtonWrapper>
                <FilterButton todolistEntityStatus={todolist.entityStatus}
                              todolistFilter={todolist.filter}
                              buttonFilter='all'
                              onClick={buttonFilterHandler}/>
                <FilterButton todolistEntityStatus={todolist.entityStatus}
                              todolistFilter={todolist.filter}
                              buttonFilter='active'
                              onClick={buttonFilterHandler}/>
                <FilterButton todolistEntityStatus={todolist.entityStatus}
                              todolistFilter={todolist.filter}
                              buttonFilter='completed'
                              onClick={buttonFilterHandler}/>
            </ButtonWrapper>
        </CardStyled>
    )
})

// Inner components
const FilterButton: React.FC<FilterButtonPropsT> = props => {

    const {
        onClick,
        todolistFilter,
        buttonFilter,
        todolistEntityStatus,
    } = props

    return (
        <ButtonStyled
            color={todolistFilter === buttonFilter ? 'primary' : 'default'}
            onClick={() => onClick(buttonFilter)}
            size={'small'}
            disabled={todolistEntityStatus === 'loading'}>{CapitalizeFirstLetter(buttonFilter)}
        </ButtonStyled>
    )
}

// Styles
const CardStyled = styled(Card)`
  position: relative;

  margin-left: 25px;
  margin-bottom: 25px;
  padding: 30px;

  width: 380px;
  height: 100%;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;

  margin-bottom: 20px;
`

const TaskTitle = styled.h3`
  width: 80%;
`

const IconButtonStyled = styled(IconButton)`
  position: absolute;
  top: 15px;
  right: 30px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  justify-self: end;
`

const ButtonStyled = styled(Button)`
  padding: 7px 22px;
`

const AddTaskWrapper = styled.div`
  margin-bottom: 20px;
`

const TaskWrapper = styled.div`
  margin-bottom: 20px;

  :last-child {
    margin-bottom: 30px;
  }
`

// Types
type PropsT = {
    todolist: TodolistDomainT
    tasks: Array<TaskT>
    demoMode?: boolean
}

type FilterButtonPropsT = {
    onClick: (filterValue: TodolistFilterValuesT) => void
    todolistFilter: TodolistFilterValuesT
    buttonFilter: TodolistFilterValuesT
    todolistEntityStatus: RequestStatusT
}