import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskT} from "../../../api/todolist-api";
import styled from "styled-components";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {RequestStatusT} from "../../../app/app-reducer";
import {useActions} from "../../../app/store";
import {tasksActions} from "../index";

export const Task: React.FC<TaskPropsT> = React.memo(props => {

    const {
        task,
        todolistId,
        todolistEntityStatus
    } = props

    const {updateTask, removeTask} = useActions(tasksActions)

    const removeTaskHandler = useCallback(() => {
        removeTask({taskId: task.id, todolistId})
    }, [])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({taskId: task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId})
    }, [])

    const changeTaskTitle = useCallback((title: string) => {
        updateTask({taskId: task.id,
            model: {title},
            todolistId})
    }, [])

    return (
        <ComponentWrapper key={task.id}>
            <CheckboxStyled
                checked={task.status === TaskStatuses.Completed}
                onChange={changeTaskStatus}
                disabled={task.entityStatus === 'loading' || todolistEntityStatus === 'loading'}/>
            <StyledEditableSpan taskStatus={task.status}>
                <EditableSpan
                    title={task.title}
                    changeTitle={changeTaskTitle}
                    disabled={task.entityStatus === 'loading' || todolistEntityStatus === 'loading'}/>
            </StyledEditableSpan>
            <IconButtonStyled onClick={removeTaskHandler} disabled={task.entityStatus === 'loading' || todolistEntityStatus === 'loading'}>
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

  opacity: ${({taskStatus}) => (taskStatus === TaskStatuses.Completed) ? .5 : 1};
`

const CheckboxStyled = styled(Checkbox)<any>`
  position: absolute;
  z-index: 1;
  top: -10px;

  opacity: ${({taskStatus}) => (taskStatus === TaskStatuses.Completed) ? .5 : 1};
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
    todolistId: string
    todolistEntityStatus: RequestStatusT
}