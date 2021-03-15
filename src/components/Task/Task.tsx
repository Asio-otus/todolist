import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../_common/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import styled from "styled-components";

// Component
export const Task = React.memo((props: TaskPropsType) => {

    // Callbacks
    const removeTask = useCallback(() => {
        props.removeTask(props.task.id, props.toDoListId)
    }, [])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.toDoListId)
    }, [])

    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.toDoListId)
    }, [])

    // Render
    return (
        <ComponentWrapper key={props.task.id}>
            <StyledCheckbox
                color={'default'}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatus}
                taskStatus={props.task.status}/>
                <StyledEditableSpan taskStatus={props.task.status}>
                    <EditableSpan
                        title={props.task.title}
                        changeTitle={changeTitle}/>
                </StyledEditableSpan>
            <IconButtonStyled onClick={removeTask}>
                <Delete/>
            </IconButtonStyled>
        </ComponentWrapper>
    )
})

// Styled components
const ComponentWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
`

const StyledCheckbox = styled(Checkbox)<any>`
  position: absolute;
  z-index: 1;
  top: -10px;
  
  opacity: ${props => (props.taskStatus === TaskStatuses.Completed) ? .5 : 1};
  margin-right: 5px;
  
  &.MuiCheckbox-root {
    color: ${({theme}) => theme.color.main};
  }
  &.MuiCheckbox-colorSecondary.Mui-checked {
    color: ${({theme}) => theme.color.main};
  }
`
const StyledEditableSpan = styled.div<any>`
  width: 80%;
  
  padding-left: 45px;
  
  opacity: ${props => (props.taskStatus === TaskStatuses.Completed) ? .5 : 1};
`

const IconButtonStyled = styled(IconButton)`
  position: absolute;
  right: 0;
  top: -15px;
`

// Types
export type TaskPropsType = {
    task: TaskType
    toDoListId: string
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}