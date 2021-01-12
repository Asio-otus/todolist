import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

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
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "Java Script", isDone: true},
            {id: v1(), title: "Some shit", isDone: false},
            {id: v1(), title: "Another shit", isDone: false},
        ],
        [todoListID2]: [
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
        const todolist = todoLists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = filterValue
            setTodoLists([...todoLists])
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

    function removeTodolist(todolistID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    function addTodoList(todoListTitle: string) {
        const newTodoListID = v1()
        const newTodoList: TodolistType = {
            id: newTodoListID,
            title: todoListTitle,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [newTodoListID]: []
        })
    }

    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        const todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title;
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    // Render
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(tl => {

                    let tasksForTodoList = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                    }

                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;