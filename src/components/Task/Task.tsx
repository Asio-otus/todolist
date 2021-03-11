import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../_common/EditableSpan/EditableSpan";
import {Delete, Style} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import styled from "styled-components";

export type TaskPropsType = {
    task: TaskType
    toDoListId: string
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

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
                color={'primary'}
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

const StyledCheckbox = styled(Checkbox)<any>`
  opacity: ${props => (props.taskStatus === TaskStatuses.Completed) ? .5 : 1};
`
const StyledEditableSpan = styled.div<any>`
  opacity: ${props => (props.taskStatus === TaskStatuses.Completed) ? .5 : 1};
`
const ComponentWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
`

const IconButtonStyled = styled(IconButton)`
  position: absolute;
  right: 0;
`