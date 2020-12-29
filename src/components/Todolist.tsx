import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";

// Types
type PropsType = {
    title: string;
    filter: FilterValuesType;
    tasks: Array<TaskType>;
    addTask: (title: string) => void
    removeTask: (task: string) => void;
    changeFilter: (filterValue: FilterValuesType) => void;
    changeTaskStatus: (id: string, isDone: boolean) => void;
}

// Component
function Todolist(props: PropsType) {

    // Local state
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Functions
    const addTask = () => {
        const taskTitle = title.trim()
        if (taskTitle) {
            props.addTask(taskTitle.trim());
            setTitle('')
        } else {
            setError("Title is required!")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }
    const filterAll = () => {
        props.changeFilter("all")
    }
    const filterActive = () => {
        props.changeFilter("active")
    }
    const filterCompleted = () => {
        props.changeFilter("completed")
    }

    // Render
    return (
        <div>
            <h3>{props.title}</h3>
            {/*Add new task*/}
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">
                    {error}
                </div>}
            </div>
            {/*Tasks*/}
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={task.id}
                                className={task.isDone ? "is-done" : ""}>
                                <input
                                    onChange={changeStatus}
                                    type="checkbox"
                                    checked={task.isDone}/>
                                <span>{task.title}</span>
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

export default Todolist;
