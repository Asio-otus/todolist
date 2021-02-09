import React, {useReducer} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodoListAC,
    todolistsReducer, TodolistType
} from "./bll/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./bll/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./bll/store";

// Types


// Component
export function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    // Functions
    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string, ) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function removeTask(taskId: string, todolistId: string) {
        dispatch(removeTaskAC(taskId, todolistId))
    }

    function removeTodolist(todolistId: string) {
        dispatch(removeTodoListAC(todolistId))
    }

    function addTodoList(title: string) {
        dispatch(addTodolistAC(title))
    }

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }

    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }

    function changeTodoListTitle(todoListId: string, title: string) {
        dispatch(changeTodolistTitleAC(todoListId,title))
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
                        todolists.map(tl => {

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