// import React, {useReducer} from 'react';
// import './App.css';
// import TodoList from './components/TodoList';
// import {v1} from "uuid";
// import {AddItemForm} from "./components/AddItemForm/AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodoListAC,
//     todolistsReducer
// } from "./bll/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./bll/tasks-reducer";
//
// // Types
// export type TaskType = {
//     id: string;
//     title: string;
//     isDone: boolean;
// }
//
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type FilterValuesType = "all" | "active" | "completed"
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// // Component
// export function AppWithReducers() {
//
//     // Local state
//     const todoListID1 = v1()
//     const todoListID2 = v1()
//
//     const [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
//         {id: todoListID1, title: 'What to learn', filter: 'all'},
//         {id: todoListID2, title: 'What to buy', filter: 'all'}
//     ])
//
//     const [tasks, dispatchTasks] = useReducer(tasksReducer,{
//         [todoListID1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'Java Script', isDone: true},
//             {id: v1(), title: 'Some shit', isDone: false},
//             {id: v1(), title: 'Another shit', isDone: false},
//         ],
//         [todoListID2]: [
//             {id: v1(), title: 'Phone', isDone: false},
//             {id: v1(), title: 'Milk', isDone: true},
//             {id: v1(), title: 'Monitor', isDone: false},
//             {id: v1(), title: 'Coffee', isDone: true},
//         ]
//     })
//
//     // Functions
//     function addTask(title: string, todolistId: string) {
//         dispatchTasks(addTaskAC(title, todolistId))
//     }
//
//     function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string, ) {
//         dispatchTasks(changeTaskStatusAC(taskId, isDone, todolistId))
//     }
//
//     function removeTask(taskId: string, todolistId: string) {
//         dispatchTasks(removeTaskAC(taskId, todolistId))
//     }
//
//     function removeTodolist(todolistId: string) {
//         const action = removeTodoListAC(todolistId)
//         dispatchTasks(action)
//         dispatchTodolists(action)
//     }
//
//     function addTodoList(title: string) {
//         const action = addTodolistAC(title)
//         dispatchTasks(action)
//         dispatchTodolists(action)
//     }
//
//     function changeFilter(todolistId: string, filter: FilterValuesType) {
//         dispatchTodolists(changeTodolistFilterAC(todolistId, filter))
//     }
//
//     function changeTaskTitle(taskId: string, title: string, todolistId: string) {
//         dispatchTasks(changeTaskTitleAC(taskId, title, todolistId))
//     }
//
//     function changeTodoListTitle(todoListId: string, title: string) {
//         dispatchTodolists(changeTodolistTitleAC(todoListId,title))
//     }
//
//     // Render
//     return (
//         <div className='App'>
//             <AppBar position='static'>
//                 <Toolbar>
//                     <IconButton edge='start' color='inherit' aria-label='menu'>
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant='h6'>
//                         News
//                     </Typography>
//                     <Typography variant='h6'>
//                         About
//                     </Typography>
//                     <Button color='inherit'>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{paddingBottom: '50px'}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todoLists.map(tl => {
//
//                             let tasksForTodoList = tasks[tl.id]
//                             if (tl.filter === "active") {
//                                 tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
//                             }
//                             if (tl.filter === "completed") {
//                                 tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
//                             }
//
//                             return (
//                                 <Grid item spacing={3} key={tl.id}>
//                                     <Paper elevation={10} style={{padding: '20px'}}>
//                                         <TodoList
//                                             id={tl.id}
//                                             title={tl.title}
//                                             filter={tl.filter}
//                                             tasks={tasksForTodoList}
//                                             removeTask={removeTask}
//                                             addTask={addTask}
//                                             changeFilter={changeFilter}
//                                             changeTaskStatus={changeTaskStatus}
//                                             removeTodolist={removeTodolist}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodoListTitle={changeTodoListTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }

export {}