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

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

// Component
function App() {

    // Local state
    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "Java Script", isDone: true},
            {id: v1(), title: "Some shit", isDone: false},
            {id: v1(), title: "Another shit", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Phone", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Monitor", isDone: false},
            {id: v1(), title: "Coffee", isDone: true},
        ]
    })

    // Functions
    function removeTask(todolistID: string, taskID: string) {
        const todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    function changeFilter(todolistID: string, filterValue: FilterValuesType) {
        const todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = filterValue
            setTodolist([...todolists])
        }
    }

    function addTask(todolistID: string, title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks});
    }

    function changeTaskStatus(todolistID: string, taskID: string, isDone: boolean) {
        const todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    // Render
    return (
        <div className="App">
            {
                todolists.map(tl => {

                    let tasksForTodoList = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}/>
                    )
                })
            }

        </div>
    );
}

export default App;