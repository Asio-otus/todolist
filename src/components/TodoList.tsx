import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {FilterValuesType} from "../bll/todolists-reducer";
import {TaskType} from "../bll/tasks-reducer";

// Types
type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (todolistId: string, title: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
}

// Component
export const TodoList = React.memo((props: PropsType) => {

    // Functions
    const addTask = (title: string) => {
        props.addTask( title, props.id)
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

    let tasksForTodoList = props.tasks;
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
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
                    tasksForTodoList.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
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
})
