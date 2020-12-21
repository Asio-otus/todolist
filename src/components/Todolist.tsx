import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    addTask: (title: string) => void
    removeTask: (task: string) => void;
    changeFilter: (filterValue: FilterValuesType) => void;
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>('');

    const addTask = () => {
        props.addTask(title);
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") addTask()
    }
    const filterAll = () => {props.changeFilter("all")}
    const filterActive = () => {props.changeFilter("active")}
    const filterCompleted = () => {props.changeFilter("completed")}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                {/*e.currentTarget === input*/}
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {props.removeTask(task.id)}
                        return (
                            <li>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={filterAll}>All</button>
                <button onClick={filterActive}>Active</button>
                <button onClick={filterCompleted}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
