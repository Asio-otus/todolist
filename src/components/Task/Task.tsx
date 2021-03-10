import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../_common/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

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
        <div key={props.task.id}
             className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox color={'primary'}
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={changeStatus}/>
            <EditableSpan title={props.task.title}
                          changeTitle={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})