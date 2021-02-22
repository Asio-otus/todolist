import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../../bll/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    toDoListId: string
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    // Callbacks
    const removeTask = useCallback(() => {
        props.removeTask(props.task.id, props.toDoListId)
    }, [props.removeTask, props.task.id, props.toDoListId])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.toDoListId)
    }, [props.changeTaskStatus, props.task.id, props.toDoListId])

    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.toDoListId)
    }, [props.changeTaskTitle, props.task.id, props.toDoListId])

    // Render
    return (
        <div key={props.task.id}
             className={props.task.isDone ? "is-done" : ""}>
            <Checkbox color={'primary'} checked={props.task.isDone} onChange={changeStatus}/>
            <EditableSpan title={props.task.title} changeTitle={changeTitle} />
            <IconButton onClick={removeTask}>
                <Delete />
            </IconButton>
        </div>
    )
})