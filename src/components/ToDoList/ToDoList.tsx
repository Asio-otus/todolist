import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../_common/AddItemForm/AddItemForm";
import {EditableSpan} from "../_common/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, IconButton} from "@material-ui/core";
import {FilterValuesType, ToDoListDomainType} from "../../bll/reducers/todolists-reducer";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {useDispatch} from "react-redux";
import {fetchTasks} from "../../bll/reducers/tasks-reducer";
import styled from "styled-components";
import {ButtonStyled} from "../_common/ButtonStyled";

// Component
export const ToDoList = React.memo(({demoMode = false, ...props}: PropsType) => {

    // Connect
    const dispatch = useDispatch()

    // Side effects
    useEffect(() => {
        if (!demoMode) {
            dispatch(fetchTasks(props.todolist.id))
        }
    }, [])

    // Callbacks
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

    // Component logic
    let tasksForTodoList = props.tasks;
    if (props.todolist.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    // Render
    return (
        <ToDoListCard>
            <TitleWrapper>
                <TaskTitle>
                    <EditableSpan title={props.todolist.title} changeTitle={changeTodolistTitle}/>
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

            {
                tasksForTodoList.map(task => <TaskWrapper key={task.id}><Task task={task}
                                                                              toDoListId={props.todolist.id}
                                                                              changeTaskStatus={props.changeTaskStatus}
                                                                              changeTaskTitle={props.changeTaskTitle}
                                                                              removeTask={props.removeTask}/></TaskWrapper>)
            }
            {/*Filter buttons*/}
            <ButtonWrapper>
                <ButtonStyledLocal
                    variant={props.todolist.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={filterAll}>All
                </ButtonStyledLocal>
                <ButtonStyledLocal
                    variant={props.todolist.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={filterActive}>Active
                </ButtonStyledLocal>
                <ButtonStyledLocal
                    variant={props.todolist.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={filterCompleted}>Completed
                </ButtonStyledLocal>
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

const ButtonStyledLocal = styled(ButtonStyled)<any>`
  padding: 5px 25px;
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
type PropsType = {
    todolist: ToDoListDomainType
    tasks: Array<TaskType>
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
    demoMode?: boolean
}