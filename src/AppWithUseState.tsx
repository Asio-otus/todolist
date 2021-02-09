import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// Component
export function AppWithUseState() {

    // Local state
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'Java Script', isDone: true},
            {id: v1(), title: 'Some shit', isDone: false},
            {id: v1(), title: 'Another shit', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Phone', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Monitor', isDone: false},
            {id: v1(), title: 'Coffee', isDone: true},
        ]
    })

    // Functions
    function addTask(title: string, todolistId: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function removeTask(taskId: string, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId)
        setTasks({...tasks})
    }

    function removeTodolist(todolistId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodolistType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [newTodoListID]: []
        })
    }

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        const todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodoLists([...todoLists])
        }
    }

    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.title = title;
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(todoListId: string, title: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    // Render
    return (
        <div className='App'>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Typography variant='h6'>
                        About
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{paddingBottom: '50px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
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
                                <Grid item spacing={3} key={tl.id}>
                                    <Paper elevation={10} style={{padding: '20px'}}>
                                        <TodoList
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
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}