import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskT} from "../../../api/todolist-api";
import styled from "styled-components";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {RequestStatusT} from "../../../app/app-reducer";

export const Task = React.memo((props: TaskPropsT) => {

    const removeTask = useCallback(() => {
        props.removeTask({taskId: props.task.id, todolistId: props.toDoListId})
    }, [])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.toDoListId)
    }, [])

    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.toDoListId)
    }, [])

    return (
        <ComponentWrapper key={props.task.id}>
            <CheckboxStyled
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatus}
                disabled={props.task.entityStatus === 'loading' || props.toDoListEntityStatus === 'loading'}/>
            <StyledEditableSpan taskStatus={props.task.status}>
                <EditableSpan
                    title={props.task.title}
                    changeTitle={changeTitle}
                    disabled={props.task.entityStatus === 'loading' || props.toDoListEntityStatus === 'loading'}/>
            </StyledEditableSpan>
            <IconButtonStyled onClick={removeTask} disabled={props.task.entityStatus === 'loading' || props.toDoListEntityStatus === 'loading'}>
                <Delete/>
            </IconButtonStyled>
        </ComponentWrapper>
    )
})

// Styles
const ComponentWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
`

const StyledEditableSpan = styled.div<any>`
  width: 80%;

  padding-left: 45px;

  opacity: ${props => (props.taskStatus === TaskStatuses.Completed) ? .5 : 1};
`

const CheckboxStyled = styled(Checkbox)<any>`
  position: absolute;
  z-index: 1;
  top: -10px;

  opacity: ${props => (props.taskStatus === TaskStatuses.Completed) ? .5 : 1};
  margin-right: 5px;
`

const IconButtonStyled = styled(IconButton)`
  position: absolute;
  right: 0;
  top: -15px;
`

// Types
export type TaskPropsT = {
    task: TaskT
    toDoListId: string
    toDoListEntityStatus: RequestStatusT
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (param: {taskId: string, todolistId: string}) => void
}