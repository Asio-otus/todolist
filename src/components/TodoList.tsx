import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskStateType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";

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
                <button onClick={removeTodolist}>x</button>
            </h3>
            {/*Add new task input*/}
            <AddItemForm addItem={addTask} />
            {/*Tasks*/}
            <ul>
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
                                <input
                                    onChange={changeStatus}
                                    type="checkbox"
                                    checked={task.isDone}/>
                                <EditableSpan title={task.title} changeTitle={changeTitle} />
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            {/*Filter buttons*/}
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={filterAll}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={filterActive}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={filterCompleted}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;
