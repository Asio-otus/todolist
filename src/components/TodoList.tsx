import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksStateType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";

// Types
type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, filterValue: FilterValuesType) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

// Component
function TodoList(props: PropsType) {

    // Functions
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const filterAll = () => {
        props.changeFilter(props.id, "all")
    }

    const filterActive = () => {
        props.changeFilter(props.id, "active")
    }

    const filterCompleted = () => {
        props.changeFilter(props.id, "completed")
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    // Render
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            {/*Add new task input*/}
            <AddItemForm addItem={addTask} />
            {/*Tasks*/}
            <ul style={{listStyle: 'none' , padding: '0'}}>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(props.id, task.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
                        }
                        const changeTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.id)
                        }
                        return (
                            <li key={task.id}
                                className={task.isDone ? "is-done" : ""}>
                                <Checkbox color={'primary'} checked={task.isDone} onChange={changeStatus}/>
                                {/*<input*/}
                                {/*    onChange={changeStatus}*/}
                                {/*    type="checkbox"*/}
                                {/*    checked={task.isDone}/>*/}
                                <EditableSpan title={task.title} changeTitle={changeTitle} />
                                <IconButton onClick={removeTask}>
                                    <Delete />
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            {/*Filter buttons*/}
            <div>
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.filter === "all" ? 'contained' : 'outlined'}
                    onClick={filterAll}>All
                </Button>
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.filter === "active" ? 'contained' : 'outlined'}
                    onClick={filterActive}>Active
                </Button>
                <Button
                    size={'small'}
                    color={'primary'}
                    variant={props.filter === "completed" ? 'contained' : 'outlined'}
                    onClick={filterCompleted}>Completed
                </Button>
            </div>
        </div>
    );
}

export default TodoList;
