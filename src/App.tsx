import React, {useState} from 'react';
import './App.css';
import Todolist from './components/Todolist';
import {v1} from "uuid";

// Types
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = "all" | "active" | "completed"

// Component
function App() {

    // Local state
    let [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "Java Script", isDone: true},
            {id: v1(), title: "Some shit", isDone: false},
            {id: v1(), title: "Another shit", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType> ("all")

    // Functions
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
    function changeTaskStatus (id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    // Filter logic
    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if(filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    // Render
    return (
        <div className="App">
            <Todolist title="What to learn"
                      filter={filter}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;