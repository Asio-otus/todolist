import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodoListAC, ToDoListDomainType
} from "./bll/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType
} from "./bll/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {ToDoList} from "./components/ToDoList/ToDoList";
import {TaskStatuses} from "./api/todolist-api";

// Component
export function App() {
    console.log('App is called')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<ToDoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    // Functions
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string,) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId))
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoListAC(todolistId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todoListId, title))
    }, [dispatch])

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
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={10} style={{padding: '20px'}}>
                                        <ToDoList
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