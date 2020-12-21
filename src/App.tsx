import React, {useState} from 'react';
import './App.css';
import Todolist from './components/Todolist';
import {v1} from "uuid";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "Java Script", isDone: true},
            {id: v1(), title: "Some shit", isDone: false},
            {id: v1(), title: "Another shit", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType> ("all")

    function removeTask(taskID: string) {
        const newTasks = tasks.filter(task => task.id !== taskID)
        setTasks(newTasks)
    }
    function changeFilter(filterValue: FilterValuesType) {
        setFilter(filterValue)
    }
    function addTask(title: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if(filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasksForTodoList} removeTask={removeTask} addTask={addTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;