import React, {useCallback, useEffect} from 'react';
import {Delete} from "@material-ui/icons";
import {Button, Card, IconButton} from "@material-ui/core";
import {FilterValuesT, ToDoListDomainT} from "./todolists-reducer";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskT} from "../../../api/todolist-api";
import styled from "styled-components";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {useActions} from "../../../app/store";
import {tasksActions} from "../index";


export const Todolist = React.memo(({demoMode = false, ...props}: PropsT) => {

    const {fetchTasksTC} = useActions(tasksActions)

    useEffect(() => {
        if (!demoMode) {
            fetchTasksTC(props.todolist.id)
        }
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.todolist.id, title)
    }, [])

    const filterAll = useCallback(() => {
        props.changeFilter(props.todolist.id, 'all')
    }, [])

    const filterActive = useCallback(() => {
        props.changeFilter(props.todolist.id, 'active')
    }, [])

    const filterCompleted = useCallback(() => {
        props.changeFilter(props.todolist.id, 'completed')
    }, [])

    let tasksForTodoList = props.tasks;
    if (props.todolist.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <CardStyled>
            <TitleWrapper>
                <TaskTitle>
                    <EditableSpan title={props.todolist.title} changeTitle={changeTodolistTitle}
                                  disabled={props.todolist.entityStatus === 'loading'}/>
                </TaskTitle>
                <IconButtonStyled onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButtonStyled>
            </TitleWrapper>

            {/*Add new task input*/}
            <AddTaskWrapper>
                <AddItemForm addItem={addTask} label={'Add task'} disabled={props.todolist.entityStatus === 'loading'}/>
            </AddTaskWrapper>

            {/*Tasks*/}
            {tasksForTodoList.map(task => {
                    return (
                        <TaskWrapper key={task.id}>
                            <Task task={task}
                                  toDoListId={props.todolist.id}
                                  toDoListEntityStatus={props.todolist.entityStatus}
                                  changeTaskStatus={props.changeTaskStatus}
                                  changeTaskTitle={props.changeTaskTitle}
                                  removeTask={props.removeTask}/>
                        </TaskWrapper>
                    )
                })
            }

            {/*Filter buttons*/}
            <ButtonWrapper>
                <ButtonStyled
                    color={props.todolist.filter === 'all' ? 'primary' : 'default'}
                    onClick={filterAll}
                    size={'small'}
                    disabled={props.todolist.entityStatus === 'loading'}>All
                </ButtonStyled>
                <ButtonStyled
                    color={props.todolist.filter === 'active' ? 'primary' : 'default'}
                    onClick={filterActive}
                    size={'small'}
                    disabled={props.todolist.entityStatus === 'loading'}>Active
                </ButtonStyled>
                <ButtonStyled
                    color={props.todolist.filter === 'completed' ? 'primary' : 'default'}
                    onClick={filterCompleted}
                    size={'small'}
                    disabled={props.todolist.entityStatus === 'loading'}>Completed
                </ButtonStyled>
            </ButtonWrapper>
        </CardStyled>
    );
})

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
    todolist: ToDoListDomainT
    tasks: Array<TaskT>
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesT) => void
    removeTodolist: (todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
    demoMode?: boolean
}