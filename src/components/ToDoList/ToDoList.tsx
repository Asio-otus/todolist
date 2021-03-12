import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../_common/AddItemForm/AddItemForm";
import {EditableSpan} from "../_common/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, IconButton} from "@material-ui/core";
import {FilterValuesType} from "../../bll/todolists-reducer";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../bll/tasks-reducer";
import styled from "styled-components";

// Types
type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
}

// Component
export const ToDoList = React.memo((props: PropsType) => {
    console.log('to do list called')

    // Connect
    const dispatch = useDispatch()

    // Side effects
    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    // Callbacks
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [])

    const filterAll = useCallback(() => {
        props.changeFilter(props.id, 'all')
    }, [])

    const filterActive = useCallback(() => {
        props.changeFilter(props.id, 'active')
    }, [])

    const filterCompleted = useCallback(() => {
        props.changeFilter(props.id, 'completed')
    }, [])

    // Component logic
    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    // Render
    return (
        <ToDoListCard>
            <TitleWrapper>
                <TaskTitle>
                    <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                </TaskTitle>
                <IconButtonStyled onClick={removeTodolist}>
                    <Delete/>
                </IconButtonStyled>
            </TitleWrapper>
            {/*Add new task input*/}
            <AddTaskWrapper>
                <AddItemForm addItem={addTask} label={'Add task'}/>
            </AddTaskWrapper>
            {/*Tasks*/}
            <div>
                {
                    tasksForTodoList.map(task => <TaskWrapper><Task key={task.id}
                              task={task}
                              toDoListId={props.id}
                              changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle}
                              removeTask={props.removeTask}/></TaskWrapper>)
                }
            </div>
            {/*Filter buttons*/}
            <ButtonWrapper>
                <StyledButton
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={filterAll}>All
                </StyledButton>
                <StyledButton
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={filterActive}>Active
                </StyledButton>
                <StyledButton
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={filterCompleted}>Completed
                </StyledButton>
            </ButtonWrapper>
        </ToDoListCard>
    );
})

// Styles
const ToDoListCard = styled.div`
  position: relative;

  margin-left: 25px;
  margin-bottom: 25px;
  padding: 30px;

  width: 400px;
  height: 100%;

  background-color: ${({theme}) => theme.color.lightGray};
  box-shadow: ${({theme}) => theme.effect.shadow};
  border-radius: ${({theme}) => theme.border.size.md};
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

const StyledButton = styled(Button)<any>`
  padding: 5px 25px;
  box-shadow: ${({theme}) => theme.effect.shadow};
  border: none;

  &.MuiButton-label {
    color: #fff;
  }

  &.MuiButton-outlined {
    color: ${({theme}) => theme.color.secondary};
    &:hover {
      color: #fff;
      background-color: ${({theme}) => theme.color.main};
    }
  }

  &.MuiButton-contained {
    color: #fff;
    background-color: ${({theme}) => theme.color.main};
    &:hover {
      background-color: ${({theme}) => theme.color.mainAlt};
    }
  }
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