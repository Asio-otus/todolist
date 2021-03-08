import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, IconButton} from "@material-ui/core";
import {FilterValuesType} from "../../bll/todolists-reducer";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../bll/tasks-reducer";

// Types
type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
}

// Component
export const ToDoList = React.memo((props: PropsType) => {
    console.log('to do list called')

    // Connect
    const dispatch = useDispatch()

    // Side effects
     useEffect(() => {
         dispatch(fetchTasksTC(props.id))
     }, [])

    // Callbacks
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [])

    const filterAll = useCallback(() => {
        props.changeFilter(props.id, 'all')
    }, [])

    const filterActive = useCallback(() => {
        props.changeFilter(props.id, 'active')
    }, [])

    const filterCompleted = useCallback(() => {
        props.changeFilter(props.id, 'completed')
    }, [])

    // Component logic
    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    // Render
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            {/*Add new task input*/}
            <AddItemForm addItem={addTask}/>
            {/*Tasks*/}
            <div style={{listStyle: 'none', padding: '0'}}>
                {
                    tasksForTodoList.map(task => <Task key={task.id}
                                                       task={task}
                                                       toDoListId={props.id}
                                                       changeTaskStatus={props.changeTaskStatus}
                                                       changeTaskTitle={props.changeTaskTitle}
                                                       removeTask={props.removeTask}/>)
                }
            </div>
            {/*Filter buttons*/}
            <div>
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={filterAll}>All
                </Button>
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={filterActive}>Active
                </Button>
                <Button
                    size={'small'}
                    color={'primary'}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={filterCompleted}>Completed
                </Button>
            </div>
        </div>
    );
})
